# Урок 4 Тесты на FunC для прокси смарт-контракта

## Введение

В этом уроке мы напишем тесты для смарт-контракта созданного в третьем уроке в блокчейне TON на языке FunC и выполним их с помощью [Blueprint](https://github.com/ton-community/blueprint).

## Требования

Для прохождения данного урока вам достаточно установить [Node.js](https://nodejs.org). Желательно устанавливать одну из последних версий, например 18.

А также пройти [третий урок](https://github.com/romanovichim/TonFunClessons_ru/blob/main/3lesson/thirdlesson.md).

## Teсты для прокси смарт-контракта

Для нашего прокси смарт-контракта мы напишем следующие тесты:

-   При отправке сообщения в контракт от владельца пересылка не должна осуществляться
-   Остальные условия [третьего урока](https://github.com/romanovichim/TonFunClessons_ru/blob/main/3lesson/thirdlesson.md) должны выполняться

## Тестируем вызов прокси контракта его владельцем

Откроем файл `tests/Proxy.spec.ts`, в котором уже написана база для наших тестов. В нём для удобства вынесем объявление `deployer` за пределы функции `beforeEach`, чтобы можно было к нему обращаться из всех тестов. Также нужно добавить в конфиг контаркта при деплое те параметры, которые мы в нём задавали. Должно получиться примерно так:

```ts
let blockchain: Blockchain;
let proxy: SandboxContract<Proxy>;
let deployer: SandboxContract<TreasuryContract>;

beforeEach(async () => {
    blockchain = await Blockchain.create();

    deployer = await blockchain.treasury('deployer');

    proxy = blockchain.openContract(
        Proxy.createFromConfig(
            {
                owner: deployer.address,
            },
            code
        )
    );

    const deployResult = await proxy.sendDeploy(
        deployer.getSender(),
        toNano('0.01')
    );

    expect(deployResult.transactions).toHaveTransaction({
        from: deployer.address,
        to: proxy.address,
        deploy: true,
    });
});
```

Теперь напишем первый тест для прокси контракта и разберем его код.

```ts
it('should not forward from owner', async () => {
    const result = await deployer.send({
        to: proxy.address,
        value: toNano('1'),
    });
    expect(result.transactions).not.toHaveTransaction({
        from: proxy.address,
        to: deployer.address,
    });
});
```

Сначала мы отправляем сообщение с кошелька `deployer` на `proxy` с суммой `1 TON`.

Как мы помним, наш контракт не должен пересылать сообщения от владельца ему же самому. Поэтому условием прохождения теста должно быть **отсутствие** такой транзакции. Такую проверку можно реализовать, добавив `.not` перед `.toHaveTransaction`.

> Примечание: условия для тестов (ключевое слово `expect`) работают через библиотеку **Jest**. Её синтаксис довольно простой и зачастую можно догадаться как что-то проверить, просто написав это по-английски. Названия всех функций чётко отражают её суть. Например `toEqual` проверяет, что два значения равны, а `toBeLessThan` проверяет, что одно значение меньше другого.

Получаем условие, что в результате выполнения всей цепочки действий не должно быть ни одной транзакции от `proxy` к `deployer`.

## Тестируем вызов прокси контракта другим кошельком

Напишем второй тест для прокси контракта и разберем его код.

```ts
it('should forward from another wallet', async () => {
    let user = await blockchain.treasury('user');
    const result = await user.send({
        to: proxy.address,
        value: toNano('1'),
        body: beginCell().storeStringTail('Hello, world!').endCell(),
    });
    expect(result.transactions).toHaveTransaction({
        from: proxy.address,
        to: deployer.address,
        body: beginCell()
            .storeAddress(user.address)
            .storeRef(beginCell().storeStringTail('Hello, world!').endCell())
            .endCell(),
        value: (x) => (x ? toNano('0.99') <= x && x <= toNano('1') : false),
    });
});
```

Сначала создаём новый кошелёк так же, как в коде выше создаётся `deployer`:

```ts
let user = await blockchain.treasury('user');
```

Далее посылаем сообщение от `user` к `proxy` с суммой `1 TON` и комментарием `Hello, world!`.

Теперь наш контракт уже должен перенаправить это сообщение к владельцу. Поэтому проверяем, что оно там действительно есть через `.toHaveTransaction` без использования `.not`. Также для более точной проверки мы используем параметры `body` и `value`.

В `body` должна лежать ячейка, содержащая адрес отправителя исходного сообщения (то есть `user.address`), а затем в рефе должно лежать исходное тело сообщения. Поэтому проверяем, чтобы `body` был равен

```
beginCell().storeAddress(user.address)
    .storeRef(beginCell().storeStringTail('Hello, world!').endCell())
.endCell()
```

Для проверки `value` используется необычная конструкция, давайте разберём её детальнее:

```ts
value: (x) => (x ? toNano('0.99') <= x && x <= toNano('1') : false);
```

"Мэтчеры" из `.toHaveTransaction` могут принимать как само значение, которое мы ожидаем, так и функцию, которая делает какую-то более сложную проверку и возвращает булевое значение с результатом этой проверки.
В нашем случае, мы не знаем какую точно сумму отправит прокси-контракт владельцу, ведь мы для отправки используем в контракте режим 64, а значит комиссии вычтутся из суммы сообщения. Поэтому мы хотим проверить, что сумма сообщения приблизительно равна 1.
Для этого мы пишем так назвыаемую "стрелочную функцию", которую не надо объявлять заранее. Эта функция принимает какое-то значение `x` и возврашает `true` если оно больше или равно `0.99 TON` и меньше или равно `1 TON`. Также тернарным выражением мы проверяем, что `x` не является `undefined` чтобы мы могли провести проверку на его значение, а в противном случае возвращаем `false`.

## Запускаем тесты

Выполним в терминале команду `npx blueprint test`. Результат должен быть примерно такой:

```
 PASS  tests/Proxy.spec.ts
  Proxy
    ✓ should deploy (145 ms)
    ✓ should not forward from owner (63 ms)
    ✓ should forward from another wallet (66 ms)
```

Если какие то тесты у вас не прошли, просмотрите код и текст этого урока ещё раз. Также сверьте свой код смарт-контракта с кодом из предыдущего урока.

## Заключение

В этом уроке мы успешно протестироавли наш прокси-контракт и убедились, что он работает как надо.
