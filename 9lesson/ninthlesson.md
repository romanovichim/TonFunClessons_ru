# Урок 9 Стандарт Jetton

## Предисловие - зачем нужны токены и стандарты

#### Что такое токен

Токен - это единица учета некоторого цифрового актива в некоторой сети. Важно отметить, что под токеном обычно не подразумевают криптовалюту, а подразумевают запись, распределенную в блокчейне, которой управляют с помощью смарт-контрактов. В смарт-контракте записаны значения остатков на счетах держателей токенов, также смарт-контракт предоставляет возможность перевода токенов с одного счёта на другой. 

#### Что такое взаимозаменяемый(fungible) и невзаимозаменяемый(nonfungible) токен?

Одной из возможных классификаций токенов, является классификация по взаимозаменяемости.

**Взаимозаменяемые токены** — это активы, которые не уникальны и могут быть легко обменены на другой актив такого же типа. Такие токены сделаны таким образом, что каждый токен эквивалентен следующему токену.

**Невзаимозаменяемые токены** — это активы, каждый экземпляр которого уникален (специфичен) и не может быть замещён другим аналогичным активом. Невзаимозаменяемый токен представляет собой некоторый сертификат цифрового объекта с возможностью передавать сертификат через некоторый механизм.

#### Зачем нужен стандарт токена и что это такое

Для того, чтобы токены можно было использовать в других приложениях (от кошельков до децентрализованных бирж) вводятся стандарты интерфейсов смарт-контрактов для токенов.

> В данном случае интерфейс — это сигнатура (синтаксическая конструкция объявления функции) функций без реализации самой функции.  

#### Где происходит "утверждение" стандарта

Обычно блокчейны имеют, отдельные страницы на гитхабе или на платформе с необходимыми механиками, куда можно вносить предложения по стандартам.

В TON это [репозиторий на гитхаб](https://github.com/ton-blockchain/TIPs).

> Важно, подобные страницы не являются форумом или местом свободного обсуждения блокчейна, поэтому ответственно отнеситесь к своим сообщениям, если хотите что-то предложить в данном репозитории.

#### Какие риски возникают исходя из природы токена

Поскольку токены фактически являются смарт-контрактами, они, несмотря на всю свою эффективность, имеют определенные риски. Например, в коде смарт-контракта может быть баг, либо сам смарт-контракт написан таким образом, чтобы мошенники могли своровать средства держателей токенов. Поэтому желательно изучать смарт-контракты токенов.

## Что такое стандарт Jetton в TON

Стандартом взаимозаменяемого токена в TON является Jetton, описание стандарта [здесь](https://github.com/ton-blockchain/TIPs/issues/74). Токен стандарта Jetton должен состоять из двух видов смарт-контрактов:
- мастер-контракта
- контракт кошелек

Каждый Jetton имеет основной смарт-контракт (будем называть его мастер контракт), который используется для чеканки новых Jetton, учета общего предложения и предоставления общей информации о токене.

Информация о количестве жетонов, принадлежащих каждому пользователю, хранится в смарт-контрактах, называемых Jetton кошельком. 

В документации стандарта есть хороший пример:

Если вы выпустите Jetton с предложением в 200 Jetton, которые принадлежат 3 людям, то вам необходимо развернуть 4 контракта: 1 Jetton-master и 3 jetton-кошелька.

#### Функциональность контрактов в  Jetton

Мастер-контракт по стандарту обязан реализовывать два Get-метода:

 - get_jetton_data() - возвращает:
	- `total_supply` - (integer) - общее количество выпущенных токенов стандарта Jetton
	- `mintable` - (-1/0) - флаг, указывающий, может ли количество жетонов увеличиваться
	- `admin_address` - (MsgAddressInt) - адрес смарт-контракта, управляющего Jetton (мастер контракта)
	- `jetton_content` - cell - данные в соответствии со [стандартом токена](https://github.com/ton-blockchain/TIPs/issues/64)
	- `jetton_wallet_code` - cell - код кошелька для этого жетона
 - get_wallet_address(slice owner_address) - возвращает адрес кошелька Jetton для этого адреса владельца.
 
Контракт-кошелек по стандарту должен реализовывать:
- внутренние обработчики сообщений:
	- передачи токенов 
	- сжигания токенов
- Get метод `get_wallet_data()`, который возвращает:
	`balance` - (uint256) количество токенов Jetton на кошельке.
	`owner` - (MsgAddress) адрес владельца кошелька;
	`jetton` - (MsgAddress) адрес мастер-адреса Jetton;
	`jetton_wallet_code` - (cell) ячейка с кодом этого кошелька;

> Может возникнуть вопрос зачем нам код кошелька, код кошелька позволит воспроизвести адрес смарт-контракта кошелька, как это работает будет рассмотрено ниже.

> Важно: внутри стандарта также описывается много нюансов относительно комиссий, ограничения и прочего, но слишком подробно мы останавливаться на этом не будем, чтобы урок не превращался в книгу.

#### Схема работы

Далее мы будем говорить про [пример](https://github.com/ton-blockchain/token-contract) реализации Jetton из стандарта. Конечно же это не единственная возможная реализация Jetton, но это позволит не разбирать все на уровне абстракций.

Для удобства разбора кода, проговорим, как работает Jetton функционально, т.е. как происходит передача токенов, чеканка и.т.д

В [примере](https://github.com/ton-blockchain/token-contract/tree/main/ft) есть следующие файлы: 
- два примера мастер контракта: jetton-minter.fc, jetton-minter-ICO.fc
- контракт кошелек jetton-wallet.fc
- остальные вспомогательные файлы.

Далее на примере мастер контракта jetton-minter.fc и контракта кошелька jetton-wallet.fc рассмотрим функциональность.

##### Чеканка

Чеканка в jetton-minter.fc происходит следующим образом, владелец мастер контракта отправляет сообщение с `op::mint()`, где в теле сообщения передается информация на какой кошелек отправить токены стандарта Jetton. Далее сообщением происходит отправка информации на смарт-контракт кошелек.

##### Сжигание монет

Владелец кошелька отправляет сообщение с `op::burn()` и смарт-контракт кошелька уменьшает количество токенов соответственно сообщению и отправляет нотификацию (`op::burn_notification()`) на мастер-контракт, что предложение токенов уменьшилось.

##### Передача монет (Transfer - send/receive)

Передача токенов разделена на две части:

- `op::transfer()` исходящий перевод
- `op::internal_transfer()` входящий перевод

Исходящий перевод начинается с сообщения с `op::transfer()` от владельца смарт-контракта кошелька и происходит отправка токенов на другой смарт-контракт кошелек(и конечно же уменьшение своего баланса токенов).

Входящий перевод после сообщения с `op::internal_transfer()` изменяет баланс и отправляет сообщение c `op::transfer_notification()` - сообщение нотификация о произошедшей передаче.

И да, когда вы отправляете токены стандарта Jetton на какой-либо адрес, вы можете запросить, чтобы кошелек, связанный с этим адресом, уведомлял адрес о прибытии жетонов.

## Разбираем код

Перед разбором кода отмечу, что в целом "механики" повторяются, поэтому чем дальше в разбор, тем более верхнеуровневый будет разбор.

Разбирать будем файлы из [репозитория](https://github.com/ton-blockchain/token-contract/tree/main/ft) будем в следующем порядке:

- jetton-minter.fc
- jetton-wallet.fc
- jetton-minter-ICO.fc

А остальные файлы (jetton-utils.fc,op-codes.fc,params.fc) разберем параллельно с первыми тремя, так как они "служебные". 

##  jetton-minter.fc

Мастер контракт начинается с двух вспомогательные функций, для загрузки и выгрузки данных.

##### Загружаем и выгружаем данные из c4

Теперь посмотрим на две вспомогательные функции, которые будут загружать и выгружать данные из регистра с4. В "хранилище мастер контракта" будет храниться:

- total_supply - общий "запас" токена
- admin_address - адрес смарт-контракта, управляющего Jetton
- content  - ячейка в соответствии со [стандартом](https://github.com/ton-blockchain/TIPs/issues/64) 
- jetton_wallet_code код кошелька для этого жетона

Для того чтобы "достать" данные из с4 нам понадобятся две функции из стандартной библиотеки FunC .

А именно: `get_data` - берет ячейку из c4 регистра. `begin_parse` - ячейку преобразует в slice

		(int, slice, cell, cell) load_data() inline {
		  slice ds = get_data().begin_parse();
		  return (
			  ds~load_coins(), ;; total_supply
			  ds~load_msg_addr(), ;; admin_address
			  ds~load_ref(), ;; content
			  ds~load_ref()  ;; jetton_wallet_code
		  );
		}

C помощью уже знакомым нам `load_` функциям выгрузим данные из slice и вернем их.
Для того чтобы сохранить данные, нам необходимо выполнить три действия:

- создать Builder для будущей ячейки
- записать в нее значение
- из Builder создать Cell (ячейку)
- Записать получившуюся ячейку в регистр

Делать это мы будем опять же с помощью [функций стандартной библиотеки FunC](https://ton-blockchain.github.io/docs/#/func/stdlib).

`begin_cell()` - создаст Builder для будущей ячейки `end_cell()` - создать Cell (ячейку) `set_data()` - запишет ячейку в регистр с4

	() save_data(int total_supply, slice admin_address, cell content, cell jetton_wallet_code) impure inline {
	  set_data(begin_cell()
				.store_coins(total_supply)
				.store_slice(admin_address)
				.store_ref(content)
				.store_ref(jetton_wallet_code)
			   .end_cell()
			  );
	}

C помощью уже знакомым нам `store_` функциям будем хранить данные.


##### Вспомогательная функция чеканки

Дальше по [коду](https://github.com/ton-blockchain/token-contract/blob/main/ft/jetton-minter.fc) идет вспомогательная функция чеканки токенов.

	() mint_tokens(slice to_address, cell jetton_wallet_code, int amount, cell master_msg) impure {

	}

Она принимает параметры:

- slice to_address - адрес на который надо будет отправить токены
- cell jetton_wallet_code -  код кошелька для этого жетона
- int amount - количество токенов
- cell master_msg - сообщение от мастера контракта

И тут возникает следующий вопрос, у нас есть некоторый адрес, но это не адрес кошелька жетона, как же тогда получить адрес смарт-контракта кошелька с жетонами(токенами)?

Тут есть небольшой трюк. Если мы изучим [документацию](https://ton-blockchain.github.io/docs/#/howto/step-by-step?id=_3-compiling-a-new-smart-contract), того как компилируется смарт-контракт.

Мы можем увидеть следующее:

Код и данные для нового смарт-контракта объединяются в структуру StateInit (в следующих строках), вычисляется и выводится адрес нового смарт-контракта (равный хешу этой структуры StateInit), а затем внешнее сообщение с создается адрес назначения, равный адресу нового смарт-контракта. Это внешнее сообщение содержит как правильный StateInit для нового смарт-контракта, так и нетривиальную полезную нагрузку (подписанную правильным закрытым ключом).

Для нас это значит, что мы можем получить адрес смарт-контракта токена по адресу на который надо отправить токены. Если говорить простыми словами мы соберем, используя адрес, код кошелька, соберем StateInit кошелька. 

Подобное возможно, так как функции [хэширования](https://ru.wikipedia.org/wiki/%D0%A5%D0%B5%D1%88-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8F) детерминированы, это значит, что для разных входных данных будет разный хэш,
 при этом для одних и тех же входных данных хэш функция будет возвращать всегда единообразный хэш. 
 
 Для такого в файле jetton-utils.fc есть две функции `calculate_jetton_wallet_state_init` и  `calculate_jetton_wallet_address `
 
	 cell calculate_jetton_wallet_state_init(slice owner_address, slice jetton_master_address, cell jetton_wallet_code) inline {
	  return begin_cell()
			  .store_uint(0, 2)
			  .store_dict(jetton_wallet_code)
			  .store_dict(pack_jetton_wallet_data(0, owner_address, jetton_master_address, jetton_wallet_code))
			  .store_uint(0, 1)
			 .end_cell();
	}

	slice calculate_jetton_wallet_address(cell state_init) inline {
	  return begin_cell().store_uint(4, 3)
						 .store_int(workchain(), 8)
						 .store_uint(cell_hash(state_init), 256)
						 .end_cell()
						 .begin_parse();
	}
	

Функция `calculate_jetton_wallet_state_init` cобирает StateInit в соответствии со [стандартом токенов](https://github.com/ton-blockchain/TIPs/issues/64) с нулевым балансом.

Функция `calculate_jetton_wallet_address` собирает адрес в соотвествии с [TL-B схемой](https://github.com/ton-blockchain/ton/blob/master/crypto/block/block.tlb#L99).

> для вычисления хэш используется функция`cell_hash()` - она вычисляет хэш представления ячейки.

Таким образом функция чеканки теперь выглядит так:

	() mint_tokens(slice to_address, cell jetton_wallet_code, int amount, cell master_msg) impure {
	  cell state_init = calculate_jetton_wallet_state_init(to_address, my_address(), jetton_wallet_code);
	  slice to_wallet_address = calculate_jetton_wallet_address(state_init);

	}

Дальше необходимо отправить сообщение в смарт-контракт:

	  var msg = begin_cell()
		.store_uint(0x18, 6)
		.store_slice(to_wallet_address)
		.store_coins(amount)
		.store_uint(4 + 2 + 1, 1 + 4 + 4 + 64 + 32 + 1 + 1 + 1)
		.store_ref(state_init)
		.store_ref(master_msg);

Про отправку сообщений хорошо написано [здесь](https://ton-blockchain.github.io/docs/#/smart-contracts/messages), а также в третьем уроке. Используя `store_ref` передаем сообщение с информацией для контракта кошелька. 

Осталось только отправить сообщение, для этого используется `send_raw_message` из [стандартной библиотеки](https://ton-blockchain.github.io/docs/#/func/stdlib?id=send_raw_message).

Переменную msg мы уже собрали, остается разобраться `mode`. Описание каждого режиме есть в [документации](https://ton-blockchain.github.io/docs/#/func/stdlib?id=send_raw_message). Мы же рассмотрим на примере, чтобы было понятнее.

Пускай на балансе смарт-контракта 100 монет, и мы получаем internal message c 60 монетами и отсылаем сообщение с 10, общий fee 3.

 `mode = 0`  - баланс (100+60-10 = 150 монет), отправим(10-3 = 7 монет)
 `mode = 1`  - баланс (100+60-10-3 = 147 монет), отправим(10 монет) 
 `mode = 64` - баланс (100-10 = 90 монет), отправим (60+10-3 = 67 монет)
 `mode = 65` - баланс (100-10-3=87 монет), отправим (60+10 = 70 монет)
 `mode = 128` -баланс (0 монет), отправим (100+60-3 = 157 монет)
 
В коде контракта у нас режим 1 это mode' = mode + 1, что означает, что отправитель хочет оплатить комиссию за перевод отдельно
 
	send_raw_message(msg.end_cell(), 1); ;; pay transfer fees separately, revert on errors
	
Итоговый код функции  `mint_tokens() `: 
	
	() mint_tokens(slice to_address, cell jetton_wallet_code, int amount, cell master_msg) impure {
	  cell state_init = calculate_jetton_wallet_state_init(to_address, my_address(), jetton_wallet_code);
	  slice to_wallet_address = calculate_jetton_wallet_address(state_init);
	  var msg = begin_cell()
		.store_uint(0x18, 6)
		.store_slice(to_wallet_address)
		.store_coins(amount)
		.store_uint(4 + 2 + 1, 1 + 4 + 4 + 64 + 32 + 1 + 1 + 1)
		.store_ref(state_init)
		.store_ref(master_msg);
	  send_raw_message(msg.end_cell(), 1); ;; pay transfer fees separately, revert on errors
	}

#### Разбираем recv_internal()

Напомню, что у смарт-контрактов в сети TON есть два зарезервированных метода, к которым можно обращаться.

Первый, `recv_external()` эта функция выполняется когда запрос к контракту происходит из внешнего мира, то есть не из TON, например когда мы сами формируем сообщение и отправляем его через lite-client (Про установку [lite-client](https://ton-blockchain.github.io/docs/#/compile?id=lite-client)).
Второй, `recv_internal()` эта функция выполняется когда внутри самого TON, например когда какой-либо контракт обращается к нашему.
 
В нашем случае `recv_internal()`  будет принимать следующие аргументы:

	() recv_internal(int msg_value, cell in_msg_full, slice in_msg_body) impure {

	}

>`impure` — ключевое слово, которое указывает на то, что функция изменяет данные смарт-контракта. Например, мы должны указать `impure` спецификатор, если функция может изменять хранилище контрактов, отправлять сообщения или генерировать исключение, когда некоторые данные недействительны и функция предназначена для проверки этих данных. Важно: Если не указано impure и результат вызова функции не используется, то компилятор FunC может удалить этот вызов функции.

Теперь рассмотрим код этой функции. В самом начале идет проверка пустое ли сообщение. 

    if (in_msg_body.slice_empty?()) { ;; ignore empty messages
        return ();
    }
	
Дальше мы начинаем разбирать(вычитывать) сообщение:

	slice cs = in_msg_full.begin_parse();
	
Достаем флаги и проверяем что сообщение не было возвращенным (здесь имеется ввиду bounced).

    if (flags & 1) { ;; ignore all bounced messages
        return ();
    }
	
Достаем адрес отправителя сообщения на `recv_internal()`:

	slice sender_address = cs~load_msg_addr();

Теперь на очереди `op` и `query_id`  о них можно прочитать либо в гайдах по контрактам, либо в пятом уроке. Если кратко, то  `op` идентификации операции далее.

    int op = in_msg_body~load_uint(32);
    int query_id = in_msg_body~load_uint(64);
	
Дальше воспользуемся вспомогательной функцией, которую мы писали ранее - `load_data()`.

	(int total_supply, slice admin_address, cell content, cell jetton_wallet_code) = load_data();
	
Теперь, используя условные операторов построим логику вокруг `op`. Для удобства коды хранятся в отельном файле `op-codes.fc`.  А также в конце идет исключение, т.е если контракт не выполнит какое-то действие в соответствии с `op`, будет исключение. 

> Важно: учитывая, что токен должен соответствовать стандарту, то для операций, которые описаны в стандарте, нужно брать соответствующие коды, например для `burn_notification()` это 0x7bdd97de.

Получаем:

	() recv_internal(int msg_value, cell in_msg_full, slice in_msg_body) impure {
		if (in_msg_body.slice_empty?()) { ;; ignore empty messages
			return ();
		}
		slice cs = in_msg_full.begin_parse();
		int flags = cs~load_uint(4);

		if (flags & 1) { ;; ignore all bounced messages
			return ();
		}
		slice sender_address = cs~load_msg_addr();

		int op = in_msg_body~load_uint(32);
		int query_id = in_msg_body~load_uint(64);

		(int total_supply, slice admin_address, cell content, cell jetton_wallet_code) = load_data();

		if (op == op::mint()) {
			;;здесь будет чеканка токенов
		}

		if (op == op::burn_notification()) {
			;;  здесь будет обработка сообщения от кошелька, что токены сгорели
		}

		if (op == 3) { ;; change admin
			;; здесь будет смена "админа" или как это еще можно назвать владельца контракта 
		}

		if (op == 4) { ;; change content, delete this for immutable tokens
			;; здесь будет смена данных в c4
		}

		throw(0xffff);
	}
	
##### op::mint()

Первое, что делаем при `op::mint()` это вызываем исключение если адрес администратора(владельца) контракта, не равен адресу отправителя:

    if (op == op::mint()) {
        throw_unless(73, equal_slices(sender_address, admin_address));
		
    }

Дальше достаем из тела сообщения адрес, на который надо отправить токены, кол-во TON для "транспортировки" токенов стандарта Jetton и сообщение мастер контракта.

    if (op == op::mint()) {
        throw_unless(73, equal_slices(sender_address, admin_address));
		slice to_address = in_msg_body~load_msg_addr();
        int amount = in_msg_body~load_coins();
        cell master_msg = in_msg_body~load_ref();
    }
	
Из сообщения мастер контракта достанем количество токенов, пропустив при этом `op` и `query_id`.

    if (op == op::mint()) {
        throw_unless(73, equal_slices(sender_address, admin_address));
        slice to_address = in_msg_body~load_msg_addr();
        int amount = in_msg_body~load_coins();
        cell master_msg = in_msg_body~load_ref();
        slice master_msg_cs = master_msg.begin_parse();
        master_msg_cs~skip_bits(32 + 64); ;; op + query_id
        int jetton_amount = master_msg_cs~load_coins();
    }
	
Вызываем функцию `mint_tokens()`, которую мы писали раньше, а также сохраняем данные в `с4`, используя вспомогательную функцию `save_data()`. В конце завершим работу функции, оператор `return` нам в помощь. Получаем:

    if (op == op::mint()) {
        throw_unless(73, equal_slices(sender_address, admin_address));
        slice to_address = in_msg_body~load_msg_addr();
        int amount = in_msg_body~load_coins();
        cell master_msg = in_msg_body~load_ref();
        slice master_msg_cs = master_msg.begin_parse();
        master_msg_cs~skip_bits(32 + 64); ;; op + query_id
        int jetton_amount = master_msg_cs~load_coins();
        mint_tokens(to_address, jetton_wallet_code, amount, master_msg);
        save_data(total_supply + jetton_amount, admin_address, content, jetton_wallet_code);
        return ();
    }
	
##### op::burn_notification()

Первое, что делаем при `op::burn_notification()`  это достаем из тела сообщения количество токенов и адрес, от которого пришла нотификация.

    if (op == op::burn_notification()) {
        int jetton_amount = in_msg_body~load_coins();
        slice from_address = in_msg_body~load_msg_addr();

    }
	
Далее, используя знакомый нам трюк по "воссозданию" адреса кошелька (функция `calculate_user_jetton_wallet_address()`), выдадим исключение если адрес отправителя (`sender_address`) не равен адресу кошелька.

    if (op == op::burn_notification()) {
        int jetton_amount = in_msg_body~load_coins();
        slice from_address = in_msg_body~load_msg_addr();
        throw_unless(74,
            equal_slices(calculate_user_jetton_wallet_address(from_address, my_address(), jetton_wallet_code), sender_address)
        );

    }

Теперь сохраним данные в с4, при этом уменьшим общее предложение токенов на сумму сожжённых токенов.

    if (op == op::burn_notification()) {
        int jetton_amount = in_msg_body~load_coins();
        slice from_address = in_msg_body~load_msg_addr();
        throw_unless(74,
            equal_slices(calculate_user_jetton_wallet_address(from_address, my_address(), jetton_wallet_code), sender_address)
        );
		save_data(total_supply - jetton_amount, admin_address, content, jetton_wallet_code);
    }
	
После достанем адрес, на который надо вернуть ответ.

    if (op == op::burn_notification()) {
        int jetton_amount = in_msg_body~load_coins();
        slice from_address = in_msg_body~load_msg_addr();
        throw_unless(74,
            equal_slices(calculate_user_jetton_wallet_address(from_address, my_address(), jetton_wallet_code), sender_address)
        );
		save_data(total_supply - jetton_amount, admin_address, content, jetton_wallet_code);
		slice response_address = in_msg_body~load_msg_addr();
    }
	
И если он не "нулевой" (не `addr_none`), отправляем сообщение с об излишке(`op::excesses()`) и конечно же завершим работу функции с помощью оператора `return`.

    if (op == op::burn_notification()) {
        int jetton_amount = in_msg_body~load_coins();
        slice from_address = in_msg_body~load_msg_addr();
        throw_unless(74,
            equal_slices(calculate_user_jetton_wallet_address(from_address, my_address(), jetton_wallet_code), sender_address)
        );
        save_data(total_supply - jetton_amount, admin_address, content, jetton_wallet_code);
        slice response_address = in_msg_body~load_msg_addr();
        if (response_address.preload_uint(2) != 0) {
          var msg = begin_cell()
            .store_uint(0x10, 6) ;; nobounce - int_msg_info$0 ihr_disabled:Bool bounce:Bool bounced:Bool src:MsgAddress -> 011000
            .store_slice(response_address)
            .store_coins(0)
            .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
            .store_uint(op::excesses(), 32)
            .store_uint(query_id, 64);
          send_raw_message(msg.end_cell(), 2 + 64);
        }
        return ();
    }
	
##### op 3 и op 4

В примере мастер-контракта, также показаны две необязательные функциональности, а именно смена владельца(админа) мастер-контракта (`op == 3`), а также замена всего контента в регистре `с4`(`op == 4`).

> Важно отметить, что прежде чем взаимодействовать с какими-либо контрактами, стоит изучить их код, так как часто разработчики оставляют лазейки, которые, например, могут полностью поменять всю логику работу контракта.

В каждом таком "управляющем данными контракта" `op` обязательно проверятся, что адрес отправителя — это адрес админа контракта. А далее данные просто сохранятся.

    if (op == 3) { ;; change admin
        throw_unless(73, equal_slices(sender_address, admin_address));
        slice new_admin_address = in_msg_body~load_msg_addr();
        save_data(total_supply, new_admin_address, content, jetton_wallet_code);
        return ();
    }

    if (op == 4) { ;; change content, delete this for immutable tokens
        throw_unless(73, equal_slices(sender_address, admin_address));
        save_data(total_supply, admin_address, in_msg_body~load_ref(), jetton_wallet_code);
        return ();
    }

#### Get методы 

Итак, по стандарту Jetton мастер-контракт должен иметь два Get метода:
- get_jetton_data() - который вернет данные о токене стандарта Jetton
- get_wallet_address() - который возвращает по адресу, адрес смарт-контракта кошелька

##### get_jetton_data()

Функция берет данные из `с4` и возвращает:

- total_supply - (integer) - общее количество выпущенных жетонов
- mintable - (-1/0) - флаг, указывающий, может ли количество жетонов увеличиваться
- admin_address - (MsgAddressInt) - адрес смарт-контракта, управляющего Jetton
- jetton_content - cell - данные в соответствии со стандартом [Token Data Standard](https://github.com/ton-blockchain/TIPs/issues/64)
- jetton_wallet_code - cell - код кошелька для этого жетона

Код:

	(int, int, slice, cell, cell) get_jetton_data() method_id {
		(int total_supply, slice admin_address, cell content, cell jetton_wallet_code) = load_data();
		return (total_supply, -1, admin_address, content, jetton_wallet_code);
	}

##### get_wallet_address()

C помощью вспомогательной функции "воспроизводим" адрес смарт-контракта кошелька.

Код:

	slice get_wallet_address(slice owner_address) method_id {
		(int total_supply, slice admin_address, cell content, cell jetton_wallet_code) = load_data();
		return calculate_user_jetton_wallet_address(owner_address, my_address(), jetton_wallet_code);
	}
	
## jetton-wallet.fc

Данный файл начинается с двух функций, которые мы определим, как низкоуровневый примитив TVM, с помощью ключевого слова `asm`.

	int min_tons_for_storage() asm "10000000 PUSHINT"; ;; 0.01 TON
	int gas_consumption() asm "10000000 PUSHINT"; ;; 0.01 TON

Обе функции понадобятся нам для того, чтобы проверять ограничения по газу и минимальному кол-ву TON.

> PUSHINT добавляет в стек Integer

##### Загружаем и выгружаем данные из c4

Теперь посмотрим на две вспомогательные функции, которые будут загружать и выгружать данные из регистра с4. В нашем "хранилище" мы будем хранить:

- int balance - баланс токена
- slice owner_address - адрес владельца токенов
- slice jetton_master_address - адрес мастер контракта для этого токена
- cell jetton_wallet_code - код кошелька для этого жетона

Для того чтобы "достать" данные из с4 нам понадобятся две функции из стандартной библиотеки FunC .

А именно: `get_data` - берет ячейку из c4 регистра. `begin_parse` - ячейку преобразует в slice

		(int, slice, slice, cell) load_data() inline {
		  slice ds = get_data().begin_parse();
		  return (ds~load_coins(), ds~load_msg_addr(), ds~load_msg_addr(), ds~load_ref());
		}

C помощью уже знакомым нам `load_` функциям выгрузим данные из slice и вернем их.

Чтобы сохранить данные, используется `set_data()` - она запишет ячейку в регистр с4. 

	() save_data (int balance, slice owner_address, slice jetton_master_address, cell jetton_wallet_code) impure inline {
	  set_data(pack_jetton_wallet_data(balance, owner_address, jetton_master_address, jetton_wallet_code));
	}
	
Саму же ячейку с данными мы соберем с помощью вспомогательной функции `pack_jetton_wallet_data()` из файла jetton-utils.fc.

Код фукнции `pack_jetton_wallet_data()`: 

	cell pack_jetton_wallet_data(int balance, slice owner_address, slice jetton_master_address, cell jetton_wallet_code) inline {
	   return  begin_cell()
				.store_coins(balance)
				.store_slice(owner_address)
				.store_slice(jetton_master_address)
				.store_ref(jetton_wallet_code)
			   .end_cell();
	}

`begin_cell()` - создаст Builder для будущей ячейки `store_` - запишут значения `end_cell()` - создаст Cell (ячейку)


##### Функция отправки токенов (исходящий перевод)

Функция отправки токенов, проверяет условия в соответствии со [стандартом](https://github.com/ton-blockchain/TIPs/issues/74) и отправляет соответствующее сообщение.

	() send_tokens (slice in_msg_body, slice sender_address, int msg_value, int fwd_fee) impure {
	}
	

Пройдемся по коду функции. Код функции начинается с вычитывания данных из `in_msg_body`

	  int query_id = in_msg_body~load_uint(64);
	  int jetton_amount = in_msg_body~load_coins();
	  slice to_owner_address = in_msg_body~load_msg_addr();

- query_id - произвольный номер запроса
- int jetton_amount - количество токенов
- to_owner_address -  адрес владельца, понадобится для воспроизвести адрес смарт-контракта

Дальше идет вызов фукнции `force_chain()` из файла params.fc.

	force_chain(to_owner_address);

Функция `force_chain` проверяет, что адрес находится в воркчейне с номером 0 (базовый ворчейн). Подробнее про адреса и номера можно почитать [здесь](https://github.com/ton-blockchain/ton/blob/master/doc/LiteClient-HOWTO) в самом начале. Разберем код из params.fc:

	int workchain() asm "0 PUSHINT";

	() force_chain(slice addr) impure {
	  (int wc, _) = parse_std_addr(addr);
	  throw_unless(333, wc == workchain());
	}

Вспомогательную функцию `workchain()` определим как низкоуровневый примитив TVM, с помощью ключевого слова `asm`. Integer == 0 понадобиться нам для сравнения.

	int workchain() asm "0 PUSHINT";
	

Для извлечения необходимой нам информации из адреса, используется `parse_std_addr()`. `parse_std_addr()` - возвращает из `MsgAddressInt` воркчейн и 256-битный integer адрес.

	() force_chain(slice addr) impure {
	  (int wc, _) = parse_std_addr(addr);
	  throw_unless(333, wc == workchain());
	}

А для вызова исключения, если воркчейны не равны будем использовать `throw_unless()`.

Возвращаемся обратно в нашу функцию `send_tokens()`

Загрузим данные из с4:

	(int balance, slice owner_address, slice jetton_master_address, cell jetton_wallet_code) = load_data();
	
И сразу же вычтем из баланса, количество токенов (jetton_amount), и сразу же проверим (выдадим исключения), что баланс не стал меньше нуля, и адреса не совпадают.

	balance -= jetton_amount;
	throw_unless(705, equal_slices(owner_address, sender_address));
	throw_unless(706, balance >= 0);

Теперь используя уже знакомый нам трюк по мастер-контракту "воспроизводится" адрес кошелька:

	  cell state_init = calculate_jetton_wallet_state_init(to_owner_address, jetton_master_address, jetton_wallet_code);
	  slice to_wallet_address = calculate_jetton_wallet_address(state_init);
	  
Дальше достаем из тела сообщения достаем адрес на который необходимо будет отправить ответ, кастомную полезную нагрузку (возможно с токеном кто-то хочет передать еще какую-то информацию), а также количество наноТон, которое будет отправлено по адресу назначения.

	  slice response_address = in_msg_body~load_msg_addr();
	  cell custom_payload = in_msg_body~load_dict();
	  int forward_ton_amount = in_msg_body~load_coins();
 
Теперь используя функцию `slice_bits`, которая возвращает количество битов данных в slice. Проверим, что в теле сообщения осталась только другая полезная нагрузка, и заодно ее и выгрущим.

	  throw_unless(708, slice_bits(in_msg_body) >= 1);
	  slice either_forward_payload = in_msg_body

Дальше собирается сообщение (напомню, что `to_wallet_address` это адрес смарт-контракта кошелька):

	  var msg = begin_cell()
		.store_uint(0x18, 6)
		.store_slice(to_wallet_address)
		.store_coins(0)
		.store_uint(4 + 2 + 1, 1 + 4 + 4 + 64 + 32 + 1 + 1 + 1)
		.store_ref(state_init);
		
Тело сообщения собирается отдельно в соответствии со [стандартом](https://github.com/ton-blockchain/TIPs/issues/74). А именно:

> Отправка токенов относиться к transfer, поэтому тело собираем именно в соответствии с transfer

`op` - возьмем из файла jetton-utils.fc (по стандарту это internal_transfer(), а значит 0x178d4519)
`query_id` - произвольный номер запроса.
`jetton amount` - количество переданных токенов в единицах этого жетона.
`owner_address` - адрес нового владельца жетонов.
`response_address` - адрес, куда отправить ответ с подтверждением успешного перевода и остальным входящим сообщением с Тон.
`forward_ton_amount` - количество наноТон, которое необходимо отправить по адресу назначения.
`forward_payload` - необязательные пользовательские данные, которые должны быть отправлены на адрес назначения.

Код тела сообщения и добавления его к сообщению:

	  var msg_body = begin_cell()
		.store_uint(op::internal_transfer(), 32)
		.store_uint(query_id, 64)
		.store_coins(jetton_amount)
		.store_slice(owner_address)
		.store_slice(response_address)
		.store_coins(forward_ton_amount)
		.store_slice(either_forward_payload)
		.end_cell();
	msg = msg.store_ref(msg_body);
	
> Внимательный читатель может спросить где `custom_payload`, но это поле необязательное.

И вроде все готово для отправки, но осталось два важных условия из стандарта, а именно:

- недостаточно TON для обработки операции, развертывания Жетон-кошелька получателя и отправки forward_ton_amount.
- После обработки запроса Жетон-кошелек получателя должен отправить не менее in_msg_value - forward_amount - 2 * max_tx_gas_price на адрес response_destination.

	  int fwd_count = forward_ton_amount ? 2 : 1;
	  throw_unless(709, msg_value >
						 forward_ton_amount +
						 ;; 3 messages: wal1->wal2,  wal2->owner, wal2->response
						 ;; but last one is optional (it is ok if it fails)
						 fwd_count * fwd_fee +
						 (2 * gas_consumption() + min_tons_for_storage()));
						 ;; universal message send fee calculation may be activated here
						 ;; by using this instead of fwd_fee
						 ;; msg_fwd_fee(to_wallet, msg_body, state_init, 15)
						 
> Останавливаться подробно здесь не буду, так как комментарии и описание в стандарте токена дают подробную картину

Остается только отправить сообщение и сохранить данные регистре `с4`:

	  send_raw_message(msg.end_cell(), 64); ;; revert on errors
	  save_data(balance, owner_address, jetton_master_address, jetton_wallet_code);

Итоговый код:

	() send_tokens (slice in_msg_body, slice sender_address, int msg_value, int fwd_fee) impure {
	  int query_id = in_msg_body~load_uint(64);
	  int jetton_amount = in_msg_body~load_coins();
	  slice to_owner_address = in_msg_body~load_msg_addr();
	  force_chain(to_owner_address);
	  (int balance, slice owner_address, slice jetton_master_address, cell jetton_wallet_code) = load_data();
	  balance -= jetton_amount;

	  throw_unless(705, equal_slices(owner_address, sender_address));
	  throw_unless(706, balance >= 0);

	  cell state_init = calculate_jetton_wallet_state_init(to_owner_address, jetton_master_address, jetton_wallet_code);
	  slice to_wallet_address = calculate_jetton_wallet_address(state_init);
	  slice response_address = in_msg_body~load_msg_addr();
	  cell custom_payload = in_msg_body~load_dict();
	  int forward_ton_amount = in_msg_body~load_coins();
	  throw_unless(708, slice_bits(in_msg_body) >= 1);
	  slice either_forward_payload = in_msg_body;
	  var msg = begin_cell()
		.store_uint(0x18, 6)
		.store_slice(to_wallet_address)
		.store_coins(0)
		.store_uint(4 + 2 + 1, 1 + 4 + 4 + 64 + 32 + 1 + 1 + 1)
		.store_ref(state_init);
	  var msg_body = begin_cell()
		.store_uint(op::internal_transfer(), 32)
		.store_uint(query_id, 64)
		.store_coins(jetton_amount)
		.store_slice(owner_address)
		.store_slice(response_address)
		.store_coins(forward_ton_amount)
		.store_slice(either_forward_payload)
		.end_cell();

	  msg = msg.store_ref(msg_body);
	  int fwd_count = forward_ton_amount ? 2 : 1;
	  throw_unless(709, msg_value >
						 forward_ton_amount +
						 ;; 3 messages: wal1->wal2,  wal2->owner, wal2->response
						 ;; but last one is optional (it is ok if it fails)
						 fwd_count * fwd_fee +
						 (2 * gas_consumption() + min_tons_for_storage()));
						 ;; universal message send fee calculation may be activated here
						 ;; by using this instead of fwd_fee
						 ;; msg_fwd_fee(to_wallet, msg_body, state_init, 15)

	  send_raw_message(msg.end_cell(), 64); ;; revert on errors
	  save_data(balance, owner_address, jetton_master_address, jetton_wallet_code);
	}

##### Функция получения токенов (входящий перевод)

Переходим к получению токенов:

	() receive_tokens (slice in_msg_body, slice sender_address, int my_ton_balance, int fwd_fee, int msg_value) impure {

	}

Функция `receive_tokens()` начинается с выгрузки данных из с4, далее из тела сообщения достаем `query_id`, `jetton_amount`:

	  (int balance, slice owner_address, slice jetton_master_address, cell jetton_wallet_code) = load_data();
	  int query_id = in_msg_body~load_uint(64);
	  int jetton_amount = in_msg_body~load_coins();

Так как кошелек получил токены, необходимо добавить их к балансу:

	  balance += jetton_amount;

Продолжаем вычитывать данные из `in_msg_body`, берем два адреса: адрес от которого получили токены и адрес на который надо вернуть ответ.

	  slice from_address = in_msg_body~load_msg_addr();
	  slice response_address = in_msg_body~load_msg_addr();
	  
Далле с помощью [бинарного оператора OR](https://en.wikipedia.org/wiki/Binary_operation) проверяем сразу два условия по адресам:

	  throw_unless(707,
		  equal_slices(jetton_master_address, sender_address)
		  |
		  equal_slices(calculate_user_jetton_wallet_address(from_address, jetton_master_address, jetton_wallet_code), sender_address)
	  
Также из тела сообщения достается `forward_ton_amount` - количество наноТон, которое будет отправлено по адресу назначения.

	int forward_ton_amount = in_msg_body~load_coins();

И тут нам наконец-то понадобятся функции, который мы определяли в самом начале для ограничения по газу и минимальному кол-ву TON, а именно `min_tons_for_storage()` и `gas_consumption()`.

	  int storage_fee = min_tons_for_storage() - min(ton_balance_before_msg, min_tons_for_storage());
	  msg_value -= (storage_fee + gas_consumption());
	  
Используя эти ограничения мы получаем значение для сообщения, которые мы будем использовать далее (отправим сообщение об излишке, если там много).

Далее если мы создаем сообщение с уведомлением о передаче:

	  if(forward_ton_amount) {
		msg_value -= (forward_ton_amount + fwd_fee);
		slice either_forward_payload = in_msg_body;

		var msg_body = begin_cell()
			.store_uint(op::transfer_notification(), 32)
			.store_uint(query_id, 64)
			.store_coins(jetton_amount)
			.store_slice(from_address)
			.store_slice(either_forward_payload)
			.end_cell();

		var msg = begin_cell()
		  .store_uint(0x10, 6) ;; we should not bounce here cause receiver can have uninitialized contract
		  .store_slice(owner_address)
		  .store_coins(forward_ton_amount)
		  .store_uint(1, 1 + 4 + 4 + 64 + 32 + 1 + 1)
		  .store_ref(msg_body);

		send_raw_message(msg.end_cell(), 1);
	  }
	  
> Важно заметить, что мы опять уменьшили `msg_value`, это понадобиться нам дальше, чтобы знать, надо ли отправить сообщение об излишке.

Теперь пришло время `msg_value`, из которого мы с упорством вычитали различные платежи (о них поподробнее можно прочитать [здесь](https://ton-blockchain.github.io/docs/#/smart-contracts/fees))

Проверяем, что адрес не нулевой и от `msg_value` что-то осталось и отправляем сообщение об излишке, с этим излишком соответственно.

	  if ((response_address.preload_uint(2) != 0) & (msg_value > 0)) {
		var msg = begin_cell()
		  .store_uint(0x10, 6) ;; nobounce - int_msg_info$0 ihr_disabled:Bool bounce:Bool bounced:Bool src:MsgAddress -> 010000
		  .store_slice(response_address)
		  .store_coins(msg_value)
		  .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
		  .store_uint(op::excesses(), 32)
		  .store_uint(query_id, 64);
		send_raw_message(msg.end_cell(), 2);
	  }
	  
Ну и конечно же в самом конце идет сохранение данных.

	save_data(balance, owner_address, jetton_master_address, jetton_wallet_code);
	
Итоговый код:

	() receive_tokens (slice in_msg_body, slice sender_address, int my_ton_balance, int fwd_fee, int msg_value) impure {
	  ;; NOTE we can not allow fails in action phase since in that case there will be
	  ;; no bounce. Thus check and throw in computation phase.
	  (int balance, slice owner_address, slice jetton_master_address, cell jetton_wallet_code) = load_data();
	  int query_id = in_msg_body~load_uint(64);
	  int jetton_amount = in_msg_body~load_coins();
	  balance += jetton_amount;
	  slice from_address = in_msg_body~load_msg_addr();
	  slice response_address = in_msg_body~load_msg_addr();
	  throw_unless(707,
		  equal_slices(jetton_master_address, sender_address)
		  |
		  equal_slices(calculate_user_jetton_wallet_address(from_address, jetton_master_address, jetton_wallet_code), sender_address)
	  );
	  int forward_ton_amount = in_msg_body~load_coins();

	  int ton_balance_before_msg = my_ton_balance - msg_value;
	  int storage_fee = min_tons_for_storage() - min(ton_balance_before_msg, min_tons_for_storage());
	  msg_value -= (storage_fee + gas_consumption());
	  if(forward_ton_amount) {
		msg_value -= (forward_ton_amount + fwd_fee);
		slice either_forward_payload = in_msg_body;

		var msg_body = begin_cell()
			.store_uint(op::transfer_notification(), 32)
			.store_uint(query_id, 64)
			.store_coins(jetton_amount)
			.store_slice(from_address)
			.store_slice(either_forward_payload)
			.end_cell();

		var msg = begin_cell()
		  .store_uint(0x10, 6) ;; we should not bounce here cause receiver can have uninitialized contract
		  .store_slice(owner_address)
		  .store_coins(forward_ton_amount)
		  .store_uint(1, 1 + 4 + 4 + 64 + 32 + 1 + 1)
		  .store_ref(msg_body);

		send_raw_message(msg.end_cell(), 1);
	  }

	  if ((response_address.preload_uint(2) != 0) & (msg_value > 0)) {
		var msg = begin_cell()
		  .store_uint(0x10, 6) ;; nobounce - int_msg_info$0 ihr_disabled:Bool bounce:Bool bounced:Bool src:MsgAddress -> 010000
		  .store_slice(response_address)
		  .store_coins(msg_value)
		  .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
		  .store_uint(op::excesses(), 32)
		  .store_uint(query_id, 64);
		send_raw_message(msg.end_cell(), 2);
	  }

	  save_data(balance, owner_address, jetton_master_address, jetton_wallet_code);
	}
	
##### Функция сжигания токенов (входящий перевод)

Подробно разбирать функцию сжигания не будем, так как после прочтения разборов предыдущих функций, все должно быть понятно с первого взгляда.

Отмечу только логику работы - после уменьшения баланса токенов на выбранную сумму, отправляется сообщение в мастер контракт - уведомление о сжигании.

	() burn_tokens (slice in_msg_body, slice sender_address, int msg_value, int fwd_fee) impure {
	  ;; NOTE we can not allow fails in action phase since in that case there will be
	  ;; no bounce. Thus check and throw in computation phase.
	  (int balance, slice owner_address, slice jetton_master_address, cell jetton_wallet_code) = load_data();
	  int query_id = in_msg_body~load_uint(64);
	  int jetton_amount = in_msg_body~load_coins();
	  slice response_address = in_msg_body~load_msg_addr();
	  ;; ignore custom payload
	  ;; slice custom_payload = in_msg_body~load_dict();
	  balance -= jetton_amount;
	  throw_unless(705, equal_slices(owner_address, sender_address));
	  throw_unless(706, balance >= 0);
	  throw_unless(707, msg_value > fwd_fee + 2 * gas_consumption());

	  var msg_body = begin_cell()
		  .store_uint(op::burn_notification(), 32)
		  .store_uint(query_id, 64)
		  .store_coins(jetton_amount)
		  .store_slice(owner_address)
		  .store_slice(response_address)
		  .end_cell();

	  var msg = begin_cell()
		.store_uint(0x18, 6)
		.store_slice(jetton_master_address)
		.store_coins(0)
		.store_uint(1, 1 + 4 + 4 + 64 + 32 + 1 + 1)
		.store_ref(msg_body);

	  send_raw_message(msg.end_cell(), 64);

	  save_data(balance, owner_address, jetton_master_address, jetton_wallet_code);
	}
	
#### Отскок

Осталось написать еще одну функцию, прежде чем мы перейдем к `recv_internal()`. В функции `recv_internal() ` нам предстоит обработать отскочившие сообщения.(Подробнее про отскок на [78 странице здесь](https://ton-blockchain.github.io/docs/tblkch.pdf)).

При отскоке мы должны сделать следующее:
- вернуть токены в баланс
- выдать исключение если `op::internal_transfer()` или `op::burn_notification()`

В каркас функции будем передавать тело сообщения:

	() on_bounce (slice in_msg_body) impure {

	}
	
Берем `op` из тела и выдаем исключения если `op::internal_transfer()` или `op::burn_notification()`

	() on_bounce (slice in_msg_body) impure {
	  in_msg_body~skip_bits(32); ;; 0xFFFFFFFF
	  (int balance, slice owner_address, slice jetton_master_address, cell jetton_wallet_code) = load_data();
	  int op = in_msg_body~load_uint(32);
	  throw_unless(709, (op == op::internal_transfer()) | (op == op::burn_notification()));

	}
	
Продолжая вычитывать данные из тела, возвращаем токены в баланс и сохраняем данные в регистр `c4`.

	() on_bounce (slice in_msg_body) impure {
	  in_msg_body~skip_bits(32); ;; 0xFFFFFFFF
	  (int balance, slice owner_address, slice jetton_master_address, cell jetton_wallet_code) = load_data();
	  int op = in_msg_body~load_uint(32);
	  throw_unless(709, (op == op::internal_transfer()) | (op == op::burn_notification()));
	  int query_id = in_msg_body~load_uint(64);
	  int jetton_amount = in_msg_body~load_coins();
	  balance += jetton_amount;
	  save_data(balance, owner_address, jetton_master_address, jetton_wallet_code);
	}
	
#### recv_internal()

Для того, чтобы наша кошелек мог принимать сообщения будем использовать внешний метод `recv_internal()`

    () recv_internal()  {

    }
	
##### Аргументы внешнего метода

В соответствии с документацией [виртуальной машины TON - TVM](https://ton-blockchain.github.io/docs/tvm.pdf), когда на счете в одной из цепочек TON происходит какое-то событие, оно вызывает транзакцию. 

Каждая транзакция состоит из до 5 этапов. Подробнее [здесь](https://ton-blockchain.github.io/docs/#/smart-contracts/tvm_overview?id=transactions-and-phases).

Нас интересует **Compute phase**. А если быть конкретнее, что "в стеке" при инициализации. Для обычных транзакций, вызванных сообщением, начальное состояние стека выглядит следующим [образом](https://ton-blockchain.github.io/docs/#/smart-contracts/tvm_overview?id=initialization-of-tvm):

5 элементов:
- Баланс смарт-контракта (в наноТонах)
- Баланс входящего сообщения (в наноТонах)
- Ячейка с входящим сообщением 
- Тело входящего сообщения, тип слайс
- Селектор функции (для recv_internal это 0)

По итогу получаем следующий код:

    () recv_internal(int balance, int msg_value, cell in_msg_full, slice in_msg_body)  {

    }
	
##### Берем данные из тела сообщения

Итак первое, что мы сделаем в `recv_internal()` это проверим пустое ли сообщение:

  if (in_msg_body.slice_empty?()) { ;; ignore empty messages
    return ();
  }

Далее достаем флаги и проверяем не является ли поступившее сообщение отскочившим. В случае если это отскок, воспользуемся функцией `on_bounce()`, которую мы написали ранее.

	  slice cs = in_msg_full.begin_parse();
	  int flags = cs~load_uint(4);
	  if (flags & 1) {
		on_bounce(in_msg_body);
		return ();
	  }

После продолжаем доставать данные (комментарии раскрывают, что это), включая `op`. Благодаря которому мы выстроим дальнейшую логику.

	  slice sender_address = cs~load_msg_addr();
	  cs~load_msg_addr(); ;; skip dst
	  cs~load_coins(); ;; skip value
	  cs~skip_bits(1); ;; skip extracurrency collection
	  cs~load_coins(); ;; skip ihr_fee
	  int fwd_fee = cs~load_coins(); ;; we use message fwd_fee for estimation of forward_payload costs

	  int op = in_msg_body~load_uint(32);

Используя условные операторы выстраиваем логику вокруг `op` и используем написанные нами функции для реализации логики внутри.

	  if (op == op::transfer()) { ;; outgoing transfer
		send_tokens(in_msg_body, sender_address, msg_value, fwd_fee);
		return ();
	  }

	  if (op == op::internal_transfer()) { ;; incoming transfer
		receive_tokens(in_msg_body, sender_address, my_balance, fwd_fee, msg_value);
		return ();
	  }

	  if (op == op::burn()) { ;; burn
		burn_tokens(in_msg_body, sender_address, msg_value, fwd_fee);
		return ();
	  }
	  
В конце идет исключение, т.е. если контракт не выполнит какое-то действие в соответствии с `op`, будет исключение.  Итоговый код `recv_internal()`:

	() recv_internal(int my_balance, int msg_value, cell in_msg_full, slice in_msg_body) impure {
	  if (in_msg_body.slice_empty?()) { ;; ignore empty messages
		return ();
	  }

	  slice cs = in_msg_full.begin_parse();
	  int flags = cs~load_uint(4);
	  if (flags & 1) {
		on_bounce(in_msg_body);
		return ();
	  }
	  slice sender_address = cs~load_msg_addr();
	  cs~load_msg_addr(); ;; skip dst
	  cs~load_coins(); ;; skip value
	  cs~skip_bits(1); ;; skip extracurrency collection
	  cs~load_coins(); ;; skip ihr_fee
	  int fwd_fee = cs~load_coins(); ;; we use message fwd_fee for estimation of forward_payload costs

	  int op = in_msg_body~load_uint(32);

	  if (op == op::transfer()) { ;; outgoing transfer
		send_tokens(in_msg_body, sender_address, msg_value, fwd_fee);
		return ();
	  }

	  if (op == op::internal_transfer()) { ;; incoming transfer
		receive_tokens(in_msg_body, sender_address, my_balance, fwd_fee, msg_value);
		return ();
	  }

	  if (op == op::burn()) { ;; burn
		burn_tokens(in_msg_body, sender_address, msg_value, fwd_fee);
		return ();
	  }

	  throw(0xffff);
	}

#### Get метод

По стандарту [Jetton](https://github.com/ton-blockchain/TIPs/issues/74)  смарт-контракт кошелек должен реализовывать Get метод, который возвращает:

	`balance` - (uint256) количество жетонов на кошельке.
	`owner` - (MsgAddress) адрес владельца кошелька;
	`jetton` - (MsgAddress) адрес мастер контракта;
	`jetton_wallet_code` - (cell) с кодом этого кошелька;
	
То есть просто выгрузить данные из `с4`:

	(int, slice, slice, cell) get_wallet_data() method_id {
	  return load_data();
	}
	
## jetton-minter-ICO.fc

Данный файл является вариацией мастер контракта, для ситуации, когда вы хотите проводить ICO. 

> ICO(Initial Coin Offering) - первичное размещение монет, форма привлечения инвестиций в виде продажи инвесторам фиксированного количества новых единиц криптовалют/токенов.

Единственным существенным различием от jetton-minter.fc является наличие возможности получить себе токены отправив Тон на контракт.

Также из конкретного этого контракта убрали необязательные `op`, которые были в jetton-minter.fc .

## jetton-minter-ICO.fc

Данный файл является вариацией мастер контракта, для ситуации, когда вы хотите проводить ICO. 

> ICO(Initial Coin Offering) - первичное размещение монет, форма привлечения инвестиций в виде продажи инвесторам фиксированного количества новых единиц криптовалют/токенов.

Единственным существенным различием от jetton-minter.fc является наличие возможности получить себе токены отправив Тон на контракт.

Также из конкретного этого контракта убрали необязательные `op`, которые были в jetton-minter.fc .

##### Разбираем механику ICO в recv_internal()

Баланс входящего сообщения (в наноТонах) это `msg_value`. Из него мы вычтем небольшое количество наноТонов для сообщения чеканки и получившееся значение будет обменено на токены стандарты Jetton в некоторой пропорции.

Проверяем, что тело сообщения не пустое:


    if (in_msg_body.slice_empty?()) { ;; buy jettons for Toncoin


    }

Вычисляем кол-во наноТон для обмена на токены стандарта Jetton:

      int amount = 10000000; ;; for mint message
      int buy_amount = msg_value - amount;
	
	
Проверим, что получилось не отрицательное значение, выдадим исключение если наоборот:

	throw_unless(76, buy_amount > 0);

Устанавливаем пропорцию:

	int jetton_amount = buy_amount; ;; rate 1 jetton = 1 toncoin; multiply to price here
	
Далее собираем сообщение для функции `mint_tokens()`:

      var master_msg = begin_cell()
            .store_uint(op::internal_transfer(), 32)
            .store_uint(0, 64) ;; quert_id
            .store_coins(jetton_amount)
            .store_slice(my_address()) ;; from_address
            .store_slice(sender_address) ;; response_address
            .store_coins(0) ;; no forward_amount
            .store_uint(0, 1) ;; forward_payload in this slice, not separate cell
            .end_cell();

Вызываем функцию чеканки токенов:

	mint_tokens(sender_address, jetton_wallet_code, amount, master_msg);
	
А также сохраняем данные в регистр `с4`, изменяя общее предложение токенов стандарта Jetton. И заканчиваем выполнение функции `recv_internal()`.

	save_data(total_supply + jetton_amount, admin_address, content, jetton_wallet_code);
	return ();
	
