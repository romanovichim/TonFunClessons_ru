# Урок 6 Тесты на FunC для смарт-контракта с op и query_id
## Введение

В этом уроке мы напишем тесты для смарт-контракта созданного в пятом уроке в тестовой сети The Open Network на языке FUNC и  выполним их с помощью [toncli](https://github.com/disintar/toncli).

## Требования

Для прохождения данного урока вам необходимо установить интерфейс для командной строки [toncli](https://github.com/disintar/toncli/blob/master/INSTALLATION.md) и пройти [пятый урок](https://github.com/romanovichim/TonFunClessons_ru/blob/main/5lesson/fifthlesson.md) .
## Задание пятого урока

Для удобства напомню здесь, что мы делали в пятом уроке. Задача смарт-контракта будет запоминать адрес, устанавливаемый менеджером и сообщать его всем, кто запросит, в частности следующая функциональность**:
-  когда контракт получает сообщение от Менеджера с `op` равным 1
  за которым следует какой-то `query_id`, за которым следует  `MsgAddress`, он должен сохранить полученный адрес в хранилище.
- когда контракт получает внутреннее сообщение с любого адреса с  `op`, равным 2, за которым следует `query_id`, он должен ответить отправителю сообщением с телом, содержащим:
  -  `op` равна 3
  - тот же `query_id`
  - Адрес менеджера
  - Адрес, который был запомнен с момента последнего запроса менеджера (пустой адрес `addr_none`, если еще не было запроса менеджера)
  - Значение TON, прикрепленное к сообщению за вычетом платы за обработку.
- когда смарт-контракт получает любое другое сообщение, он должен выдать исключение.

##  Teсты для смарт-контракта с op и query_id

Для нашего прокси смарт-контракта мы напишем следующие тесты:

- test_example() сохранение адресов с op = 1
- only_manager_can_change() TBD
- query() TBD
- query_op3() TBD

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


## Тестируем сохранение адресов с op = 1

Напишем первый тест `test_example()`  и разберем его код. Тест будет проверять, сохраняет ли контракт адрес менеджера и адрес, который передает менеджер в контракт.

##### Функция данных

Начнем с функции данных:

	[int, tuple, cell, tuple, int] test_example_data() method_id(0) {

		int function_selector = 0;

		cell manager_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(1, 5).end_cell();
		cell stored_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(3, 5).end_cell();

		slice message_body = begin_cell().store_uint(1, 32).store_uint(12345, 64).store_slice(stored_address.begin_parse()).end_cell().begin_parse();

		cell message = begin_cell()
				.store_uint(0x6, 4)
				.store_slice(manager_address.begin_parse())
				.store_uint(0, 2) ;; should be contract address
				.store_grams(100)
				.store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
				.store_slice(message_body)
				.end_cell();

		tuple stack = unsafe_tuple([12345, 100, message, message_body]);

		cell data = begin_cell().store_slice(manager_address.begin_parse()).store_uint(0, 2).end_cell();

		return [function_selector, stack, data, get_c7(), null()];
	}

## Разбираем

И так в первом тесте мы хотим проверить работу смарт-контракта с `op` равным 1.
Соответственно мы отправим сообщение  с `op` равным 1 от менеджера контракта и сохраним в нем некий адрес. Для этого в функции данных нам нужны:

- адрес менеджера `manager_address`
- адрес для хранения в контракте `stored_address`
- тело сообщения с `op` равным 1
- само сообщение соотвественно `message`
- адрес менеджера в с4 для проверки `data`

Начнем разбор:

`int function_selector = 0;`

Так как мы вызываем `recv_internal()`  мы присваиваем значение 0, почему именно 0? В Fift(а именно в него мы компилируем наши FunC скрипты) есть предопределенные идентификаторы, а именно:
- `main` и `recv_internal` имеют id = 0
- `recv_external` имеют id = -1
- `run_ticktock` имеют id = -2

Соберем два необходимых адреса, пускай это будет 1 и 3:

		cell manager_address = begin_cell().
			store_uint(1, 2).
			store_uint(5, 9).
			store_uint(1, 5).
			end_cell();
			
		cell stored_address = begin_cell().
			store_uint(1, 2)
			.store_uint(5, 9)
			.store_uint(3, 5)
			.end_cell();

Адреса собираем в соответствии с  [TL-B схемой](https://github.com/tonblockchain/ton/blob/master/crypto/block/block.tlb) , а конкретно к строке 100, там начинаются описания адресов. На примере `manager_address`:

`.store_uint(1, 2)` - 0x01 внешний адрес;

`.store_uint(5, 9)` - len равный 5;

`.store_uint(1, 5)` - адрес будет 1;

Теперь соберем слайс тела сообщения, он будет содержать:
- 32-битное op `store_uint(1, 32)`
- 64-битное query_id `store_uint(12345, 64)`
- адрес для хранения `store_slice(stored_address.begin_parse())`

Так как в теле мы храним слайс, а адрес мы задаем ячейкой, то будем использовать 
`begin_parse()` (  ячейку преобразует в slice ).

Для сборки тела сообщения будем использовать:

`begin_cell()` - создаст Builder для будущей ячейки
`end_cell()` - создат Cell (ячейку)

Выглядит это так:

	slice message_body = begin_cell().store_uint(1, 32).store_uint(12345, 64).store_slice(stored_address.begin_parse()).end_cell().begin_parse();

Теперь осталось собрать само сообщение, но как отправить сообщение на адрес смарт-контракта. Для этого будем использовать `addr_none`, так как в соответствии с [документацией SENDRAWMSG](https://ton.org/docs/#/func/stdlib?id=send_raw_message) вместо него автоматически подставиться текущий адрес смарт-контракта. Получим:

    cell message = begin_cell()
            .store_uint(0x6, 4)
            .store_slice(sender_address.begin_parse()) 
            .store_uint(0, 2) 
            .store_grams(100)
            .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
            .store_slice(message_body)
            .end_cell();

Теперь соберем  значения которые мы будем передавать в функцию выполняющую тесты, а именно `int balance`, `int msg_value`, `cell in_msg_full`, `slice in_msg_body`:

		tuple stack = unsafe_tuple([12345, 100, message, message_body]);
		

Также соберем ячейку для регистра`с4`, положим туда адрес менеджера и `addr_none` используя уже знакомые нам функции.

	cell data = begin_cell().store_slice(manager_address.begin_parse()).store_uint(0, 2).end_cell();
	

И конечно же вернем обязательные значения.

	return [function_selector, stack, data, get_c7(), null()];

Как можно видеть, в  с7 положили текущее состояние с7 с помощью `get_c7()` ,а в gas limit integer положим `null()`.

##### Функция тестов

Код:

	_ test_example(int exit_code, cell data, tuple stack, cell actions, int gas) method_id(1) {
		throw_if(100, exit_code != 0);

		cell manager_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(1, 5).end_cell();
		cell stored_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(3, 5).end_cell();

		slice stored = data.begin_parse();
		throw_if(101, ~ equal_slices(stored~load_msg_addr(), manager_address.begin_parse()));
		throw_if(102, ~ equal_slices(stored~load_msg_addr(), stored_address.begin_parse()));
		stored.end_parse();
	}

## Разбираем

`throw_if(100, exit_code != 0);`

Проверяем код возврата, функция создаст исключение, если код возврата не равен нулю.
0 - стандартный код возврата из успешного выполнения смарт-контракта.

Далее соберем два адреса, аналогичных тому, что мы собирали в функции данных, чтобы их сравнить.

		cell manager_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(1, 5).end_cell();
		cell stored_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(3, 5).end_cell();
		

Теперь достанем, то с чем сравнивать, у нас есть ячейка `data`, соответственно  используя `begin_parse` -   ячейку преобразуем в slice. 

		slice stored = data.begin_parse();

		stored.end_parse();

А в  конце мы  проверяем после вычитки остался ли слайс пустым. Важно отметить, что  `end_parse()`  выдает исключение, если слайс не пустой, что  удобно для тестирования.

Вычитывать адреса из  `stored` будем с помощью `load_msg_addr()`.  Сравнивать адреса будем с помощью функции `equal_slices`, которую возьмем из предыдущего урока.

		slice stored = data.begin_parse();
		throw_if(101, ~ equal_slices(stored~load_msg_addr(), manager_address.begin_parse()));
		throw_if(102, ~ equal_slices(stored~load_msg_addr(), stored_address.begin_parse()));
		stored.end_parse();
		

## Тестируем, что при op = 1 адрес  в смарт-контракте может менять только менеджер

Напишем тест `only_manager_can_change()`  и разберем его код.

##### Функция данных

Начнем с функции данных:

	[int, tuple, cell, tuple, int] only_manager_can_change_data() method_id(2) {
		int function_selector = 0;

		cell manager_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(1, 5).end_cell();
		cell sender_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(2, 5).end_cell();
		cell stored_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(3, 5).end_cell();

		slice message_body = begin_cell().store_uint(1, 32).store_uint(12345, 64).store_slice(stored_address.begin_parse()).end_cell().begin_parse();

		cell message = begin_cell()
				.store_uint(0x6, 4)
				.store_slice(sender_address.begin_parse()) 
				.store_uint(0, 2) 
				.store_grams(100)
				.store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
				.store_slice(message_body)
				.end_cell();

		tuple stack = unsafe_tuple([12345, 100, message, message_body]);

		cell data = begin_cell().store_slice(manager_address.begin_parse()).store_uint(0, 2).end_cell();

		return [function_selector, stack, data, get_c7(), null()];
	}

## Разбираем

Как вы можете заметить код практически не отличается от `test_example()`. Кроме того, что:
- добавился еще один адрес `sender_address`
- в сообщении поменялся адрес менеджера `manager_address` на адрес отправителя `sender_address`

Адрес отправителя соберем, как и все остальные адреса:

	cell sender_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(2, 5).end_cell();
	
И поменяем в сообщений адрес менеджера `manager_address` на адрес отправителя `sender_address`.

		cell message = begin_cell()
				.store_uint(0x6, 4)
				.store_slice(sender_address.begin_parse()) 
				.store_uint(0, 2) 
				.store_grams(100)
				.store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
				.store_slice(message_body)
				.end_cell();

##### Функция тестов

Код:

	_ only_manager_can_change(int exit_code, cell data, tuple stack, cell actions, int gas) method_id(3) {
		throw_if(100, exit_code == 0); 

		cell manager_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(1, 5).end_cell();
		cell stored_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(3, 5).end_cell();

		slice stored = data.begin_parse();
		throw_if(101, ~ equal_slices(stored~load_msg_addr(), manager_address.begin_parse()));
		throw_if(102, stored~load_uint(2) != 0);
		stored.end_parse();
	}

## Разбираем

Опять же проверяем код возврата, функция создаст исключение, если код возврата не равен нулю.

`throw_if(100, exit_code != 0);`

0 - стандартный код возврата из успешного выполнения смарт-контракта.

Собираем адреса менеджера `manager_address;` и хранимый адрес `stored_address`, такие же как в фукнции данных для проверки.

		cell manager_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(1, 5).end_cell();
		cell stored_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(3, 5).end_cell();
		
Теперь достанем, то с чем сравнивать, у нас есть ячейка `data`, соответственно  используя `begin_parse` -   ячейку преобразуем в slice. 

		slice stored = data.begin_parse();

		stored.end_parse();

А в  конце мы  проверяем после вычитки остался ли слайс пустым. Важно отметить, что  `end_parse()`  выдает исключение, если слайс не пустой, что  удобно для тестирования.

Вычитывать адреса из  `stored` будем с помощью `load_msg_addr()`.  Сравнивать адреса будем с помощью функции `equal_slices`, которую возьмем из предыдущего урока.

		slice stored = data.begin_parse();
		throw_if(101, ~ equal_slices(stored~load_msg_addr(), manager_address.begin_parse()));
		
		stored.end_parse();
		
Дополнительно сравним хранимый адрес с `addr_none`, используя `~load_uint(2)`

`load_uint` - Загружает n-разрядное целое число без знака из слайса

Получим:

    slice stored = data.begin_parse();
    throw_if(101, ~ equal_slices(stored~load_msg_addr(), manager_address.begin_parse()));
    throw_if(102, stored~load_uint(2) != 0);
    stored.end_parse();
	
## Тестируем работу смарт-контракта при op = 2

Напишем тест `query()`  и разберем его код. При `op` = 2 мы должны отправить сообщение с определенным телом. 

##### Функция данных

Начнем с функции данных:

	[int, tuple, cell, tuple, int] query_data() method_id(4) {
		int function_selector = 0;

		cell manager_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(1, 5).end_cell();
		cell sender_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(2, 5).end_cell();
		cell stored_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(3, 5).end_cell();

		slice message_body = begin_cell().store_uint(2, 32).store_uint(12345, 64).store_slice(stored_address.begin_parse()).end_cell().begin_parse();

		cell message = begin_cell()
				.store_uint(0x6, 4)
				.store_slice(sender_address.begin_parse()) 
				.store_uint(0, 2)
				.store_grams(100)
				.store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
				.store_slice(message_body)
				.end_cell();

		tuple stack = unsafe_tuple([12345, 100, message, message_body]);

		cell data = begin_cell().store_slice(manager_address.begin_parse()).store_slice(stored_address.begin_parse()).end_cell();

		return [function_selector, stack, data, get_c7(), null()];
	}

## Разбираем

Функция данных мало чем, отличается от предыдущих в данном уроке.

`int function_selector = 0;`

Проверяем предопределенный номер функции `recv_internal`.

Собираем три адреса:

- адрес менеджера `manager_address`
- адрес отправителя `sender_address`
- адрес для хранения в контракте `stored_address`

		cell manager_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(1, 5).end_cell();
		cell sender_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(2, 5).end_cell();
		cell stored_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(3, 5).end_cell();
		
Теперь соберем слайс тела сообщения(ВАЖНО: теперь `op`=2), он будет содержать:
- 32-битное op `store_uint(2, 32)`
- 64-битное query_id `store_uint(12345, 64)`
- адрес для хранения `store_slice(stored_address.begin_parse())`

Так как в теле мы храним слайс, а адрес мы задаем ячейкой, то будем использовать 
`begin_parse()` (  ячейку преобразует в slice ).

Для сборки тела сообщения будем использовать:

`begin_cell()` - создаст Builder для будущей ячейки
`end_cell()` - создат Cell (ячейку)

Выглядит это так:

	slice message_body = begin_cell().store_uint(2, 32).store_uint(12345, 64).store_slice(stored_address.begin_parse()).end_cell().begin_parse();

Пришло время сообщения: 

		cell message = begin_cell()
				.store_uint(0x6, 4)
				.store_slice(sender_address.begin_parse()) 
				.store_uint(0, 2)
				.store_grams(100)
				.store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
				.store_slice(message_body)
				.end_cell();
				

Отправитель `sender_address`, получатель адрес контракта, благодаря отправке `addr_none`.Вместо него автоматически подставиться текущий адрес смарт-контракта.

Теперь соберем  значения которые мы будем передавать в функцию выполнящую тесты, а именно `int balance`, `int msg_value`, `cell in_msg_full`, `slice in_msg_body`:

		tuple stack = unsafe_tuple([12345, 100, message, message_body]);
		

Также соберем ячейку для регистра`с4`, положим туда адрес менеджера и адрес для хранения используя уже знакомые нам функции.

	cell data = begin_cell().store_slice(manager_address.begin_parse()).store_slice(stored_address.begin_parse()).end_cell();

И конечно же вернем обязательные значения.

	return [function_selector, stack, data, get_c7(), null()];

Как можно видеть, в  с7 положили текущее состояние с7 с помощью `get_c7()` ,а в gas limit integer положим `null()`.

##### Функция тестов

Код:

	_ query(int exit_code, cell data, tuple stack, cell actions, int gas) method_id(5) {
		throw_if(100, exit_code != 0); 

		cell manager_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(1, 5).end_cell();
		cell sender_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(2, 5).end_cell();
		cell stored_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(3, 5).end_cell();

		slice stored = data.begin_parse();
		throw_if(101, ~ equal_slices(stored~load_msg_addr(), manager_address.begin_parse()));
		throw_if(102, ~ equal_slices(stored~load_msg_addr(), stored_address.begin_parse()));
		stored.end_parse();

		slice all_actions = actions.begin_parse();
		all_actions~load_ref();
		slice msg = all_actions~load_ref().begin_parse();

		throw_if(103, msg~load_uint(6) != 0x10);

		slice send_to_address = msg~load_msg_addr();

		throw_if(104, ~ equal_slices(sender_address.begin_parse(), send_to_address));
		throw_if(105, msg~load_grams() != 0);
		throw_if(106, msg~load_uint(1 + 4 + 4 + 64 + 32 + 1 + 1) != 0);

		throw_if(107, msg~load_uint(32) != 3);
		throw_if(108, msg~load_uint(64) != 12345);
		throw_if(109, ~ equal_slices(manager_address.begin_parse(), msg~load_msg_addr()));
		throw_if(110, ~ equal_slices(stored_address.begin_parse(), msg~load_msg_addr()));

		msg.end_parse();
	}

## Разбираем

Итак начало похоже на то, что мы уже разбирали, три адреса(`manager_address`,`sender_address`,`stored_address)`) идентичные тем, что мы собирали в функции данных для сравнения и само сравнение с помощью `equal_slices()`.

		cell manager_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(1, 5).end_cell();
		cell sender_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(2, 5).end_cell();
		cell stored_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(3, 5).end_cell();

		slice stored = data.begin_parse();
		throw_if(101, ~ equal_slices(stored~load_msg_addr(), manager_address.begin_parse()));
		throw_if(102, ~ equal_slices(stored~load_msg_addr(), stored_address.begin_parse()));
		stored.end_parse();
		
Дальше переходим к сообщению.Исходящие сообщения записываются в регистр с5. Достанем их из ячейки `actions` в слайс `stored`.

	slice all_actions = actions.begin_parse();
	
Теперь вспомним как хранятся  данные в c5 в соответствии с [документацией](https://ton.org/docs/#/smart-contracts/tvm_overview?id=result-of-tvm-execution).

Храниться там список из двух ссылок на ячейки две ссылки на ячейки с последним действием в списке и ссылка ячейку с предыдущим действием соответственно. (В конце урока будет приведен код, который показывает как распарсить `actions` полностью, надеюсь это поможет)

Поэтому сначала "выгрузим" первую ссылку и возьмем вторую, там где наше сообщение:

	all_actions~load_ref();
	slice msg = all_actions~load_ref().begin_parse();

Ячейку сразу же грузим  в слайс `msg`. Проверим флаги:

	throw_if(103, msg~load_uint(6) != 0x10);

Загрузив из сообщения адрес отправителя с помощью `load_msg_addr()` - которая загружает из слайса единственный префикс, который является допустимым MsgAddress, проверим их равенство  с тем адресом что мы задали ранее. Не забывая преобразовать в слайс ячейку.


	slice send_to_address = msg~load_msg_addr();

	throw_if(104, ~ equal_slices(sender_address.begin_parse(), send_to_address));
	
С помощью `load_grams()`  и `load_uint()`  из [стандартной библиотеки](https://ton.org/docs/#/func/stdlib?id=load_grams) проверяем кол-во Tоn в сообщении не равно 0 и прочие служебные поля, которые можно посмотреть в [схеме сообщения](https://ton.org/docs/#/smart-contracts/messages), вычитывая их из сообщения.

	throw_if(105, msg~load_grams() != 0);
    throw_if(106, msg~load_uint(1 + 4 + 4 + 64 + 32 + 1 + 1) != 0);
	
Начинаем проверять тело сообщения,начем с `op` и `query_id`:

	throw_if(107, msg~load_uint(32) != 3);
	throw_if(108, msg~load_uint(64) != 12345);

Дальше возьмем их тела сообщения адреса и сравним их с помощью `equal_slices`.Так как функция проверят равенство для проверки неравенства, используем  унарный оператор ` ~` , который является побитовым не.

	throw_if(109, ~ equal_slices(manager_address.begin_parse(), msg~load_msg_addr()));
	throw_if(110, ~ equal_slices(stored_address.begin_parse(), msg~load_msg_addr()));

В самом конце мы проверяем после вычитки остался ли слайс пустым, как всего сообщения, так и тела сообщения из которого мы брали значение. Важно отметить, что  `end_parse()`  выдает исключение, если слайс не пустой, что очень удобно в тестах.

	msg.end_parse();
	

## Тестируем работу смарт-контракта при исключении

Напишем тест `query_op3`  и разберем его код. По заданию - когда смарт-контракт получает любое другое сообщение, он должен выдать исключение.

##### Функция данных

Начнем с функции данных:

	[int, tuple, cell, tuple, int] query_op3_data() method_id(6) {
		int function_selector = 0;

		cell manager_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(1, 5).end_cell();
		cell sender_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(2, 5).end_cell();
		cell stored_address = begin_cell().store_uint(1, 2).store_uint(5, 9).store_uint(3, 5).end_cell();

		slice message_body = begin_cell().store_uint(3, 32).store_uint(12345, 64).store_slice(stored_address.begin_parse()).end_cell().begin_parse();

		cell message = begin_cell()
				.store_uint(0x6, 4)
				.store_slice(sender_address.begin_parse()) 
				.store_uint(0, 2) 
				.store_grams(100)
				.store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
				.store_slice(message_body)
				.end_cell();

		tuple stack = unsafe_tuple([12345, 100, message, message_body]);

		cell data = begin_cell().store_slice(manager_address.begin_parse()).store_slice(stored_address.begin_parse()).end_cell();

		return [function_selector, stack, data, get_c7(), null()];
	}


## Разбираем

Данная функция данных почти полностью эквивалента с той что мы писали в прошлом пункте, за исключением одной детали - это значение `op` в теле сообщения, чтобы мы могли проверить, что будет если `op` не равен 2 или 1. 

	slice message_body = begin_cell().store_uint(3, 32).store_uint(12345, 64).store_slice(stored_address.begin_parse()).end_cell().begin_parse();

##### Функция тестов

Код:

	_ query_op3(int exit_code, cell data, tuple stack, cell actions, int gas) method_id(7) {
		throw_if(100, exit_code == 0);
	}


## Разбираем

Проверяем, что, если код возврата будет равен 0, т.е выполнено без ошибок, вывести исключение. 

	throw_if(100, exit_code == 0);

И на этом все.

## Заключение

Хотел сказать отдельное спасибо, тем кто донатит для поддержки проекта, это очень мотивирует и помогает выпускать уроки быстрее. Если вы хотите помочь проекту(быстрее выпускать уроки, перевести это все на английский итд), внизу на [главной странице](https://github.com/romanovichim/TonFunClessons_ru), есть адреса для донатов.

##### Дополнение

Пример функции "разбирающей actions":

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