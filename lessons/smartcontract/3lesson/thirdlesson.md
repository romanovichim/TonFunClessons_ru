# Урок 3 Прокси смарт-контракт

## Введение

В этом уроке мы напишем прокси (пересылает все сообщения его владельцу) смарт-контракт в блокчейне TON на языке FunC, а протестируем его уже в следующем уроке.

## Требования

Для прохождения данного урока вам достаточно установить [Node.js](https://nodejs.org). Желательно устанавливать одну из последних версий, например 18.

А также уметь создавать/деплоить проект с помощью Blueprint. Научиться этому можно в [первом уроке](https://github.com/romanovichim/TonFunClessons_ru/blob/main/1lesson/firstlesson.md).

## Смарт-контракт

Смарт-контракт, который мы будем делать, должен обладать следующей функциональностью\*\*:

-   Пересылка всех сообщений поступающих в контракт владельцу
-   При пересылке сначала должен идти адрес отправителя, а потом тело оригинального сообщения
-   Значение Toncoin, прикрепленное к пересылаемому сообщению, должно быть равно значению входящего сообщения за вычетом комиссий
-   Адрес владельца хранится в хранилище смарт-контракта
-   При отправке сообщения в контракт от владельца пересылка не должна осуществляться

\*\* идеи для смарт-контрактов я решил брать из задач [FunC contest1](https://github.com/ton-blockchain/func-contest1), так как они очень хорошо подходят для ознакомления с разработкой смарт-контрактов для TON.

## Внешний метод

Для того, чтобы наш контракт могла принимать сообщения будем использовать функцию `recv_internal()`, которая уже будет находиться в файле с FunC кодом после создания проекта.

    () recv_internal(int balance, int msg_value, cell in_msg_full, slice in_msg_body)  {

    }

## Адрес отправителя

В соотвествии с заданием нам необходимо взять адрес оправителя. Брать адресс мы будем из ячейки с входящим сообщением `in_msg_full`. Код для этого действия вынесем в отдельную функцию.

    () recv_internal (int balance, int msg_value, cell in_msg_full, slice in_msg_body) {
      slice sender_address = parse_sender_address(in_msg_full);
    }

##### Пишем функцию

Напишем код функции `parse_sender_address`, которая из ячейки сообщения берет адрес отправителя и разберем его:

    slice parse_sender_address (cell in_msg_full) inline {
      var cs = in_msg_full.begin_parse();
      var flags = cs~load_uint(4);
      slice sender_address = cs~load_msg_addr();
      return sender_address;
    }

Как вы можете видеть функция имеет `inline` спецификатор, ее код фактически подставляется в каждом месте вызова функции. Данный спецификатор полезно использовать в случаях, когда функция вызывается только в одном единственном месте.

Чтобы мы могли взять адрес, нам необходимо преобразовать ячейку в слайс c помощью `begin_parse`:

    var cs = in_msg_full.begin_parse();

Теперь нам надо пропустить первые 4 бита в этом слайсе, отведённые на флаги сообщения. С помощью `load_uint` функции из [стандартной бибилотеки FunC](https://docs.ton.org/develop/func/stdlib/), которая загружает из слайса целое беззнаковое число размером N бит.

    var flags = cs~load_uint(4);

В данном уроке мы не будем останавливаться подробно на флагах, но подробнее можно прочитать [в документации](https://docs.ton.org/develop/smart-contracts/messages#message-layout).

Ну и наконец-то адрес. Используем `load_msg_addr()` - которая загружает из слайса префикс, который является допустимым `MsgAddress` (адресом).

    slice sender_address = cs~load_msg_addr();
    return sender_address;

## Адрес получателя

Адрес будем брать из данных контракта. Про это мы уже говорили в предыдущих уроках.

Будем использовать:
`get_data` - берет ячейку из данных контракта.
`begin_parse` - ячейку преобразует в slice.
`load_msg_addr()` - загружает из слайса префикс, который является допустимым `MsgAddress`.

По итогу получаем следующую функцию:

    slice load_data () inline {
      var ds = get_data().begin_parse();
      return ds~load_msg_addr();
    }

Остается её только вызвать:

    slice load_data () inline {
      var ds = get_data().begin_parse();
      return ds~load_msg_addr();
    }

    slice parse_sender_address (cell in_msg_full) inline {
      var cs = in_msg_full.begin_parse();
      var flags = cs~load_uint(4);
      slice sender_address = cs~load_msg_addr();
      return sender_address;
    }

    () recv_internal (int balance, int msg_value, cell in_msg_full, slice in_msg_body) {
      slice sender_address = parse_sender_address(in_msg_full);
      slice owner_address = load_data();
    }

## Проверим условие равенства адресов

По условию задачи, прокси не должна пересылать сообщение если оно исходит от владельца. Поэтому нам необходимо сравнить два адреса.

##### Функция Сравнения

Некоторые функции не объявлены в стандартной библиотеке, поэтому их приходится объявлять вручную, используя [TVM-инструкции](https://docs.ton.org/learn/tvm-instructions/instructions).

FunC поддерживает определение функции на ассемблере (имеется ввиду Fift). Происходит это следующим образом - мы определяем функцию как низкоуровневый примтив TVM. Для функции сравнения это будет выглядеть так:

    int equal_slices (slice a, slice b) asm "SDEQ";

Как вы можете видеть, используется ключевое слово `asm`.

##### Унарный оператор

Итак нашу функцию `equal_slices` мы будем использовать в `if`:

    () recv_internal (int balance, int msg_value, cell in_msg_full, slice in_msg_body) {
      slice sender_address = parse_sender_address(in_msg_full);
      slice owner_address = load_data();

      if  equal_slices(sender_address, owner_address) {

       }
    }

Но функция проверят именно равенство, как проверить неравенство? Здесь может помочь унарный оператор `~`, который являетя побитовым "не".

Теперь наш код выглядит так:

    int equal_slices (slice a, slice b) asm "SDEQ";

    slice load_data () inline {
      var ds = get_data().begin_parse();
      return ds~load_msg_addr();
    }

    slice parse_sender_address (cell in_msg_full) inline {
      var cs = in_msg_full.begin_parse();
      var flags = cs~load_uint(4);
      slice sender_address = cs~load_msg_addr();
      return sender_address;
    }

    () recv_internal (int balance, int msg_value, cell in_msg_full, slice in_msg_body) {
      slice sender_address = parse_sender_address(in_msg_full);
      slice owner_address = load_data();

      if ~ equal_slices(sender_address, owner_address) {

       }
    }

## Отправка сообщения

Итак, нам осталось наполнить тело условного оператора в соответствии с задачей, а именно отправить входящее сообщение.

##### Структура сообщения

С полной структурой сообщения можно ознакомиться [здесь](https://docs.ton.org/develop/smart-contracts/messages#message-layout). Но обычно нам нет необходимости контролировать каждое поле, поэтому можно использовать краткую форму из [примера](https://docs.ton.org/develop/smart-contracts/messages):

     var msg = begin_cell()
    	.store_uint(0x18, 6)
    	.store_slice(addr)
    	.store_coins(amount)
    	.store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
    	.store_slice(message_body)
      .end_cell();

Как вы можете видеть для построения сообщения используются функции [стандартной библиотеки FunC](https://docs.ton.org/develop/func/stdlib/). А именно фукнции примитивов Builder (частично построенных ячеек как вы можете помнить из первого урока). Рассмотрим:

`begin_cell()` - создаст Builder для будущей ячейки
`end_cell()` - создаст ячейку
`store_uint` - сохранит uint в Builder
`store_slice` - сохранит слайс в Builder
`store_coins`- здесь в документации имеется ввиду `store_grams` - используемой для записи количества Toncoin или других валют. Подробнее [здесь](https://docs.ton.org/develop/func/stdlib/#store_grams).

А также дополнительно рассмотрим `store_ref`, которая понадобится для отправки адреса.

`store_ref` - Сохраняет ссылку на ячейку в Builder

Теперь когда у нас есть вся необходимая информация, сооберем сообщение.

##### Последний штрих - тело входящего сообщения

Чтобы отправить в сообщении тело, которое пришло в `recv_internal`, соберем ячейку, а в самом сообщении сделаем на нее ссылку с помощью `store_ref`.

      if ~ equal_slices(sender_address, owner_address) {
        cell msg_body_cell = begin_cell().store_slice(in_msg_body).end_cell();
      }

##### Собираем сообщение

В соответствии с условием задачи мы должны отправить адрес и тело сообщения. А значит поменяем `.store_slice(message_body)` на `.store_slice(sender_address)` и `.store_ref(msg_body_cell)` в переменной _msg_. Получим:

      if ~ equal_slices(sender_address, owner_address) {
    	cell msg_body_cell = begin_cell().store_slice(in_msg_body).end_cell();

    	var msg = begin_cell()
            .store_uint(0x10, 6)
            .store_slice(owner_address)
            .store_grams(0)
            .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
            .store_slice(sender_address)
            .store_ref(msg_body_cell)
        .end_cell();
       }

Осталось только отправить наше сообщение.

##### Режим отправки сообщения (mode)

Для отправки сообщений используется `send_raw_message` из [стандартной библиотеки](https://docs.ton.org/develop/func/stdlib/#send_raw_message).

Переменную msg мы уже собрали, остается разобраться `mode`. Описание каждого режиме есть в [документации](https://docs.ton.org/develop/func/stdlib/#send_raw_message). Мы же рассмотрим на примере, чтобы было понятнее.

Пускай на балансе смарт-контракта 100 монет и мы получаем internal message c 60 моентами и отсылаем сообщение с 10, общий размер комиссий пусть будет для примера равен 3.

`mode = 0` - баланс 100+60-10 = **150** монет, отправим 10-3 = **7** монет
`mode = 1` - баланс 100+60-10-3 = **147** монет, отправим **10** монет
`mode = 64` - баланс 100-10 = **90** монет, отправим 60+10-3 = **67** монет
`mode = 65` - баланс 100-10-3 = **87** монет, отправим 60+10 = **70** монет
`mode = 128` - баланс **0** монет, отправим 100+60-3 = **157** монет

Режимы 1 и 65 описанные выше это `mode' = mode + 1`.

Так как по условию задачи, значение Toncoin, прикрепленное к сообщению, должно быть равно значению входящего сообщения за вычетом сборов, связанных с обработкой, нам подойдет режим `mode = 64` с `.store_grams(0)`. На примере получиться следующее:

Пусть на балансе смарт-контракта 100 монет и мы получаем internal message c 60 монетами и отсылаем сообщение с 0(так как `.store_grams(0)`) общий fee 3.

`mode = 64` - баланс (100 = 100 монет), отправим (60-3 = 57 монет)

Таким образом наш условный оператор будет выглядеть так:

       if ~ equal_slices(sender_address, owner_address) {
    	cell msg_body_cell = begin_cell().store_slice(in_msg_body).end_cell();

    	var msg = begin_cell()
    		  .store_uint(0x10, 6)
    		  .store_slice(owner_address)
    		  .store_grams(0)
    		  .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
    		  .store_slice(sender_address)
    		  .store_ref(msg_body_cell)
    		  .end_cell();
    	 send_raw_message(msg, 64);
       }

А полный код смарт-контракта:

    #include "imports/stdlib.fc";

    int equal_slices (slice a, slice b) asm "SDEQ";

    slice load_data () inline {
      var ds = get_data().begin_parse();
      return ds~load_msg_addr();
    }

    slice parse_sender_address (cell in_msg_full) inline {
      var cs = in_msg_full.begin_parse();
      var flags = cs~load_uint(4);
      slice sender_address = cs~load_msg_addr();
      return sender_address;
    }

    () recv_internal (int balance, int msg_value, cell in_msg_full, slice in_msg_body) {
      slice sender_address = parse_sender_address(in_msg_full);
      slice owner_address = load_data();

      if ~ equal_slices(sender_address, owner_address) {
    	cell msg_body_cell = begin_cell().store_slice(in_msg_body).end_cell();

    	var msg = begin_cell()
    		  .store_uint(0x10, 6)
    		  .store_slice(owner_address)
    		  .store_grams(0)
    		  .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
    		  .store_slice(sender_address)
    		  .store_ref(msg_body_cell)
    		  .end_cell();
    	 send_raw_message(msg, 64);
       }
    }

## Обёртка на TypeScript

Для удобного взаимодействия с нашим смарт-контрактом, напишем обёртку на TypeScript. База для неё уже предоставляется от Blueprint.

Откроем файл `wrappers/Proxy.ts` (название файла может быть другим, смотря как вы создавали проект).
Нам достаточно изменить лишь сборку ячейки данных контракта из конфига. Наш контракт содержит в свои данных единственное значение - адрес владельца. Добавим это значение в конфиг:

```ts
export type ProxyConfig = {
    owner: Address;
};

export function proxyConfigToCell(config: ProxyConfig): Cell {
    return beginCell().storeAddress(config.owner).endCell();
}
```

Отлично! Кроме данных нам ничего больше менять не нужно. смарт-контракт работает с любыми сообщениями и обёртку для них писать нам не надо.

## Заключение

В этом уроке мы с вами реализовали простой прокси-контракт на FunC. Его тестированием мы займёмся в следующем уроке!

В качестве домашнего задания попробуйте задеплоить смарт-контракт в реальную сеть TON (можно и в тестнет) через скрипт, как мы уже делали в первом уроке и потом отправьте на него простые переводы с разными суммами и комментариями из своего кошелька.
