# Урок 10 Стандарт NFT

В 9 уроке мы разобрали, что есть деление токенов на невзаимозаменяемые и взаимозаменяемые, а также как выглядит стандарт взаимозаменяемых токенов, в этом уроке мы обсудим невзаимозаменяемые токены и разберем примеры по стандарту.

## Что такое стандарт NFT в TON

Итак, невзаимозаменяемые токены - это активы, каждый экземпляр которого уникален (специфичен) и не может быть замещён другим аналогичным активом. Невзаимозаменяемый токен представляет собой некоторый сертификат цифрового объекта с возможностью передавать сертификат через некоторый механизм.

[Стандарт NFT в TON](https://github.com/ton-blockchain/TIPs/issues/62) описывает:

-   Изменение формы собственности.
-   Способ объединения предметов в коллекции.
-   Способ дедупликации общей части коллекции.

> Дедупликация - метод исключения дублирующих копий, повторяющихся данных

Как и для Jetton, в стандарте NFT есть мастер-контракт - контракт коллекции и смарт-контракты для отдельной NFT в коллекции. В стандарте есть отличный пример: Если вы выпустите коллекцию, содержащую 10 000 элементов, то вы развернете 10 001 смарт-контракт, один контракт коллекции и 10000 контрактов для каждого элемента.

> В стандарте NFT также объясняется почему выбрана именно такая схема реализации NFT, с таким количеством контрактов, пункт - Rationale и следующий за ним.

В TON для [стандарта NFT](https://github.com/ton-blockchain/TIPs/issues/62) есть расширения(на 29.07.2022 часть из них в Драфтах):

-   [NFTRoyalty](https://github.com/ton-blockchain/TIPs/issues/66) - о способе получения информации о выплате роялти и обеспечении универсальную поддержку выплат роялти на всех торговых площадках NFT и участниках экосистемы.
-   [NFTBounceable](https://github.com/ton-blockchain/TIPs/issues/67) - о способ отката NFT-переводов, если получатель отклонил уведомление. (Например, если NFT был отправлен не на тот адрес, а смарт-контракт получателя не знает, как взаимодействовать с NFT.)
-   [NFTEditable](https://github.com/ton-blockchain/TIPs/issues/68) - об массовых изменениях NFT
-   [NFTUpgradable](https://github.com/ton-blockchain/TIPs/issues/69) - об изменяемых NFT

#### Функциональность контрактов по стандарту NFT

Стандарт описывает два ключевых смарт-контракта для NFT:

-   смарт-контракт коллекции
-   смарт-контракт отдельной NFT

> В [примерах](https://github.com/ton-blockchain/token-contract/tree/main/nft) также есть смарт-контракт реализующий продажу и некое подобие маркетплейса, но в данном уроке эти контракты мы разбирать не будем, сфокусируемся на стандарте NFT.

Смарт-контракт коллекции, должен реализовывать:

-   развертывание(деплой) смарт-контракты элементов NFT этой коллекции. (в примере, который мы будет разбирать будет и деплой одной NFT и массовый деплой NFT)
-   Get-метод `get_collection_data()` , который вернет адрес владельца коллекции, контент коллекции, и счетчик текущих NFT в коллекции
-   Get-метод `get_nft_address_by_index(int index)`, который по номеру элемента NFT этой коллекции и возвращает адрес (`MsgAddress`) смарт-контракта этого элемента NFT
-   Get-метод `get_nft_content(int index, cell individual_content)`, который возвращает информацию по конкретной NFT в коллекции

Смарт-контракт отдельной NFT, должен реализовывать:

-   Get-метод `get_nft_data()`, которые вернет данные по этой NFT
-   передачу права владения NFT
-   внутренний(internal) метод `get_static_data`, для получения данных об отдельной NFT внутренним сообщением.

> Важно: внутри стандарта также описывается много нюансов относительно комиссий, ограничений и прочего, но слишком подробно мы останавливаться на этом не будем, чтобы урок не превращался в книгу.

#### Метаданные под стандарт NFT

-   `uri` - необязательный параметр, ссылка на JSON документ с метаданными.
-   `name` - строка идентификатор NFT, т.е. идентифицирует актив.
-   `description` - описание актива.
-   `image` - URI, указывающий на ресурс с изображением MIME-типа.
-   `image_data` - Либо двоичное представление изображения для макета в сети, либо base64 для макета вне сети.

## Разбираем код

Перед разбором кода отмечу, что в целом "механики" повторяются, поэтому чем дальше в разбор, тем более верхнеуровневый будет разбор.

Разбирать будем файлы из [репозитория](https://github.com/ton-blockchain/token-contract/tree/main/nft) будем в следующем порядке:

-   nft-collection.fc
-   nft-item.fc

## nft-collection.fc

Контракт коллекции начинается с двух вспомогательные функций, для загрузки и выгрузки данных.

##### Загружаем и выгружаем данные из c4

В "хранилище контракта коллекции" будет храниться:

-   `owner_address` - адрес владельца коллекции, если владельца нет, то нулевой адрес
-   `next_item_index` - количество развернутых в настоящее время элементов NFT в коллекции\*.
-   `content` - содержимое коллекции в формате, соответствующем стандарту [токена](https://github.com/ton-blockchain/TIPs/issues/64).
-   `nft_item_code` - код отдельной NFT, будет использоваться для "воспроизведения" адреса смарт-контракта.
-   `royalty_params` - параметры роялти

> -   -   Если значение `next_item_index` -1 значит это непоследовательная коллекция, такие коллекции должны предоставлять собственный способ генерации индекса/перечисления элементов.

Напишем вспомогательные функции `load_data()` и `save_data()` которые будут выгружать и загружать данные из регистра с4. (Подробно загрузку и выгрузку разбирать не будем, так как похожий функционал был много раз разобран в предыдущих уроках).

##### Функции "воспроизведения"

В данном смарт-контракте, нам понадобиться по адресу владельца воспроизводить адрес смарт-контракта с отдельной НФТ этого владельца. Для этого будем использовать тот же "трюк", что и в примерах по Jetton.

Напомню, если мы изучим [документацию](https://docs.ton.org/develop/howto/step-by-step#3-compiling-a-new-smart-contract), того как компилируется смарт-контракт.

Мы можем увидеть следующее:

Код и данные для нового смарт-контракта объединяются в структуру StateInit (в следующих строках), вычисляется и выводится адрес нового смарт-контракта (равный хешу этой структуры StateInit), а затем внешнее сообщение с создается адрес назначения, равный адресу нового смарт-контракта. Это внешнее сообщение содержит как правильный StateInit для нового смарт-контракта, так и нетривиальную полезную нагрузку (подписанную правильным закрытым ключом).

Для нас это значит, что мы можем получить адрес смарт-контракта отдельной NFT используя `item_index` и код смарт-контракта отдельной NFT, соберем StateInit кошелька.

Подобное возможно, так как функции [хэширования](https://ru.wikipedia.org/wiki/%D0%A5%D0%B5%D1%88-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8F) детерминированы, это значит, что для разных входных данных будет разный хэш,
при этом для одних и тех же входных данных хэш функция будет возвращать всегда единообразный хэш.

Для этого в смарт-контракте есть функции `calculate_nft_item_state_init()` и `calculate_nft_item_address()`:

    cell calculate_nft_item_state_init(int item_index, cell nft_item_code) {
      cell data = begin_cell().store_uint(item_index, 64).store_slice(my_address()).end_cell();
      return begin_cell().store_uint(0, 2).store_dict(nft_item_code).store_dict(data).store_uint(0, 1).end_cell();
    }

    slice calculate_nft_item_address(int wc, cell state_init) {
      return begin_cell().store_uint(4, 3)
    					 .store_int(wc, 8)
    					 .store_uint(cell_hash(state_init), 256)
    					 .end_cell()
    					 .begin_parse();
    }

Функция `calculate_nft_item_state_init()` cобирает StateInit в соответствии с заданным `item_index`.

Функция `calculate_nft_item_address()` собирает адрес в соответствии с [TL-B схемой](https://github.com/ton-blockchain/ton/blob/master/crypto/block/block.tlb#L99).

> для вычисления хэш используется функция`cell_hash()` - она вычисляет хэш представления ячейки.

##### Вспомогательная функция деплоя отдельной NFT

> \*Деплой - процесс переноса в сеть (в данном случае отдельной NFT)

Чтобы задеплоить NFT нам надо будет отправить на адрес смарт-контракта необходимую информацию по NFT, соответственно:

-   воспроизведем адрес смарт-контракта отдельной NFT
-   отправим информацию сообщением

Адрес смарт-контракта:

    	() deploy_nft_item(int item_index, cell nft_item_code, int amount, cell nft_content) impure {
    	  cell state_init = calculate_nft_item_state_init(item_index, nft_item_code);
    	  slice nft_address = calculate_nft_item_address(workchain(), state_init);

    	}

workchain() - это вспомогательная функция из `params.fc`. Она определена как низкоуровневый примитив TVM, с помощью ключевого слова `asm`.

    int workchain() asm "0 PUSHINT";

Номер 0 это базовый ворчейн.

Отправляем информацию сообщением:

    () deploy_nft_item(int item_index, cell nft_item_code, int amount, cell nft_content) impure {
      cell state_init = calculate_nft_item_state_init(item_index, nft_item_code);
      slice nft_address = calculate_nft_item_address(workchain(), state_init);
      var msg = begin_cell()
    			.store_uint(0x18, 6)
    			.store_slice(nft_address)
    			.store_coins(amount)
    			.store_uint(4 + 2 + 1, 1 + 4 + 4 + 64 + 32 + 1 + 1 + 1)
    			.store_ref(state_init)
    			.store_ref(nft_content);
      send_raw_message(msg.end_cell(), 1); ;; pay transfer fees separately, revert on errors
    }

##### Вспомогательная функция отправки параметров Роялти

Эта вспомогательная функция отправит статические данные о роялти в случае внутреннего сообщения в `recv_internal()`.

Технически здесь все просто, отправляем сообщение с `op` кодом `op::report_royalty_params()` :

    () send_royalty_params(slice to_address, int query_id, slice data) impure inline {
      var msg = begin_cell()
    	.store_uint(0x10, 6) ;; nobounce - int_msg_info$0 ihr_disabled:Bool bounce:Bool bounced:Bool src:MsgAddress -> 011000
    	.store_slice(to_address)
    	.store_coins(0)
    	.store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
    	.store_uint(op::report_royalty_params(), 32)
    	.store_uint(query_id, 64)
    	.store_slice(data);
      send_raw_message(msg.end_cell(), 64); ;; carry all the remaining value of the inbound message
    }

#### recv_internal()

Для того, чтобы наша кошелек мог принимать сообщения будем использовать внешний метод `recv_internal()`

    () recv_internal(int balance, int msg_value, cell in_msg_full, slice in_msg_body)  {

    }

Внешний метод нашего смарт-контракта коллекции, должен реализовывать:

-   отправку параметров роялти
-   деплой отдельной NFT
-   деплой сразу нескольких NFT (batch deploy)
-   изменение владельца
-   а также большое количество исключений, проверяющих логику работы)

##### Соберем каркас внешнего метода

Итак первое, что мы сделаем в `recv_internal()` это проверим пустое ли сообщение:

      if (in_msg_body.slice_empty?()) { ;; ignore empty messages
    	return ();
      }

Далее достаем флаги и проверяем не является ли поступившее сообщение отскочившим. В случае если это отскок завершаем работу функции:

    	slice cs = in_msg_full.begin_parse();
    	int flags = cs~load_uint(4);

    	if (flags & 1) { ;; ignore all bounced messages
    		return ();
    	}

Далее достаем адрес отправителя, а также `op` и `query_id`:

    slice sender_address = cs~load_msg_addr();
    int op = in_msg_body~load_uint(32);
    int query_id = in_msg_body~load_uint(64);

Выгружаем данные из регистра `с4`:

    var (owner_address, next_item_index, content, nft_item_code, royalty_params) = load_data();

Используя заранее описанную функцию для передачи информации по роялти, отправляем эту информацию:

    if (op == op::get_royalty_params()) {
        send_royalty_params(sender_address, query_id, royalty_params.begin_parse());
        return ();
    }

Далее будет функционал, который доступен только владельцу коллекции (выпуск NFT и.т.д), поэтому проверим адрес и выдадим исключение если это не так:

    throw_unless(401, equal_slices(sender_address, owner_address));

С помощью условных операторов и `op` создается дальнейшая логика смарт-контракта:

    if (op == 1) { ;; deploy new nft

    }
    if (op == 2) { ;; batch deploy of new nfts

    }
    if (op == 3) { ;; change owner

    }
    throw(0xffff);

В конце идет исключение, т.е. если контракт не выполнит какое-то действие в соответствии с `op`, будет исключение. Итоговый каркас `recv_internal()`:

    () recv_internal(cell in_msg_full, slice in_msg_body) impure {
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

    	var (owner_address, next_item_index, content, nft_item_code, royalty_params) = load_data();

    	if (op == op::get_royalty_params()) {
    		send_royalty_params(sender_address, query_id, royalty_params.begin_parse());
    		return ();
    	}

    	throw_unless(401, equal_slices(sender_address, owner_address));


    	if (op == 1) { ;; deploy new nft

    	}
    	if (op == 2) { ;; batch deploy of new nfts

    	}
    	if (op == 3) { ;; change owner

    	}
    	throw(0xffff);
    }

##### op == 1 Деплоим NFT

Достаем из тела сообщения индекс отдельной NFT:

    if (op == 1) { ;; deploy new nft
      int item_index = in_msg_body~load_uint(64);

      return ();
    }

Проверяем, что индекс не больше следующего индекса, выгруженного из с4:

    if (op == 1) { ;; deploy new nft
      int item_index = in_msg_body~load_uint(64);
      throw_unless(402, item_index <= next_item_index);

      }
      return ();
    }

Добавим переменную `is_last`, которую мы будем использовать для проверки, а также поменяем значение `item_index` на `next_item_index`.

Сразу же после этого воспользуемся вспомогательной функцией для деплой NFT:

     if (op == 1) { ;; deploy new nft
      int item_index = in_msg_body~load_uint(64);
      throw_unless(402, item_index <= next_item_index);
      var is_last = item_index == next_item_index;
      deploy_nft_item(item_index, nft_item_code, in_msg_body~load_coins(), in_msg_body~load_ref());

    }

Теперь осталось сохранить данные в регистре `с4`, проверим `is_last`, добавим единицу в счетчик `next_item_index` и сохраним данные в `с4`.

     if (op == 1) { ;; deploy new nft
      int item_index = in_msg_body~load_uint(64);
      throw_unless(402, item_index <= next_item_index);
      var is_last = item_index == next_item_index;
      deploy_nft_item(item_index, nft_item_code, in_msg_body~load_coins(), in_msg_body~load_ref());
      if (is_last) {
        next_item_index += 1;
        save_data(owner_address, next_item_index, content, nft_item_code, royalty_params);
      }
      return ();
    }

В конце заканчиваем выполнение функции с помощью `return ()`.

##### op == 2 Массовый деплой NFT

Массовый деплой это просто деплой NFT циклом, цикл будет проходить по словарю, данные для которого мы просто выгрузим из тела сообщения (ссылка на начало словаря, если говорить простыми словами).

> Подробно на работе со словарями(Hashmaps) мы останавливались в седьмом уроке

Так же считаю важным отметить, что "разовый" массовый деплой в TON ограничен. В [TVM](https://docs.ton.org/learn/tvm-instructions/tvm-overview#tvm-is-a-stack-machine), количество выходных действий в одной транзакции должно быть `<=255`.

> Напомню, что в FunС есть три [цикла](https://docs.ton.org/develop/func/statements#loops): `repeat`,`until`,`while`

Создадим счетчик `counter`, который мы будем использовать в цикле, а также выгрузим ссылку на список NFT.

    	if (op == 2) { ;; batch deploy of new nfts
    	  int counter = 0;
    	  cell deploy_list = in_msg_body~load_ref();

    	}

Далее нам предстоит воспользоваться фукнцией `udict::delete_get_min(cell dict, int key_len)` - вычисляет минимальный ключ `k` в словаре `dict`, удаляет его и возвращает (dict', x, k, -1), где `dict'`— модифицированная версия `dict`, а x — значение, связанное с `k`. Если `dict` пуст, возвращает (dict, null, null, 0). Последнее значение -1, это флаг, если функция возвращает модифицированный словарь, то флаг равен -1, если нет, то 0. Флаг мы будем использовать, как условие цикла

Итак, обозначим цикл, и используя `udict::delete_get_min(cell dict, int key_len)` будем доставать значения NFT для деплоя.

    if (op == 2) { ;; batch deploy of new nfts
      int counter = 0;
      cell deploy_list = in_msg_body~load_ref();
      do {
        var (item_index, item, f?) = deploy_list~udict::delete_get_min(64);

      } until ( ~ f?);
    }

> ~ - побитовое не ? - условный оператор

Проверим флаг (т.е. есть с чем работать), сразу же после проверки увеличим счетчик `counter`, который мы определили ранее. Делаем мы это для того, чтобы проверить условие, что количество NFT единиц при массовом деплое не выходит за рамки ограничений TVM (об этом писал выше).

    if (op == 2) { ;; batch deploy of new nfts
      int counter = 0;
      cell deploy_list = in_msg_body~load_ref();
      do {
        var (item_index, item, f?) = deploy_list~udict::delete_get_min(64);
        if (f?) {
          counter += 1;
          if (counter >= 250) { ;; Limit due to limits of action list size
            throw(399);
          }

      } until ( ~ f?);
    }

Также проверим, что нет путаницы с индексами, то есть текущий индекс не больше следующего. А после этого задеплоим NFT. Дополнительно, обработаем ситуацию, если номер текущего NFT равен следующему, добавив единичку.

    if (op == 2) { ;; batch deploy of new nfts
      int counter = 0;
      cell deploy_list = in_msg_body~load_ref();
      do {
        var (item_index, item, f?) = deploy_list~udict::delete_get_min(64);
        if (f?) {
          counter += 1;
          if (counter >= 250) { ;; Limit due to limits of action list size
            throw(399);
          }

          throw_unless(403 + counter, item_index <= next_item_index);
          deploy_nft_item(item_index, nft_item_code, item~load_coins(), item~load_ref());
          if (item_index == next_item_index) {
            next_item_index += 1;
          }
        }
      } until ( ~ f?);

    }

В самом конце остается сохранить данные и закончить выполнение функции. Итоговый код `op` == 2.

    if (op == 2) { ;; batch deploy of new nfts
      int counter = 0;
      cell deploy_list = in_msg_body~load_ref();
      do {
        var (item_index, item, f?) = deploy_list~udict::delete_get_min(64);
        if (f?) {
          counter += 1;
          if (counter >= 250) { ;; Limit due to limits of action list size
            throw(399);
          }

          throw_unless(403 + counter, item_index <= next_item_index);
          deploy_nft_item(item_index, nft_item_code, item~load_coins(), item~load_ref());
          if (item_index == next_item_index) {
            next_item_index += 1;
          }
        }
      } until ( ~ f?);
      save_data(owner_address, next_item_index, content, nft_item_code, royalty_params);
      return ();
    }

##### op == 3 Изменение владельца

В примере смарт-контракта коллекции предусмотрен функционал изменения владельца коллекции - меняется адрес. Работает это так:

-   достаем из тела сообщения адрес нового владельца с помощью `load_msg_addr()`
-   сохраняем данные в регистре `c4` с новым владельцем

    if (op == 3) { ;; change owner
    slice new_owner = in_msg_body~load_msg_addr();
    save_data(new_owner, next_item_index, content, nft_item_code, royalty_params);
    return ();
    }

#### Get-методы

В нашем примере есть четыре Get-метода:

-   get_collection_data() - возвращает информацию о коллекции(адрес владельца, метаданные по [стандарту Токена](https://github.com/ton-blockchain/TIPs/issues/64) о коллекции, и счетчик индексов NFT)
-   get_nft_address_by_index(int index) - по индексу воспроизводит смарт-контракт NFT
-   royalty_params() - возвращает параметры роялти
-   get_nft_content(int index, cell individual_nft_content) - возвращает информацию по конкретной NFT в коллекции

> Роялти в NFT это отчисления всякий раз, когда их NFT переходят из рук в руки на вторичном рынке

Методы get_collection_data(),get_nft_address_by_index(),get_nft_content() обязательны для стандарта NFT в TON.

##### get_collection_data()

Достаем из регистра `c4` адрес владельца, индекс (количество развернутых в данный момент элементов NFT в коллекции.) и информацию о коллекции и просто возвращаем эти данные.

    (int, cell, slice) get_collection_data() method_id {
      var (owner_address, next_item_index, content, _, _) = load_data();
      slice cs = content.begin_parse();
      return (next_item_index, cs~load_ref(), owner_address);
    }

##### get_nft_address_by_index()

Получает серийный номер элемента NFT этой коллекции и возвращает адрес (MsgAddress) смарт-контракта этого элемента NFT. Воспроизведение адреса смарт-контракта происходит за счет StateInit(уже разибирали это).

    slice get_nft_address_by_index(int index) method_id {
    	var (_, _, _, nft_item_code, _) = load_data();
    	cell state_init = calculate_nft_item_state_init(index, nft_item_code);
    	return calculate_nft_item_address(workchain(), state_init);
    }

##### royalty_params()

Возвращаем параметры роялти. Данная функция относиться к расширению стандарта NFT, а именно [NFTRoyalty](https://github.com/ton-blockchain/TIPs/issues/66).
`royalty_params()` возвращает числитель, знаменатель и адрес для отправки роялти. Доля роялти — это числитель/знаменатель. Например, если числитель = 11, а знаменатель = 1000, то доля роялти составляет 11/1000 \* 100% = 1,1%. Числитель должен быть меньше знаменателя.

    (int, int, slice) royalty_params() method_id {
    	 var (_, _, _, _, royalty) = load_data();
    	 slice rs = royalty.begin_parse();
    	 return (rs~load_uint(16), rs~load_uint(16), rs~load_msg_addr());
    }

##### get_nft_content()

Получает серийный номер элемента NFT этой коллекции и индивидуальное содержимое этого элемента NFT и возвращает полное содержимое элемента NFT в формате, соответствующем [стандарту TIP-64](https://github.com/ton-blockchain/TIPs/issues/64).

Здесь важно отметить, как возвращается контент:

      return (begin_cell()
    					  .store_uint(1, 8) ;; offchain tag
    					  .store_slice(common_content)
    					  .store_ref(individual_nft_content)
    		  .end_cell());

`store_uint(1, 8) ` - подобный тэг означает что данные хранятся не в сети, про тэги хранения данных можно почитать в стандарте токена - [Content representation](https://github.com/ton-blockchain/TIPs/issues/64).

Полный код функции:

    cell get_nft_content(int index, cell individual_nft_content) method_id {
      var (_, _, content, _, _) = load_data();
      slice cs = content.begin_parse();
      cs~load_ref();
      slice common_content = cs~load_ref().begin_parse();
      return (begin_cell()
    					  .store_uint(1, 8) ;; offchain tag
    					  .store_slice(common_content)
    					  .store_ref(individual_nft_content)
    		  .end_cell());
    }

## nft-item.fc

Смарт-контракт отдельной NFT начинается с вспомогательных функций для работы с регистром `с4`, давайте разберем, что будет храниться в "хранилище" смарт-контракта отдельной NFT.

-   `index` - индекс этой отдельной NFT
-   `collection_address` - адрес смарт-контракта коллекции, к которой принадлежит этот NFT.
-   `owner_address` - адрес текущего владельца этого NFT
-   `content` - контент, если у NFT есть коллекция - индивидуальный контент NFT в любом формате, если у NFT нет коллекции - содержимое NFT в формате, соответствующем стандарту TIP-64.

> Может возникнуть вопрос, а что передавать в `collection_address` и `index`, если нет коллекции, в `collection_address` передадим addr_none, в `index` передадим произвольное, но постоянное значение.

#### Загружаем данные

Здесь используем уже знакомые нам `store_` функции:

    () store_data(int index, slice collection_address, slice owner_address, cell content) impure {
    	set_data(
    		begin_cell()
    			.store_uint(index, 64)
    			.store_slice(collection_address)
    			.store_slice(owner_address)
    			.store_ref(content)
    			.end_cell()
    	);
    }

А вот с выгрузкой данных и `c4` будет все посложнее чем в прошлые разы.

#### Выгружаем данные

Помимо данных из `c4` мы также будет прокидывать значение 0 и -1, в зависимости от того полностью ли инициализирован NFT и готов к взаимодействию.
Значение мы будем получать следующим образом:

-   сначала выгрузим index, collection_address из `с4`
-   а потом проверим с помощью функции `slice_bits()` количество битов в оставшихся `owner_address` и `cell content`

    (int, int, slice, slice, cell) load_data() {
    slice ds = get_data().begin_parse();
    var (index, collection_address) = (ds~load_uint(64), ds~load_msg_addr());
    if (ds.slice_bits() > 0) {
    return (-1, index, collection_address, ds~load_msg_addr(), ds~load_ref());
    } else {  
     return (0, index, collection_address, null(), null()); ;; nft not initialized yet
    }
    }

#### Вспомогательная функция отправки сообщения send_msg()

Смарт-контракт отдельной NFT должен поддерживать, следующую функциональность:

-   передача права собственности на NFT
-   получение статических данных NFT

По стандарту и та и та функциональность предполагает отправку сообщений, поэтом напишем вспомогательную функцию отправки сообщений, которая будет принимать:

-   `slice to_address` - адрес куда отправить сообщение
-   `int amount` - количество TON
-   `int op` - код `op` для идентификации операции
-   `int query_id` - query_id, используемое во всех внутренних сообщениях типа «запрос-ответ». [Подробнее](https://docs.ton.org/develop/smart-contracts/guidelines/internal-messages)
-   `builder payload` - некая полезная нагрузка, которую мы хотим передать с сообщением
-   `int send_mode` - Режим отправки сообщения, подробнее о режимах можно прочитать в третьем уроке

Каркас вспомогательной функции отправки сообщения:

    () send_msg(slice to_address, int amount, int op, int query_id, builder payload, int send_mode) impure inline {

    }

> Напомню `inline` - значит, что код фактически подставляется в каждом месте вызова функции.

Собираем сообщение, проверяя при этом, что есть `builder payload` и конечно же отправляем сообщение с заданным `mode`.

Итоговый код:

    () send_msg(slice to_address, int amount, int op, int query_id, builder payload, int send_mode) impure inline {
      var msg = begin_cell()
    	.store_uint(0x10, 6) ;; nobounce - int_msg_info$0 ihr_disabled:Bool bounce:Bool bounced:Bool src:MsgAddress -> 011000
    	.store_slice(to_address)
    	.store_coins(amount)
    	.store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
    	.store_uint(op, 32)
    	.store_uint(query_id, 64);

      if (~ builder_null?(payload)) {
    	msg = msg.store_builder(payload);
      }

      send_raw_message(msg.end_cell(), send_mode);
    }

#### Функция передачи владением NFT transfer_ownership()

Чтобы осуществить передачу владением NFT, ключевое, что необходимо:

-   проверить различные условия из [стандарта](https://github.com/ton-blockchain/TIPs/issues/62)
-   отправить сообщение новому владельцу, что право собственности назначено
-   отправить излишек TON обратно, либо на указанный адрес (обратно здесь написано для простоты понимания)
-   сохранить нового владельца в контракте

Итак, функция будет принимать:

`int my_balance` - Баланс (после зачисления стоимости входящего сообщения) смарт-контракта (в наноТонах). В соответствии с [Compute phase](https://docs.ton.org/learn/tvm-instructions/tvm-overview#compute-phase)
`int index` - индекс отдельной NFT коллекции
`slice collection_address` - адрес смарт-контракта коллекции
`slice owner_address` - адрес владельца
`cell content` - ячейка с контентом NFT
`slice sender_address` - адрес отправителя сообщения о смене владельца
`int query_id` - query_id, используемое во всех внутренних сообщениях типа «запрос-ответ». [Подробнее](https://docs.ton.org/develop/smart-contracts/guidelines/internal-messages)
`slice in_msg_body` - то, что останется от тела сообщения в `recv_internal()`, внутри необходимы нам адреса адреса
`int fwd_fees` - транзакционные издержки сообщения отправленного в `recv_internal()`, здесь будет использоваться для оценки необходимо значение TON для осуществления операции передачи владением

Функция начинается с проверки, что адрес "отправителя команды о смене владельца" равен адресу владельца, то есть поменять может только текущий владелец.

    throw_unless(401, equal_slices(sender_address, owner_address));

Теперь надо разобрать `force_chain()` из файла params.fc.

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

Возвращаемся обратно в нашу функцию nft-item.fc. Достаем адрес нового владельца, проверяем воркчейн функцией force_chain(), а также достаем адрес куда отправить нотификацию, что произошла смена владельца.

    slice new_owner_address = in_msg_body~load_msg_addr();
    force_chain(new_owner_address);
    slice response_destination = in_msg_body~load_msg_addr();

Так как пример не предполагает использование пользовательской полезной нагрузки, пропускаем ее и достаем из тела `forward_amount` количество наноТон, которое будет отправлено новому владельцу. Теперь функция выглядит так:

    () transfer_ownership(int my_balance, int index, slice collection_address, slice owner_address, cell content, slice sender_address, int query_id, slice in_msg_body, int fwd_fees) impure inline {
    	throw_unless(401, equal_slices(sender_address, owner_address));

    	slice new_owner_address = in_msg_body~load_msg_addr();
    	force_chain(new_owner_address);
    	slice response_destination = in_msg_body~load_msg_addr();
    	in_msg_body~load_int(1); ;; this nft don't use custom_payload
    	int forward_amount = in_msg_body~load_coins();
    }

Далее идет вычисление значения Ton, которое нужно будет отправить обратно на адрес для нотификации об изменении владельца. Останавливаться здесь не будет, чтобы не затягивать урок, а чтобы проще понять код, которые будет ниже советую ознакомиться с [Transaction fees](https://docs.ton.org/develop/smart-contracts/fees). Также отмечу, что мы учитываем при расчете, что адрес может быть `addr_none`.

    int rest_amount = my_balance - min_tons_for_storage();
    if (forward_amount) {
      rest_amount -= (forward_amount + fwd_fees);
    }
    int need_response = response_destination.preload_uint(2) != 0; ;; if NOT addr_none: 00
    if (need_response) {
      rest_amount -= fwd_fees;
    }

Если оставшееся значение меньше нуля выдадим исключение:

throw_unless(402, rest_amount >= 0); ;; base nft spends fixed amount of gas, will not check for response

Теперь отправляем новому владельцу нотификацию:

    	if (forward_amount) {
    	  send_msg(new_owner_address, forward_amount, op::ownership_assigned(), query_id, begin_cell().store_slice(owner_address).store_slice(in_msg_body), 1);  ;; paying fees, revert on errors
    	}

Проверив воркчейн, отправим нотификацию и на адрес, который был указан для нотификации.

    	if (need_response) {
    	  force_chain(response_destination);
    	  send_msg(response_destination, rest_amount, op::excesses(), query_id, null(), 1); ;; paying fees, revert on errors
    	}

Ну и конечно сохраняем изменения в регистре `c4`. Итог:

    () transfer_ownership(int my_balance, int index, slice collection_address, slice owner_address, cell content, slice sender_address, int query_id, slice in_msg_body, int fwd_fees) impure inline {
    	throw_unless(401, equal_slices(sender_address, owner_address));

    	slice new_owner_address = in_msg_body~load_msg_addr();
    	force_chain(new_owner_address);
    	slice response_destination = in_msg_body~load_msg_addr();
    	in_msg_body~load_int(1); ;; this nft don't use custom_payload
    	int forward_amount = in_msg_body~load_coins();

    	int rest_amount = my_balance - min_tons_for_storage();
    	if (forward_amount) {
    	  rest_amount -= (forward_amount + fwd_fees);
    	}
    	int need_response = response_destination.preload_uint(2) != 0; ;; if NOT addr_none: 00
    	if (need_response) {
    	  rest_amount -= fwd_fees;
    	}

    	throw_unless(402, rest_amount >= 0); ;; base nft spends fixed amount of gas, will not check for response

    	if (forward_amount) {
    	  send_msg(new_owner_address, forward_amount, op::ownership_assigned(), query_id, begin_cell().store_slice(owner_address).store_slice(in_msg_body), 1);  ;; paying fees, revert on errors
    	}
    	if (need_response) {
    	  force_chain(response_destination);
    	  send_msg(response_destination, rest_amount, op::excesses(), query_id, null(), 1); ;; paying fees, revert on errors
    	}

    	store_data(index, collection_address, new_owner_address, content);
    }

##### Аргументы внешнего метода

Так же как и в прошлый раз.

    () recv_internal(int balance, int msg_value, cell in_msg_full, slice in_msg_body)  {

    }

##### Берем данные из тела сообщения

Итак первое, что мы сделаем в `recv_internal()` это проверим пустое ли сообщение:

````func
if (in_msg_body.slice_empty?()) { ;; ignore empty messages
    return ();
}
```

Дальше мы начинаем разбирать(вычитывать) сообщение:

    slice cs = in_msg_full.begin_parse();

Достаем флаги и проверяем что сообщение не было возвращенным (здесь имеется ввиду bounced).
int flags = cs~load_uint(4);
if (flags & 1) { ;; ignore all bounced messages
return ();
}
Теперь пропускаем значения, которые нам не нужны, что за значения можно посмотреть [здесь](https://docs.ton.org/develop/smart-contracts/messages#message-layout).

    cs~load_msg_addr(); ;; skip dst
    cs~load_coins(); ;; skip value
    cs~skip_bits(1); ;; skip extracurrency collection
    cs~load_coins(); ;; skip ihr_fee

Также достаем `fwd_fee`, который позже будем использовать для расчета, сколько Ton отправить обратно, после всех манипуляций.

Теперь достаем данные из регистра `c4`, включая `init `, то самое значение 0 и -1, в зависимости от того полностью ли инициализирован NFT и готов к взаимодействию.

Если NFT не готов, проверим что отправивший сообщение владелец коллекции и проинициализируем эту NFT

    (int init?, int index, slice collection_address, slice owner_address, cell content) = load_data();
    if (~ init?) {
      throw_unless(405, equal_slices(collection_address, sender_address));
      store_data(index, collection_address, in_msg_body~load_msg_addr(), in_msg_body~load_ref());
      return ();
    }

Дальше достаем `op` и `query_id` для построения логики с использованием условных операторов:

    int op = in_msg_body~load_uint(32);
    int query_id = in_msg_body~load_uint(64);

Первое `op` это передача права собственности, технически все просто: вызываем функцию `transfer_ownership()` , которую мы объявили ранее и заканчиваем выполнение.

    if (op == op::transfer()) {
      transfer_ownership(my_balance, index, collection_address, owner_address, content, sender_address, query_id, in_msg_body, fwd_fee);
      return ();
    }

Второе `op` это получение статических данных, соответственно просто отправляем сообщение с данными:

    if (op == op::get_static_data()) {
      send_msg(sender_address, 0, op::report_static_data(), query_id, begin_cell().store_uint(index, 256).store_slice(collection_address), 64);  ;; carry all the remaining value of the inbound message
      return ();
    }

В конце идет исключение, т.е. если контракт не выполнит какое-то действие в соответствии с `op`, будет исключение. Итоговый код `recv_internal()`:

    () recv_internal(int my_balance, int msg_value, cell in_msg_full, slice in_msg_body) impure {
    	if (in_msg_body.slice_empty?()) { ;; ignore empty messages
    		return ();
    	}

    	slice cs = in_msg_full.begin_parse();
    	int flags = cs~load_uint(4);

    	if (flags & 1) { ;; ignore all bounced messages
    		return ();
    	}
    	slice sender_address = cs~load_msg_addr();

    	cs~load_msg_addr(); ;; skip dst
    	cs~load_coins(); ;; skip value
    	cs~skip_bits(1); ;; skip extracurrency collection
    	cs~load_coins(); ;; skip ihr_fee
    	int fwd_fee = cs~load_coins(); ;; we use message fwd_fee for estimation of forward_payload costs


    	(int init?, int index, slice collection_address, slice owner_address, cell content) = load_data();
    	if (~ init?) {
    	  throw_unless(405, equal_slices(collection_address, sender_address));
    	  store_data(index, collection_address, in_msg_body~load_msg_addr(), in_msg_body~load_ref());
    	  return ();
    	}

    	int op = in_msg_body~load_uint(32);
    	int query_id = in_msg_body~load_uint(64);

    	if (op == op::transfer()) {
    	  transfer_ownership(my_balance, index, collection_address, owner_address, content, sender_address, query_id, in_msg_body, fwd_fee);
    	  return ();
    	}
    	if (op == op::get_static_data()) {
    	  send_msg(sender_address, 0, op::report_static_data(), query_id, begin_cell().store_uint(index, 256).store_slice(collection_address), 64);  ;; carry all the remaining value of the inbound message
    	  return ();
    	}
    	throw(0xffff);
    }

#### Get-метод get_nft_data()

У смарт-контракта отдельной NFT по [стандарту](https://github.com/ton-blockchain/TIPs/issues/62) должен быть один обязательный Get-метод.

Этот метод просто возвращает данные об этой отдельной NFT, а именно выгружает данные из `c4`:

    (int, int, slice, slice, cell) get_nft_data() method_id {
      (int init?, int index, slice collection_address, slice owner_address, cell content) = load_data();
      return (init?, index, collection_address, owner_address, content);
    }
````
