# Урок 4 Тесты на FunC для прокси смарт-контракта
## Введение

В этом уроке мы напишем тесты для смарт-контракта созданного в третьем уроке в тестовой сети The Open Network на языке FUNC и  выполним их с помощью [toncli](https://github.com/disintar/toncli).

## Требования

Для прохождения данного урока вам необходимо установить интерфейс для командной строки [toncli](https://github.com/disintar/toncli/blob/master/INSTALLATION.md) и пройти [третий урок](https://github.com/romanovichim/TonFunClessons_ru/blob/main/3lesson/thirdlesson.md) .

##  Teсты для прокси смарт-контракта 

Для нашего прокси смарт-контракта мы напишем следующие тесты:

- test_same_addr() тестируем, что при отправке сообщения в контракт от владельца пересылка не должна осуществляться
- test_example_data() тестируем остальные условия [третьего урока](https://github.com/romanovichim/TonFunClessons_ru/blob/main/3lesson/thirdlesson.md)

## Структура тестов на FunC под toncli

Напомню, что для каждого теста на FunC под toncli надо написать две функции. Первая будет определять данные(в терминах TON правильней будет сказать состояние, но надеюсь что данные более понятная аналогия), которые мы будем отправлять во вторую для проведения тестов. 

Каждая тестовая функция должна указывать method_id. Тестовые функции method_id нужно запускать с 0.


##### Функция данных

Функция с данными не принимает никаких аргументов, но должна возвращать:
- function selector - id вызываемой функции в тестируемом контракте; 
- tuple - (стек) значения которые мы будем передавать в функцию выполнящую тесты;
- c4 cell - "постоянные данные" в управляющем регистре c4;
- c7 tuple  - "временные данные" в управляющем регистре с7;
- gas limit integer - лимит газа (для понимания концепции gas советую сначала почитать про это в [Ethereum](https://ethereum.org/en/developers/docs/gas/));

> Газ измеряет количество вычислительных усилий, необходимых для выполнения определенных операций в сети

Про регистры подробнее c4 и с7 [здесь](https://ton-blockchain.github.io/docs/tvm.pdf) в 1.3.1

##### Функция тестов

Функция тестов должна принимать следующие аргументы:

- exit code - код возврата виртуальной машины, чтобы мы могли понять ошибка или нет
- c4 cell - "постоянные данные" в управляющем регистре c4
- tuple - (стек) значения которые мы передаем от функции данных
- c5 cell - для проверки исходящих сообщений
- gas - газ, который был использован

[Коды возврата TVM](https://ton.org/docs/#/smart-contracts/tvm_exit_codes)

## Приступим к написанию тестов

Для тестов  в данном уроке нам будет необходима вспомогательная функция сравнения. Определим её как низкоуровневый примитив с помощью ключевого слова `asm`:

`int equal_slices (slice a, slice b) asm "SDEQ";`


## Тестируем вызов прокси контракта

Напишем первый тест `test_example_data()`  и разберем его код.

##### Функция данных

Начнем с функции данных:

	[int, tuple, cell, tuple, int] test_example_data() method_id(0) {
		int function_selector = 0;

		cell my_address = begin_cell()
					.store_uint(1, 2)
					.store_uint(5, 9) 
					.store_uint(7, 5)
					.end_cell();

		cell their_address = begin_cell()
					.store_uint(1, 2)
					.store_uint(5, 9) 
					.store_uint(8, 5) 
					.end_cell();

		slice message_body = begin_cell().store_uint(12345, 32).end_cell().begin_parse();

		cell message = begin_cell()
				.store_uint(0x6, 4)
				.store_slice(their_address.begin_parse()) 
				.store_slice(their_address.begin_parse()) 
				.store_grams(100)
				.store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
				.store_slice(message_body)
				.end_cell();

		tuple stack = unsafe_tuple([12345, 100, message, message_body]);

		return [function_selector, stack, my_address, get_c7(), null()];
	}

## Разбираем

`int function_selector = 0;`

Так как мы вызывам `recv_internal()`  мы присваиваем значение 0, почему именно 0? В Fift(а именно в него мы компилируем наши FunC скрипты) есть предопределенные идентификаторы, а именно:
- `main` и `recv_internal` имеют id = 0
- `recv_external` имеют id = -1
- `run_ticktock` имеют id = -2

Чтобы проверить отправку нам нужны адреса с которых мы будем отправлять сообщения, пускай в данном примере у нас будет наш адрес `my_address` и их адрес `their_address`. Возникает вопрос, как должен выглядять адрес, учитывая что его нужно задачать типами FunC. Обратимся к [TL-B схеме](https://github.com/ton-blockchain/ton/blob/master/crypto/block/block.tlb) , а конкретно к строке 100, там начинаются описания адресов.

	cell my_address = begin_cell()
				.store_uint(1, 2)
				.store_uint(5, 9) 
				.store_uint(7, 5)
				.end_cell();

`.store_uint(1, 2)` - 0x01 внешний адрес;

`.store_uint(5, 9)` - len равный 5;

`.store_uint(7, 5)` - и пускай наш адрес будет 7;

Для того, чтобы разобраться в TL-B и данном куске конкретно, сооветую изучить https://core.telegram.org/mtproto/TL .

Также сооберем еще один адрес, пускай он будет 8.

	cell their_address = begin_cell()
				.store_uint(1, 2)
				.store_uint(5, 9) 
				.store_uint(8, 5) 
				.end_cell();

Для сборки сообщения осталось собрать слайс тела сообшения, положим туда число 12345

	slice message_body = begin_cell().store_uint(12345, 32).end_cell().begin_parse();

Теперь осталось собрать само сообщение: 

	cell message = begin_cell()
			.store_uint(0x6, 4)
			.store_slice(their_address.begin_parse()) 
			.store_slice(their_address.begin_parse()) 
			.store_grams(100)
			.store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
			.store_slice(message_body)
			.end_cell();

Отмечу, что адреса мы собирали в ячейки, соответственно чтобы хранить их в сообщении с помощью `store_slice()` нужно использовать `begin_parse()`, которая превратит ячейку в слайс.

Как вы могли заметить и отправитель и получатель это один адрес, сделано это чтобы упростить тесты и не плодить большое количество адресов, так как по условию при отправке сообщения в контракт от  **только** владельца пересылка не должна осуществляться.

Теперь напомню, что должна возвращать функция:
- function selector - id вызываемой функции в тестируемом контракте; 
- tuple - (стек) значения которые мы будем передавать в функцию выполнящую тесты;
- c4 cell - "постоянные данные" в управляющем регистре c4;
- c7 tuple  - "временные данные" в управляющем регистре с7;
- gas limit integer 

Как вы могли заметить нам осталось собрать tuple и вернуть данные. В соответствии с сигнатурой recv_internal() нашего контракта положим туда следущие значения:

	tuple stack = unsafe_tuple([12345, 100, message, message_body]);

Отмечу что возвращать мы уже будем `my_address`, это необходимо для проверки условия совпадения адресов.

	return [function_selector, stack, my_address, get_c7(), null()];
		
Как можно видеть, в  с7 положили текущее состояние с7 с помощью `get_c7()` ,а в gas limit integer положим `null()`. 

##### Функция тестов

Код:

	_ test_example(int exit_code, cell data, tuple stack, cell actions, int gas) method_id(1) {
		throw_if(100, exit_code != 0);

		slice actions = actions.begin_parse();
		throw_if(101, actions~load_uint(32) != 0x0ec3c86d); 


		throw_if(102, ~ slice_empty?(actions~load_ref().begin_parse())); ;; only one action expected

		slice msg = actions~load_ref().begin_parse();
		throw_if(103, msg~load_uint(6) != 0x10);

		slice send_to_address = msg~load_msg_addr();
		slice expected_my_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(7, 5).end_cell().begin_parse();

		throw_if(104, ~ equal_slices(expected_my_address, send_to_address));
		throw_if(105, msg~load_grams() != 0);
		throw_if(106, msg~load_uint(1 + 4 + 4 + 64 + 32 + 1 + 1) != 0);

		slice sender_address = msg~load_msg_addr();
		slice expected_sender_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(8, 5).end_cell().begin_parse();
		throw_if(107, ~ equal_slices(sender_address, expected_sender_address));

		slice fwd_msg = msg~load_ref().begin_parse();

		throw_if(108, fwd_msg~load_uint(32) != 12345);
		fwd_msg.end_parse();

		msg.end_parse();
	}

## Разбираем

`throw_if(100, exit_code != 0);`

Проверям код возврата, функция создаст исключение, если код возврата не равен нулю.
0 - стандартный код возврата из успешного выполнения смарт-контракта.

	slice actions = actions.begin_parse();
	throw_if(101, actions~load_uint(32) != 0x0ec3c86d);
	
Исходящие сообщения записываются в регистр с5 , соответственно выгрузим оттуда 32-ух битное значение(`load_uint` функция из стандартной бибилотеки FunC она загружает целое число n-бит без знака из слайса.) и выдадим ошибку если оно не равно 0x0ec3c86d т.е была произведена не отправка сообщения. Число 0x0ec3c86d можно взять из [TL-B cхемы 371 строка](https://github.com/ton-blockchain/ton/blob/d01bcee5d429237340c7a72c4b0ad55ada01fcc3/crypto/block/block.tlb), а чтобы убедиться что `send_raw_message` использует `action_send_msg` посмотрим стандартную библиотеку [764 строку](https://github.com/ton-blockchain/ton/blob/24dc184a2ea67f9c47042b4104bbb4d82289fac1/crypto/vm/tonops.cpp) .

![github ton](./img/send_action.PNG)

Продолжим:

	slice send_to_address = msg~load_msg_addr();
	slice expected_my_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(7, 5).end_cell().begin_parse();

	throw_if(104, ~ equal_slices(expected_my_address, send_to_address));

Начинаем вычитывать сообщение. Проверяем адрес получателя, загрузив из сообщения адрес с помощью `load_msg_addr()` - которая загружает из слайса единственный префикс, который является допустимым MsgAddress.

В слайс `expected_my_address` положим такой же адрес, который мы собрали в функции определяющей данные.

И соответственно проверим их не совпадение с помощью заранее объявленной `equal_slices()` . Так как функция проверят равенство для проверки неравенства, используем  унарный оператор ` ~` , который являетя побитовым не.

    throw_if(105, msg~load_grams() != 0);
    throw_if(106, msg~load_uint(1 + 4 + 4 + 64 + 32 + 1 + 1) != 0);
	
С помощью `load_grams()`  и `load_uint()`  из [стандартной библиотеки](https://ton.org/docs/#/func/stdlib?id=load_grams) проверяем кол-во Tоn в сообщении не равно 0 и прочие служебые поля, которые можно посмотреть в [схеме сообщения](https://ton.org/docs/#/smart-contracts/messages), вычитывая их из сообщения.

	slice sender_address = msg~load_msg_addr();
	slice expected_sender_address = begin_cell().store_uint(1, 2).store_uint(5,9).store_uint(8, 5).end_cell().begin_parse();
	throw_if(107, ~ equal_slices(sender_address, expected_sender_address));
	
Продолжая вычитывать сообщения, проверяем адрес отправителя, также как мы ранее проверяли адрес получателя.

	slice fwd_msg = msg~load_ref().begin_parse();
	throw_if(108, fwd_msg~load_uint(32) != 12345);

Осталось проверить значение в теле сообщения.  Сначала возьмем загрузим ссылку на ячейку  из сообщения с помощью `load_ref()` и преобразуем ей в слайс `begin_parse()`.  И соотвественно загрузим 32-ух битное значение(`load_uint` функция из стандартной бибилотеки FunC она загружает целое число n-бит без знака из слайса.) проверив его с нашим значением 12345. 


	fwd_msg.end_parse();

		msg.end_parse();
		
В самом конце мы мы проверяем после вычитки остался ли слайс пустым, как всего сообщения, так и тела сообщения из которого мы брали значение. Важно отметить, что  `end_parse()`  выдает исключение, если слайс не пустой, что очень удобно в тестах.

## Тестируем тот же адрес 

По задаче из [третьего урока](https://github.com/romanovichim/TonFunClessons_ru/blob/main/3lesson/thirdlesson.md)  при отправке сообщения в контракт от владельца пересылка не должна осуществляться, протестируем это.

##### Функция данных

Начнем с функции данных:

	[int, tuple, cell, tuple, int] test_same_addr_data() method_id(2) {
		int function_selector = 0;

		cell my_address = begin_cell()
								.store_uint(1, 2) 
								.store_uint(5, 9)
								.store_uint(7, 5)
								.end_cell();

		slice message_body = begin_cell().store_uint(12345, 32).end_cell().begin_parse();

		cell message = begin_cell()
				.store_uint(0x6, 4)
				.store_slice(my_address.begin_parse()) 
				.store_slice(my_address.begin_parse())
				.store_grams(100)
				.store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
				.store_slice(message_body)
				.end_cell();

		tuple stack = unsafe_tuple([12345, 100, message, message_body]);

		return [function_selector, stack, my_address, get_c7(), null()];
	}


## Разбираем

Функция данных практически никак не отличается от предыдущей функции данных единственное отличие, адрес всего один, так как мы тестируем, что будет если прислать сообщение в прокси смарт-контракт со своего адреса. Отправлять опять же будем сами себе, для экономии нашего времени на написание теста.

##### Функция тестов

Код:

	_ test_same_addr(int exit_code, cell data, tuple stack, cell actions, int gas) method_id(3) {
		throw_if(100, exit_code != 0);

		throw_if(102, ~ slice_empty?(actions.begin_parse())); 

	}
	
Опять же проверям код возврата, функция создаст исключение, если код возврата не равен нулю.

`throw_if(100, exit_code != 0);`

0 - стандартный код возврата из успешного выполнения смарт-контракта.

`throw_if(102, ~ slice_empty?(actions.begin_parse()));`

Так как прокси контракт не должен отправлять сообщение, то мы просто проверяем, что слайс пустой с помощью `slice_empty?`, подробнее о функции [здесь](https://ton.org/docs/#/func/stdlib?id=slice_empty) .

## Задание

Как вы могли заметить мы не протестировали режим, в котором мы отсылали сообщение с помощью `send_raw_message;`.

##### Подсказка

Пример функции "разбирающей сообщение":

	(int, cell) extract_single_message(cell actions) impure inline method_id {
		;; ---------------- Parse actions list
		;; prev:^(OutList n)
		;; #0ec3c86d
		;; mode:(## 8)
		;; out_msg:^(MessageRelaxed Any)
		;; = OutList (n + 1);
		slice cs = actions.begin_parse();
		throw_unless(1010, cs.slice_refs() == 2);
		
		cell prev_actions = cs~load_ref();
		throw_unless(1011, prev_actions.cell_empty?());
		
		int action_type = cs~load_uint(32);
		throw_unless(1013, action_type == 0x0ec3c86d);
		
		int msg_mode = cs~load_uint(8);
		throw_unless(1015, msg_mode == 64); 
		
		cell msg = cs~load_ref();
		throw_unless(1017, cs.slice_empty?());
		
		return (msg_mode, msg);
	}