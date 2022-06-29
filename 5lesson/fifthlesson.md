# Урок 5 Запоминаем Адрес и идентифицируем операцию
## Введение

В этом уроке мы напишем смарт-контракт, который умеет производить разные операции в зависимости от флага, в тестовой сети The Open Network на языке FUNC, задеплоим его в тестовую сеть с помощью [toncli](https://github.com/disintar/toncli), а протестируем его уже в следующем уроке.

## Требования

Для прохождения данного урока вам необходимо установить интерфейс для командной строки [toncli](https://github.com/disintar/toncli/blob/master/INSTALLATION.md).

А также уметь создавать/деплоить проект с помощтю toncli, научиться этому можно в [первом уроке](https://github.com/romanovichim/TonFunClessons_ru/blob/main/1lesson/firstlesson.md).

## Op - для идентификации  операции

Прежде чем, рассматривать что за смарт-контракт мы будем делать в этом уроке, предлагаю изучить [рекомендации](https://ton.org/docs/#/howto/smart-contract-guidelines?id=smart-contract-guidelines) о теле сообщения смарт-контракта(`message body;`).

Чтобы мы могли создавать подобие клиент-серверной архитектуры на смарт-контрактах описанной в рекомендациях, предлагается начинать каждое сообщение(строго говоря тело сообщения) с некоторого  флага `op`, который будет идентифицировать какую операцию должен выполнить смарт-контракт.

В этом уроке мы будем делать смарт-контракт, который выполняет различные действия в зависимости от `op`.

## Смарт-контракт

Задача смарт-контракта будет запоминать адрес, устанавливаемый менеджером и сообщать его всем, кто запросит, в частности следующая функциональность**:
-  когда контракт получает сообщение от Менеджера с `op` равным 1
  за которым следует какой-то `query_id`, за которым следует  `MsgAddress`, он должен сохранить полученный адрес в хранилище.
- когда контракт получает внутреннее сообщение с любого адреса с  `op`, равным 2, за которым следует `query_id`, он должен ответить отправителю сообщением с телом, содержащим:
  -  `op` равна 3
  - тот же `query_id`
  - Адрес менеджера
  - Адрес, который был запомнен с момента последнего запроса менеджера (пустой адрес `addr_none`, если еще не было запроса менеджера)
  - Значение TON, прикрепленное к сообщению за вычетом платы за обработку.
- когда смарт-контракт получает любое другое сообщение, он должен выдать исключение.

** идеи для смарт контрактов я решил брать из задач [FunC contest1](https://github.com/ton-blockchain/func-contest1), так как они очень хорошо подходят для ознакомления с разработкой смарт-контрактов для TON.


## Структура смарт-контракта

##### Внешний метод

Для того, чтобы наша прокси могла принимать сообщения будем использовать внешний метод`recv_internal()`

    () recv_internal()  {

    }
	
##### Аргументы  внешнего метода
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
	
##### Внутри  метода

Внутри метода мы из аргументов функции возьмем `op` , `query_id`, и адрес отправителя `sender_address`, а потом с помощью условных операторов построим логику вокруг `op`.

	() recv_internal (int balance, int msg_value, cell in_msg_full, slice in_msg_body) {
	 ;; возьмем  op , query_id, и адрес отправителя sender_address

	  if (op == 1) {
		;; здесь будем сохранять адрес полученный от менеджера
	  } else {
		if (op == 2) {
		  ;; отправка сообщения
		} else {
		   ;; здесь будет исключение
		}
	  }
	}
	

## Вспомогательные функции

Давайте подумаем, какую функциональность можно вынести в функции?

- сравнение адресов, чтобы при op равному 1 проверить, что запрос пришел от Менеджера.
- выгрузка и загрузка адреса менеджера и адреса, который мы сохраняем в контракте в регистре c4.
- спарсить адрес отправителя из входящего сообщения.

##### Сравнение адресов

FunC поддерживает определение функции на ассемблере(имеется ввиду Fift). Происходит это следующим образом - мы определяем функцию как низкоуровневый примтив TVM. Для функции сравнения это будет выглядеть так:

	int equal_slices (slice a, slice b) asm "SDEQ";

Как вы можете видеть, используется ключевое слово `asm` 

Посмотреть список возможных примитивов можно с 77 страницы в [TVM](https://ton-blockchain.github.io/docs/tvm.pdf).

##### Выгрузить адреса из регистра с4

Хранить адреса мы будем в слайсах, но исходя из задачи хранить нам предстоит два адреса, адрес Менеджера, для проверки и адрес, который пришлет менеджер для хранения. Поэтому слайсы будем возвращать в кортеже.

Для того чтобы "достать" данные из с4 нам понадобятся две функции из [стандартной библиотеки FunC ](https://ton.org/docs/#/func/stdlib) .

А именно:
`get_data`   - берет ячейку из c4 регистра.
`begin_parse` -   ячейку преобразует в slice 

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

В прошлых уроках мы уже использовали спецификатор `inline`, который  фактически подставляет код в каждом месте вызова функции. В этом уроке рассмотрим, зачем это необходимо с практической точки зрения.

Как мы знаем из [документации](https://ton.org/docs/#/smart-contracts/fees) комиссия за транзакцию состоит из:

 - storage_fees - комиссия за место в блокчейне.
 - in_fwd_fees - комиссия за импорт сообщений(это случай когда обрабатываем `external` messages).
 - computation_fees - комиссии за выполнение инструкций TVM.
 - action_fees -  комиссии, связанная с обработкой списка действий (например отправка сообщений).
 - out_fwd_fees - комиссия за импорт исходящих сообщений.
 
 Подробнее [здесь](https://ton-blockchain.github.io/docs/tvm.pdf).
 Собственно спецификатор `inline` позволяет сэкономить **computation_fee**.
 
По умолчанию, когда у вас есть функция funC, она получает свой собственный идентификатор, хранящийся в отдельном словаре id->function, и когда вы вызываете ее где-то в программе, происходит поиск функции в словаре и последующий переход.

Спецификатор же `inline`  помещает тело функции прямо в код родительской функции.

Поэтому если функция используется только один или два раза, часто гораздо дешевле объявить эту функцию `inline`, то есть встроенной, так как переход к ссылке намного дешевле, чем поиск и переход по словарю.


##### Загрузить адреса в регистр с4

Конечно же по мимо выгрузки нужна загрузка. Сделаем функцию, которая сохраняет адрес менеджера и адрес который менеджер отправит:

	() save_data (slice manager_address, slice memorized_address) impure inline {
		 
	}
	
Замечу, что фукнция имеет [спецификатор](https://ton.org/docs/#/func/functions?id=specifiers) `impure`. И мы должны указать `impure` спецификатор, если функция может изменять хранилище контракта. Иначе компилятор FunC может удалить этот вызов функции.

Для того чтобы "сохранить" данные из с4 нам понадобятся функции из [стандартной библиотеки FunC ](https://ton.org/docs/#/func/stdlib) .

А именно:

`begin_cell()` - создаст Builder для будущей ячейки
`store_slice()` - cохранит  Slice(слайс) в Builder
`end_cell()` - создат Cell (ячейку)

`set_data()`   - запишет ячейку в регистр с4

Собираем ячейку:

	begin_cell().store_slice(manager_address).store_slice(memorized_address).end_cell()
Загружаем её в c4:

	set_data(begin_cell().store_slice(manager_address).store_slice(memorized_address).end_cell());
Итого получим следующую функцию:

	() save_data (slice manager_address, slice memorized_address) impure inline {
		  set_data(begin_cell().store_slice(manager_address).store_slice(memorized_address).end_cell());
	}
	

##### Парсим адрес отправителя из входящего сообщения

Объявим функцию, с помощью который мы сможем достать адрес отправителя из ячейки сообщения.  Функция будет возвращать слайс, так как сам адрес мы будем брать с помощью  `load_msg_addr()` - которая загружает из слайса единственный префикс, который является допустимым MsgAddress и возвращает его в слайс.

	slice parse_sender_address (cell in_msg_full) inline {
	
	  return sender_address;
	}

Теперь используя уже знакомую нам `begin_parse`  преобразуем ячейку в слайс.

	slice parse_sender_address (cell in_msg_full) inline {
	  var cs = in_msg_full.begin_parse();

	  return sender_address;
	}

Начинаем "вычитывать" ячейку с помощью `load_uint`, функции из [стандартной библиотеки FunC ](https://ton.org/docs/#/func/stdlib) она загружает целое число n-бит без знака из слайса.

В данном уроке мы не будем останавливаться подробно на флагах, но подробнее можно прочитать в пункте [3.1.7](https://ton-blockchain.github.io/docs/tblkch.pdf).
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
		 ;; возьмем  op , query_id, и адрес отправителя sender_address

		  if (op == 1) {
			;; здесь будем сохранять адрес полученный от менеджера
		  } else {
			if (op == 2) {
			  ;; отправка сообщения
			} else {
			   ;; здесь будет исключение
			}
		  }
		}
		
Осталось только наполнить `recv_internal()`.

##Наполняем  внешний метод

##### Берем op , query_id, и адрес отправителя sender_address

Из тела сообщения вычитаем op , query_id соответственно. По  [рекомендациям](https://ton.org/docs/#/howto/smart-contract-guidelines?id=smart-contract-guidelines) это 32 и 64 битные значения.

А также с помощью функции  `parse_sender_address()`, которую мы написали выше возьмем адрес отправителя.

		() recv_internal (int balance, int msg_value, cell in_msg_full, slice in_msg_body) {
		int op = in_msg_body~load_int(32);
		int query_id = in_msg_body~load_uint(64);
		var sender_address = parse_sender_address(in_msg_full);
		   
		  if (op == 1) {
			;; здесь будем сохранять адрес полученный от менеджера
		  } else {
			if (op == 2) {
			  ;; отправка сообщения
			} else {
			   ;; здесь будет исключение
			}
		  }
		}

##### Флаг op == 1

В соответствии с заданием при флаге 1,  мы должны получив адреса менеджера и сохраненный адрес, проверить что адрес отправителя равен адресу менеджера(только менеджер может менять адрес) и сохранить новый адрес, который храниться в теле сообщения.

Загрузим из с4 адрес менеджера  `manager_address` и сохраненный адрес `memorized_address)` используя функцию `load_data()` написанную ранее.

	(slice manager_address, slice memorized_address) = load_data();

Используя функцию `equal_slices` и унарный оператор `~`, который является побитовым не, проверяем равенство адрес, выдавая исключение если это адреса не равны.

    (slice manager_address, slice memorized_address) = load_data();
    throw_if(1001, ~ equal_slices(manager_address, sender_address));
	

Возьмем адрес, с помощью уже знакомой   `load_msg_addr()` и сохраним адреса используя написанную ранее функцию `save_data()`.

	(slice manager_address, slice memorized_address) = load_data();
    throw_if(1001, ~ equal_slices(manager_address, sender_address));
	slice new_memorized_address = in_msg_body~load_msg_addr();
    save_data(manager_address, new_memorized_address);

##### Флаг op == 2

В соответствии с заданием при флаге 2 мы должны отправить сообщением с телом, содержащим:
  -  `op` равна 3
  - тот же `query_id`
  - Адрес менеджера
  - Адрес, который был запомнен с момента последнего запроса менеджера (пустой адрес `addr_none`, если еще не было запроса менеджера)
  - Значение TON, прикрепленное к сообщению за вычетом платы за обработку.
  
 Прежде чем отправлять сообщение загрузим адреса, хранящиеся в контракте.
 
	 (slice manager_address, slice memorized_address) = load_data();
 
 С полной структурой сообщения можно ознакомиться [здесь - message layout](https://ton.org/docs/#/smart-contracts/messages?id=message-layout). Но обычно нам нет необходимости контролировать каждое поле, поэтому можно использовать краткую форму из [примера](https://ton.org/docs/#/smart-contracts/messages?id=sending-messages):

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

Здесь все просто используем обычный `throw`  из  [встроенных модулей FunC](https://ton.org/docs/#/func/builtins?id=throwing-exceptions).

	throw(3);

##Полный код смарт-контракта

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
	  } else {
		if (op == 2) {
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
	}

## Заключение

Тесты, мы напишем в следующем уроке. Плюс хотел сказать отдельное спасибо, тем кто донатит TON для поддержки проекта, это очень мотивирует и помогает выпускать уроки быстрее.