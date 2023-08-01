# Урок 6 Тесты на FunC для смарт-контракта с op и query_id

## Введение

В этом уроке мы напишем тесты для смарт-контракта созданного в пятом уроке в тестовой сети The Open Network на языке FUNC и выполним их с помощью [Blueprint](https://github.com/ton-community/blueprint).

## Требования

Для прохождения данного урока вам достаточно установить [Node.js](https://nodejs.org). Желательно устанавливать одну из последних версий, например 18.

А также пройти [пятый урок](https://github.com/romanovichim/TonFunClessons_ru/blob/main/5lesson/fifthlesson.md).

## Задание пятого урока

Для удобства напомню здесь, что мы делали в пятом уроке. Задача смарт-контракта будет запоминать адрес, устанавливаемый менеджером и сообщать его всем, кто запросит, в частности следующая функциональность\*\*:

-   когда контракт получает сообщение от Менеджера с `op` равным 1
    за которым следует какой-то `query_id`, за которым следует `MsgAddress`, он должен сохранить полученный адрес в хранилище.
-   когда контракт получает внутреннее сообщение с любого адреса с `op`, равным 2, за которым следует `query_id`, он должен ответить отправителю сообщением с телом, содержащим:
    -   `op` равна 3
    -   тот же `query_id`
    -   Адрес менеджера
    -   Адрес, который был запомнен с момента последнего запроса менеджера (пустой адрес `addr_none`, если еще не было запроса менеджера)
    -   Значение TON, прикрепленное к сообщению за вычетом платы за обработку.
-   когда смарт-контракт получает любое другое сообщение, он должен выдать исключение.

## Teсты для смарт-контракта с op и query_id

Для нашего прокси смарт-контракта мы напишем следующие тесты:

-   Сохранение адресов с op = 1
-   Адрес должен иметь возможность сохранять только менеджер
-   Обработка op = 2
-   Контракт должен выдавать исключение при любом другом опкоде

### Прежде чем перейти к написанию тестов...

Откроем файл `tests/AddressSaver.spec.ts` (название может отличаться, если вы назвали проект по-другому), в котором будут наши тесты. Вспомним из четвёртого урока, что нужно обновить значения в конфиге при деплое на те, которые мы там задавали. Также для удобства можно вынести объявление объекта `deployer` за пределы функции `beforeEach` чтобы иметь к нему доступ из всех тестов.

### Тестируем op = 1

Генерируем случайный адрес функцией `randomAddress()`, а затем вызываем метод `sendChangeAddress` от имени кошелька `deployer`.

В таком случае, должна присутствовать транзакция от `deployer` к `AddressSaver` с флагом `success = true` (который означает, что выполнение всех фаз транзакции было успешно).

```ts
it('should change saved address by manager', async () => {
    const address = randomAddress();
    const result = await addressSaver.sendChangeAddress(
        deployer.getSender(),
        toNano('0.01'),
        12345n,
        address
    );

    expect(result.transactions).toHaveTransaction({
        from: deployer.address,
        to: addressSaver.address,
        success: true,
    });
});
```

### Тестируем исключение при вызове op = 1 не менеджером

В этом тесте делаем то же самое что и в предыдущем, но вызываем `sendChangeAddress` от имени другого кошелька `user`.

В таком случае флаг `success` должен быть `false`.

```ts
it('should not change saved address by anyone else', async () => {
    let user = await blockchain.treasury('user');
    const address = randomAddress();
    const result = await addressSaver.sendChangeAddress(
        user.getSender(),
        toNano('0.01'),
        12345n,
        address
    );

    expect(result.transactions).toHaveTransaction({
        from: user.address,
        to: addressSaver.address,
        success: false,
    });
});
```

### Тестируем op = 2

Вызываем `sendChangeAddress` как и в первом тесте чтобы успешно поменять сохранённый адрес. Затем используя новый кошелёк `user` вызываем `sendRequestAddress`.

Такой вызов должен спровоцировать транзакцию от `AddressSaver` к `user` с телом сообщения, которое содержит в себе op = 3, query_id = 12345, deployer.address, address.

```ts
it('should return required data on `requestAddress` call', async () => {
    const address = randomAddress();
    await addressSaver.sendChangeAddress(
        deployer.getSender(),
        toNano('0.01'),
        12345n,
        address
    );

    let user = await blockchain.treasury('user');
    const result = await addressSaver.sendRequestAddress(
        user.getSender(),
        toNano('0.01'),
        12345n
    );
    expect(result.transactions).toHaveTransaction({
        from: addressSaver.address,
        to: user.address,
        body: beginCell()
            .storeUint(3, 32)
            .storeUint(12345n, 64)
            .storeAddress(deployer.address)
            .storeAddress(address)
            .endCell(),
    });
});
```

### Тестируем исключение при любых других опкодах

Для этого теста будем использовать метод `send` у контракта `Treasury`. Отправим, например, сообщение с op = 5.

Такая транзакция должна завершиться с `exitCode = 3`, что мы и проверяем в тесте.

```ts
it('should throw on any other opcode', async () => {
    const result = await deployer.send({
        to: addressSaver.address,
        value: toNano('0.01'),
        body: beginCell().storeUint(5, 32).storeUint(12345n, 64).endCell(),
    });
    expect(result.transactions).toHaveTransaction({
        from: deployer.address,
        to: addressSaver.address,
        exitCode: 3,
    });
});
```

Запустим тесты командой `npx blueprint test` и мы должны увидеть следующее:

```bash
 PASS  tests/AddressSaver.spec.ts
  AddressSaver
    ✓ should deploy (145 ms)
    ✓ should change saved address by manager (67 ms)
    ✓ should not change saved address by anyone else (67 ms)
    ✓ should return required data on `requestAddress` call (70 ms)
    ✓ should throw on any other opcode (89 ms)
```

Если какие то тесты у вас не прошли, просмотрите код и текст этого урока ещё раз. Также сверьте свой код смарт-контракта с кодом из предыдущего урока.

## Заключение

Хотел сказать отдельное спасибо, тем кто донатит для поддержки проекта, это очень мотивирует и помогает выпускать уроки быстрее. Если вы хотите помочь проекту(быстрее выпускать уроки, перевести это все на английский итд), внизу на [главной странице](https://github.com/romanovichim/TonFunClessons_ru), есть адреса для донатов.
