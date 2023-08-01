# Урок 2 Тесты на FunC для смарт-контракта

## Введение

В этом уроке мы напишем тесты для смарт-контракта созданного в первом уроке в блокчейне TON на языке FunC и выполним их с помощью [Blueprint](https://github.com/ton-community/blueprint).

## Требования

Для прохождения данного урока вам достаточно установить [Node.js](https://nodejs.org) (желательно версии 18 или выше) и пройти [первый урок](https://github.com/romanovichim/TonFunClessons_ru/blob/main/1lesson/firstlesson.md).

## Teсты для первого смарт-контракта

Для нашего первого смарт-контракта мы напишем следующие тесты:

-   вызовем recv_internal() с разными числами и проверим метод get_total
-   проверим вызов ошибки при не соответствии числа условию битности

## Структура тестов в Blueprint

Для тестирования смарт-контрактов в Blueprint-проектах используется библиотека [Sandbox](https://github.com/ton-community/sandbox). Она установлена по-умолчанию во всех проектах, созданных через Blueprint.

Сами тесты находятся в папке `tests/`. Для каждого смарт-контракта проекта (их может быть несколько) создаётся отдельный файл. В нашем случае в этой папке должен лежать лишь один файл `Counter.spec.ts`. В нём уже написано всё что нужно для тестирования нашего смарт-контракта, и даже прописан первый тест, который проверяет, что контракт успешно деплоится. Остаётся только добавить новые тесты.

### Важный момент

Если запустить тесты командой `npx blueprint test` в текущем положении, вы увидите ошибку в единственном тесте, называющемся "should deploy". В большинстве случаев, этот тест должен сразу выполняться успешно. Но наш контракт по-просту вызывает ошибку, потому что в полученном при деплое сообщении не лежит 32-битное число (в первом уроке мы специально добавили вызов такой ошибки при отсуствии числа).

Чтобы исправить это и игнорировать ошибку при деплое - найдите фрагмент кода, в котором проверяется успешность деплоя. Из него нужно убрать проверку на `success`. Должно получиться так:

```ts
expect(deployResult.transactions).toHaveTransaction({
    from: deployer.address,
    to: counter.address,
    deploy: true,
});
```

Теперь, если выполнить команду `npx blueprint test` в терминале вы увидите следующее:

```
 PASS  tests/Counter.spec.ts
  Counter
    ✓ should deploy (123 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.085 s, estimated 2 s
Ran all test suites.
✨  Done in 2.47s.
```

Что означает успешное прохождение теста.

## Тестируем вызов recv_internal() и get_total()

Напишем первый тест и разберем его код.

После стандартного теста `it('should deploy', ...)` напишем новый:

```ts
it('should update the number', async () => {
    // здесь будет код
});
```

Строка "should update the number" может быть любой. Это лишь пояснение для нас самих, в чём заключается суть теста.

Теперь напишем сам код теста:

```ts
it('should update the number', async () => {
    const caller = await blockchain.treasury('caller');

    await counter.sendNumber(caller.getSender(), toNano('0.01'), 10n);
    expect(await counter.getTotal()).toEqual(10n);

    await counter.sendNumber(caller.getSender(), toNano('0.01'), 5n);
    expect(await counter.getTotal()).toEqual(15n);

    await counter.sendNumber(caller.getSender(), toNano('0.01'), 1000n);
    expect(await counter.getTotal()).toEqual(1015n);
});
```

### Разбираем

`const caller = await blockchain.treasury('caller');` - здесь мы создаём новый Treasury, на котором в Sandbox уже лежит миллион монет для всех необходимых проверок. С него мы сможем отправлять сообщения контракту. По сути это просто кошелёк с балансом для тестов.

`await counter.sendNumber(caller.getSender(), toNano('0.01'), 10n);` - отправляем сообщение с числом `10`, используя метод из обёртки, которую мы писали в первом уроке. В качестве отправителя используем `caller`, созданный выше.

`expect(await counter.getTotal()).toEqual(10n);` - проверяем (функция expect), что результат гет-метода getTotal() будет равен `10`. Если это не так, то тест будет помечен как провалившийся и в терминале мы увидим где именно не прошла проверка. Если всё хорошо и результат совпадёт, то код просто будет исполняться дальше.

В следующих строках мы просто отправляем тому же контракту числа и сверяем результат getTotal(). После отправки `5` наша сумма должна уже равняться `15`, а если отправить ещё `1000`, то получится `1015`. Если FunC код контракта написан правильно, тест должен быть помечен как пройденный.

Запустим тесты командой `npx blueprint test`, и если вы всё сделали без ошибок, получится следующий результат:

```
 PASS  tests/Counter.spec.ts
  Counter
    ✓ should deploy (126 ms)
    ✓ should update the number (79 ms)
```

Галочка означает, что наш новый тест успешно пройден.

## Тестируем исключение

Напишем ещё один тест и разберем его код.

```ts
it('should throw error when number is not 32 bits', async () => {
    const caller = await blockchain.treasury('caller');

    const result = await counter.sendDeploy(caller.getSender(), toNano('0.01'));
    expect(result.transactions).toHaveTransaction({
        from: caller.address,
        to: counter.address,
        success: false,
        exitCode: 35,
    });
});
```

### Разбираем

`const caller = await blockchain.treasury('caller');` - здесь мы создаём новый Treasury, на котором в Sandbox уже лежит миллион монет для всех необходимых проверок. С него мы сможем отправлять сообщения контракту. По сути это просто кошелёк с балансом для тестов.

`const result = await counter.sendDeploy(caller.getSender(), toNano('0.01'));` - отправляем пустое сообщение без числа (именно такое использовалось для деплоя, поэтому для простоты мы и используем готовую функцию sendDeploy).

`expect(result.transactions).toHaveTransaction({ ... })` - проверяем (функция expect), что среди транзакций, которые в результате вызова контракта обработались, будет транзакция с ошибкой `35`.

> Код ошибки `35` потому что именно это число мы прописали в смарт-контракте в функции `throw_if`

Запустим тесты командой `npx blueprint test`, и если вы всё сделали без ошибок, получится следующий результат:

```
 PASS  tests/Counter.spec.ts
  Counter
    ✓ should deploy (127 ms)
    ✓ should update the number (79 ms)
    ✓ should throw error when number is not 32 bits (53 ms)
```

Галочка означает, что наш новый тест успешно пройден.

### На этом всё!

Вы прошли второй урок и успешно реализовали тесты для смарт-контракта.

P.S если есть какие-то вопросы, предлагаю задавать [здесь](https://t.me/ton_learn)
