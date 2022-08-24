# Урок 3 Прокси смарт-контракт
## Введение

В этом уроке мы напишем прокси(пересылает все сообщения его владельцу) смарт-контракт в тестовой сети The Open Network на языке FUNC, задеплоим его в тестовую сеть с помощью [toncli](https://github.com/disintar/toncli), а протестируем его уже в следующем уроке.

## Требования

Для прохождения данного урока вам необходимо установить интерфейс для командной строки [toncli](https://github.com/disintar/toncli/blob/master/INSTALLATION.md).

А также уметь создавать/деплоить проект с помощтю toncli, научиться этому можно в [первом уроке](https://github.com/romanovichim/TonFunClessons_ru/blob/main/1lesson/firstlesson.md).

## Смарт-контракт

Смарт-контракт, который мы будем делать, должен обладать следующей функциональностью**:
-  Пересылка всех сообщений поступающих в конракт владельцу;
- При пересылке сначала должен идти адрес  отправителя, а потом тело сообщения
- Значение Toncoin, прикрепленное к сообщению, должно быть равно значению входящего сообщения за вычетом сборов, связанных с обработкой (плата за вычисления и пересылку сообщения)
- Адрес владельца хранится в хранилище смарт-контракта
- При отправке сообщения в контракт от владельца пересылка не должна осуществляться

** идеи для смарт контрактов я решил брать из задач [FunC contest1](https://github.com/ton-blockchain/func-contest1), так как они очень хорошо подходят для ознакомления с разработкой смарт-контрактов для TON.

## Внешний метод

Для того, чтобы наша прокси могла принимать сообщения будем использовать внешний метод`recv_internal()`

    () recv_internal()  {

    }
	
##### Аругменты внешнего метода
Здесь возникает логичный вопрос - как понять какие аргументы должны быть у фукнции, чтобы она могла принимать сообщения в сети TON?

В соответствии с  документацией [виртуальной машины TON - TVM](https://ton-blockchain.github.io/docs/tvm.pdf), когда на счете в одной из цепочек TON происходит какое-то событие, оно вызывает транзакцию. 

Каждая транзакция состоит из до 5 этапов. Подробнее [здесь](https://ton.org/docs/#/smart-contracts/tvm_overview?id=transactions-and-phases).

Нас интересует **Compute phase**. А если быть конкретнее, что "в стеке" при инициализации. Для обычных транзакций, вызванных сообщением, начальное состояние стека выглядит следующим [образом](https://ton.org/docs/#/smart-contracts/tvm_overview?id=initialization-of-tvm):

5 элементов:
- Баланс смарт-контракта(в наноТонах)
- Баланс входящего сообщения (в наноТонах)
- Ячейка с входящим сообщеним 
- Тело входящего сообщения, тип слайс
- Селектор функции (для recv_internal это 0)

По итогу получаем следующий код:

    () recv_internal(int balance, int msg_value, cell in_msg_full, slice in_msg_body)  {

    }
	

## Адрес отправителя

В соотвествии с заданием нам необходимо взять адрес оправителя.  Брать адресс мы будем из ячейки с входящим сообщением `in_msg_full`. Код вынесем в отдельную функцию.

	() recv_internal (int balance, int msg_value, cell in_msg_full, slice in_msg_body) {
	  slice sender_address = parse_sender_address(in_msg_full);
	}

##### Пишем функцию

Напишем код функции parse_sender_address, которая из ячейки сообщения берет адрес отправителя  и разберем его:

	slice parse_sender_address (cell in_msg_full) inline {
	  var cs = in_msg_full.begin_parse();
	  var flags = cs~load_uint(4);
	  slice sender_address = cs~load_msg_addr();
	  return sender_address;
	}
	
Как вы можете видеть функция имеет `inline` спецификатор, ее код фактически подставляется в каждом месте вызова функции.

Чтобы мы могли взять адрес, нам необходимо преобразовать ячейку в слайс c помощью `begin_parse`:

	var cs = in_msg_full.begin_parse();

Теперь нам надо "вычитать" до адреса полученный slice. С помощью `load_uint` функции из [стандартной бибилотеки FunC ](https://ton.org/docs/#/func/stdlib) она загружает целое число n-бит без знака из слайса, "вычитаем" флаги.

	var flags = cs~load_uint(4);

В данном уроке мы не будем останавливаться подробно на флагах, но подробнее можно прочитать в пункте [3.1.7](https://ton-blockchain.github.io/docs/tblkch.pdf).

Ну и наконец-то адрес. Используем `load_msg_addr()` - которая загружает из слайса единственный префикс, который является допустимым MsgAddress.

	slice sender_address = cs~load_msg_addr();
	return sender_address;
	

## Адрес получателя

Адрес будем брать из [с4](https://ton-blockchain.github.io/docs/tvm.pdf) о которой мы уже говорили в предыдущих уроках. 

Будем использовать:
`get_data`   - берет ячейку из c4 регистра.
`begin_parse` -   ячейку преобразует в slice.
`load_msg_addr()` - которая загружает из слайса единственный префикс, который является допустимым MsgAddress.

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

По условию задачи,  прокси не должна пересылать сообщение если владелец контракта обращается к смарт-контракту проксе. Поэтому на необходимо сравнить два адреса.

##### Функция Сравнения 

FunC поддерживает определение функции на ассемблере(имеется ввиду Fift). Происходит это следующим образом - мы определяем функцию как низкоуровневый примтив TVM. Для функции сравнения это будет выглядеть так:

	int equal_slices (slice a, slice b) asm "SDEQ";

Как вы можете видеть, используется ключевое слово `asm` 

Посмотреть список возможных примитивов можно с 77 страницы в [TVM](https://ton-blockchain.github.io/docs/tvm.pdf).

##### Унарный оператор

Итак нашу функцию `equal_slices`  мы будем использовать в `if`:

	() recv_internal (int balance, int msg_value, cell in_msg_full, slice in_msg_body) {
	  slice sender_address = parse_sender_address(in_msg_full);
	  slice owner_address = load_data();

	  if  equal_slices(sender_address, owner_address) {

	   }
	}

Но функция проверят именно равенство, как проверить неравенство? Здесь может помочь унарный оператор `~`, который являетя побитовым не.

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
	
Осталось отправить сообщение.

## Отправка сообщения
Итак нам осталось наполнить тело условного оператора в соответствии с задачей, а именно отправить входящее сообщение. 

##### Структура сообщения 

С полной структурой сообщения можно ознакомиться [здесь - message layout](https://ton.org/docs/#/smart-contracts/messages?id=message-layout). Но обычно нам нет необходимости контролировать каждое поле, поэтому можно использовать краткую форму из [примера](https://ton.org/docs/#/smart-contracts/messages?id=sending-messages):

	 var msg = begin_cell()
		.store_uint(0x18, 6)
		.store_slice(addr)
		.store_coins(amount)
		.store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
		.store_slice(message_body)
	  .end_cell();

Как вы можете видеть для построения сообщения используются функции [стандартной библиотеки FunC](https://ton.org/docs/#/func/stdlib). А именно фукнции "обертки" примитивов Builder (частично построенных ячеек как вы можете помнить из первого урока). Рассмотрим:

 `begin_cell()`  - создаст Builder для будущей ячейки
 `end_cell()` - создаст Cell (ячейку)
 `store_uint` - сохранит uint в Builder
 `store_slice` - сохранит слайс в Builder
 `store_coins`- здесь в документации имеется ввиду  `store_grams` - используемой для хранения TonCoins. Подробнее [здесь]( https://ton.org/docs/#/func/stdlib?id=store_grams).
  
 А также дополнительно рассмотрим  `store_ref`, которая понадобиться для отправки адреса.
 
 `store_ref`  - Сохраняет ссылку на ячейку в Builder
 Теперь когда у нас есть вся необходимая информация сооберем сообщение.

##### Последний штрих - тело входящего сообщения

Чтобы отправить в сообщении тело сообщения, которое пришло в  `recv_internal`. соберем ячейку, а в самом сообщении сделаем на нее ссылку с помощью `store_ref`.

	  if ~ equal_slices(sender_address, owner_address) {
		cell msg_body_cell = begin_cell().store_slice(in_msg_body).end_cell();
	   }

##### Собираем сообщение

В соответствии с условием задачи мы должны отправить адрес и тело сообщения. А значит поменяем `.store_slice(message_body)` на   `.store_slice(sender_address)` и `.store_ref(msg_body_cell)` в переменной msg. Получим:

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

##### Режим отправки сообщения(mode)

Для отправки сообщений используется  `send_raw_message` из [стандартной библиотеки](https://ton.org/docs/#/func/stdlib?id=send_raw_message).

Переменную msg мы уже собрали, остается разобраться `mode`. Описание каждого режиме есть в [документации](https://ton.org/docs/#/func/stdlib?id=send_raw_message). Мы же рассмотрим на примере, чтобы было понятнее.

Пускай на балансе смарт-контракта 100 монет и мы получаем internal message c 60 моентами и отсылаем сообщение с 10, общий fee 3.

 `mode = 0`  - баланс (100+60-10 = 150 монет), отправим(10-3 = 7 монет)
 `mode = 1`  - баланс (100+60-10-3 = 147 монет), отправим(10 монет) 
 `mode = 64` - баланс (100-10 = 90 монет), отправим (60+10-3 = 67 монет)
 `mode = 65` - баланс (100-10-3=87 монет), отправим (60+10 = 70 монет)
 `mode = 128` -баланс (0 монет), отправим (100+60-3 = 157 монет)
 
 Режимы 1 и 65 описанные выше это mode' = mode + 1.
 
Так как по условию задачи,значение Toncoin, прикрепленное к сообщению, должно быть равно значению входящего сообщения за вычетом сборов, связанных с обработкой. Нам подойдет режим  `mode = 64` с  `.store_grams(0)`. На примере получиться следующее:

Пускай на балансе смарт-контракта 100 монет и мы получаем internal message c 60 моентами и отсылаем сообщение с 0(так как  `.store_grams(0)`) , общий fee 3.

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
	
	
## Заключение

Так сообщения и наша прокси функция являются   `internal` то "подергать" контракт через `toncli` не получиться - он работает с сообщениями внтури TON. Как тогда правильно разрабатывать подобные контракты - ответ с [тестов](https://ru.wikipedia.org/wiki/%D0%A0%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0_%D1%87%D0%B5%D1%80%D0%B5%D0%B7_%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5). Которые мы будем писать в следующем уроке.