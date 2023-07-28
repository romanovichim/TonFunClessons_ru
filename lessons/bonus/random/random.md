# Смарт-контракт Лотерея-Розыгрыш

В данном туториале мы разберем смарт-контракт лотерею-розыгрыш. Смарт-контракт хорош тем, что:
- грамотно используется рандом. Подробнее про техническую часть рандома в TON [здесь](https://docs.ton.org/develop/smart-contracts/guidelines/random-number-generation)
- есть важные механики управления балансом контракта, которые можно будет применить в ваших смарт-контрактах
- удобная групировка и структура проекта, патерн которой стоит перенять.


## Проблема рандома

Генерация случайных чисел — может понадобиться во многих разных проектах. В документации FunC есть функция `random()`, но использовать её в реальных проектах нельзя!!! Ее результат можно легко предсказать, если вы не примените некоторые дополнительные приемы.

Чтобы сделать генерацию случайных чисел непредсказуемой, вы можете добавить к начальному значению текущее логическое время, чтобы разные транзакции имели разные начальные значения и результаты.

Сделать это можно с помощью `randomize_lt()`, например:

	randomize_lt();
	int x = random(); ;; users can't predict this number
	
Также можно использовать `randomize()`, прокинув туда несколько парметров включая в себя логическое время.

	() randomize(int x) impure asm "ADDRAND";
	
В данной статье мы рассмотрим контракт розыгрыш, который использует  `randomize()`

## Верхнеуровневый обзор

### Как это работает?

Контракт принимает только сообщения с 1 TON (остальные суммы будут возвращены). Смарт-контракт генерирует случайное число от 0 до 10000, чтобы определить, выиграете вы или нет.

Если человек выигрывает, его выигрыш уменьшается на нашу комиссию в размере 10%. Остальная часть контрактного баланса остается нетронутой. Победитель получит сообщение о выигрыше в комментарии к транзакции.

### Вероятность

- 0,1% на выигрыш джекпота (половина баланса контракта) [0; 10)
- 9,9%, на выигрышь 5 TON. [10; 1000)
- 10% на выигрыш 2 TON. [1000; 2000)

Если нет выигрыша, ничего не происходит. [2000; 9999]

### Структура смарт-контракта

Смарт-контракт представляет собой обработчик внутренних сообщений `recv_internal`, который если тело сообщения пустое, запускает лоттерею/розыгрыш или же выполняет одно из условий по `op`:
- `op == op::add_balance()` добавление баланса, на случай если в контракте закончаться деньги
- `op == op::maintain()` позволяет отправить из контракта внутренее сообщение с разным режимом, т.е позволяет управлять балансом смарт-контракта, а также если что позволит его уничтожить(сообщение с `mode == 128 + 32`)
- `op == op::withdraw()`  позволяет достать часть денег из смарт-контракта - накопленную комиссию

## Стилистика смарт-контракта

В смарт-контракте, который мы рассматриваем, хорошая стилистика:
- смарт-контракт грамотно разнесен на несколько файлов, таким образом, что его очень удобно читать
- работа с хранилищем(речь о регистре `с4` конечно же) комбинируется с глобальными переменными, что опять же улучшает читаемость кода, делая смарт-контракт понятным

Команды `op` и часто используемая переменная в 1 TON вынесена в отдельный файл `const.func`:

	int op::maintain() asm "1001 PUSHINT";
	int op::withdraw() asm "1002 PUSHINT";
	int op::add_balance() asm "1003 PUSHINT";

	int exit::invalid_bet() asm "2001 PUSHINT";

	int 1ton() asm "1000000000 PUSHINT";

В файл  `admin.func` вынесены админские команды, `adm::maintain`, которая позволяет отправить сообщение от смарт-контракта с любым mode - т.е позволяет управлять балансом смарт-контракта:

	() adm::maintain(slice in_msg_body) impure inline_ref {
		int mode = in_msg_body~load_uint(8);
		send_raw_message(in_msg_body~load_ref(), mode);    
	}
	
И `adm::withdraw()` позволяющая вытащить часть денег удобным способом:

	() adm::withdraw() impure inline_ref {
		cell body = begin_cell()
			.store_uint(0, 32)
			.store_slice(msg::commission_withdraw())
			.end_cell();

		cell msg = begin_cell()
			.store_uint(0x18, 6)
			.store_slice(db::admin_addr)
			.store_coins(db::service_balance)
			.store_uint(1, 1 + 4 + 4 + 64 + 32 + 1 + 1)
			.store_ref(body)
			.end_cell();

		db::service_balance = 0;
		send_raw_message(msg, 0);
	}
	
Смарт-контракт отправляет сообщения при пройгрыше и победе, они вынесенны в отдельный файл `msg.func`, заметьте, что они являются типом `slice`:

	slice msg::commission_withdraw()    asm "<b 124 word Withdraw commission| $, b> <s PUSHSLICE";
	slice msg::jackpot()                asm "<b 124 word Congrats! You have won jackpot!| $, b> <s PUSHSLICE";
	slice msg::x2()                     asm "<b 124 word Congrats! You have won x2!| $, b> <s PUSHSLICE";
	slice msg::x5()                     asm "<b 124 word Congrats! You have won x5!| $, b> <s PUSHSLICE";
	
В `game.func` расположена логика розыгрыша/лотереи, код данного файла мы рассмотрим детально, но позже. В смарт-контракте предусмотрен Get-метод, который возвращает информацию из регистра `с4` смарт-контракта. Хранится этот метод в файле `get-methods.func`: 

	(int, int, (int, int), int, int) get_info() method_id {
		init_data();
		return (db::available_balance, db::service_balance, parse_std_addr(db::admin_addr), db::last_number, db::hash);
	}
	
И наконец-то работа с хранилищем в файле `storage.func`. Здесь важно отметить, что данные не сохраняются постоянно в регистр с4, а сначала они сохраняются в глобальные переменные, а потом в конце некоторого логического кода происходит сохранение в регистр c помощью функции `pack_data()`:

	global int init?;

	global int db::available_balance;
	global int db::service_balance;
	global slice db::admin_addr;
	global int db::last_number;
	global int db::hash;


	() init_data() impure {
		ifnot(null?(init?)) {
			throw(0x123);
		}

		slice ds = get_data().begin_parse();

		db::available_balance = ds~load_coins();
		db::service_balance = ds~load_coins();
		db::admin_addr = ds~load_msg_addr();
		db::last_number = ds~load_uint(64);
		db::hash = slice_empty?(ds) ? 0 : ds~load_uint(256);

		init? = true;
	}

	() pack_data() impure {
		set_data(
			begin_cell()
				.store_coins(db::available_balance)
				.store_coins(db::service_balance)
				.store_slice(db::admin_addr)
				.store_uint(db::last_number, 64)
				.store_uint(db::hash, 256)
			.end_cell()
		);
	}
	
## Разберем recv_internal()

Файл `main.fc` начинается с импорта файлов, по которым мы прошлись выше:

	#include "lib/stdlib.func";
	#include "struct/const.func";
	#include "struct/storage.func";
	#include "struct/msg.func";
	#include "struct/game.func";
	#include "struct/admin.func";
	#include "struct/get-methods.func";


	() recv_internal(int my_balance, int msg_value, cell in_msg_full, slice in_msg_body) impure {

	}

Достаем сообщение и функцией [slice_hash](https://docs.ton.org/develop/func/stdlib#slice_hash) создаем хэш, который далее будем использовать для рандома. Также как вы помните, любое сообщение начинается с флагов, сделаем небольшую проверку:

	() recv_internal(int my_balance, int msg_value, cell in_msg_full, slice in_msg_body) impure {
		slice cs = in_msg_full.begin_parse();
		int hash = slice_hash(cs); 
		throw_if(0, cs~load_uint(4) & 1);

	}

Инициализируем данные с помощью вспомогательной функции из файла `storage.func` и здесь же достанем адрес из сообщения:

	() recv_internal(int my_balance, int msg_value, cell in_msg_full, slice in_msg_body) impure {
		slice cs = in_msg_full.begin_parse();
		int hash = slice_hash(cs); 
		throw_if(0, cs~load_uint(4) & 1);

		init_data();

		slice sender_addr = cs~load_msg_addr();

	}
	
Кажется, что дальше логично было бы достать `op`, но для удобства использования смарт-контракта, основной функционал используется без `op`, таким образом пользователь просто отправляет пустое сообщение в контракт и розыгрыш/лотерея начинается. Чтобы реализовать подобный функционал, просто проверяем оставшееся сообщение, если оно пустое, запускаем игру.

	#include "lib/stdlib.func";
	#include "struct/const.func";
	#include "struct/storage.func";
	#include "struct/msg.func";
	#include "struct/game.func";
	#include "struct/admin.func";
	#include "struct/get-methods.func";


	() recv_internal(int my_balance, int msg_value, cell in_msg_full, slice in_msg_body) impure {
		slice cs = in_msg_full.begin_parse();
		int hash = slice_hash(cs); 
		throw_if(0, cs~load_uint(4) & 1);

		init_data();

		slice sender_addr = cs~load_msg_addr();

		if (in_msg_body.slice_empty?()) {
			game::start(sender_addr, msg_value, hash);
			pack_data();
			throw(0);
		}
	}
	
Внутри функции игры мы будем менять данные, которые позже нужно будет сохранить в регистр хранения постоянных данных `с4`, внутри функции менятются глобальные переменные, а в `recv_internal()` мы сохраняем:

	#include "lib/stdlib.func";
	#include "struct/const.func";
	#include "struct/storage.func";
	#include "struct/msg.func";
	#include "struct/game.func";
	#include "struct/admin.func";
	#include "struct/get-methods.func";


	() recv_internal(int my_balance, int msg_value, cell in_msg_full, slice in_msg_body) impure {
		slice cs = in_msg_full.begin_parse();
		int hash = slice_hash(cs); 
		throw_if(0, cs~load_uint(4) & 1);

		init_data();

		slice sender_addr = cs~load_msg_addr();

		if (in_msg_body.slice_empty?()) {
			game::start(sender_addr, msg_value, hash);
			pack_data();
			throw(0);
		}
	}
	
Здесь может возникнуть вопрос, зачем вызывается исключение, после того как все отработало правильно. В соответствии с документацией по [TVM пункт 4.5.1](https://ton.org/tvm.pdf) для исключений есть зарезервированные коды 0–31, совпадающие с [exit_code](https://docs.ton.org/learn/tvm-instructions/tvm-exit-codes), а значит 0 -  cтандартный код завершения успешного выполнения.

Дальше все просто, `op`, смысл которых мы разобрали выше, итоговый код `main.func`:

	#include "lib/stdlib.func";
	#include "struct/const.func";
	#include "struct/storage.func";
	#include "struct/msg.func";
	#include "struct/game.func";
	#include "struct/admin.func";
	#include "struct/get-methods.func";


	() recv_internal(int my_balance, int msg_value, cell in_msg_full, slice in_msg_body) impure {
		slice cs = in_msg_full.begin_parse();
		int hash = slice_hash(cs); 
		throw_if(0, cs~load_uint(4) & 1);

		init_data();

		slice sender_addr = cs~load_msg_addr();

		if (in_msg_body.slice_empty?()) {
			game::start(sender_addr, msg_value, hash);
			pack_data();
			throw(0);
		}

		int op = in_msg_body~load_uint(32);
		int is_admin = equal_slices(sender_addr, db::admin_addr);
		if (op == op::add_balance()) {
			db::available_balance += msg_value;
			pack_data();
			throw(0);
		}

		if (op == op::maintain()) {
			throw_if(0xfffe, is_admin == 0);
			adm::maintain(in_msg_body);
			throw(0);
		}

		if (op == op::withdraw()) {
			throw_if(0xfffd, is_admin == 0);
			adm::withdraw();
			pack_data();
			throw(0);
		}

		throw(0xffff);
	}

## Разберем game.func

Наконец-то мы добрались до логики игры, файл `game.func` начинается со вспомогательной функции выплаты приза:

	() game::payout(slice sender_addr, int amount, slice msg) impure inline_ref {
		cell body = begin_cell()
			.store_uint(0, 32)
			.store_slice(msg)
			.end_cell();

		cell msg = begin_cell()
			.store_uint(0x18, 6)
			.store_slice(sender_addr)
			.store_coins(amount)
			.store_uint(1, 1 + 4 + 4 + 64 + 32 + 1 + 1)
			.store_ref(body)
			.end_cell();

		send_raw_message(msg, 0);
	}  
	
Сама же игра начинается с проверки, что значание присланное в контракт равно `1 TON`:

	() game::start(slice sender_addr, int msg_value, int hash) impure inline_ref {
		throw_unless(exit::invalid_bet(), msg_value == 1ton());
	}

Далее собирается хэш для рандома, собирается он из текущего времени, хэша из регистра `с4`, хэша сформированного в `recv_internal` из сообщения и `cur_lt()` - логического времени текущей транзакции:

	() game::start(slice sender_addr, int msg_value, int hash) impure inline_ref {
		throw_unless(exit::invalid_bet(), msg_value == 1ton());
		int new_hash = slice_hash(
			begin_cell()
				.store_uint(db::hash, 256)
				.store_uint(hash, 256)
				.store_uint(cur_lt(), 64)
				.store_uint(now(), 64)
			.end_cell()
			.begin_parse()
		);
	}
	
С помощью хэша можно сформировать рандом, но прежде чем генерировать рандом с помощью функции `rand()` рандомизируем хэш с помощью [randomize](https://docs.ton.org/develop/func/stdlib/#randomize).

() game::start(slice sender_addr, int msg_value, int hash) impure inline_ref {
    throw_unless(exit::invalid_bet(), msg_value == 1ton());
    int new_hash = slice_hash(
        begin_cell()
            .store_uint(db::hash, 256)
            .store_uint(hash, 256)
            .store_uint(cur_lt(), 64)
            .store_uint(now(), 64)
        .end_cell()
        .begin_parse()
    );

    randomize(new_hash);
	
}

> Отмечу что это одна из возможных вариации реализации рандома, про рандом можно прочитать в документации - https://docs.ton.org/develop/smart-contracts/guidelines/random-number-generation

Для реализации вероятности выйгрыша генерируется число от 0 до 10000, здесь все просто, смотрим в какой перцентиль попало число и в зависимости от этого отправляем или не отпраaвляем выйгрышь:

	() game::start(slice sender_addr, int msg_value, int hash) impure inline_ref {
		throw_unless(exit::invalid_bet(), msg_value == 1ton());
		int new_hash = slice_hash(
			begin_cell()
				.store_uint(db::hash, 256)
				.store_uint(hash, 256)
				.store_uint(cur_lt(), 64)
				.store_uint(now(), 64)
			.end_cell()
			.begin_parse()
		);

		randomize(new_hash);
		db::hash = new_hash;

		int number = rand(10000); ;; [0; 10000)
		db::last_number = number;
		db::available_balance += 1ton();

		if (number < 10) { ;; win 1/2 available balance
			int win = db::available_balance / 2;
			int commission = muldiv(win, 10, 100);
			win -= commission;

			db::available_balance -= (win + commission);
			db::service_balance += commission;

			game::payout(sender_addr, win, msg::jackpot());

			return ();
		}

		if (number < 1000) { ;; win x5
			int win = 5 * 1ton();
			int commission = muldiv(win, 10, 100);
			win -= commission;

			db::available_balance -= (win + commission);
			db::service_balance += commission;
			game::payout(sender_addr, win, msg::x5());

			return ();
		}

		if (number < 2000) { ;; win x2
			int win = 2 * 1ton();
			int commission = muldiv(win, 10, 100);
			win -= commission;

			db::available_balance -= (win + commission);
			db::service_balance += commission;
			game::payout(sender_addr, win, msg::x2());

			return ();
		}

	}

## Заключение 

Подобные туториалы и разборы по сети TON я пишу в свой канал - https://t.me/ton_learn . Буду рад вашей подписке.


