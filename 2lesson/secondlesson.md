# Урок 2 Тесты на FunC для смарт-контракта
## Введение

В этом уроке мы напишем тесты для смарт-контракта созданного в первом уроке в тестовой сети The Open Network на языке FUNC и  выполним их с помощью [toncli](https://github.com/disintar/toncli).

## Требования

Для прохождения данного урока вам необходимо установить интерфейс для командной строки [toncli](https://github.com/disintar/toncli/blob/master/INSTALLATION.md) и пройти [первый урок](https://github.com/disintar/toncli/blob/master/INSTALLATION.md) .

##  Teсты для первого смарт-контракта

Для нашего первого смарт-контракта мы напишем следующие тесты:

- test_example - вызовем recv_internal() с числом 10
- test_get_total - проверим get метод
- test_exception - проверим добавление числа не подходящей под условие битности

## Структура тестов на FunC под toncli

Для каждого теста на FunC под toncli мы будем писать две функции. Первая будет определять данные(в терминах TON правильней будет сказать состояние, но надеюсь что данные более понятная аналогия), которые мы будем отправлять во вторую для проведения тестов. 

Каждая тестовая функция должна указывать method_id. Тестовые функции method_id нужно запускать с 0.

##### Создаем файл для тестов

Создадим в коде нашего предыдущего урока, в папке *tests* файл *example.func*  в котором мы и будем писать наши тесты.


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

## Тестируем вызов recv_internal()

Напишем первый тест  test_example и разберем его код.

##### Функция данных

Начнем с функции данных:

    [int, tuple, cell, tuple, int] test_example_data() method_id(0) {
		int function_selector = 0;

		cell message = begin_cell()     
				.store_uint(10, 32)          
				.end_cell();

		tuple stack = unsafe_tuple([message.begin_parse()]); 

		cell data = begin_cell()             
			.store_uint(0, 64)              
			.end_cell();

		return [function_selector, stack, data, get_c7(), null()];
	}

##Разбираем

`int function_selector = 0;`

Так как мы вызывам `recv_internal()`  мы присваиваем значение 0, почему именно 0? В Fift(а именно в него мы компилируем наши FunC скрипты) есть предопределенные идентификаторы, а именно:
- `main` и `recv_internal` имеют id = 0
- `recv_external` имеют id = -1
- `run_ticktock` имеют id = -2

		cell message = begin_cell()     
				.store_uint(10, 32)          
				.end_cell();

В ячейку message записываем unsigned integer 10 32-бит.

tuple stack = unsafe_tuple([message.begin_parse()]); 

`tuple` ещё один тип данных FunC. 
Tuple (кортеж)- неизменяемый упорядоченный набор произвольных значений типов значений стека.

С помощью `begin_parse()` превращаем ячейку *message *в *slice* и записываем ее в *tuple* используя функцию `unsafe_tuple()`.

		cell data = begin_cell()             
			.store_uint(0, 64)              
			.end_cell();

В управляющий регистр с4  помоложим 0 64-бит.

Остается только вернуть данные:

`return [function_selector, stack, data, get_c7(), null()];`

Как можно видеть, в  с7 положили текущее состояние с7 с помощью `get_c7()` ,а в gas limit integer положим `null()`. 

##### Функция тестов

Код:

	_ test_example(int exit_code, cell data, tuple stack, cell actions, int gas) method_id(1) {
		throw_if(100, exit_code != 0);

		var ds = data.begin_parse();

		throw_if(101, ds~load_uint(64) != 10); 
		throw_if(102, gas > 1000000); 
	}

##Разбираем

`throw_if(100, exit_code != 0);`

Проверям код возврата, функция создаст исключение, если код возврата не равен нулю.
0 - стандартный код возврата из успешного выполнения смарт-контракта.

		var ds = data.begin_parse();

		throw_if(101, ds~load_uint(64) != 10); 

Проверяем, что число которые мы отправляли равно 10, т.е мы отправили число 10 32-бит, а в управляющий регистр с4 по итогу выполнения смарт-контракта записалось 10 64-бит.

А именно создаем исключение, если не 10.

`throw_if(102, gas > 1000000); `

Несмотря на то, что в задаче которую мы решали в первом уроке не было ограничений по использованию газа, в тестах смарт-контрактов важно проверять,  не только логику выполнения, но и то, что логика не приводит к очень большому потреблению газа, иначе контракт будет не жизнеспособен в mainnet.

## Тестируем вызов Get функции

Напишем тест  test_get_total и разберем его код.

##### Функция данных

Начнем с функции данных:


	[int, tuple, cell, tuple, int] test_get_total_data() method_id(2) {
		int function_selector = 128253; 
		
		tuple stack = unsafe_tuple([]); 

		cell data = begin_cell()            
			.store_uint(10, 64)              
			.end_cell();

		return [function_selector, stack, data, get_c7(), null()];
	}
	

##### Разбираем

`int function_selector = 128253; `

Чтобы понять какой id у GET функции, необходимо зайти в скомпилированный смарт-контракт и посмотреть какой id присвоен фукнции. Зайдем в папку build и откроем contract.fif  и найдем там строчку с get_total

`128253 DECLMETHOD get_total`

В случае функции get_total, нам не нужно передавать никакие аргументы, так что просто объявляем пустой кортеж

`tuple stack = unsafe_tuple([]); `

А в c4 запишем 10, для проверки.

		cell data = begin_cell()            
			.store_uint(10, 64)              
			.end_cell();
			
##### Функция тестов

Код:

	_ test_get_total(int exit_code, cell data, tuple stack, cell actions, int gas) method_id(3) {
		throw_if(103, exit_code != 0); 
		int counter = first(stack); 
		throw_if(104, counter != 10); 
	}
	
##### Разбираем

`throw_if(103, exit_code != 0); `

Проверям код возврата.

		int counter = first(stack); 
		throw_if(104, counter != 10); 
		
В нашем тесте нам важно чтобы значение 10, которое мы передали находилось "сверху" стека, поэтому вычитываем с помощью функции first стандартной бибиблиотеки [stdlib.fc](https://ton.org/docs/#/func/stdlib?id=first), которая возвращает первое значение кортежа.

## Тестируем исключение

Напишем тест  test_exception и разберем его код.

##### Функция данных

Начнем с функции данных:

	[int, tuple, cell, tuple, int] test_exception_data() method_id(4) {
		int function_selector = 0;

		cell message = begin_cell()     
				.store_uint(30, 31)           
				.end_cell();

		tuple stack = unsafe_tuple([message.begin_parse()]);

		cell data = begin_cell()            
			.store_uint(0, 64)               
			.end_cell();

		return [function_selector, stack, data, get_c7(), null()];
	}
	
##### Разбираем

Как мы можем видеть отличие от нашего первой функции минимальное, а именно значение которое мы кладем кортеж, 30 31-бит.

		cell message = begin_cell()     
				.store_uint(30, 31)           
				.end_cell();
				
А вот в функции тестов различия уже будут более заметны.

##### Функция тестов

	_ test_exception(int exit_code, cell data, tuple stack, cell actions, int gas) method_id(5) {
		throw_if(100, exit_code == 0);
	}
	
В отличие от других функций тестов здесь мы ожидаем исключения если смарт-контракт будет исполнен успешно

## Прогоняем тесты

Для того, чтобы toncli "понимал", где находятся тесты, необходимо добавить информацию в `project.yaml`. 

	contract:
	  data: fift/data.fif
	  func:
		- func/code.func
	  tests:
		- tests/example.func

Теперь прогоняем тесты командой:

`toncli run_tests`

Должно получиться, следующее:

![toncli get send](./img/run_tests.png)

P.S если есть какие-то вопросы, предлагаю задавать [здесь](https://t.me/ton_learn)
