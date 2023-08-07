# Chatbot Smart Contract

## Вступление

В данном туториале мы разберем смарт-контракт чат-бот. Который понадобиться нам для того, чтобы разобраться как смотерть транзакции в тестах и для onchain тестов.

## Про TON 

TON представляет собой [модель актора](https://en.wikipedia.org/wiki/Actor_model) - это математическая модель параллельных вычислений, которая лежит в основе смарт-контрактов TON. В нем каждый смарт-контракт может получить одно сообщение, изменить собственное состояние или отправить одно или несколько сообщений в единицу времени.

Чаще всего для создания полноценного приложения на TON нужно писать несколько смарт-контрактов, которые как бы общаются друг с другом с помощью сообщений. Чтобы контракт понимал, что ему надо делать, когда в него приходит сообщение, рекомендуется использовать `op`. `op` - 32-битный идентификатор, который стоит передавать в теле сообщения.

Таким образом, внутри сообщения с помощью условных операторов, в зависимоти от смарт-контракт `op` выполняет разные действия.

Поэтому важно уметь тестировать сообщения, чем мы сегодня и займемся.

Смарт-контракт чат-бот получает любое internal сообщение и отвечает на него internal сообщение с текстом reply. 

## Разбираем контракт

##### Стандартная бибилиотека

Первое, что надо сделать, это [импортировать стандартную библиотеку](https://ton-blockchain.github.io/docs/#/func/stdlib). Библиотека представляет собой просто оболочку для наиболее распространенных команд TVM (виртуальной машины TON), которые не являются встроенными.

	#include "imports/stdlib.fc";

Для обработки внутренних сообщений, нам понадобиться метод`recv_internal()`


    () recv_internal()  {

    }
	
	
##### Аргументы внешнего метода
Здесь возникает логичный вопрос - как понять какие аргументы должны быть у фукнции, чтобы она могла принимать сообщения в сети TON?

В соответствии с  документацией [виртуальной машины TON - TVM](https://ton-blockchain.github.io/docs/tvm.pdf), когда на счете в одной из цепочек TON происходит какое-то событие, оно вызывает транзакцию. 

Каждая транзакция состоит из до 5 этапов. Подробнее [здесь](https://ton-blockchain.github.io/docs/#/smart-contracts/tvm_overview?id=transactions-and-phases).

Нас интересует **Compute phase**. А если быть конкретнее, что "в стеке" при инициализации. Для обычных транзакций, вызванных сообщением, начальное состояние стека выглядит следующим [образом](https://ton-blockchain.github.io/docs/#/smart-contracts/tvm_overview?id=initialization-of-tvm):

5 элементов:
- Баланс смарт-контракта(в наноТонах)
- Баланс входящего сообщения (в наноТонах)
- Ячейка с входящим сообщеним 
- Тело входящего сообщения, тип слайс
- Селектор функции (для recv_internal это 0)

    () recv_internal(int balance, int msg_value, cell in_msg_full, slice in_msg_body)  {

    }
	
Но необъязательно прописывать все аргументы `recv_internal()`. Устанавливая аргументы в `recv_internal()`, мы сообщаем коду смарт-контракта о некоторых из них. Те аргументы, о которых код не будет знать, будут просто лежать на дне стека, так и не тронутые. Для нашего  смарт-контракта это:

	() recv_internal(int msg_value, cell in_msg, slice in_msg_body) impure {

	}

##### Газ для обработки сообщений

Нашему смарт-контракту нужно будет использовать газ для дальнейшей отправки сообщения, поэтому будем проверять с каким msg_value пришло сообщение, если оно очень маленькое ( меньше 0.01 TON) закончим выполнение смарт-контракта с помощью `return()`.

	#include "imports/stdlib.fc";

	() recv_internal(int msg_value, cell in_msg, slice in_msg_body) impure {

	  if (msg_value < 10000000) { ;; 10000000 nanoton == 0.01 TON
		return ();
	  }
	  

	}

##### Достаем адрес

Чтобы отправить сообщение обратно, нужно достать адрес того, кто нам его отправил. Для этого нужно разобрать ячейку `in_msg`.

Чтобы мы могли взять адрес, нам необходимо преобразовать ячейку в слайс c помощью `begin_parse`:

	var cs = in_msg_full.begin_parse();

Теперь нам надо "вычитать" до адреса полученный slice. С помощью `load_uint` функции из [стандартной бибилотеки FunC ](https://ton-blockchain.github.io/docs/#/func/stdlib) она загружает целое число n-бит без знака из слайса, "вычитаем" флаги.

	var flags = cs~load_uint(4);

В данном уроке мы не будем останавливаться подробно на флагах, но подробнее можно прочитать в пункте [3.1.7](https://ton-blockchain.github.io/docs/tblkch.pdf).

Ну и наконец-то адрес. Используем `load_msg_addr()` - которая загружает из слайса единственный префикс, который является допустимым MsgAddress.

	  slice sender_address = cs~load_msg_addr(); 
	  
Получаем:

	#include "imports/stdlib.fc";

	() recv_internal(int msg_value, cell in_msg, slice in_msg_body) impure {

	  if (msg_value < 10000000) { ;; 10000000 nanoton == 0.01 TON
		return ();
	  }
	  
	  slice cs = in_msg.begin_parse();
	  int flags = cs~load_uint(4); 
	  slice sender_address = cs~load_msg_addr(); 

	}
	

##### Отправка сообщения

Теперь нужно отправить сообщение обратно

##### Структура сообщения 

С полной структурой сообщения можно ознакомиться [здесь - message layout](https://ton-blockchain.github.io/docs/#/smart-contracts/messages?id=message-layout). Но обычно нам нет необходимости контролировать каждое поле, поэтому можно использовать краткую форму из [примера](https://ton-blockchain.github.io/docs/#/smart-contracts/messages?id=sending-messages):

	 var msg = begin_cell()
		.store_uint(0x18, 6)
		.store_slice(addr)
		.store_coins(amount)
		.store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
		.store_slice(message_body)
	  .end_cell();

Как вы можете видеть для построения сообщения используются функции [стандартной библиотеки FunC](https://ton-blockchain.github.io/docs/#/func/stdlib). А именно фукнции "обертки" примитивов Builder (частично построенных ячеек как вы можете помнить из первого урока). Рассмотрим:

 `begin_cell()`  - создаст Builder для будущей ячейки
 `end_cell()` - создаст Cell (ячейку)
 `store_uint` - сохранит uint в Builder
 `store_slice` - сохранит слайс в Builder
 `store_coins`- здесь в документации имеется ввиду  `store_grams` - используемой для хранения TonCoins. Подробнее [здесь]( https://ton-blockchain.github.io/docs/#/func/stdlib?id=store_grams).

##### Message body

В тело сообщения мы положим `op` и наше сообщение `reply`, чтобы положить сообщение, нужно сделать `slice`.

	  slice msg_text = "reply"; 

В рекомендациях о теле сообщения, есть рекомендация добавлять `op`, несмотря на то, что здесь он не будет нести, какой-то функциональности, мы его добавим.

Чтобы мы могли создавать подобие клиент-серверной архитектуры на смарт-контрактах описанной в рекомендациях, предлагается начинать каждое сообщение(строго говоря тело сообщения) с некоторого  флага `op`, который будет идентифицировать какую операцию должен выполнить смарт-контракт.

Положим в наше сообщение `op` равный 0.

Получим:

	#include "imports/stdlib.fc";

	() recv_internal(int msg_value, cell in_msg, slice in_msg_body) impure {

	  if (msg_value < 10000000) { ;; 10000000 nanoton == 0.01 TON
		return ();
	  }
	  
	  slice cs = in_msg.begin_parse();
	  int flags = cs~load_uint(4); 
	  slice sender_address = cs~load_msg_addr(); 

	  slice msg_text = "reply"; 

	  cell msg = begin_cell()
		  .store_uint(0x18, 6)
		  .store_slice(sender_address)
		  .store_coins(100) 
		  .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
		  .store_uint(0, 32)
		  .store_slice(msg_text) 
	  .end_cell();

	}

Сообщение готово, отправим его.

##### Режим отправки сообщения(mode)

Для отправки сообщений используется  `send_raw_message` из [стандартной библиотеки](https://ton-blockchain.github.io/docs/#/func/stdlib?id=send_raw_message).

Переменную msg мы уже собрали, остается разобраться `mode`. Описание каждого режиме есть в [документации](https://ton-blockchain.github.io/docs/#/func/stdlib?id=send_raw_message). Мы же рассмотрим на примере, чтобы было понятнее.

Пускай на балансе смарт-контракта 100 монет и мы получаем internal message c 60 моентами и отсылаем сообщение с 10, общий fee 3.

 `mode = 0`  - баланс (100+60-10 = 150 монет), отправим(10-3 = 7 монет)
 `mode = 1`  - баланс (100+60-10-3 = 147 монет), отправим(10 монет) 
 `mode = 64` - баланс (100-10 = 90 монет), отправим (60+10-3 = 67 монет)
 `mode = 65` - баланс (100-10-3=87 монет), отправим (60+10 = 70 монет)
 `mode = 128` -баланс (0 монет), отправим (100+60-3 = 157 монет)

Как мы выберем `mode`, пойдем по [документации](https://docs.ton.org/develop/smart-contracts/messages#message-modes):

- Мы отправляем обычное сообщение, значит mode 0.
- Оплачивайть комиссию за перевод будем отдельно от стоимости сообщения, значит +1.
- Будем также игнорировать любые ошибки, возникающие при обработке этого сообщения на action phase, значит +2.

Получаем `mode` == 3, итоговый смарт-контракт:


	#include "imports/stdlib.fc";

	() recv_internal(int msg_value, cell in_msg, slice in_msg_body) impure {

	  if (msg_value < 10000000) { ;; 10000000 nanoton == 0.01 TON
		return ();
	  }
	  
	  slice cs = in_msg.begin_parse();
	  int flags = cs~load_uint(4); 
	  slice sender_address = cs~load_msg_addr(); 

	  slice msg_text = "reply"; 

	  cell msg = begin_cell()
		  .store_uint(0x18, 6)
		  .store_slice(sender_address)
		  .store_coins(100) 
		  .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
		  .store_uint(0, 32)
		  .store_slice(msg_text) 
	  .end_cell();

	  send_raw_message(msg, 3);
	}
	

## hexBoC

Прежде чем деплоить смарт-контракт, нужно его скомпилировать в hexBoС, давайте возьмем проект из предыдущего туторила.

Переименуем `main.fc` в `chatbot.fc` и запишем в него наш смарт-контракт.

Так как мы изменили имя файла, нужно модернизировать и `compile.ts`:

	import * as fs from "fs";
	import { readFileSync } from "fs";
	import process from "process";
	import { Cell } from "ton-core";
	import { compileFunc } from "@ton-community/func-js";

	async function compileScript() {

		const compileResult = await compileFunc({
			targets: ["./contracts/chatbot.fc"], 
			sources: (path) => readFileSync(path).toString("utf8"),
		});

		if (compileResult.status ==="error") {
			console.log("Error happend");
			process.exit(1);
		}

		const hexBoC = 'build/main.compiled.json';

		fs.writeFileSync(
			hexBoC,
			JSON.stringify({
				hex: Cell.fromBoc(Buffer.from(compileResult.codeBoc,"base64"))[0]
					.toBoc()
					.toString("hex"),
			})

		);

		console.log("Compiled, hexBoC:"+hexBoC);

	}

	compileScript();

Скомпилируйте смарт-контракт командой `yarn compile`.

Теперь у вас есть `hexBoC` представление смарт-контракта. 

## Заключение

В следующем туториале мы напишем тесты.
