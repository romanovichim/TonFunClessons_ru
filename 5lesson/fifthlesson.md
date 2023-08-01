# Урок 5 Запоминаем Адрес и идентифицируем операцию

## Введение

В этом уроке мы напишем смарт-контракт, который умеет производить разные операции в зависимости от флага, в блокчейне TON на языке FunC, а протестируем его уже в следующем уроке.

## Требования

Для прохождения данного урока вам достаточно установить [Node.js](https://nodejs.org). Желательно устанавливать одну из последних версий, например 18.

А также уметь создавать/деплоить проект с помощью Blueprint. Научиться этому можно в [первом уроке](https://github.com/romanovichim/TonFunClessons_ru/blob/main/1lesson/firstlesson.md).

## Op - для идентификации операции

Прежде чем рассматривать что за смарт-контракт мы будем делать в этом уроке, предлагаю изучить [рекомендации](https://docs.ton.org/develop/smart-contracts/guidelines/internal-messages) о теле сообщения смарт-контракта (`message body`).

Чтобы мы могли создавать подобие клиент-серверной архитектуры на смарт-контрактах, рекомендуется начинать каждое сообщение (строго говоря тело сообщения) с некоторого 32-битного флага `op`, который будет идентифицировать какую операцию должен выполнить смарт-контракт. Сам контракт в свою очередь, на основе значения этого флага, должен выполнить нужную операцию, и при необходимости отправить ответное сообщение, которое также будет включать в себя какой-то `op`.

В этом уроке мы будем делать смарт-контракт, который выполняет различные действия в зависимости от `op`.

## Смарт-контракт

Задача смарт-контракта будет запоминать адрес, устанавливаемый менеджером и сообщать его всем, кто запросит, в частности следующая функциональность\*\*:

-   когда контракт получает сообщение от Менеджера с `op` равным 1 за которым следует какой-то `query_id`, за которым следует `MsgAddress`, он должен сохранить полученный адрес в хранилище.
-   когда контракт получает внутреннее сообщение с любого адреса с `op`, равным 2, за которым следует `query_id`, он должен ответить отправителю сообщением с телом, содержащим:
    -   `op` равным 3
    -   тот же `query_id`
    -   Адрес менеджера
    -   Адрес, который был запомнен с момента последнего запроса менеджера (пустой адрес `addr_none`, если еще не было запроса менеджера)
    -   Значение TON, прикрепленное к сообщению за вычетом платы за обработку.
-   когда смарт-контракт получает любое другое сообщение, он должен выдать исключение.

\*\* идеи для смарт-контрактов я решил брать из задач [FunC contest1](https://github.com/ton-blockchain/func-contest1), так как они очень хорошо подходят для ознакомления с разработкой смарт-контрактов для TON.

## Структура смарт-контракта

##### Внешний метод

Для того, чтобы наша прокси могла принимать сообщения будем использовать внешний метод `recv_internal()`, как и в предыдущих уроках.

    () recv_internal(int balance, int msg_value, cell in_msg_full, slice in_msg_body)  {

    }

##### Внутри метода

Внутри метода мы из аргументов функции возьмем `op`, `query_id`, и адрес отправителя `sender_address`, а потом с помощью условных операторов построим логику вокруг `op`.

    () recv_internal (int balance, int msg_value, cell in_msg_full, slice in_msg_body) {
     ;; возьмем  op, query_id, и адрес отправителя sender_address

      if (op == 1) {
    	;; здесь будем сохранять адрес полученный от менеджера
      } elseif (op == 2) {
          ;; отправка сообщения
      } else {
          ;; здесь будет исключение
      }
    }

## Вспомогательные функции

Давайте подумаем, какую функциональность можно вынести в функции?

-   сравнение адресов, чтобы при op равному 1 проверить, что запрос пришел от Менеджера.
-   выгрузка и загрузка адреса менеджера и адреса, который мы сохраняем в постоянных данных контракта.
-   спарсить адрес отправителя из входящего сообщения.

##### Сравнение адресов

FunC поддерживает определение функции на ассемблере (имеется ввиду Fift). Происходит это следующим образом - мы определяем функцию как низкоуровневый примтив TVM. Для функции сравнения это будет выглядеть так:

    int equal_slices (slice a, slice b) asm "SDEQ";

Как вы можете видеть, используется ключевое слово `asm`

Посмотреть список возможных примитивов можно в [документации](https://docs.ton.org/learn/tvm-instructions/instructions).

##### Выгрузить адреса из постоянных данных

Хранить адреса мы будем в слайсах, но исходя из задачи хранить нам предстоит два адреса, адрес Менеджера, для проверки и адрес, который пришлет менеджер для хранения. Поэтому слайсы будем возвращать в кортеже.

Для того чтобы "достать" постоянные данные нам понадобятся две функции из [стандартной библиотеки FunC](https://docs.ton.org/develop/func/stdlib/).

А именно:
`get_data` - берет ячейку из постоянных данных.
`begin_parse` - ячейку преобразует в slice

Передадим это значение в переменную ds:

`var ds = get_data().begin_parse()`

Загрузим из сообщения адрес с помощью `load_msg_addr()` - которая загружает из слайса единственный префикс, который является допустимым MsgAddress. У нас их два, так что 'вычитаем' два раза.

`return (ds~load_msg_addr(), ds~load_msg_addr());`

Итого получим следующую функцию:

    (slice, slice) load_data () inline {
      var ds = get_data().begin_parse();
      return (ds~load_msg_addr(), ds~load_msg_addr());
    }

##### Inline

В прошлых уроках мы уже использовали спецификатор `inline`, который фактически подставляет код в каждом месте вызова функции. В этом уроке рассмотрим, зачем это необходимо с практической точки зрения.

Как мы знаем из [документации](https://docs.ton.org/develop/smart-contracts/fees) комиссия за транзакцию состоит из:

-   storage_fees - комиссия за место в блокчейне.
-   in_fwd_fees - комиссия за импорт сообщений(это случай когда обрабатываем `external` messages).
-   computation_fees - комиссии за выполнение инструкций TVM.
-   action_fees - комиссии, связанная с обработкой списка действий (например отправка сообщений).
-   out_fwd_fees - комиссия за импорт исходящих сообщений.

Подробнее [здесь](https://docs.ton.org/develop/smart-contracts/fees).
Собственно спецификатор `inline` позволяет сэкономить **computation_fee**.

По умолчанию, когда у вас есть функция funC, она получает свой собственный идентификатор, хранящийся в отдельном словаре id->function, и когда вы вызываете ее где-то в программе, происходит поиск функции в словаре и последующий переход.

Спецификатор же `inline` помещает тело функции прямо в код родительской функции.

Поэтому если функция используется только один или два раза, часто гораздо дешевле объявить эту функцию `inline`, то есть встроенной, так как переход к ссылке намного дешевле, чем поиск и переход по словарю.

##### Загрузить адреса в постоянные данные

Конечно же по мимо выгрузки нужна загрузка. Сделаем функцию, которая сохраняет адрес менеджера и адрес который менеджер отправит:

    () save_data (slice manager_address, slice memorized_address) impure inline {

    }

Замечу, что фукнция имеет [спецификатор](https://docs.ton.org/develop/func/functions#specifiers) `impure`. И мы должны указать `impure` спецификатор, если функция может изменять хранилище контракта. Иначе компилятор FunC может удалить этот вызов функции.

Для того чтобы "сохранить" постоянные данные нам понадобятся функции из [стандартной библиотеки FunC](https://docs.ton.org/develop/func/stdlib/).

А именно:

`begin_cell()` - создаст Builder для будущей ячейки
`store_slice()` - cохранит Slice(слайс) в Builder
`end_cell()` - создат Cell (ячейку)

`set_data()` - запишет ячейку в постоянные данные

Собираем ячейку:

    begin_cell().store_slice(manager_address).store_slice(memorized_address).end_cell()

Загружаем её в постоянные данные контракта:

    set_data(begin_cell().store_slice(manager_address).store_slice(memorized_address).end_cell());

Итого получим следующую функцию:

    () save_data (slice manager_address, slice memorized_address) impure inline {
    	  set_data(begin_cell().store_slice(manager_address).store_slice(memorized_address).end_cell());
    }

##### Парсим адрес отправителя из входящего сообщения

Объявим функцию, с помощью который мы сможем достать адрес отправителя из ячейки сообщения. Функция будет возвращать слайс, так как сам адрес мы будем брать с помощью `load_msg_addr()` - которая загружает из слайса единственный префикс, который является допустимым MsgAddress и возвращает его в слайс.

    slice parse_sender_address (cell in_msg_full) inline {
      return sender_address;
    }

Теперь используя уже знакомую нам `begin_parse` преобразуем ячейку в слайс.

    slice parse_sender_address (cell in_msg_full) inline {
      var cs = in_msg_full.begin_parse();
      return sender_address;
    }

Начинаем "вычитывать" ячейку с помощью `load_uint`, функции из [стандартной библиотеки FunC](https://docs.ton.org/develop/func/stdlib/) она загружает целое число n-бит без знака из слайса.

В данном уроке мы не будем останавливаться подробно на флагах, но подробнее можно прочитать [в документации](https://docs.ton.org/develop/smart-contracts/messages#message-layout).
Ну и наконец берем адрес.

Итого получим следующую функцию:

    slice parse_sender_address (cell in_msg_full) inline {
      var cs = in_msg_full.begin_parse();
      var flags = cs~load_uint(4);
      slice sender_address = cs~load_msg_addr();
      return sender_address;
    }

## Промежуточный итог

На данный момент у нас готовый вспомогательные функции и тело основной функции данного смарт-контракта `recv_internal()`.

    #include "imports/stdlib.fc";

    int equal_slices (slice a, slice b) asm "SDEQ";

    (slice, slice) load_data () inline {
      var ds = get_data().begin_parse();
      return (ds~load_msg_addr(), ds~load_msg_addr());
    }

    () save_data (slice manager_address, slice memorized_address) impure inline {
      set_data(begin_cell().store_slice(manager_address).store_slice(memorized_address).end_cell());
    }

    slice parse_sender_address (cell in_msg_full) inline {
      var cs = in_msg_full.begin_parse();
      var flags = cs~load_uint(4);
      slice sender_address = cs~load_msg_addr();
      return sender_address;
    }

    	() recv_internal (int balance, int msg_value, cell in_msg_full, slice in_msg_body) {
    	 ;; возьмем  op query_id, и адрес отправителя sender_address

    	  if (op == 1) {
    		;; здесь будем сохранять адрес полученный от менеджера
    	  } elseif (op == 2) {
    		;; отправка сообщения
    	  } else {
    		;; здесь будет исключение
    	  }
    	}

Осталось только наполнить `recv_internal()`.

## Наполняем внешний метод

##### Берем op query_id, и адрес отправителя sender_address

Из тела сообщения считываем op и query_id соответственно. По [рекомендациям](https://docs.ton.org/develop/smart-contracts/guidelines/internal-messages) это 32 и 64 битные значения.

А также с помощью функции `parse_sender_address()`, которую мы написали выше возьмем адрес отправителя.

    	() recv_internal (int balance, int msg_value, cell in_msg_full, slice in_msg_body) {
    	int op = in_msg_body~load_int(32);
    	int query_id = in_msg_body~load_uint(64);
    	var sender_address = parse_sender_address(in_msg_full);

    	  if (op == 1) {
    		;; здесь будем сохранять адрес полученный от менеджера
    	  } elseif (op == 2) {
    		;; отправка сообщения
    	  } else {
    		;; здесь будет исключение
    	  }
    	}

##### Флаг op == 1

В соответствии с заданием при флаге 1, мы должны получив адреса менеджера и сохраненный адрес, проверить что адрес отправителя равен адресу менеджера(только менеджер может менять адрес) и сохранить новый адрес, который храниться в теле сообщения.

Загрузим из постоянных данных адрес менеджера `manager_address` и сохраненный адрес `memorized_address)` используя функцию `load_data()` написанную ранее.

    (slice manager_address, slice memorized_address) = load_data();

Используя функцию `equal_slices` и унарный оператор `~`, который является побитовым не, проверяем равенство адрес, выдавая исключение если это адреса не равны.

    (slice manager_address, slice memorized_address) = load_data();
    throw_if(1001, ~ equal_slices(manager_address, sender_address));

Возьмем адрес, с помощью уже знакомой `load_msg_addr()` и сохраним адреса используя написанную ранее функцию `save_data()`.

    (slice manager_address, slice memorized_address) = load_data();
    throw_if(1001, ~ equal_slices(manager_address, sender_address));
    slice new_memorized_address = in_msg_body~load_msg_addr();
    save_data(manager_address, new_memorized_address);

##### Флаг op == 2

В соответствии с заданием при флаге 2 мы должны отправить сообщением с телом, содержащим:

-   `op` равна 3
-   тот же `query_id`
-   Адрес менеджера
-   Адрес, который был запомнен с момента последнего запроса менеджера (пустой адрес `addr_none`, если еще не было запроса менеджера)
-   Значение TON, прикрепленное к сообщению за вычетом платы за обработку.

Прежде чем отправлять сообщение загрузим адреса, хранящиеся в контракте.

     (slice manager_address, slice memorized_address) = load_data();

С полной структурой сообщения можно ознакомиться [здесь - message layout](https://docs.ton.org/develop/smart-contracts/messages#message-layout). Но обычно нам нет необходимости контролировать каждое поле, поэтому можно использовать краткую форму из [примера](https://docs.ton.org/develop/smart-contracts/messages):

    	 var msg = begin_cell()
    		.store_uint(0x18, 6)
    		.store_slice(addr)
    		.store_coins(amount)
    		.store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
    		.store_slice(message_body)
    	  .end_cell();

Полный разбор сообщений в TON есть в [третьем уроке](https://github.com/romanovichim/TonFunClessons_ru/blob/main/3lesson/thirdlesson.md).

Отправка сообщения в соответствии с условиями:

    (slice manager_address, slice memorized_address) = load_data();
      var msg = begin_cell()
              .store_uint(0x10, 6)
              .store_slice(sender_address)
              .store_grams(0)
              .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
              .store_uint(3, 32)
              .store_uint(query_id, 64)
              .store_slice(manager_address)
              .store_slice(memorized_address)
            .end_cell();
      send_raw_message(msg, 64);

##### Исключение

Здесь все просто используем обычный `throw` из [встроенных модулей FunC](https://docs.ton.org/develop/func/builtins#throwing-exceptions).

    throw(3);

##Полный код смарт-контракта

```func
#include "imports/stdlib.fc";

int equal_slices (slice a, slice b) asm "SDEQ";

(slice, slice) load_data () inline {
    var ds = get_data().begin_parse();
    return (ds~load_msg_addr(), ds~load_msg_addr());
}

() save_data (slice manager_address, slice memorized_address) impure inline {
    set_data(begin_cell().store_slice(manager_address).store_slice(memorized_address).end_cell());
}

slice parse_sender_address (cell in_msg_full) inline {
    var cs = in_msg_full.begin_parse();
    var flags = cs~load_uint(4);
    slice sender_address = cs~load_msg_addr();
    return sender_address;
}

() recv_internal (int balance, int msg_value, cell in_msg_full, slice in_msg_body) {
    int op = in_msg_body~load_int(32);
    int query_id = in_msg_body~load_uint(64);
    var sender_address = parse_sender_address(in_msg_full);

    if (op == 1) {
        (slice manager_address, slice memorized_address) = load_data();
        throw_if(1001, ~ equal_slices(manager_address, sender_address));
        slice new_memorized_address = in_msg_body~load_msg_addr();
        save_data(manager_address, new_memorized_address);
    } elseif (op == 2) {
        (slice manager_address, slice memorized_address) = load_data();
        var msg = begin_cell()
            .store_uint(0x10, 6)
            .store_slice(sender_address)
            .store_grams(0)
            .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
            .store_uint(3, 32)
            .store_uint(query_id, 64)
            .store_slice(manager_address)
            .store_slice(memorized_address)
        .end_cell();
        send_raw_message(msg, 64);
    } else {
        throw(3);
    }
}
```

## Обёртка на TypeScript

Для удобного взаимодействия с нашим смарт-контрактом, напишем обёртку на TypeScript. База для неё уже предоставляется от Blueprint.

### Конфиг данных контракта

Откроем файл `wrappers/AddressSaver.ts` (название файла может быть другим, смотря как вы создавали проект).
Начнём с изменений в конфиге данных. Наш контракт содержит в свои данных два значения - адрес менеджера и сохранённый адрес. Пусть сохранённый адрес по умолчанию будет пустым (пустой адрес можно записать как два нуля, то есть uint2 с значением 0). Добавим эти значения в конфиг:

```ts
export type AddressSaverConfig = {
    manager: Address;
};

export function addressSaverConfigToCell(config: AddressSaverConfig): Cell {
    return beginCell().storeAddress(config.manager).storeUint(0, 2).endCell();
}
```

Теперь перейдём к классу `AddressSaver` чтобы добавить методы для вызова нужных нам операций.

### Метод для вызова op = 1

При вызове операции с кодом 1, в тело сообщения мы должны положить: op=1, query_id, а также новый адрес, который мы хотим сохранить в контракте. Назовём метод `sendChangeAddress` (напомню, что методы, которые посылают сообщения на контракт, обязательно должны иметь префикс `send`).

```ts
async sendChangeAddress(provider: ContractProvider, via: Sender, value: bigint, queryId: bigint, newAddress: Address) {
    await provider.internal(via, {
        value,
        sendMode: SendMode.PAY_GAS_SEPARATELY,
        body: beginCell().storeUint(1, 32).storeUint(queryId, 64).storeAddress(newAddress).endCell(),
    });
}
```

### Метод для вызова op = 2

Эта операция не требует дополнительных данных кроме op=2 и query_id. Назовём метод `sendRequestAddress`.

```ts
async sendRequestAddress(provider: ContractProvider, via: Sender, value: bigint, queryId: bigint) {
    await provider.internal(via, {
        value,
        sendMode: SendMode.PAY_GAS_SEPARATELY,
        body: beginCell().storeUint(2, 32).storeUint(queryId, 64).endCell(),
    });
}
```

## Заключение

Тесты мы напишем в следующем уроке. Плюс хотел сказать отдельное спасибо, тем кто донатит TON для поддержки проекта, это очень мотивирует и помогает выпускать уроки быстрее.
