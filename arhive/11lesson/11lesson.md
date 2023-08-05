# Урок 11 Новые тесты на FunC для смарт-контрактов в toncli

## Введение

В toncli появились новые тесты, в этом уроке мы напишем тесты для смарт-контракта на языке FUNC в новом стиле и выполним их с помощью [toncli](https://github.com/disintar/toncli).

## Требования

Для прохождения данного урока вам необходимо установить интерфейс для командной строки [toncli](https://github.com/disintar/toncli/blob/master/INSTALLATION.md) и пройти [первый урок](https://github.com/romanovichim/TonFunClessons_ru/blob/main/1lesson/firstlesson.md)  и [второй урок](https://github.com/romanovichim/TonFunClessons_ru/blob/main/2lesson/secondlesson.md).

> Данный урок пишется 23.08.2022 на данный момент новые тесты доступны в dev версии func/fift. Как установить dev версию описано в [инструкции к новым тестам](https://github.com/disintar/toncli/blob/master/docs/advanced/func_tests_new.md).

## Что будем тестировать

В данном уроке мы будем тестировать смарт-контракт, похожий на тот, что был в первом уроке.  Так, что прежде чем, перейти к тестам, рассмотрим сам контракт.

Смарт-контракт, который мы будем делать, должен обладать следующей функциональностью:

- хранить в своих данных целое число total - 64-битное число без знака;
- при получении внутреннего входящего сообщения контракт, должен взять 32-битное целое число без знака из тела сообщения, добавить его к total и сохранить в данных контракта;
- в смарт-контракте должен быть предусмотрен метод get total позволяющий вернуть значение total

Код смарт-контракта:

	() recv_internal(slice in_msg) impure {
	  int n = in_msg~load_uint(32);

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

> Если в данном смарт-контракте вам что-то не понятно, советую пройти первый урок.

## Приступаем к тестам 

В старых тестах нам приходилось писать две функции: функцию данных и функцию тестов, а также указывать id функции для того, чтобы тесты понимали к чему относятся тесты. В новых тестах такой логики нет.

В новых тестах, тестирование происходит за счёт двух функций, которые позволяют вызывать методы смарт-контракта:
- `invoke_method` , который предполагает, что не будет вызвано исключение
- `invoke_method_expect_fail`, который предполагает, что исключение будет вызвано

Эти специальные функции, мы будем вызывать внутри функций тестов, который могут возвращать любое количество значений, все они будут выводиться при прогоне тестов в отчете.

Имя каждой тестовой функции должно начинаться с `__test `. Таким образом мы можем определить, какие функции являются тестами, а какие просто помощниками.

Посмотрим, на примерах как это работает.

### Тестируем отправку сообщения и проверку по сумме

Назовем нашу тестовую функцию `__test_example()`, возвращать она будет сумму израсходованного газа, поэтому она будет `int`.

	int __test_example() {

	}

Так как в нашем уроке мы будем писать много тестов, нам часто придется обнулять регистр `с4`, поэтому создадим вспомогательную функцию, которая будет записывает `с4` ноль. (В её названии не будет  `__test `).

Делать это мы будем с помощью функций [стандартной библиотеки FunC ](https://ton-blockchain.github.io/docs/#/func/stdlib)

`set_data(begin_cell().store_uint(total, 64).end_cell());` 

`begin_cell()` - создаст Builder для будущей ячейки
`store_uint()`- запишет значение total
`end_cell()`- создать Cell (ячейку)
`set_data()` - запишет ячейку в регистр с4

Получаем код:

	() set_default_initial_data() impure {
	  set_data(begin_cell().store_uint(0, 64).end_cell());
	}
	
`impure` — ключевое слово, которое указывает на то, что функция изменяет данные смарт-контракта.

> Если не указано `impure` и результат вызова функции не используется, то компилятор FunC может удалить этот вызов функции.

Вызовем вспомогательную функцию в нашей тестовой функции:

	int __test_example() {
		set_default_initial_data();

	}

Одной из удобных фичей новых тестов, является то, что внутри одной функции тестов, можно вызывать несколько методов смарт-контракта. Внутри нашего теста мы вызовем метод `recv_internal()` и Get-метод, таким образом мы увеличим сообщением значение в `c4` и сразу же проверим, что значение поменялось на отправленное.

Для вызова метода `recv_internal()` нам нужно собрать ячейку с сообщением.

	int __test_example() {
		set_default_initial_data();

		cell message = begin_cell().store_uint(10, 32).end_cell();

	}
	
Теперь можно вызывать методы, использовать мы будем `invoke_method`. `invoke_method` принимает два аргумента: имя метода и аргументы (которые будут переданы методу) в виде кортежа. Возвращаются два значения: использованный газ и значения, возвращаемые методом (в виде кортежа). Если вызов метода приводит к исключению, `invoke_method` также закончиться исключением, и тест завершится ошибкой.

В первом вызове аргументами будут `recv_internal` и кортеж с сообщением трансформированным в slice c помощью `begin_parse()`

`var (int gas_used1, _) = invoke_method(recv_internal, [message.begin_parse()]);`

Для отчета сохраним количество использованного газа в `int gas_used1`.

Во втором вызове аргументами будут Get-метод `get_total()` и пустой кортеж. 

`var (int gas_used2, stack) = invoke_method(get_total, []);`

Для отчета также сохраним количество использованного газа в `int gas_used2`, плюс значения, которые вернет метод, чтобы проверить в дальнейшем, что все выполнилось правильно.

Получаем:

	int __test_example() {
		set_default_initial_data();

		cell message = begin_cell().store_uint(10, 32).end_cell();
		var (int gas_used1, _) = invoke_method(recv_internal, [message.begin_parse()]);
		var (int gas_used2, stack) = invoke_method(get_total, []);

	}
	
Проверим, что значение, которое вернула invoke_method во втором вызове равно, значению, которые мы отправляли. Выдадим исключение, если это не так. И в конце вернем сумму израсходованного газа.

	int __test_example() {
		set_data(begin_cell().store_uint(0, 64).end_cell());
		cell message = begin_cell().store_uint(10, 32).end_cell();
		var (int gas_used1, _) = invoke_method(recv_internal, [message.begin_parse()]);
		var (int gas_used2, stack) = invoke_method(get_total, []);
		[int total] = stack;
		throw_if(101, total != 10);
		return gas_used1 + gas_used2;
	}
	
Это весь тест, очень удобно.

### Данные в с4 и новые тесты

По умолчанию "постоянные" данные не копируются из предыдущей тестовой функции.

Проверим это следующим тестом.

##### Вызовем метод get метод без данных в c4

Так как мы предполагаем, что метод приведет к исключению, будем использовать `invoke_method_expect_fail`. Он принимает два аргумента так же, как и invoke_method, но возвращает только количество газа, использованного методом.

	int __test_no_initial_data_should_fail() {
		int gas_used = invoke_method_expect_fail(get_total, []);
		return gas_used;
	}
	
##### Вызовем метод get метод c данными из предыдущих тестов в c4

Теперь чтобы показать, как можно работать с данным в `с4` в разных тестовых функциях, вызовем первый тест (он даст данные для `с4`) и воспользуемся специальной функцией для тестов `get_prev_c4()` 

Вызываем первый тест `__test_example()`:

	int __test_set_data() {
	  return __test_example();
	}
	
Теперь просто скопируем первый тест, заменив отправку сообщения с числом 10, на `set_data(get_prev_c4());`

	int __test_data_from_prev_test() {
		set_data(get_prev_c4());
		var (int gas_used, stack) = invoke_method(get_total, []);
		var [total] = stack;
		throw_if(102, total != 10);
		return gas_used;
	}
	

> Конечно мы можем брать данные из предыдущих тестовых функций для `с4` и `с5`, используя `get_prev_c4()` и `get_prev_c5()` соответственно, но хорошей практикой является написание вспомогательных функций (как мы это сделали в самом начале) и использование их в разных тестовых функциях.

### Исключения invoke методов и исключения тестовых функции

Важно отметить, что исключения, вызываемые invoke методами, это не повлияет на набор тестов внутри. Проверим, что значение переменной не поменяется, если после её объявления `invoke_method_expect_fail` вызовет исключение.

Каркас функции это теста:

	int __test_throw_doesnt_corrupt_stack() {
		int check_stack_is_not_corrupted = 123;

	}

Как вы можете увидеть в стек мы положили число 123. Теперь вызовем Get-метод нашего смарт-контракта, предполагая, что это приведет к исключению, так как в `с4` нет данных.

	int __test_throw_doesnt_corrupt_stack() {
		int check_stack_is_not_corrupted = 123;
		int gas_used = invoke_method_expect_fail(get_total, []);

	}

И в самом конце проверим, что значение не поменялось.

	int __test_throw_doesnt_corrupt_stack() {
		int check_stack_is_not_corrupted = 123;
		int gas_used = invoke_method_expect_fail(get_total, []);

		throw_if(102, check_stack_is_not_corrupted != 123);
		return gas_used;
	}
	
### Тестируем типы

Посмотрим, как в новых тестах можно протестировать типы. Для этого напишем вспомогательную функцию, которая будет хранить число и ячейку с двумя числами.

> Да, invoke методами можно вызывать вспомогательные функции)

Первое число определим сразу, а вторые два будем передавать в функцию.

	(int, cell) build_test_cell(int x, int y) {
	  return (12345, begin_cell().store_uint(x, 64).store_uint(y, 64).end_cell());
	}
	
Соберем каркас тестовой функции и сразу вызовем вспомогательную:

	int __test_not_integer_return_types() {
	  var (int gas_used, stack) = invoke_method(build_test_cell, [100, 500]);

	}
	
Достаем значения, а именно число и ячейку `[int res, cell c] = stack;`, сразу же проверяем значение числа `throw_if(102, res != 12345);`.Получаем:

	int __test_not_integer_return_types() {
	  var (int gas_used, stack) = invoke_method(build_test_cell, [100, 500]);
	  [int res, cell c] = stack;
	  throw_if(102, res != 12345);

	}
	
Преобразуем ячейку в слайс с помощью `begin_parse`. И теперь вычитывая значения, проверяем значения. Вычитывать будем с помощью `load_uint` - функции из [стандартной библиотеки FunC](https://ton-blockchain.github.io/docs/#/func/stdlib) она загружает целое число n-бит без знака из слайса.

	int __test_not_integer_return_types() {
	  var (int gas_used, stack) = invoke_method(build_test_cell, [100, 500]);
	  [int res, cell c] = stack;
	  throw_if(102, res != 12345);
	  slice s = c.begin_parse();
	  throw_if(103, s~load_uint(64) != 100);
	  throw_if(104, s~load_uint(64) != 500);
	  return gas_used;
	}
	
В самом конец возвращаем использованный газ.

### Пример тестирования расхода газа

Так как invoke методы возвращают потребление газа, это делает очень удобно проверку расхода газа в новых тестах. Посмотрим, как это работает, вызвав пустую вспомогательную функцию.

Пустая функция:

	() empty_method() inline method_id {

	}

Вызов пустой функции стоит примерно 600 единиц газа. Каркас теста:

	int __test_empty_method_gas_consumption() method_id {

	}

С помощью `invoke_method` вызовем функцию и проверим, что расхода газа не меньше 400, но и не больше 700.

	int __test_empty_method_gas_consumption() method_id {
	  var (int gas_used, _) = invoke_method(empty_method, []);
	  throw_if(101, gas_used < 500);
	  throw_if(102, gas_used > 700);
	  return gas_used;
	}

### Возвращаем несколько значений

Вернемся к нашему смарт-контракту и воспользуемся тем, что в новые тесты могут возвращать несколько значений. Чтобы вернуть несколько значений нужно положить их в кортеж. Попробуем отправить три одинаковых сообщения в смарт-контракт.

Каркас функции:

	[int, int, int] __test_can_return_complex_type_from_test() {

	}

"Стартовое состояние" зададим с помощью вспомогательной функции `set_default_initial_data()`, которую мы написали для первого теста. Также соберем ячейку сообщения.

	[int, int, int] __test_can_return_complex_type_from_test() {
	  set_default_initial_data();

	  cell message = begin_cell().store_uint(10, 32).end_cell();

	}

Осталось дело за малым, отправим три раза сообщение и "обернем", вернувшиеся значения газа в кортеж.

	[int, int, int] __test_can_return_complex_type_from_test() {
	  set_default_initial_data();

	  cell message = begin_cell().store_uint(10, 32).end_cell();

	  (int gas_used1, _) = invoke_method(recv_internal, [message.begin_parse()]);
	  (int gas_used2, _) = invoke_method(recv_internal, [message.begin_parse()]);
	  (int gas_used3, _) = invoke_method(recv_internal, [message.begin_parse()]);

	  return [gas_used1, gas_used2, gas_used3];
	}

### Цепочки тестов 

Новые тесте позволяют создавать цепочки тестов, благодаря тому, что данные которые они возвращают остаются в стеке.

> То есть данные в с4 не остаются после выполнения тестовой функции, об этом мы говорили, но в стек положить данные можно

Положим одной тестовой функцией три числа в стек.

	(int, int, int) __test_can_return_more_than_one_stack_entry() {
	  return (1, 2, 3);
	}

А другой проверим, что в стеке есть значения. Для этого нам понадобиться вспомогательная функция, которая вернет текущую глубину стека.

Напомню, FunC поддерживает определение функции на ассемблере (имеется ввиду Fift). Происходит это следующим образом - мы определяем функцию как низкоуровневый примитив TVM. Для функции, которая вернет текущую глубину стека, это будет выглядеть так:

	int stack_depth() asm "DEPTH";

Как вы можете видеть, используется ключевое слово `asm` 

Посмотреть список возможных примитивов можно с 77 страницы в [TVM](https://ton-blockchain.github.io/docs/tvm.pdf).

Итак, проверим, что глубина стека не равна нулю.

	int __test_check_stack_depth_after_prev_test() {
	  int depth = stack_depth();
	  throw_if(100, depth != 0);
	  return 0;
	}
	
Благодаря такой механике, можно реализовать сложную цепочку тестов.

## Заключение

Новые тесты в `toncli`, значительно упрощают тестирование смарт-контрактов в сети TON, что позволит быстро и что самое важное качественно разрабатывать приложения для сети TON.  Уроки и статьи про техническую составляющую сети TON, я пишу [здесь](https://t.me/ton_learn), буду рад вашей подписке.
