# Урок 8 Тесты на FunC для смарт-контракта c Hashmap

## Введение

В этом уроке мы напишем тесты для смарт-контракта созданного в седьмом уроке в блокчейне TON на языке FunC и выполним их с помощью [Blueprint](https://github.com/ton-community/blueprint).

## Требования

Для прохождения данного урока вам достаточно установить [Node.js](https://nodejs.org). Желательно устанавливать одну из последних версий, например 18.

А также пройти [седьмой урок](https://github.com/romanovichim/TonFunClessons_ru/blob/main/7lesson/seventhlesson.md).

## Меняем `beforeEach` в тестах для упрощения

Откроем файл `tests/Hashmap.spec.ts` в котором будут находиться наши тесты и поменяем функцию `beforeEach`, которая выполняется перед каждым тестом.

Добавим в неё установку текущего времени (меняем значение `blockchain.now`). Помимо этого, после успешного деплоя контракта, сразу попробуем установить три тестовых значения в нашей хешмапе используя написанный ранее метод `sendSet`.

С этого момента, в начале каждого теста, время уже будет установлено на `500`, а также три значения будут уже записаны (или не записаны в случае если смарт-контракт работает некорректно).

Получаем примерно такую функцию:

```ts
beforeEach(async () => {
    blockchain = await Blockchain.create();

    blockchain.now = 500;

    deployer = await blockchain.treasury('deployer');

    hashmap = blockchain.openContract(
        Hashmap.createFromConfig(
            {
                manager: deployer.address,
            },
            code
        )
    );

    const deployResult = await hashmap.sendDeploy(
        deployer.getSender(),
        toNano('0.01')
    );

    expect(deployResult.transactions).toHaveTransaction({
        from: deployer.address,
        to: hashmap.address,
        deploy: true,
    });

    await hashmap.sendSet(deployer.getSender(), toNano('0.05'), {
        queryId: 123n,
        key: 1n,
        validUntil: 1000n,
        value: beginCell().storeUint(123, 16).endCell().asSlice(),
    });

    await hashmap.sendSet(deployer.getSender(), toNano('0.05'), {
        queryId: 123n,
        key: 2n,
        validUntil: 2000n,
        value: beginCell().storeUint(234, 16).endCell().asSlice(),
    });

    await hashmap.sendSet(deployer.getSender(), toNano('0.05'), {
        queryId: 123n,
        key: 3n,
        validUntil: 3000n,
        value: beginCell().storeUint(345, 16).endCell().asSlice(),
    });
});
```

## Тестируем запись и получение значений

Помним, что запись значений уже произошла в `beforeEach`, поэтому здесь нам остаётся лишь проверить, что значения действительно записались корректно.

Для этого используем написанный нами метод `getByKey` и сравниваем оба значения `validUntil` и `value` с ожидаемыми значениями (теми, которые мы записали в контракт).

Замечу, что для сравнения специфичных для TON типов (например Address или Slice), существуют отдельные мэтчеры. В этом случае нам пригодился `toEqualSlice`, который в тесте сравнивает на равенство два слайса.

Повторим эту процедуру для всех трёх записанных значений и тест готов.

```ts
it('should store and retrieve values', async () => {
    let [validUntil, value] = await hashmap.getByKey(1n);
    expect(validUntil).toEqual(1000n);
    expect(value).toEqualSlice(
        beginCell().storeUint(123, 16).endCell().asSlice()
    );

    [validUntil, value] = await hashmap.getByKey(2n);
    expect(validUntil).toEqual(2000n);
    expect(value).toEqualSlice(
        beginCell().storeUint(234, 16).endCell().asSlice()
    );

    [validUntil, value] = await hashmap.getByKey(3n);
    expect(validUntil).toEqual(3000n);
    expect(value).toEqualSlice(
        beginCell().storeUint(345, 16).endCell().asSlice()
    );
});
```

## Тестируем наличие ошибки при не существующем ключе

Гет-методы, как и external сообщения, при неуспешном выполнении выбрасывают ошибку в TypeScript программе. Поэтому здесь нам нужно проверить, что вызов `getByKey(123n)` завершится с ошибкой. Так как этот метод асинхронный (вызывается с `await`), этот самый `await` следует вставить перед `expect()`.

Наличие ошибки при вызове функции можно проверить через `.rejects.toThrow()`.

```ts
it('should throw on not found key', async () => {
    await expect(hashmap.getByKey(123n)).rejects.toThrow();
});
```

## Тестируем очистку старых значений

В этом тесте нам пригодится возможность менять значение текущего времени `blockchain.now`.

Для начала, попробуем вызвать очистку значений, не меняя время. В таком случае, ключ `1` должен успешно найтись.

```ts
await hashmap.sendClearOldValues(deployer.getSender(), toNano('0.05'), {
    queryId: 123n,
});

let [validUntil, value] = await hashmap.getByKey(1n);
expect(validUntil).toEqual(1000n);
expect(value).toEqualSlice(beginCell().storeUint(123, 16).endCell().asSlice());
```

Далее, выставим время на 1001. Так как `validUntil` у первого ключа равен 1000, после очистки, этот ключ должен пропасть. При этом все оставшиеся ключи должны остаться в контракте и никак не поменяться.

```ts
blockchain.now = 1001;

await hashmap.sendClearOldValues(deployer.getSender(), toNano('0.05'), {
    queryId: 123n,
});

await expect(hashmap.getByKey(1n)).rejects.toThrow();

[validUntil, value] = await hashmap.getByKey(2n);
expect(validUntil).toEqual(2000n);
expect(value).toEqualSlice(beginCell().storeUint(234, 16).endCell().asSlice());

[validUntil, value] = await hashmap.getByKey(3n);
expect(validUntil).toEqual(3000n);
expect(value).toEqualSlice(beginCell().storeUint(345, 16).endCell().asSlice());
```

И наконец, выставим время на 3001, чтобы после очистки пропали все ключи. Проверять наличие первого ключа уже не имеет смысла, так как мы проверили это выше.

```ts
blockchain.now = 3001;

await hashmap.sendClearOldValues(deployer.getSender(), toNano('0.05'), {
    queryId: 123n,
});

await expect(hashmap.getByKey(2n)).rejects.toThrow();
await expect(hashmap.getByKey(3n)).rejects.toThrow();
```

Весь код этого теста:

```ts
it('should clear old values', async () => {
    await hashmap.sendClearOldValues(deployer.getSender(), toNano('0.05'), {
        queryId: 123n,
    });

    let [validUntil, value] = await hashmap.getByKey(1n);
    expect(validUntil).toEqual(1000n);
    expect(value).toEqualSlice(
        beginCell().storeUint(123, 16).endCell().asSlice()
    );

    blockchain.now = 1001;

    await hashmap.sendClearOldValues(deployer.getSender(), toNano('0.05'), {
        queryId: 123n,
    });

    await expect(hashmap.getByKey(1n)).rejects.toThrow();

    [validUntil, value] = await hashmap.getByKey(2n);
    expect(validUntil).toEqual(2000n);
    expect(value).toEqualSlice(
        beginCell().storeUint(234, 16).endCell().asSlice()
    );

    [validUntil, value] = await hashmap.getByKey(3n);
    expect(validUntil).toEqual(3000n);
    expect(value).toEqualSlice(
        beginCell().storeUint(345, 16).endCell().asSlice()
    );

    blockchain.now = 3001;

    await hashmap.sendClearOldValues(deployer.getSender(), toNano('0.05'), {
        queryId: 123n,
    });

    await expect(hashmap.getByKey(2n)).rejects.toThrow();
    await expect(hashmap.getByKey(3n)).rejects.toThrow();
});
```

## Тестируем ошибку при ненайденном опкоде

Для этого воспользуемся методом `send` у `deployer` для отправки произвольного сообщения. Отправим, например, opcode = 123 и query_id = 123.

Такая транзакция должна закончиться с `exitCode = 12`, как мы и прописывали в контракте. Подобные проверки мы уже умеем делать.

```ts
it('should throw on wrong opcode', async () => {
    const result = await deployer.send({
        to: hashmap.address,
        value: toNano('0.05'),
        body: beginCell().storeUint(123, 32).storeUint(123, 64).endCell(),
    });
    expect(result.transactions).toHaveTransaction({
        from: deployer.address,
        to: hashmap.address,
        exitCode: 12,
    });
});
```

## Тестируем ошибку при некорректном запросе

Как мы помним, op = 2 в нашем контракте предусматривает ошибку при наличии лишних данных в body сообщения. Это обеспечивается вызовом `end_parse()`.

Для проверки этой ошибки, как и в прошлом тесте, воспользуемся методом `send` и отправим сообщение с опкодом = 2, но в конец тела добавим так же лишние данные.

Такая транзакция должна закончиться неуспешно, то есть в мэтчере `toHaveTransaction` добавим флаг `success: false`.

```ts
it('should throw on bad query', async () => {
    const result = await deployer.send({
        to: hashmap.address,
        value: toNano('0.05'),
        body: beginCell()
            .storeUint(2, 32)
            .storeUint(123, 64)
            .storeStringTail('This string should not be here!')
            .endCell(),
    });
    expect(result.transactions).toHaveTransaction({
        from: deployer.address,
        to: hashmap.address,
        success: false,
    });
});
```

## Запускаем тесты

Запустим тесты командой `npx blueprint test` и мы должны увидеть следующее:

```bash
 PASS  tests/Hashmap.spec.ts
  Hashmap
    ✓ should store and retrieve values (173 ms)
    ✓ should throw on not found key (80 ms)
    ✓ should clear old values (95 ms)
    ✓ should throw on wrong opcode (73 ms)
    ✓ should throw on bad query (129 ms)
```

Если какие то тесты у вас не прошли, просмотрите код и текст этого урока ещё раз. Также сверьте свой код смарт-контракта с кодом из предыдущего урока.

## Заключение

Хотел сказать отдельное спасибо, тем кто донатит для поддержки проекта, это очень мотивирует и помогает выпускать уроки быстрее. Если вы хотите помочь проекту(быстрее выпускать уроки, перевести это все на английский итд), внизу на [главной странице](https://github.com/romanovichim/TonFunClessons_ru), есть адреса для донатов.
