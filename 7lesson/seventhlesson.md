# Урок 7 Hashmap или Словарь

## Введение

В этом уроке мы напишем смарт-контракт, который умеет производить разные операции с Hashmap - словарем, в тестовой сети The Open Network на языке FUNC, задеплоим его в тестовую сеть с помощью [Blueprint](https://github.com/ton-community/blueprint), а протестируем его уже в следующем уроке.

## Требования

Для прохождения данного урока вам достаточно установить [Node.js](https://nodejs.org). Желательно устанавливать одну из последних версий, например 18.

А также уметь создавать/деплоить проект с помощью Blueprint, научиться этому можно в [первом уроке](https://github.com/romanovichim/TonFunClessons_ru/blob/main/1lesson/firstlesson.md).

## Hashmap or dictionaries (словари)

Hashmap - это структура данных представленная деревом. Hashmap - отображает ключи, в значения произвольного типа, таким образом, чтобы был возможен быстрый поиск и модификация. Подробнее в [пункте 3.3](https://ton.org/tvm.pdf). В FunC hashmaps [представлены ячейкой](https://docs.ton.org/develop/func/stdlib/#dictionaries-primitives).

## Смарт-контракт

Задача смарт-контракта будет добавлять и удалять данные и key/value хранилища Hashmap в частности следующая функциональность\*\*:

-   Смарт-контракт при получении сообщения со структурой описанной ниже контракт должен добавить к своим данным новую запись типа ключ/значение:
    -   32-bit unsigined `op` равный 1
        -   64-bit unsigned `query_id`
        -   256-bit unsigned key
        -   64-bit `valid_until` unixtime
        -   оставшийся слайс значение
-   Сообщение об удалении устаревших данных имеет следующую структуру: - 32-bit unsigined `op` equal to 2 - 64-bit unsigned `query_id`
    При получении такого сообщения контракт должен удалить из своих данных все устаревшие записи (с `valid_until` < now()). А так же проверить, что в сообщение нет лишних данных кроме 32-bit unsigined `op` и 64-bit unsigned `query_id`
-   Для всех других внутренних сообщений должна быть выдана ошибка
-   Должен быть реализован Get-метод `get_key` который принимает 256-битный ключ без знака и должен возвращать целое число `valid_until` и значение слайса данных для этого ключа. Если для этого ключа нет записи, должна быть выдана ошибка.
-   Важно! мы предполагаем, что контракт начинает работу с пустым хранилищем.

\*\* идеи для смарт контрактов я решил брать из задач [FunC contest1](https://github.com/ton-blockchain/func-contest1), так как они очень хорошо подходят для ознакомления с разработкой смарт-контрактов для TON.

## Внешний метод

## Структура внешнего метода

Для того, чтобы наша прокси могла принимать сообщения будем использовать внешний метод`recv_internal()`

    () recv_internal()  {

    }

##### Аргументы внешнего метода

В соответствии с документацией [виртуальной машины TON - TVM](https://ton.org/tvm.pdf), когда на счете в одной из цепочек TON происходит какое-то событие, оно вызывает транзакцию.

Каждая транзакция состоит из до 5 этапов. Подробнее [здесь](https://docs.ton.org/learn/tvm-instructions/tvm-overview#transactions-and-phases).

Нас интересует **Compute phase**. А если быть конкретнее, что "в стеке" при инициализации. Для обычных транзакций, вызванных сообщением, начальное состояние стека выглядит следующим [образом](https://docs.ton.org/learn/tvm-instructions/tvm-initialization):

5 элементов:

-   Баланс смарт-контракта(в наноТонах)
-   Баланс входящего сообщения (в наноТонах)
-   Ячейка с входящим сообщеним
-   Тело входящего сообщения, тип слайс
-   Селектор функции (для recv_internal это 0)

По итогу получаем следующий код:

    () recv_internal(int balance, int msg_value, cell in_msg_full, slice in_msg_body)  {

    }

##### Берем данные из тела сообщения

По условию в зависимости от `op` контракт должен работать по-разному. Поэтому вычитаем `op` и `query_id` из тела сообщения.

    () recv_internal(int balance, int msg_value, cell in_msg_full, slice in_msg_body) {
    	int op = in_msg_body~load_uint(32);
    	int query_id = in_msg_body~load_uint(64);
     }

Подробнее про `op` и `query_id` можно почитать в [пятом уроке](https://github.com/romanovichim/TonFunClessons_ru/blob/main/5lesson/fifthlesson.md).

Также используя условные операторы выстраиваем логику вокруг `op` .

    () recv_internal(int balance, int msg_value, cell in_msg_full, slice in_msg_body) {
    	int op = in_msg_body~load_uint(32);
    	int query_id = in_msg_body~load_uint(64);

    	if (op == 1) {
    	;; здесь будем добавлять новые значения
    	}
    	if (op == 2) {
    	;; здесь удалять
    	}
     }

По заданию для всех других внутренних сообщений должна быть выдана ошибка, поэтому добавим исключение после условных операторов.

    () recv_internal(int balance, int msg_value, cell in_msg_full, slice in_msg_body) {
    	int op = in_msg_body~load_uint(32);
    	int query_id = in_msg_body~load_uint(64);

    	if (op == 1) {
    	;; здесь будем добавлять новые значения
    	}
    	if (op == 2) {
    	;; здесь удалять
    	}
    	throw (1001);
     }

Теперь надо взять данные и регистра `c4` .Для того чтобы "достать" данные из с4 нам понадобятся две функции из [стандартной библиотеки FunC ](https://docs.ton.org/develop/func/stdlib/) .

А именно:
`get_data` - берет ячейку из c4 регистра.
`begin_parse` - ячейку преобразует в slice

Передадим это значение в слайс ds

    cell data = get_data();
    slice ds = data.begin_parse();

важно учесть замечание в задании, что контракт будет начинать работу с пустым `c4`. Поэтому, чтобы взять эти переменные из `c4` воспользуемся условным оператором, синтаксис следующий:

    <condition> ? <consequence> : <alternative>

Выглядеть это будет так:

    cell dic = ds.slice_bits() == 0 ? new_dict() : data;

Здесь используются следующие функции из стандартной библиотеки FunC:

-   `slice_bits()` - возвращает количество битов данных в слайсе, проверяем пустой c4 или нет
-   `new_dict() ` - создает пустой словарь, который на самом деле является нулевым значением. Частный случай null().

Итого каркас контракта следующий:

    #include "imports/stdlib.fc";

    () recv_internal(int balance, int msg_value, cell in_msg_full, slice in_msg_body) {
    	int op = in_msg_body~load_uint(32);
    	int query_id = in_msg_body~load_uint(64);

    	cell data = get_data();
    	slice ds = data.begin_parse();
    	cell dic = ds.slice_bits() == 0 ? new_dict() : data;
    	if (op == 1) {
    	;; здесь будем добавлять новые значения
    	}
    	if (op == 2) {
    	;; здесь удалять
    	}
    	throw (1001);
     }

# op = 1

При `op` равному одному мы добавляем значение в hashmap. Соответственно по заданию нам надо:

-   достать ключ из тела сообщения
-   установить значение в hashmap(словарь) используя ключ и тело сообщения
-   сохранить hashmap(словарь)
-   завершает выполнение функции, чтобы мы не попали на исключение объявленное в конце recv_internal()

##### Достаем ключ

Здесь все как и раньше, используем `load_uint` функцию из [стандартной библиотеки FunC ](https://docs.ton.org/develop/func/stdlib/) она загружает целое число n-бит без знака из слайса.

    	if (op == 1) {
    		int key = in_msg_body~load_uint(256);
    	}

##### Работаем с hashmap

Для добавления данных воспользуемся `dict_set` , которая устанавливает значение, связанное с индексом ключа key n битность в словаре dict, в слайс и возвращает результирующий словарь.

    if (op == 1) { ;; add new entry
    	int key = in_msg_body~load_uint(256);
    	dic~udict_set(256, key, in_msg_body);

    }

##### Сохраняем словарь

С помощью функции `set_data()` - запишем ячейку с hashmap в регистр с4.

    if (op == 1) { ;; add new entry
    	int key = in_msg_body~load_uint(256);
    	dic~udict_set(256, key, in_msg_body);
    	set_data(dic);

    }

##### Завершаем выполнение функции

Здесь все просто, оператор `return` нам в помощь.

    if (op == 1) { ;; add new entry
    	int key = in_msg_body~load_uint(256);
    	dic~udict_set(256, key, in_msg_body);
    	set_data(dic);
    	return ();
    }

# op = 2

Здесь наша задача удалить из своих данных все устаревшие записи (с `valid_until` < `now()`). Для того, чтобы "пройти" по hashmap будем использовать цикл. В FunC есть три [цикла](https://docs.ton.org/develop/func/statements#loops): `repeat`,`until`,`while`.

Так как мы уже вычитали `op` и `query_id`, проверим здесь, что в слайсе in_msg_body ничего нет с помощью `end_parse()`

`end_parse()` - Проверяет, является ли слайс пустым. Если нет, выдает исключение

    if (op == 2) {
    	in_msg_body.end_parse();
    }

Для нашего случая воспользуемся циклом: `until`.

    if (op == 2) {
    	do {

    	} until ();
    }

Чтобы на каждом шаге проверять условие `valid_until` < `now())`, нам необходимо получать некий минимальный ключ нашего hashmap. Для этого в [стандартной библиотеке FunC](https://docs.ton.org/develop/func/stdlib/#dict_set) есть функция `udict_get_next?`.

`udict_get_next? ` - вычисляет минимальный ключ k в dict словаря, который больше, чем некоторое заданное значение, и возвращает k, связанное значение и флаг, указывающий на успех. Если словарь пуст, возвращает (null, null, 0).

Соответственно зададим перед циклом значение от, которого будем брать минимальный ключ, а в самом цикле будем использовать флаг, указывающий на успех.

    if (op == 2) {
    	int key = -1;
    	do {
    		(key, slice cs, int f) = dic.udict_get_next?(256, key);

    	} until (~ f);
    }

Теперь с помощью условного оператора , будем проверять условие `valid_until` < `now())`. Значение `valid_until` вычитаем из `slice cs`.

    if (op == 2) {
    	int key = -1;
    	do {
    		(key, slice cs, int f) = dic.udict_get_next?(256, key);
    		if (f) {
    			int valid_until = cs~load_uint(64);
    			if (valid_until < now()) {
    					;; здесь будем удалять
    			}
    		}
    	} until (~ f);
    }

Удалять из hashmap будем используя `udict_delete?`.

`udict_delete?` - удаляет индекс с ключом k из словаря dict. Если ключ присутствует, возвращает модифицированный словарь (hashmap) и флаг успеха -1. В противном случае возвращает исходный словарь dict и 0.

Получаем:

    if (op == 2) {
    	int key = -1;
    	do {
    		(key, slice cs, int f) = dic.udict_get_next?(256, key);
    		if (f) {
    			int valid_until = cs~load_uint(64);
    			if (valid_until < now()) {
    				dic~udict_delete?(256, key);
    			}
    		}
    	} until (~ f);

    }

##### Сохраняем словарь

Используя `dict_empty?` проверим стал ли пустым hashmap после наших манипуляций в цикле.

Если значения есть сохраняем в с4 наш hashmap. Если нет, то положим пустую ячейку с4, с помощью комбинации функций `begin_cell().end_cell()`

    if (dic.dict_empty?()) {
    		set_data(begin_cell().end_cell());
    	} else {
    		set_data(dic);
    	}

##### Завершаем выполнение функции

Здесь все просто, оператор `return` нам в помощь. Итоговый код `op`=2

    if (op == 2) {
    	int key = -1;
    	do {
    		(key, slice cs, int f) = dic.udict_get_next?(256, key);
    		if (f) {
    			int valid_until = cs~load_uint(64);
    			if (valid_until < now()) {
    				dic~udict_delete?(256, key);
    			}
    		}
    	} until (~ f);

    	if (dic.dict_empty?()) {
    		set_data(begin_cell().end_cell());
    	} else {
    		set_data(dic);
    	}

    	return ();
    }

## Get функция

Метод `get_key` по ключу должен вернуть `valid_until` и слайс с данными по этому ключу. Соответственно по заданию нам надо:

-   взять данные из с4
-   найти данные по ключу
-   вернуть ошибку если данных нет
-   вычитать `valid_until`
-   вернуть данные

##### Берем данные из c4

Для загрузки данных напишем отдельную функцию load_data(), которая будет проверить есть ли данные и возвращать либо пустой словарь `new_dict()` , либо данные из с4. Проверять будем с `slice_bits()` - которое возвращает количество битов данных в слайсе.

    cell load_data() {
    	cell data = get_data();
    	slice ds = data.begin_parse();
    	if (ds.slice_bits() == 0) {
    		return new_dict();
    	} else {
    		return data;
    	}
    }

Теперь вызовем функцию в get методе.

    (int, slice) get_key(int key) method_id {
    	cell dic = load_data();

    }

##### Ищем данные по ключу

Для поиска данных по ключу возьмем функцию `udict_get?` .

`udict_get?` - ищет индекс ключа в словаре dict . В случае успеха возвращает значение, найденное в виде слайса, вместе с флагом -1, указывающим на успех. В случае неудачи возвращает (null, 0).

Получим:

    (int, slice) get_key(int key) method_id {
    	cell dic = load_data();
    	(slice payload, int success) = dic.udict_get?(256, key);

    }

##### Возвращаем ошибку если данных нет

Функция `udict_get?` возвращает удобный флаг, который мы поместили в success.
Используя `throw_unless` вернем исключение.

    (int, slice) get_key(int key) method_id {
    	cell dic = load_data();
    	(slice payload, int success) = dic.udict_get?(256, key);
    	throw_unless(98, success);

    }

##### Вычитаем valid_until и вернем данные

Здесь все просто, из переменной `payload` вычитаем `valid_until` и вернем обе переменные.

    (int, slice) get_key(int key) method_id {
    	cell dic = load_data();
    	(slice payload, int success) = dic.udict_get?(256, key);
    	throw_unless(98, success);

    	int valid_until = payload~load_uint(64);
    	return (valid_until, payload);
    }

## Обёртка на TypeScript

Для удобного взаимодействия с нашим смарт контрактом, напишем обёртку на TypeScript. База для неё уже предоставляется от Blueprint.

### Конфиг данных контракта

Откроем файл `wrappers/Hashmap.ts` (название файла может быть другим, смотря как вы создавали проект).
Конфиг данных остаётся пустым, как и задумано.

```ts
export type HashmapConfig = {};

export function hashmapConfigToCell(config: HashmapConfig): Cell {
    return beginCell().endCell();
}
```

Теперь перейдём к классу `Hashmap` чтобы добавить методы для вызова нужных нам операций.

### Метод для вызова op = 1

При вызове операции с кодом 1, в тело сообщения мы должны положить: op=1, query_id, ключ, valid_until и само значение. Назовём метод `sendSet`.

```ts
async sendSet(
    provider: ContractProvider,
    via: Sender,
    value: bigint,
    opts: {
        queryId: bigint;
        key: bigint;
        value: Slice;
        validUntil: bigint;
    }
) {
    await provider.internal(via, {
        value,
        sendMode: SendMode.PAY_GAS_SEPARATELY,
        body: beginCell()
            .storeUint(1, 32)
            .storeUint(opts.queryId, 64)
            .storeUint(opts.key, 256)
            .storeUint(opts.validUntil, 64)
            .storeSlice(opts.value)
            .endCell(),
    });
}
```

### Метод для вызова op = 2

Эта операция не требует дополнительных данных кроме op=2 и query_id. Назовём метод `sendClearOldValues`.

```ts
async sendClearOldValues(
    provider: ContractProvider,
    via: Sender,
    value: bigint,
    opts: {
        queryId: bigint;
    }
) {
    await provider.internal(via, {
        value,
        sendMode: SendMode.PAY_GAS_SEPARATELY,
        body: beginCell().storeUint(2, 32).storeUint(opts.queryId, 64).endCell(),
    });
}
```

### Метод для вызова геттера get_key

Этот метод будет немного сложнее чем тот, что мы уже писали в одном из первых уроков, потому что здесь должно возвращаться сразу два значения. Такой тип в TypeScript можно задать как массив `[bigint, Slice]`. А `Promise<>` нужен потому что функция асинхронная (ключевое слово `async` перед её названием).

Вызовем `provider.get` и стек результата положим в константу `result`. Затем оттуда мы можем читать полученные значения для возврата из функции. С первым значением всё просто - делаем `readBigNumber()` чтобы прочитать `bigint` (который в FunC был `int`). Но с вторым значением появляется проблема: в библиотеке не предусмотрен отдельный метод для считывания слайса (что-то вроде `readSlice()`). Поэтому придётся использовать `peek()` который считывает следующее значение, игнорируя его тип, и явно указать компилятору, что это `TupleItemSlice`, а затем получить из него само значение.

```ts
async getByKey(provider: ContractProvider, key: bigint): Promise<[bigint, Slice]> {
    const result = (await provider.get('get_key', [{ type: 'int', value: key }])).stack;
    return [result.readBigNumber(), (result.peek() as TupleItemSlice).cell.asSlice()];
}
```

## Заключение

Хотел сказать отдельное спасибо, тем кто донатит для поддержки проекта, это очень мотивирует и помогает выпускать уроки быстрее. Если вы хотите помочь проекту(быстрее выпускать уроки, перевести это все на английский итд), внизу на [главной странице](https://github.com/romanovichim/TonFunClessons_ru), есть адреса для донатов.
