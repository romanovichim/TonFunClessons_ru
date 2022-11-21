# NFT Sale and Marketplace

## Введение

В данном уроке мы рассмотрим каким образом может быть организована продажа NFT. Примеры контрактов мы возьмем из официальных [примеров по токенам](https://github.com/ton-blockchain/token-contract), нас интересуют:
 - nft-marketplace.fc - контракт маркетплейса
 - nft-sale.fc - контракт продажи конкретной NFT

Данный урок мы построим следующим образом, сначала рассмотрим верхнеуровнево как работают смарт-контракты, а потом уже пройдемся по коду. Разбирать каждое слово в коде мы не будем, так что если вы незнакомы с Func, советую пройти [уроки](https://github.com/romanovichim/TonFunClessons_ru).

## Обзор функциональности

Смарт-контракт маркетплейса осуществляет одну функцию, он инциализирует/деплоит смарт-контракт продажи. Таким образом смарт-контракт маркетплейса просто получает сообщение со всеми необходимимы данными для инциализации продажи и сообщение иницализирует смарт-контракт продажи.

Смарт-контракт продажи осуществляет три функции:
- накопление средства внутри контракта
- продажу
- отмену продажи

После успешной продажи или отмены контракт "сжигается".

Накопление осуществляется путем приема средств в контракт с op == 1.

Отмена продажи осуществляется путем передачи права собственности текущего владельца, текущему владельцу и "сжиганием" смарт-контракта.

При продаже мы отправляем TONcoin'ы владельцу через сообщние, сообщениями платим комиссии маркетплейса и роялти, а в конце отправляем сообщение о смене собственника NFT и сжигаем контракт.

Теперь давайте разберм код контрактов.

### Marketplace Contract

Итак, задача смарт-контракта маркетплейса, задеплоить/проинициализировать в сеть Sale контракт. Делать мы это будем используя уже знакомый нам State Init. Смарт-контракт получит сообщением State Init(код и первичные данные для хранилища), возьмет из него хэш и сформирует таким образом адрес Sale контракта, а далее, для инициализации отправит на этот адрес сообшение. 

Пройдемся по коду, для более детального разбора.

#### Хранилище

В регистре `с4` будем хранить адрес владельца смарт-контракта маркетплейса, он понадобиться нам для проверки от кого пришло сообщение, чтобы инциализировать продажу можно было только с адреса владельца смарт-контракта маркетплейса. 

Для работы с хранилищем в данном смарт-контракте есть две вспомогательные функции`load_data()` и `save_data()`, которые будут выгружать и сохранять данные в хранилище соответственно.

	(slice) load_data() inline {
	  var ds = get_data().begin_parse();
	  return 
		(ds~load_msg_addr() ;; owner
		 );
	}

	() save_data(slice owner_address) impure inline {
	  set_data(begin_cell()
		.store_slice(owner_address)
		.end_cell());
	}

#### Обработка внутренних сообщений

Переходим к разбору `recv_internal()`. Пустые сообщения смарт-контракт, обрабатывать не будет, поэтому сделаем проверку используя `slice_empty()` и закончим выполнение смарт-контракта в случае пустого сообщения с помощью `return()`.

	() recv_internal(int msg_value, cell in_msg_full, slice in_msg_body) impure {
		if (in_msg_body.slice_empty?()) { ;; ignore empty messages
			return ();
		}
	}

Далее достаем флаги и проверяем не является ли поступившее сообщение отскочившим. В случае если это отскок завершаем работу смарт-контракта:

	() recv_internal(int msg_value, cell in_msg_full, slice in_msg_body) impure {
		if (in_msg_body.slice_empty?()) { ;; ignore empty messages
			return ();
		}
		slice cs = in_msg_full.begin_parse();
		int flags = cs~load_uint(4);

		if (flags & 1) {  ;; ignore all bounced messages
			return ();
		}
	}
	
> Подробнее про bounce(отскок) на [78 странице здесь](https://ton-blockchain.github.io/docs/tblkch.pdf))

По логике маркетплейса иницализировать контракт продажи может только владелец смарт-контракта маркетплейса, поэтому достанем из сообщения отправителя сообщения из `с4` достанем адрес владельца и проверим совпадают ли они:

	() recv_internal(int msg_value, cell in_msg_full, slice in_msg_body) impure {
		if (in_msg_body.slice_empty?()) { ;; ignore empty messages
			return ();
		}
		slice cs = in_msg_full.begin_parse();
		int flags = cs~load_uint(4);

		if (flags & 1) {  ;; ignore all bounced messages
			return ();
		}
		slice sender_address = cs~load_msg_addr();

		var (owner_address) = load_data();
		throw_unless(401, equal_slices(sender_address, owner_address));

	}

Переходим к инициализации смарт-контракта продажи, для этого достанем op и проверим что он равен 1.
> Напомню, что использование op является рекомендацией из [документации](https://ton-blockchain.github.io/docs/#/howto/smart-contract-guidelines?id=smart-contract-guidelines) по смарт-контрактам в TON.

	() recv_internal(int msg_value, cell in_msg_full, slice in_msg_body) impure {
		if (in_msg_body.slice_empty?()) { ;; ignore empty messages
			return ();
		}
		slice cs = in_msg_full.begin_parse();
		int flags = cs~load_uint(4);

		if (flags & 1) {  ;; ignore all bounced messages
			return ();
		}
		slice sender_address = cs~load_msg_addr();

		var (owner_address) = load_data();
		throw_unless(401, equal_slices(sender_address, owner_address));
		int op = in_msg_body~load_uint(32);

		if (op == 1) { ;; deploy new auction

		}
	}
	

##### Op == 1

Продолжаем разбирать тело сообщения, достаем сумму TONcoin, которую отправим в Sale контракт, а также достаем StateInit Sale контракта и тело сообщения для деплоя.

    if (op == 1) { ;; deploy new auction
      int amount = in_msg_body~load_coins();
      (cell state_init, cell body) = (cs~load_ref(), cs~load_ref());

    }

Вычислим хэш StateInit используя [cell_hash](https://ton-blockchain.github.io/docs/#/func/stdlib?id=cell_hash) и соберем адрес Sale контракта:

		if (op == 1) { ;; deploy new auction
		  int amount = in_msg_body~load_coins();
		  (cell state_init, cell body) = (cs~load_ref(), cs~load_ref());
		  int state_init_hash = cell_hash(state_init);
		  slice dest_address = begin_cell().store_int(0, 8).store_uint(state_init_hash, 256).end_cell().begin_parse();
		}

Осталось только отправить сообщение, и тогда при поступлении сообщения с op == 1, смарт-контракт маркетплейса будет иницализровать Sale контракт.

		if (op == 1) { ;; deploy new auction
		  int amount = in_msg_body~load_coins();
		  (cell state_init, cell body) = (cs~load_ref(), cs~load_ref());
		  int state_init_hash = cell_hash(state_init);
		  slice dest_address = begin_cell().store_int(0, 8).store_uint(state_init_hash, 256).end_cell().begin_parse();

		  var msg = begin_cell()
			.store_uint(0x18, 6)
			.store_uint(4, 3).store_slice(dest_address)
			.store_grams(amount)
			.store_uint(4 + 2 + 1, 1 + 4 + 4 + 64 + 32 + 1 + 1 + 1)
			.store_ref(state_init)
			.store_ref(body);
		  send_raw_message(msg.end_cell(), 1); ;; paying fees, revert on errors
		}

И на этом по смарт-контракту маркетплейса все, ниже полный код.

	;; NFT marketplace smart contract

	;; storage scheme
	;; storage#_ owner_address:MsgAddress
	;;           = Storage;

	(slice) load_data() inline {
	  var ds = get_data().begin_parse();
	  return 
		(ds~load_msg_addr() ;; owner
		 );
	}

	() save_data(slice owner_address) impure inline {
	  set_data(begin_cell()
		.store_slice(owner_address)
		.end_cell());
	}

	() recv_internal(int msg_value, cell in_msg_full, slice in_msg_body) impure {
		if (in_msg_body.slice_empty?()) { ;; ignore empty messages
			return ();
		}
		slice cs = in_msg_full.begin_parse();
		int flags = cs~load_uint(4);

		if (flags & 1) {  ;; ignore all bounced messages
			return ();
		}
		slice sender_address = cs~load_msg_addr();

		var (owner_address) = load_data();
		throw_unless(401, equal_slices(sender_address, owner_address));
		int op = in_msg_body~load_uint(32);

		if (op == 1) { ;; deploy new auction
		  int amount = in_msg_body~load_coins();
		  (cell state_init, cell body) = (cs~load_ref(), cs~load_ref());
		  int state_init_hash = cell_hash(state_init);
		  slice dest_address = begin_cell().store_int(0, 8).store_uint(state_init_hash, 256).end_cell().begin_parse();

		  var msg = begin_cell()
			.store_uint(0x18, 6)
			.store_uint(4, 3).store_slice(dest_address)
			.store_grams(amount)
			.store_uint(4 + 2 + 1, 1 + 4 + 4 + 64 + 32 + 1 + 1 + 1)
			.store_ref(state_init)
			.store_ref(body);
		  send_raw_message(msg.end_cell(), 1); ;; paying fees, revert on errors
		}
	}

	() recv_external(slice in_msg) impure {
	}


### Sale Contract

#### Обзор

Посмотрим на `op` в `recv_internal()`, чтобы понять, что "умеет" данный смарт-контракт. 
- `op` == 1  - пустой op для просто получения контрактов Toncoin'ов (можно накопить крипту в контракте с помощью этого op для дальнейшего использования)
- `op` == 2 - покупка NFT - для этого op написана вспомогательная функция buy(), которая будет отправлять сообщения для произведения покупки NFT
- `op` == 3 - отмена продажи

#### Хранилище 

Первое, что разберем, что хранит контракт в регистре `с4`(другими словами хранилище). В нашем смарт-контракте есть две вспомогательные функции `load_data()` и `save_data()`, которые будут выгружать и сохранять данные в хранилище соответственно.

В хранилище:
- `slice marketplace_address` - адрес смарт-контракта маркетплейса
- `slice nft_address` - адрес продаваемой nft
- `slice nft_owner_address` - адрес владельца nft
- `int full_price` - цена
- `cell fees_cell` -  ячейка содержащяя информацию о комиссиях, напрмер: комиссия маркетплейса и роялти

Код функции для работы с хранилищем:

	(slice, slice, slice, int, cell) load_data() inline {
	  var ds = get_data().begin_parse();
	  return 
		(ds~load_msg_addr(), ;; marketplace_address 
		  ds~load_msg_addr(), ;; nft_address
		  ds~load_msg_addr(),  ;; nft_owner_address
		  ds~load_coins(), ;; full_price
		  ds~load_ref() ;; fees_cell
		 );
	}

	() save_data(slice marketplace_address, slice nft_address, slice nft_owner_address, int full_price, cell fees_cell) impure inline {
	  set_data(begin_cell()
		.store_slice(marketplace_address)
		.store_slice(nft_address)
		.store_slice(nft_owner_address)
		.store_coins(full_price)
		.store_ref(fees_cell)
		.end_cell());
	}

#### Обработка внутренних сообщений

Как и смарт-контракт маркетплейса, смарт-контракт продажи начинается с выгрузки флагов и проверки, что сообщение не отскочившее(bounced).

	() recv_internal(int my_balance, int msg_value, cell in_msg_full, slice in_msg_body) impure {
		slice cs = in_msg_full.begin_parse();
		int flags = cs~load_uint(4);

		if (flags & 1) {  ;; ignore all bounced messages
			return ();
		}

	}

Далее выгружаем адрес отправителя сообщения в смарт-контракт, а также данные из регистра `с4` (хранилища). 

	() recv_internal(int my_balance, int msg_value, cell in_msg_full, slice in_msg_body) impure {
		slice cs = in_msg_full.begin_parse();
		int flags = cs~load_uint(4);

		if (flags & 1) {  ;; ignore all bounced messages
			return ();
		}

		slice sender_address = cs~load_msg_addr();

		var (marketplace_address, nft_address, nft_owner_address, full_price, fees_cell) = load_data();
	}

##### Неинициализированные NFT

Теперь прежде чем переходить к логике продажи и отмены "аукциона" продажи, нам необходимо обработать ситуацию, когда NFT непроинициализрована. Чтобы понять инциализирована ли NFT проверим нулевой ли адрес владельца. А далее с помощью тильды организуем проверку(`~` is bitwise not в FUNC).

	() recv_internal(int my_balance, int msg_value, cell in_msg_full, slice in_msg_body) impure {
		slice cs = in_msg_full.begin_parse();
		int flags = cs~load_uint(4);

		if (flags & 1) {  ;; ignore all bounced messages
			return ();
		}

		slice sender_address = cs~load_msg_addr();

		var (marketplace_address, nft_address, nft_owner_address, full_price, fees_cell) = load_data();

		var is_initialized = nft_owner_address.slice_bits() > 2; ;; not initialized if null address

		if (~ is_initialized) {


		}
	}

Сразу отмечу, что принимать сообщения в случае неинциализированной NFT мы будем только от адреса NFT и только с op означающим передачу права собственности, таким образом обработка неинициализированной NFT в Sale контракте сводиться к установлению владельца. Но давайте по порядку:

В случае если сообщение прислано от маркетплейса, просто аккумулируем Toncoin'ы в контракте (случай деплоя контракта например).

		if (~ is_initialized) {

		  if (equal_slices(sender_address, marketplace_address)) {
			 return (); ;; just accept coins on deploy
		  }

		}

Далее смотрим, чтобы сообщение пришло от NFT контракта, а также проверяем что `op` такого сообщения равен `ownership_assigned`, т.е это сообщение о произошедшем изменении права собственности.

    if (~ is_initialized) {
      
      if (equal_slices(sender_address, marketplace_address)) {
         return (); ;; just accept coins on deploy
      }

      throw_unless(500, equal_slices(sender_address, nft_address));
      int op = in_msg_body~load_uint(32);
      throw_unless(501, op == op::ownership_assigned());

    }
	
Осталось только достать адрес и сохранить информацию об изменившемся праве собственности на NFT.

		if (~ is_initialized) {

		  if (equal_slices(sender_address, marketplace_address)) {
			 return (); ;; just accept coins on deploy
		  }

		  throw_unless(500, equal_slices(sender_address, nft_address));
		  int op = in_msg_body~load_uint(32);
		  throw_unless(501, op == op::ownership_assigned());
		  int query_id = in_msg_body~load_uint(64);
		  slice prev_owner_address = in_msg_body~load_msg_addr();

		  save_data(marketplace_address, nft_address, prev_owner_address, full_price, fees_cell);

		  return ();

		}
		
##### Сообщение с пустым телом

В данном пример Sale контракта, также предусмотрен случай, если тело сообщения которое придет в контракт будем пустым, в таком случае контракт просто попробует осуществить покупку вызвав вспомогательную функцию `buy()`.

		if (in_msg_body.slice_empty?()) {
			buy(my_balance, marketplace_address, nft_address, nft_owner_address, full_price, fees_cell, msg_value, sender_address, 0);
			return ();
		}
		
После обработки случая пустого сообщения  достаем `op` и `query_id`.  `op ` будем использовать для построения логики, в самом конце добавим вызов ошибки - для случая когда пришло что-то "непонятное":

		int op = in_msg_body~load_uint(32);
		int query_id = in_msg_body~load_uint(64);

		if (op == 1) { 
			;; аккумулируем в контракте TONCoins'ы
			return ();
		}

		if (op == 2) { 
			 ;; покупка NFT
			return ();
		}

		if (op == 3) { 
			;;отмена продажи
			return ();
		}

		throw(0xffff);

##### Покупка

Для покупки, собрана отдельная вспомогательная фукнция, которую мы вызываемв `recv_internal()`.

    if (op == 2) { ;; buy
     
      buy(my_balance, marketplace_address, nft_address, nft_owner_address, full_price, fees_cell, msg_value, sender_address, query_id);

      return ();

    }

Первое что надо сделать перед проведением продажи, это проверить достаточно ли средств прислано с сообщением. Для этого нужно проверить, что денег хватит покрыть цену, а также комиссии связанные с отправкой сообщений.

Для комиссий определим функцию `min_gas_amount()`, которая просто будет хранить значение в 1 TON для проверки, функция определена как низкоуровневый примитив TVM, с помощью ключевого слова `asm`.

	int min_gas_amount() asm "1000000000 PUSHINT"; ;; 1 TON

Реализуем проверку, а также сразу же выгрузим информацию о роялти, для этого есть отдельная вспомогательная функция:

	() buy(int my_balance, slice marketplace_address, slice nft_address, slice nft_owner_address, int full_price, cell fees_cell, int msg_value, slice sender_address, int query_id) impure {
	  throw_unless(450, msg_value >= full_price + min_gas_amount());

	  var (marketplace_fee, royalty_address, royalty_amount) = load_fees(fees_cell);

	}

	(int, slice, int) load_fees(cell fees_cell) inline {
	  var ds = fees_cell.begin_parse();
	  return 
		(ds~load_coins(), ;; marketplace_fee,
		  ds~load_msg_addr(), ;; royalty_address 
		  ds~load_coins() ;; royalty_amount
		 );
	}

Переходим к отправке сообщений. Первое сообщение мы отправим текущему владельцу NFT, ему мы переведи TONсoin'ы. Количество должно быть равно: цена NFT минус комисии маркетплейса и роялти, а также остатки по балансу смарт-контракта, на случай, например, если покупка осуществлялась не одним сообщением и в контракте уже были TONсoin'ы. 

	() buy(int my_balance, slice marketplace_address, slice nft_address, slice nft_owner_address, int full_price, cell fees_cell, int msg_value, slice sender_address, int query_id) impure {
	  throw_unless(450, msg_value >= full_price + min_gas_amount());

	  var (marketplace_fee, royalty_address, royalty_amount) = load_fees(fees_cell);

	  var owner_msg = begin_cell()
			   .store_uint(0x10, 6) ;; nobounce
			   .store_slice(nft_owner_address)
			   .store_coins(full_price - marketplace_fee - royalty_amount + (my_balance - msg_value))
			   .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1);

	  send_raw_message(owner_msg.end_cell(), 1);

	  }

Дальше отправляем роялти и комиссии маркетплейса, здесь все просто на адреса роялти и маркетплейса отправляются соотвтствующие суммы:

	() buy(int my_balance, slice marketplace_address, slice nft_address, slice nft_owner_address, int full_price, cell fees_cell, int msg_value, slice sender_address, int query_id) impure {
	  throw_unless(450, msg_value >= full_price + min_gas_amount());

	  var (marketplace_fee, royalty_address, royalty_amount) = load_fees(fees_cell);

	  var owner_msg = begin_cell()
			   .store_uint(0x10, 6) ;; nobounce
			   .store_slice(nft_owner_address)
			   .store_coins(full_price - marketplace_fee - royalty_amount + (my_balance - msg_value))
			   .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1);

	  send_raw_message(owner_msg.end_cell(), 1);


	  var royalty_msg = begin_cell()
			   .store_uint(0x10, 6) ;; nobounce
			   .store_slice(royalty_address)
			   .store_coins(royalty_amount)
			   .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1);

	  send_raw_message(royalty_msg.end_cell(), 1);


	  var marketplace_msg = begin_cell()
			   .store_uint(0x10, 6) ;; nobounce
			   .store_slice(marketplace_address)
			   .store_coins(marketplace_fee)
			   .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1);

	  send_raw_message(marketplace_msg.end_cell(), 1);

	}

Остается отправить последнее сообщение, сообщение в NFT контракт о передаче собственности (с `op::transfer()`) 

	() buy(int my_balance, slice marketplace_address, slice nft_address, slice nft_owner_address, int full_price, cell fees_cell, int msg_value, slice sender_address, int query_id) impure {
	  throw_unless(450, msg_value >= full_price + min_gas_amount());

	  var (marketplace_fee, royalty_address, royalty_amount) = load_fees(fees_cell);

	  var owner_msg = begin_cell()
			   .store_uint(0x10, 6) ;; nobounce
			   .store_slice(nft_owner_address)
			   .store_coins(full_price - marketplace_fee - royalty_amount + (my_balance - msg_value))
			   .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1);

	  send_raw_message(owner_msg.end_cell(), 1);


	  var royalty_msg = begin_cell()
			   .store_uint(0x10, 6) ;; nobounce
			   .store_slice(royalty_address)
			   .store_coins(royalty_amount)
			   .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1);

	  send_raw_message(royalty_msg.end_cell(), 1);


	  var marketplace_msg = begin_cell()
			   .store_uint(0x10, 6) ;; nobounce
			   .store_slice(marketplace_address)
			   .store_coins(marketplace_fee)
			   .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1);

	  send_raw_message(marketplace_msg.end_cell(), 1);

	  var nft_msg = begin_cell()
			   .store_uint(0x18, 6) 
			   .store_slice(nft_address)
			   .store_coins(0)
			   .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
			   .store_uint(op::transfer(), 32)
			   .store_uint(query_id, 64)
			   .store_slice(sender_address) ;; new_owner_address
			   .store_slice(sender_address) ;; response_address
			   .store_int(0, 1) ;; empty custom_payload
			   .store_coins(0) ;; forward amount to new_owner_address
			   .store_int(0, 1); ;; empty forward_payload


	  send_raw_message(nft_msg.end_cell(), 128 + 32);
	}

B вроде бы все, но стоит остановиться на режиме с которым мы отправили последнее сообщение.

###### "Сжигание контракта" mode ==  128 + 32 

После отправки сообщения о передаче NFT, смарт-контракт продажи больше не актуален, возникает вопрос как его "уничтожить" или другими словами "сжечь". В TON есть режим отправки сообщения, который уничтожает текущий контракт. 

`mode' = mode + 32` означает, что текущий счет должен быть уничтожен, если его результирующий баланс равен нулю. ([Ссылка на документацию](https://ton-blockchain.github.io/docs/#/func/stdlib?id=send_raw_message))

Таким образом в самом конце функции `buy()` мы отправляем сообщение о переходе права собствености и сжигаем данный контракт о продаже.

Итоговый код функции `buy()`:

	() buy(int my_balance, slice marketplace_address, slice nft_address, slice nft_owner_address, int full_price, cell fees_cell, int msg_value, slice sender_address, int query_id) impure {
	  throw_unless(450, msg_value >= full_price + min_gas_amount());

	  var (marketplace_fee, royalty_address, royalty_amount) = load_fees(fees_cell);

	  var owner_msg = begin_cell()
			   .store_uint(0x10, 6) ;; nobounce
			   .store_slice(nft_owner_address)
			   .store_coins(full_price - marketplace_fee - royalty_amount + (my_balance - msg_value))
			   .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1);

	  send_raw_message(owner_msg.end_cell(), 1);


	  var royalty_msg = begin_cell()
			   .store_uint(0x10, 6) ;; nobounce
			   .store_slice(royalty_address)
			   .store_coins(royalty_amount)
			   .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1);

	  send_raw_message(royalty_msg.end_cell(), 1);


	  var marketplace_msg = begin_cell()
			   .store_uint(0x10, 6) ;; nobounce
			   .store_slice(marketplace_address)
			   .store_coins(marketplace_fee)
			   .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1);

	  send_raw_message(marketplace_msg.end_cell(), 1);

	  var nft_msg = begin_cell()
			   .store_uint(0x18, 6) 
			   .store_slice(nft_address)
			   .store_coins(0)
			   .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
			   .store_uint(op::transfer(), 32)
			   .store_uint(query_id, 64)
			   .store_slice(sender_address) ;; new_owner_address
			   .store_slice(sender_address) ;; response_address
			   .store_int(0, 1) ;; empty custom_payload
			   .store_coins(0) ;; forward amount to new_owner_address
			   .store_int(0, 1); ;; empty forward_payload


	  send_raw_message(nft_msg.end_cell(), 128 + 32);
	}

##### Отмена продажи

Отмена просходит просто сообщение о передаче права владением NFT от текущего владельца, текущему владельцу с `mode ==  128 + 32` для последующего сжигания контракта. Но конечно же сначала надо проверить несколько условий.

Первое, что надо проверить, это то, что нам хватит TONcoin для отправки сообщений 

    if (op == 3) { ;; cancel sale
         throw_unless(457, msg_value >= min_gas_amount());

        return ();
    }

Второе, то, что сообщение об отмене продажи, пришло либо с маркетплейса или от владельца NFT. Для этого воспользуемся побитовым ИЛИ `|`.

    if (op == 3) { ;; cancel sale
         throw_unless(457, msg_value >= min_gas_amount());
         throw_unless(458, equal_slices(sender_address, nft_owner_address) | equal_slices(sender_address, marketplace_address));

        return ();
    }
	
Ну и последнее это отправка сообщения о передаче права собствености от владельца владельцу)

    if (op == 3) { ;; cancel sale
         throw_unless(457, msg_value >= min_gas_amount());
         throw_unless(458, equal_slices(sender_address, nft_owner_address) | equal_slices(sender_address, marketplace_address));

         var msg = begin_cell()
           .store_uint(0x10, 6) ;; nobounce
           .store_slice(nft_address)
           .store_coins(0)
           .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
           .store_uint(op::transfer(), 32)
           .store_uint(query_id, 64) 
           .store_slice(nft_owner_address) ;; new_owner_address
           .store_slice(nft_owner_address) ;; response_address;
           .store_int(0, 1) ;; empty custom_payload
           .store_coins(0) ;; forward amount to new_owner_address
           .store_int(0, 1); ;; empty forward_payload

        send_raw_message(msg.end_cell(), 128 + 32);

        return ();
    }
	
## Заключение

Подобные разборы и туториалы я публикую в телеграм канале https://t.me/ton_learn буду рад вашей подписке.