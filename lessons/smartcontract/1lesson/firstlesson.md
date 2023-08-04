# Урок 1 Простой смарт-контракт

## Введение

В этом уроке мы напишем ваш первый смарт-контракт в блокчейне TON на языке FunC, задеплоим\* его в тестовую сеть с помощью [Blueprint](https://github.com/ton-community/blueprint), а попробуем взаимодействовать с ним через Javascript-библиотеку [ton](https://github.com/ton-core/ton).

> \*Деплой - процесс переноса в сеть (в данном случае смарт-контракта в блокчейн)

## Требования

Для прохождения данного урока вам достаточно установить [Node.js](https://nodejs.org). Желательно устанавливать одну из последних версий, например 18.

## Смарт-контракт

Смарт-контракт, который мы будем делать, должен обладать следующей функциональностью:

-   Хранить в своих данных целое число _total_ - 64-битное число без знака
-   При получении внутреннего входящего сообщения, контракт должен взять 32-битное целое число без знака из тела сообщения, добавить его к _total_ и сохранить в своих данных
-   В смарт-контракте должен быть предусмотрен метод _get_total_ позволяющий вернуть значение _total_
-   Если тело входящего сообщения меньше 32 бит, то контракт должен выдать исключение

## Создадим проект с помощью Blueprint

В консоли выполним следующую команду:

```bash
npm create ton@latest
```

Далее просто следуем инструкциям. Нужно будет ввести название проекта, название смарт-контракта и по желанию выбрать заготовку для простого контракта. Для нашего урока, назовём проект `my-counter`, смарт-контракт `Сounter` и выберем старт с пустого контракта на языке **FunC**, о котором мы поговорим чуть позже.

```bash
? Project name my-counter
? First created contract name (PascalCase) Counter
? Choose the project template An empty contract (FunC)
```

Blueprint создал простой проект. Перейдём в его директорию:

```bash
cd my-counter
```

Там вы можете увидеть 4 папки:

-   contracts
-   wrappers
-   scripts
-   tests

На данном этапе нас интересуют папки _contracts_ и _wrappers_, в которых мы будем писать код на FunС и обёртку для него на Typescript соответственно.

##### Что такое FunC?

Для программирования смарт-контрактов в блокчейне TON рекомендуется использовать язык FunC. Подробнее с ним можно ознакомиться [в документации](https://docs.ton.org/develop/func/overview)

##### Подготовим файл для нашего кода

Зайдём в папку contracts:

```bash
cd contracts
```

И откроем файл `counter.fc`, на своем экране вы увидите смарт-контракт с всего одной пустой функцией. Теперь мы готовы начать писать наш первый смарт-контракт.

## Функции смарт-контракта

У смарт-контрактов в сети TON есть две основных функции:

-   Первый, `recv_external()` эта функция выполняется когда запрос к контракту происходит из внешнего мира, то есть не из TON. Например, когда вы из приложения обращаетесь к смарт-контракту кошелька чтобы перевести другу Toncoin, это обращение происходит как раз через `recv_external()`.
-   Второй, `recv_internal()` эта функция выполняется когда обращение к контракту происходит непосредственно внутри блокчейна. Например когда какой-либо контракт обращается к нашему.

Под наши условия подходит `recv_internal()`

В файле `counter.fc` уже есть объявленная функция без кода:

```func
() recv_internal(int my_balance, int msg_value, cell in_msg_full, slice in_msg_body) impure {
    ;; здесь будет код
}
```

> ;; две точки с запятой синтаксис однострочного комментария

Функция принимает числа с балансом контракта, суммой входящего сообщения, ячейкой с исходным сообщением и слайс in_msg_body, в котором хранится только тело принимаемого сообщения. Также мы используем ключевое слово impure.

`impure` — ключевое слово, которое указывает компилятору на то, что нельзя вырезать её выполнение при оптимизациях.

Например, мы должны указать `impure` спецификатор, если функция может изменять хранилище контрактов, отправлять сообщения или генерировать исключения.

Важно: Если не указано impure и результат вызова функции не используется, то компилятор FunC может свободно удалить этот вызов функции.

А вот чтобы понять, что такое слайс и ячейка, поговорим про типы данных в TON.

##### Типы cell, slice, builder, integer в FunC

В нашем простом смарт-контракте мы будем использовать всего лишь четыре типа:

-   Cell - Ячейка TVM, состоящая из 1023 бит данных и до 4 ссылок на другие ячейки. Наличие ссылок формирует так называемое "дерево ячеек".
-   Slice - Частичное представление ячейки TVM, используемой для прочтения данных из ячейки.
-   Builder - Частично построенная ячейка, содержащая до 1023 бит данных и до четырех ссылок. В такой тип ячейки мы можем только записывать новые данные, чтобы потом перевести её в обычный Cell.
-   Integer - знаковое 257-битное целое число.

Подробнее о типах в FunC можно почитать [в документации](https://docs.ton.org/develop/func/types).

Говоря простым языком, cell - это запечатанная ячейка, slice - это ячейка, из которой можно читать данные, а builder - это ячейка, в которую можно писать данные.

## Читаем Integer из тела сообщения

Чтобы прочитать из полученного слайса с телом сообщения Integer добавим следуюший код:
`int n = in_msg_body~load_uint(32);`

Функция `recv_internal()` теперь выглядит так:

```func
() recv_internal(int my_balance, int msg_value, cell in_msg_full, slice in_msg_body) impure {
    int n = in_msg_body~load_uint(32);
}
```

`load_uint` функция из [стандартной библиотеки FunC](https://docs.ton.org/develop/func/stdlib/) она читает и возвращает целое беззнаковое число с заданным размером из слайса.

## Данные смарт-контракта

Чтобы добавить полученную переменную к `total` и сохранить значение в смарт-контракте, рассмотрим как реализован функционал хранения постоянных данных/хранилища в TON.

> Примечание: не путайте с TON Storage, хранилище в предыдущем предложении удобная аналогия.

Виртуальная машина TVM является стековой, но помимо стека в ней присутствуют специальные "регистры", которые хранят, например, код смарт-контракта, глобальный конфиг блокчейна, а также данные смарт-контракта.

Для хранения постоянных данных отведен регистр `с4` с типом Cell.

Подробнее с регистрами можно ознакомиться [в документации](https://docs.ton.org/learn/tvm-instructions/tvm-overview#control-registers).

##### Возьмем данные из с4

Для того чтобы "достать" данные из с4 нам понадобятся две функции из [стандартной библиотеки FunC](https://docs.ton.org/develop/func/stdlib/).

А именно:
`get_data` - берет ячейку из регистра c4.
`begin_parse` - ячейку преобразует в slice.

Создадим переменную `ds`, в которую и положим полученный слайс.

`slice ds = get_data().begin_parse();`

А также прочитаем из этого слайса в числовую переменную `total` число размером 64 бит для суммирования в соответствии с нашей задачей. (С помощью уже знакомой нам функции `load_uint`)

`int total = ds~load_uint(64);`

Теперь наша функция будет выглядеть так:

```func
() recv_internal(int my_balance, int msg_value, cell in_msg_full, slice in_msg_body) impure {
    int n = in_msg_body~load_uint(32);

    slice ds = get_data().begin_parse();
    int total = ds~load_uint(64);
}
```

##### Cуммируем

Для суммирования будем использовать операцию суммирования `+`, а также присвоение `=`.

```func
() recv_internal(int my_balance, int msg_value, cell in_msg_full, slice in_msg_body) impure {
    int n = in_msg_body~load_uint(32);

    slice ds = get_data().begin_parse();
    int total = ds~load_uint(64);

    total += n;
}
```

> Как и во многих других языках программирования, в FunC можно объединить операции `+` и `=` в `+=`. То же самое и для `-=`, `/=`, `*=`.

##### Cохраняем значение

Для того чтобы сохранить значение `total` в постоянные данные контракта, нам необходимо выполнить четыре действия:

-   Создать Builder для будущей ячейки данных
-   Записать в этот билдер значение
-   Преобразовать билдер в ячейку
-   Записать полученную ячейку в регистр c4

Делать это мы будем опять же с помощью функций [стандартной библиотеки FunC](https://docs.ton.org/develop/func/stdlib/).

`set_data(begin_cell().store_uint(total, 64).end_cell());`

`begin_cell()` - создаст Builder для будущей ячейки
`store_uint()`- запишет значение total
`end_cell()`- создать Cell из билдера
`set_data()` - запишет ячейку в регистр с4

Итог:

```func
() recv_internal(int my_balance, int msg_value, cell in_msg_full, slice in_msg_body) impure {
    int n = in_msg_body~load_uint(32);

    slice ds = get_data().begin_parse();
    int total = ds~load_uint(64);

    total += n;

    set_data(begin_cell().store_uint(total, 64).end_cell());
}
```

## Генерация исключений

Все что осталось сделать в нашей `recv_internal()` функции это добавить вызов исключения, если в теле полученного сообщения недостаточно бит для 32-битного числа.

Для этого будем использовать [встроенные](https://docs.ton.org/develop/func/builtins) исключения.

Исключения могут быть вызваны условными примитивами `throw_if` и `throw_unless` и безусловным `throw`.

Воспользуемся `throw_if` и передадим любой код ошибки. Для того, чтобы взять битность используем `slice_bits()`.

```func
throw_if(35,in_msg_body.slice_bits() < 32);
```

Кстати, в TVM (виртуальная машина TON), есть стандартные коды исключений, они нам очень понадобятся в тестах. Посмотреть можно [здесь](https://docs.ton.org/learn/tvm-instructions/tvm-exit-codes).

Вставим в начало функции:

```func
() recv_internal(int my_balance, int msg_value, cell in_msg_full, slice in_msg_body) impure {
    throw_if(35,in_msg_body.slice_bits() < 32);

    int n = in_msg_body~load_uint(32);

    slice ds = get_data().begin_parse();
    int total = ds~load_uint(64);

    total += n;

    set_data(begin_cell().store_uint(total, 64).end_cell());
}
```

## Пишем Get функцию

Любая функция в FunC соответствует следующему паттерну:

`[<forall declarator>] <return_type><function_name(<comma_separated_function_args>) <specifiers>`

Напишем функцию `get_total()` возвращающую Integer и имеющую спецификатор method_id (об этом чуть позже).

```func
int get_total() method_id {
    ;; здесь будет код
}
```

##### method_id

Спецификация `method_id` позволяет вызывать функцию по её названию. Для гет-методов это обязательно.

##### Берем данные из с4

Для того, что функция возвращала `total` хранящееся в контракте, нам надо взять данные из регистра, что мы уже делали:

```func
int get_total() method_id {
    slice ds = get_data().begin_parse();
    int total = ds~load_uint(64);

    return total;
}
```

## Весь код нашего смарт-контракта

```func
#include "imports/stdlib.fc";

() recv_internal(int my_balance, int msg_value, cell in_msg_full, slice in_msg_body) impure {
    throw_if(35,in_msg_body.slice_bits() < 32);

    int n = in_msg_body~load_uint(32);

    slice ds = get_data().begin_parse();
    int total = ds~load_uint(64);

    total += n;

    set_data(begin_cell().store_uint(total, 64).end_cell());
}

int get_total() method_id {
    slice ds = get_data().begin_parse();
    int total = ds~load_uint(64);

    return total;
}
```

## Пишем обёртку для контракта на Typescript

Мы хотим иметь возможность взаимодействовать с нашим смарт-контрактом. Для этого напишем так называемую обёртку на языке Typescript (типизированный Javascript).

Перейдите в директорию wrappers проекта и откройте файл Counter.ts. Большая часть обёртки уже присутствует по умолчанию. Сейчас нам нужно лишь дополнить ту часть, где задаются данные контракта для деплоя и добавить две функции для взаимодействия: отправка чисел контратку и вызов гет-метода get_total().

### Устанавливаем данные для деплоя

Эти строчки отвечают за то, что мы хотим устанавливать в данные контракта (ячейка c4):

```ts
export type CounterConfig = {};

export function counterConfigToCell(config: CounterConfig): Cell {
    return beginCell().endCell();
}
```

`CounterConfig` это объект, в который при необходимости мы можем добавить значения, которыми будет инициализироваться контракт.
`counterConfigToCell` это функция, которая преобразовывает тот самый объект в ячейку, которая готова к записи в данные контракта для деплоя.

В нашем случае в данных контракта должно лежать всего одно число длины 64 бита. CounterConfig нам не понадобится, а вот функцию обновить нужно.

Функция возвращает только одну ячейку, в которую мы записываем данные для деплоя контракта. Добавим туда запись числа 0 длиной 64 бита:

```ts
return beginCell().storeUint(0, 64).endCell();
```

Теперь при создании контракта, в его данных сразу будет лежать число 0.

### Метод для отправки сообщений с числами

Ниже в том же файле инициализируется класс Counter, в котором мы можем изменять старые и добавлять новые методы для взаимодействия с контрактом. По умолчанию там уже есть методы для инициализации контракта либо из конфига, либо из адреса уже задеплоенного контракта, а также готовый метод для деплоя.

Давайте добавим метод, с помощью которого мы сможем отправить контракту сообщение для увеличения числа total.

> Все методы обёртки, которые отправляют сообщения, должны иметь префикс `send` в начале.
> Все методы обёртки, которые вызывают гет-методы, должны иметь префикс `get` в начале.

Для удобства можем скопировать метод sendDeploy, переименовать его в sendNumber и потом уже изменить только то, что будет нужно.

```ts
async sendNumber(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
        value,
        sendMode: SendMode.PAY_GAS_SEPARATELY,
        body: beginCell().endCell(),
    });
}
```

Этот метод принимает объекты provider и via, которые определяют, куда и от кого нужно отправить сообщение соответственно. Также передаётся число value, которое означает, сколько Toncoin мы хотим прикрепить к отправляемому сообщению.

В теле метода вызывается функция provider.internal(), которая отправляет сообщение на наш контракт. Она принимает объект via, который мы получили ранее, а также параметры отправляемого сообщения. Эти параметры нам и нужно сейчас изменить.

Как мы помним, наш смарт-контракт ожидает от получаемого сообщения лишь одно число длиной 32 бита. Давайте добавим аргумент для нашего метода и изменим параметр body:

```ts
async sendNumber(provider: ContractProvider, via: Sender, value: bigint, number: bigint) {
    await provider.internal(via, {
        value,
        sendMode: SendMode.PAY_GAS_SEPARATELY,
        body: beginCell().storeUint(number, 32).endCell(),
    });
}
```

Лучше всегда использовать тип bigint для чисел в обёртках смарт-контрактов, так как он поддерживает очень большие числа и является более точным, чем number.

### Метод для вызова get_total

Добавим метод, который будет вызывать get_total у нашего контракта:

```ts
async getTotal(provider: ContractProvider) {
    // тут будет код
}
```

Он уже не должен принимать параметры via и value, так как при вызове гет-методов никаких сообщений контракту не посылается.

Добавим вызов get_total. Для этого используем функцию `provider.get`, которая принимает два параметра: название гет-метода и аргументы, которые в него следует передать. В нашем случае название это "get_total", а список аргументов пустой.

```ts
const result = (await provider.get('get_total', [])).stack;
```

Теперь вернём из нашей функции `getTotal` полученное в результате число:

```ts
return result.readBigNumber();
```

### Весь код обёртки

```ts
import {
    Address,
    beginCell,
    Cell,
    Contract,
    contractAddress,
    ContractProvider,
    Sender,
    SendMode,
} from 'ton-core';

export type CounterConfig = {};

export function counterConfigToCell(config: CounterConfig): Cell {
    return beginCell().storeUint(0, 64).endCell();
}

export class Counter implements Contract {
    constructor(
        readonly address: Address,
        readonly init?: { code: Cell; data: Cell }
    ) {}

    static createFromAddress(address: Address) {
        return new Counter(address);
    }

    static createFromConfig(config: CounterConfig, code: Cell, workchain = 0) {
        const data = counterConfigToCell(config);
        const init = { code, data };
        return new Counter(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendNumber(
        provider: ContractProvider,
        via: Sender,
        value: bigint,
        number: bigint
    ) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(number, 32).endCell(),
        });
    }

    async getTotal(provider: ContractProvider) {
        const result = (await provider.get('get_total', [])).stack;
        return result.readBigNumber();
    }
}
```

## Деплоим контракт в тестовую сеть

Для деплоя в тестовую сеть будем использовать интерфейс для командной строки [Blueprint](https://github.com/ton-community/blueprint/), который был установлен автоматически при создании проекта.

`npx blueprint run`

Далее следуем инструкциям. Выбираем тестовую сеть - testnet. Затем требуется способ авторизации кошелька, с которого будет производиться деплой. Можно подключить Tonkeeper или Tonhub, если выбрать первый пункт TON Connect.
В консоли появится QR-код, который нужно отсканировать из приложения вашего кошелька на телефоне. Если такой способ не устраивает, можете воспользоваться одним из других предложенных способов.

После успешного подключения кошелька, вероятно потребуется подтвердить отправку транзакции из приложения. Если вы всё сделали правильно, в консоли увидите сообщение о том, что контракт успешно задеплоен.

##### Что делать если пишет, что не хватает TON?

Необходимо получить их с тестового крана, бот для этого [@testgiver_ton_bot](https://t.me/testgiver_ton_bot).

Чтобы проверить пришли ли TON на ваш кошелек в тестовой сети, можете использовать вот этот explorer: https://testnet.tonscan.org/

> Важно: Речь идет только о тестовой сети

## Проверяем контракт

##### Вызов recv_internal()

Для вызова recv_internal() необходимо послать сообщение внутри сети TON. Для этого мы создали метод `sendNumber` в обёртке.
Чтобы воспользоваться этим методом и отправить сообщение с кошелька, напишем небольшой скрипт на Typescript, который будет отправлять сообщение в наш контракт, используя обёртку.

##### Скрипт сообщения

Создадим в папке scripts файл `sendNumber.ts` и напишем в нем следующий код (большую часть которого можно скопировать из файла deployCounter.ts той же папки):

```ts
import { toNano } from 'ton-core';
import { Counter } from '../wrappers/Counter';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const counter = provider.open(
        Counter.createFromConfig({}, await compile('Counter'))
    );

    // тут будет код
}
```

Этот код объявляет единственную функцию `run`, в которой мы можем взаимодействовать с нашим смарт-контрактом. Для этого создаётся объект `counter` класса-обёртки, который мы писали выше в этом уроке.
Теперь добавим в функцию вызов метода `sendNumber`:

```ts
await counter.sendNumber(provider.sender(), toNano('0.01'), 123n);
```

Чтобы запустить скрипт, снова исполните команду `npx blueprint run` в консоли, но в этот раз, выберите нужный скрипт - то есть `sendNumber`. Скорее всего кошелёк уже будет подключен с момента деплоя, поэтому снова авторизацию проходить не понадобится.

Если вы видите в консоли надпись "**Sent transaction**", то наше сообщение контракту отправилось. Теперь давайте проверим, обновилось ли число в данных контракта с помощью метода `getTotal`.

#### Скрипт гет-метода

Создадим ещё один файл в директории scripts, например `getTotal.ts` и снова скопируем тот же код в него, но в этот раз воспользуемся нашим методом getTotal() из обёртки.

```ts
import { toNano } from 'ton-core';
import { Counter } from '../wrappers/Counter';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const counter = provider.open(
        Counter.createFromConfig({}, await compile('Counter'))
    );

    console.log('Total:', await counter.getTotal());
}
```

Аналогично запустим скрипт с помощью команды `npx blueprint run` и после выполнения вы должны увидеть в консоли надпись "**Total: 123n**".

## Поздравляю вы дошли до конца

##### Задание

Как вы могли заметить мы не протестировали работу исключений. Модифицируйте сообщение в обёртке таким образом чтобы смарт-контракт это сделал.
