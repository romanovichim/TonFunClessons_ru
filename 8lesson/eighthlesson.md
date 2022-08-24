# Урок 8 Тесты на FunC для смарт-контракта c Hashmap
## Введение

В этом уроке мы напишем тесты для смарт-контракта созданного в седьмом уроке в тестовой сети The Open Network на языке FUNC и  выполним их с помощью [toncli](https://github.com/disintar/toncli).

## Требования

Для прохождения данного урока вам необходимо установить интерфейс для командной строки [toncli](https://github.com/disintar/toncli/blob/master/INSTALLATION.md) и пройти предыдущие уроки.

## Важно

Написанное ниже, описывает старую версию тестов. Новый тесты toncli, на данный момент доступны для dev версии func/fift, инструкция [здесь](https://github.com/disintar/toncli/blob/master/docs/advanced/func_tests_new.md), урок по новым тестам [тут](https://github.com/romanovichim/TonFunClessons_ru/blob/main/11lesson/11lesson.md). Выход новых тестов не означает, что уроки по старым бессмысленные - они хорошо передают логику, поэтому успехов в прохождении урока. Также отмечу, что старые тесты можно использовать с флагом `--old` при использовании `toncli run_tests`

##  Teсты для смарт-контракта с Hashmap

Для смарт-контракта из 7ого урока мы напишем следующие тесты:
- test_example()
- get_stored_value()
- get_not_stored_value()
- wrong_op()
- bad_query()
- remove_outdated()
- get_stored_value_after_remove()
- remove_outdated2()
- get_stored_value_after_remove2()
- get_not_stored_value2()
- remove_outdated3()

> Важно, в этом уроке много тестов, и мы не будем детально разбирать каждый, а будем смотреть на логику, останавливаясь только на самых важных нюансах. Поэтому советую пройти предыдущие уроки прежде чем пройти этот.

## Структура тестов на FunC под toncli

Напомню, что для каждого теста на FunC под toncli мы будем писать две функции. Первая будет определять данные(в терминах TON правильней будет сказать состояние, но надеюсь что данные более понятная аналогия), которые мы будем отправлять во вторую для проведения тестов. 

Каждая тестовая функция должна указывать method_id. Тестовые функции method_id нужно запускать с 0.

##### Функция данных

Функция с данными не принимает никаких аргументов, но должна возвращать:
- function selector - id вызываемой функции в тестируемом контракте; 
- tuple - (стек) значения которые мы будем передавать в функцию выполняющую тесты;
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

## Тестируем срабатывание контракта и просто кладем данные для следующих тестов.

Напишем первый тест test_example и разберем его код.

##### Функция данных

Начнем с функции данных:

	[int, tuple, cell, tuple, int] test_example_data() method_id(0) {
		int function_selector = 0;

		slice message_body = begin_cell()
		  .store_uint(1, 32) ;; add key
		  .store_uint(12345, 64) ;; query id
		  .store_uint(787788, 256) ;; key
		  .store_uint(1000, 64) ;; valid until
		  .store_uint(12345, 128) ;; 128-bit value
		  .end_cell().begin_parse();

		cell message = begin_cell()
				.store_uint(0x18, 6)
				.store_uint(0, 2) 
				.store_grams(0)
				.store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
				.store_slice(message_body)
				.end_cell();

		tuple stack = unsafe_tuple([12345, 100, message, message_body]);

		cell data = begin_cell().end_cell();

		return [function_selector, stack, data, get_c7_now(100), null()];
	}


## Разбираем

`int function_selector = 0;`

Так как мы вызываем `recv_internal()`  мы присваиваем значение 0, почему именно 0? В Fift(а именно в него мы компилируем наши FunC скрипты) есть предопределенные идентификаторы, а именно:
- `main` и `recv_internal` имеют id = 0
- `recv_external` имеют id = -1
- `run_ticktock` имеют id = -2

Далее мы собираем тело сообщения в соответствии с заданием [седьмого урока](https://github.com/romanovichim/TonFunClessons_ru/blob/main/7lesson/seventhlesson.md) .

		slice message_body = begin_cell()
		  .store_uint(1, 32) ;; op
		  .store_uint(12345, 64) ;; query id
		  .store_uint(787788, 256) ;; key
		  .store_uint(1000, 64) ;; valid until
		  .store_uint(12345, 128) ;; 128-bit value
		  .end_cell().begin_parse();

Комментариями описал каждое значение для удобства. Также соберем ячейку сообщения:

    cell message = begin_cell()
            .store_uint(0x18, 6)
            .store_uint(0, 2)
            .store_grams(0)
            .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
            .store_slice(message_body)
            .end_cell();
			
Сообщение надо отправить на адрес смарт-контракта. Для этого будем использовать `addr_none` (то есть `.store_uint(0, 2)`), так как в соответствии с [документацией SENDRAWMSG](https://ton.org/docs/#/func/stdlib?id=send_raw_message) вместо него автоматически подставиться текущий адрес смарт-контракта. 

Далее все станадартно для функции данных:

    tuple stack = unsafe_tuple([12345, 100, message, message_body]);

    cell data = begin_cell().end_cell();

    return [function_selector, stack, data, get_c7_now(100), null()];
	
Кроме одной вещи c7 tuple  - "временные данные" в управляющем регистре с7, раньше нам было не важно что лежит в с7 и мы просто использовали `get_c7()`. то есть просто текущее состояние с7. Но в этом уроке нам придется работать с данными с7 и поэтому придется написать вспомогательную функцию для тестов.

##Вспомогательная функция

Код: 

	tuple get_c7_now(int now) inline method_id {
		return unsafe_tuple([unsafe_tuple([
			0x076ef1ea,           ;; magic
			0,                    ;; actions
			0,                    ;; msgs_sent
			now,                ;; unixtime
			1,                    ;; block_lt
			1,                    ;; trans_lt
			239,                  ;; randseed
			unsafe_tuple([1000000000, null()]),  ;; balance_remaining
			null(),               ;; myself
			get_config()          ;; global_config
		])]);
	}

Итак в данном смарт-контракте нам необходимо манипулировать временем в смарт-контракте, делать мы это будем изменяя данные в регистре `с7`. Чтобы понять какой формат tuple мы должны "положить" в  `с7` обратимся к документации а именно к [описанию TON пункту 4.4.10](https://ton-blockchain.github.io/docs/tblkch.pdf).

Подробно останавливаться на каждом параметре мы не будем, комментариями в коде постарался передать суть кратко. 

##### Функция тестов

Код:

	_ test_example(int exit_code, cell data, tuple stack, cell actions, int gas) method_id(1) {
		throw_if(100, exit_code != 0);
	}

## Разбираем

	`throw_if(100, exit_code != 0);`

Проверяем код возврата, функция создаст исключение, если код возврата не равен нулю.
0 - стандартный код возврата из успешного выполнения смарт-контракта.

И все, первый тест просто кладет данные, чтобы мы могли в следующих тестах проверить работу смарт-контракта.


## Тестируем получение сохраненного значения

Напишем тест `get_stored_value` , который возьмет значение, которые мы положили в `test_example` и разберем его код.

##### Функция данных

Начнем с функции данных:

	[int, tuple, cell, tuple, int] get_stored_value_data() method_id(2) {
		int function_selector = 127977;

		int key = 787788;

		tuple stack = unsafe_tuple([key]);

		return [function_selector, stack, get_prev_c4(), get_c7(), null()];
	}

## Разбираем

		int function_selector = 127977;

Чтобы понять какой id у GET функции, необходимо зайти в скомпилированный смарт-контракт и посмотреть какой id присвоен функции. Зайдем в папку build и откроем contract.fif  и найдем там строчку с `get_key`

	127977 DECLMETHOD get_key

В функцию `get_key` необходимо передать ключ, предадим ключ, который мы задали в предыдущем тесте, а именно `787788`

		int key = 787788;

		tuple stack = unsafe_tuple([key]);
		
Остается только вернуть данные:

	return [function_selector, stack, get_prev_c4(), get_c7(), null()];

Как можно видеть, в  с7 положили текущее состояние с7 с помощью `get_c7()` ,а в gas limit integer положим `null()`.  То с регистром `с4` ситуация интересная, нам необходимо положить ячейку из предыдущего теста, сделать это с помощью стандартной библиотеки FunC нельзя, НО в `toncli` этот момент продуман: 
В [описании тестов toncli](https://github.com/disintar/toncli/blob/master/docs/advanced/func_tests.md), есть функции get_prev_c4 / get_prev_c5, которые позволяют получить ячейки c4/c5 из предыдущих испытаний. 

##### Функция тестов

Код:

	_ get_stored_value(int exit_code, cell data, tuple stack, cell actions, int gas) method_id(3) {
		throw_if(100, exit_code != 0);

		var valid_until = first(stack);
		throw_if(102, valid_until != 1000);
		var value = second(stack);
		throw_if(101, value~load_uint(128) != 12345);
	}

## Разбираем

`throw_if(100, exit_code != 0);`

Проверяем код возврата, функция создаст исключение, если код возврата не равен нулю.
0 - стандартный код возврата из успешного выполнения смарт-контракта.

Напомню, что переменная `tuple` это (стек) значения которые мы передаем от функции данных. Разбирать его будем, с помощью [примитивов для типа данных](https://ton.org/docs/#/func/stdlib?id=other-tuple-primitives) `tuple` - `first` и `second`.

    var valid_until = first(stack);
    throw_if(102, valid_until != 1000);
    var value = second(stack);
    throw_if(101, value~load_uint(128) != 12345);

Проверяем значение `valid_until` и `128-битного значения`, которое мы передавали. Выдадим исключения если значения отличаются. 

## Тестируем исключение в случае, если для полученного ключа нет записи

Напишем тест `get_not_stored_value()` и разберем его код.

##### Функция данных

Начнем с функции данных:

	[int, tuple, cell, tuple, int] get_not_stored_value_data() method_id(4) {
		int function_selector = 127977;

		int key = 787789; 

		tuple stack = unsafe_tuple([key]);

		return [function_selector, stack, get_prev_c4(), get_c7(), null()];
	}

## Разбираем

Функция данных отличается только ключом, берем ключ, которого нет хранилище контракта.
	
	int key = 787789; 

##### Функция тестов

Код:

	_ get_not_stored_value(int exit_code, cell data, tuple stack, cell actions, int gas) method_id(5) {
		throw_if(100, exit_code == 0);
	}
	

## Разбираем

Проверяем, что, если код возврата будет равен 0, т.е выполнено без ошибок, вывести исключение. 

	throw_if(100, exit_code == 0);

И на этом все.

## Проверяем что при op = 2 выходит исключение, если сообщение содержит, что-то помимо op и query_id

Напишем тест bad_query() и разберем его код.

##### Функция данных

Начнем с функции данных:

	[int, tuple, cell, tuple, int] bad_query_data() method_id(8) {
	   int function_selector = 0;

	   slice message_body = begin_cell()
		 .store_uint(2, 32) ;; remove old
		 .store_uint(12345, 64) ;; query id
		 .store_uint(12345, 128) ;; 128-bit value
		 .end_cell().begin_parse();

	   cell message = begin_cell()
			   .store_uint(0x18, 6)
			   .store_uint(0, 2) ;; should be contract address
			   .store_grams(0)
			   .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
			   .store_slice(message_body)
			   .end_cell();

	   tuple stack = unsafe_tuple([12345, 100, message, message_body]);

	   return [function_selector, stack, get_prev_c4(), get_c7(), null()];
	}

## Разбираем

Главное в этой функции данных это тело сообщения, в него помимо op и query_id добавлен мусор в виде store_uint(12345, 128) . Нужно это чтобы проверить следующий код из контракта:

	if (op == 2) { 
		in_msg_body.end_parse();
	}

Таким образом попав сюда контракт выдаст исключение.

##### Функция тестов

Код:

	_ bad_query(int exit_code, cell data, tuple stack, cell actions, int gas) method_id(9) {
		throw_if(100, exit_code == 0);
	}

## Разбираем

Как вы могли понять, мы просто проверяем что контракт выдаст исключение.


## Тестируем удаление данных, но при now < all keys  

Напишем тест  remove_outdated() и разберем его код.

##### Функция данных

Начнем с функции данных:

	[int, tuple, cell, tuple, int] remove_outdated_data() method_id(10) {
	   int function_selector = 0;

	   slice message_body = begin_cell()
		 .store_uint(2, 32) ;; remove old
		 .store_uint(12345, 64) ;; query id
		 .end_cell().begin_parse();

	   cell message = begin_cell()
			   .store_uint(0x18, 6)
			   .store_uint(0, 2)
			   .store_grams(0)
			   .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
			   .store_slice(message_body)
			   .end_cell();

	   tuple stack = unsafe_tuple([12345, 100, message, message_body]);

	   return [function_selector, stack, get_prev_c4(), get_c7_now(1000), null()];
	}

## Разбираем

`int function_selector = 0;`

Так как мы вызываем `recv_internal()`  мы присваиваем значение 0, почему именно 0? В Fift(а именно в него мы компилируем наши FunC скрипты) есть предопределенные идентификаторы, а именно:
- `main` и `recv_internal` имеют id = 0
- `recv_external` имеют id = -1
- `run_ticktock` имеют id = -2

Далее мы собираем тело сообщения в соответствии с заданием [седьмого урока](https://github.com/romanovichim/TonFunClessons_ru/blob/main/7lesson/seventhlesson.md) при `op` = 2  .

	   slice message_body = begin_cell()
		 .store_uint(2, 32) ;; remove old
		 .store_uint(12345, 64) ;; query id
		 .end_cell().begin_parse();

 Также соберем ячейку сообщения:

	   cell message = begin_cell()
			   .store_uint(0x18, 6)
			   .store_uint(0, 2)
			   .store_grams(0)
			   .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
			   .store_slice(message_body)
			   .end_cell();

Далее все стандартно для функции данных:

	   tuple stack = unsafe_tuple([12345, 100, message, message_body]);

	   return [function_selector, stack, get_prev_c4(), get_c7_now(1000), null()];
	   
Кроме того, что в с7 положим 1000, чтобы проверить как работает удаление при now < `valid_until` в контракте.

##### Функция тестов

Код:

	_ remove_outdated(int exit_code, cell data, tuple stack, cell actions, int gas) method_id(11) {
		throw_if(100, exit_code != 0);
	}

## Разбираем

При now < `valid_until` контракт должен просто отработать корректно, поэтому: 

	`throw_if(100, exit_code != 0);`

Проверяем код возврата, функция создаст исключение, если код возврата не равен нулю.
0 - стандартный код возврата из успешного выполнения смарт-контракта.

Проверять удалилось ли значение при этом или нет будем в следующем тесте.

## Тестируем, что значения не были удалены при now < all keys

В данном тесте `get_stored_value_after_remove()` все абсолютно идентично тесту: 
`get_stored_value()`, поэтому останавливаться не буду, просто приведу код:

##### Код get_stored_value_after_remove()

[int, tuple, cell, tuple, int] get_stored_value_after_remove_data() method_id(12) {
    int function_selector = 127977;

    int key = 787788;

    tuple stack = unsafe_tuple([key]);

    return [function_selector, stack, get_prev_c4(), get_c7(), null()];
}


_ get_stored_value_after_remove(int exit_code, cell data, tuple stack, cell actions, int gas) method_id(13) {
    throw_if(100, exit_code != 0);

    var valid_until = first(stack);
    throw_if(102, valid_until != 1000);
    var value = second(stack);
    throw_if(101, value~load_uint(128) != 12345);
}


## Тестируем удаление устаревших данных

Теперь давайте удалим устаревшие данные положив с помощью  get_c7_now(now) значение 1001.  Сделаем мы это следующим образом: функция тестов  `remove_outdated2()` c `op` = 2 и значением now = 1001 удалит устаревшее , а `get_stored_value_after_remove2()` проверит, что данные по ключу `787788` удалились и функция `get_key()`  вернет исключение. Получаем:

	[int, tuple, cell, tuple, int] remove_outdated2_data() method_id(14) {
	   int function_selector = 0;

	   slice message_body = begin_cell()
		 .store_uint(2, 32) ;; remove old
		 .store_uint(12345, 64) ;; query id
		 .end_cell().begin_parse();

	   cell message = begin_cell()
			   .store_uint(0x18, 6)
			   .store_uint(0, 2) ;; should be contract address
			   .store_grams(0)
			   .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
			   .store_slice(message_body)
			   .end_cell();

	   tuple stack = unsafe_tuple([12345, 100, message, message_body]);

	   return [function_selector, stack, get_prev_c4(), get_c7_now(1001), null()];
	}


	_ remove_outdated2(int exit_code, cell data, tuple stack, cell actions, int gas) method_id(15) {
		throw_if(100, exit_code != 0);
	}


		[int, tuple, cell, tuple, int] get_stored_value_after_remove2_data() method_id(16) {
			int function_selector = 127977;

			int key = 787788;

			tuple stack = unsafe_tuple([key]);

			return [function_selector, stack, get_prev_c4(), get_c7(), null()];
		}


		_ get_stored_value_after_remove2(int exit_code, cell data, tuple stack, cell actions, int gas) method_id(17) {
			throw_if(100, exit_code == 0);
		}


## Протестируем другой ключ

После того как мы удалили устаревшие данные, попробуем взять данные с другим ключом, функция `get_key` также должна выдать исключение.  

	[int, tuple, cell, tuple, int] get_not_stored_value2_data() method_id(18) {
		;; Funtion to run (recv_internal)
		int function_selector = 127977;

		int key = 787789; ;; random key

		;; int balance, int msg_value, cell in_msg_full, slice in_msg_body
		tuple stack = unsafe_tuple([key]);

		cell data = begin_cell().end_cell();

		return [function_selector, stack, data, get_c7(), null()];
	}


	_ get_not_stored_value2(int exit_code, cell data, tuple stack, cell actions, int gas) method_id(19) {
		throw_if(100, exit_code == 0);
	}

Как можно видеть используем ключ 787789, которого и не было и проверяем, что функция выдает исключение.

## Еще раз прогоним удаление, когда данные уже удалены

И наконец последние тест, еще раз запустим удаление при now < all keys

	[int, tuple, cell, tuple, int] remove_outdated3_data() method_id(20) {
	   int function_selector = 0;

	   slice message_body = begin_cell()
		 .store_uint(2, 32) ;; remove old
		 .store_uint(12345, 64) ;; query id
		 .end_cell().begin_parse();

	   cell message = begin_cell()
			   .store_uint(0x18, 6)
			   .store_uint(0, 2) 
			   .store_grams(0)
			   .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
			   .store_slice(message_body)
			   .end_cell();

	   tuple stack = unsafe_tuple([12345, 100, message, message_body]);

	   return [function_selector, stack, begin_cell().end_cell(), get_c7_now(1000), null()];
	}


	_ remove_outdated3(int exit_code, cell data, tuple stack, cell actions, int gas) method_id(21) {
		throw_if(100, exit_code != 0);
	}
	
## Заключение

Хотел сказать отдельное спасибо, тем кто донатит для поддержки проекта, это очень мотивирует и помогает выпускать уроки быстрее. Если вы хотите помочь проекту(быстрее выпускать уроки, перевести это все на английский итд), внизу на [главной странице](https://github.com/romanovichim/TonFunClessons_ru), есть адреса для донатов.
