# Исследуем блокчейн TON с помощью tonapi

Каждые 5 секунда в сети TON происходят изменения, генерируется новый блок. Чтобы получить доступ к изменившейся информации, для вашего приложения/исследования и.т.д. вам придется проиндексировать все блоки, представьте их количество, учитывая появление нового каждые 5 секунд. 

В экосистеме блокчейна TON есть сервисы, которые упрощают данную задачу, они индексируют блокчейн, складывают в свою базу информацию и позволяют забирать её, например, с помощью API.

В данной статье мы воспользуемся сервисом https://tonapi.io/, чтобы достать различную информацию из блокчейна.

> Код в уроке написан для наглядности, а не качества и т.д., поэтому если вы можете написать лучше - вы большой молодец!

## Шаги, которые необходимо выполнить перед запросами в TON

### Шаг 1 Python и requests

Для работы с API мы будем использовать [Python](https://www.python.org/) и библиотеку `requests`. Проверим установлен ли Python на компьютере, с помощью командной строки:

	python --version

Также Python скриптом проверим есть ли на компьютере библиотека `requests`:

	 import sys
	'requests' in sys.modules

### Шаг 2 Получаем токен для запросов

Чтобы пользоваться tonapi, необходим токен, получить его можно в специальном боте: https://t.me/tonapi_bot

> Внимание, не предавайте ваш токен никому!!

В tonapi есть два типа токена:
- клиентский, для его получения введите в боте  `/get_client_key`
- серверный, для его получения введите в боте  `/get_server_key`

## Запросы в TON

Теперь, когда у нас есть токен и необходимая библиотека, начнем писать запросы.

### Получить информацию об аккаунте в TON

Итак, у нас есть токен, данный токен является bearer, поэтому передавать его мы будем в хэдер. 

> подробнее про bearer стандарт - [тут](https://datatracker.ietf.org/doc/html/rfc6750)

	serverSideKey ='your serverSide token'
	headers_data = {'Authorization': 'Bearer ' + serverSideKey  }
	
Получать информацию мы будем с помощью метода  `/v1/accounts/getInfo `, у данного метода один параметр, это адрес `account` в raw формате (шестнадцатеричном формате без 0x) или в формате base64url.

	serverSideKey ='your serverSide token'
	headers_data = {'Authorization': 'Bearer ' + serverSideKey  }
	data = {'account' : 'EQAvmc9oVnOvLFlUAgeNmZNZoKeDg9vTEiAQxNFw-t5mh3m7'}

> Адрес EQAvmc9oVnOvLFlUAgeNmZNZoKeDg9vTEiAQxNFw-t5mh3m7 является адресом для донатов по моим урокам, если вы хотите поддержать выпуск новых уроков или что-то предложить, можете воспользоваться данным адресом.

Остается сам запрос:

	serverSideKey ='your serverSide token'
	headers_data = {'Authorization': 'Bearer ' + serverSideKey }
	data = {'account' : 'EQAvmc9oVnOvLFlUAgeNmZNZoKeDg9vTEiAQxNFw-t5mh3m7'}

	method = 'getInfo'
	pref= 'account'
	url = 'https://tonapi.io/v1/{}/{}'.format(pref,method)
	response = requests.get(url, params=data, headers=headers_data)
	response.json()
	

Получаем:

	{'address': {'bounceable': 'EQAvmc9oVnOvLFlUAgeNmZNZoKeDg9vTEiAQxNFw-t5mh3m7', 'non_bounceable': 'UQAvmc9oVnOvLFlUAgeNmZNZoKeDg9vTEiAQxNFw-t5mhyR-', 'raw': '0:2f99cf685673af2c595402078d999359a0a78383dbd3122010c4d170fade6687'}, 'balance': 762788458171, 'interfaces': None, 'is_scam': False, 'last_update': 33318949000004, 'memo_required': False, 'status': 'uninit'}
	

Отмечу, что баланс в НаноТонах. 

### Получить информацию о транзакциях аккаунта в TON

Что первое интересует, когда мы говорим об аккаунтах/кошельках в TON, конечно же это транзакции. В tonapi, есть удобный метод для получения транзакций `blockchain/getTransactions`, у него следующие аргументы:

 - account - адрес в raw формате (шестнадцатеричном формате без 0x) или в формате base64url
 - maxLt - максимальное логическое время
 - minLt - минимальное логическое время
 - limit - ограничение на количество выводимых транзакций в `response`

###### Логическое время

Логическое время необходимо для определения порядка действий в TON для обработки виртуальной машиной TVM. Строго гарантируется, что транзакция, вытекающая из сообщения, будет иметь lt больше, чем lt самого сообщения.  Lt сообщения, отправленного в некоторой транзакции, строго больше, чем lt транзакции. Кроме того, строго упорядочены сообщения, отправленные с одного аккаунта, а также транзакции, совершенные на одном аккаунте. Таким образом, для каждой учетной записи мы всегда знаем порядок транзакций, полученных и отправленных сообщений.

> Подобную механику в компьютерных системах еще называют временем Лампорта, подробнее -https://en.wikipedia.org/wiki/Lamport_timestamp

> В документации TON про это на [21 странице](https://ton-blockchain.github.io/docs/tblkch.pdf) 

Lt аргументы не обязательные, опустим их и оставим последние транзакции, далее выберем лимит 1 и получим последнюю транзакцию. Сделаем запрос:

	# params
	data = {'account' : 'EQAvmc9oVnOvLFlUAgeNmZNZoKeDg9vTEiAQxNFw-t5mh3m7','limit': '1'}

	method = 'getTransactions'
	pref= 'blockchain'

	url = 'https://tonapi.io/v1/{}/{}'.format(pref,method)
	print(url)
	response = requests.get(url, params=data, headers=headers_data)
	print(response.json())

Получим:

	{'transactions': [{'account': {'address': '0:2f99cf685673af2c595402078d999359a0a78383dbd3122010c4d170fade6687', 'is_scam': False}, 'data': 'b5ee9c720102060100015f0003b372f99cf685673af2c595402078d999359a0a78383dbd3122010c4d170fade668700001e5320d5c783bc8aa15e77674dfb8c8377523ed41f72e26d4e81314a744d645322efe3b80a1a00001e50f06ea503638a61f2000004023880104050101a00201b1480167522fb9a3d91fd785e89d733356e6bf0316c735bb9a1062d32193cb9622de29000be673da159cebcb16550081e36664d66829e0e0f6f4c4880431345c3eb799a1d0ee6b280006233ce800003ca641ab8f04c714c3e4c003009e00000000d0a1d0bfd0b0d181d0b8d0b1d0be20d0b7d0b020d183d180d0bed0bad0b82c20d18dd182d0be20d09bd183d187d188d0b8d0b520d0b3d0b0d0b9d0b4d18b20d0bfd0be20d182d0bed0bd210082728704397af0418b054a0a8cf3c13e7465d8ea57f98df794628d28c0de0319748a48965beb0da0698cbb9a9b30cbdd7c112e91f713c4a15f9c099d1fbec1e39fc400130c8047090ee6b2800120', 'fee': 284, 'hash': '3fe607c8115d255b4e3d794a82086cc6e9b617171d607d20decfe3a5dca243c8', 'in_msg': {'created_lt': 33342382000002, 'destination': {'address': '0:2f99cf685673af2c595402078d999359a0a78383dbd3122010c4d170fade6687', 'is_scam': False}, 'fwd_fee': 1154676, 'ihr_fee': 0, 'msg_data': 'AAAAANCh0L/QsNGB0LjQsdC+INC30LAg0YPRgNC+0LrQuCwg0Y3RgtC+INCb0YPRh9GI0LjQtSDQs9Cw0LnQtNGLINC/0L4g0YLQvtC9IQ==', 'source': {'address': '0:b3a917dcd1ec8febc2f44eb999ab735f818b639addcd08316990c9e5cb116f14', 'icon': '', 'is_scam': False, 'name': 'toncoingrave.ton'}, 'value': 1000000000}, 'lt': 33342382000003, 'other_fee': 0, 'out_msgs': [], 'storage_fee': 284, 'utime': 1670013426}]}
	
Если посмотреть, на адрес отправителя, то можно увидеть, что он в raw формате, получим base64url( in_msg_source.address) c помощью эндпойнта `account/getInfo`, которую мы смотрели раньше.

	# params
	data = {'account' : '0:b3a917dcd1ec8febc2f44eb999ab735f818b639addcd08316990c9e5cb116f14'}

	method = 'getInfo'
	pref= 'account'

	url = 'https://tonapi.io/v1/{}/{}'.format(pref,method)
	print(url)
	response = requests.get(url, params=data, headers=headers_data)
	print(response.json()['address']['bounceable'])

Получим

	EQCzqRfc0eyP68L0TrmZq3NfgYtjmt3NCDFpkMnlyxFvFBG9

### Получить информацию об индивидуальной транзакции в TON

Получить информацию об индивидуальной транзакции в tonapi можно с помощью хэша транзакции и эндпойнта  `blockchain/getTransaction`

Пример:

	# params
	data = {'hash' : '3fe607c8115d255b4e3d794a82086cc6e9b617171d607d20decfe3a5dca243c8'}

	method = 'getTransaction'
	pref= 'blockchain'

	url = 'https://tonapi.io/v1/{}/{}'.format(pref,method)
	print(url)
	response = requests.get(url, params=data, headers=headers_data)
	print(response.json())
	

### Анализируем аукционы DNS

TON DNS — сервис, который позволяет задать крипто кошелькам, смарт-контрактам или сайтам короткие читаемые имена.

Домены .ton - NFT, которые можно будет передавать другим пользователям, а также покупать и продавать на маркетплейсах. (Подробнее про аукционы [тут](https://telegra.ph/Pravila-aukciona-TON-DNS-07-20))

TonApi позволяет удобным способом собирать информацию об аукционах и отельном аукционе в частности.

#### Собираем данные о всех текущих аукционах

TonApi дает возможность получить все аукционы по конкретному домену, давайте возьмем информацию по домену .ton и выведем текущее количество аукционов:

	# params
	data = {'tld' : 'ton'}

	method = 'getCurrent'
	pref= 'auction'

	url = 'https://tonapi.io/v1/{}/{}'.format(pref,method)
	print(url)
	response = requests.get(url, params=data, headers=headers_data)
	print(response.json()['total'])
	
А также для примера возьмем первый домен, для следующего примера:

	print(response.json()['data'][0]['domain'])

#### Рассмотрим отдельно ставки под одному из аукционов

С помощью эндпойнта возьмем информацию по аукциону по конкретному домену:

	# params
	data = {'domain' : 'betcoin.ton'}

	method = 'getBids'
	pref= 'auction'

	url = 'https://tonapi.io/v1/{}/{}'.format(pref,method)
	print(url)
	response = requests.get(url, params=data, headers=headers_data)
	print(response.json())


### Информация по токенам Jetton

Большое количество информации о Jetton храниться в метаданных в соответствии со [стандартом](https://github.com/ton-blockchain/TEPs/blob/master/text/0074-jettons-standard.md). Итак, возьмем адрес мастер контракта одного из токенов на TON и получим метаданные используя tonapi:

	# params
	data = {'account' : 'EQD0vdSA_NedR9uvbgN9EikRX-suesDxGeFg69XQMavfLqIw'}

	method = 'getInfo'
	pref= 'jetton'

	url = 'https://tonapi.io/v1/{}/{}'.format(pref,method)
	print(url)
	response = requests.get(url, params=data, headers=headers_data)
	print(response.json())

Получим:

	{'metadata': {'address': '0:f4bdd480fcd79d47dbaf6e037d1229115feb2e7ac0f119e160ebd5d031abdf2e', 'decimals': 9, 'description': 'Official token of the Huebel Company', 'image': 'https://cache.tonapi.io/imgproxy/vPhDv8TBUkDFE5N74ckFuSE2FtKKjmNpL4B-Ti3gd5Q/rs:fill:200:200:1/g:no/aHR0cHM6Ly9jbG91ZGZsYXJlLWlwZnMuY29tL2lwZnMvUW1YNDdkb2RVZzFhY1hveFlEVUxXVE5mU2hYUlc1dUhyQ21vS1NVTlI5eEtRdw.webp', 'name': 'Huebel Bolt', 'social': ['https://t.me/boltlink'], 'symbol': 'BOLT'}, 'mintable': True, 'total_supply': '6000693317361000'}

Здесь сразу видно и название, и предложение и все необходимые ссылки и.т.д. и.т.п. 

Думаю, сразу понятно, что было бы удобно, чтобы для Jetton был эндпойнт, который возвращал бы информацию о Jetton на кошельке. И такой эндпойнт есть, это `jetton/GetBalances`. Давайте возьмем информацию с какого-нибудь адреса о Jetton, находящихся на нем:

	# params
	data = {'account' : 'EQC38-cbo1HivDOdH0oOzyZfTKVpSkatn1ydXJYsrg5KvLNI'}

	method = 'getBalances'
	pref= 'jetton'

	url = 'https://tonapi.io/v1/{}/{}'.format(pref,method)
	print(url)
	response = requests.get(url, params=data, headers=headers_data)
	print(response.json())

Получим много информации о Jetton на данном адресе, предлагаю вывести списком названия Jetton, которые есть на данном кошельке:

	#not in pythonic style for educational purposes
	for item  in response.json()['balances']:
	  print(item['metadata']['name'])

Получим:

	Centimeter

	Scaleton
	EasyCash 
	KittyCoin for TonSwap tests
	Huebel Bolt
	Kote Coin

Да, одна строка пропущена, так как у аккаунта есть Jetton с пустым именем.

Также в tonapi есть удобный эндпойнт `jetton/getHistory`, который позволяет посмотреть транзакции по Jetton по аккаунту. Возьмем последнюю транзакцию по интересующему на с Jetton:

	# params
	data = {'account' : 'EQD0vdSA_NedR9uvbgN9EikRX-suesDxGeFg69XQMavfLqIw','jetton_master':'EQD0vdSA_NedR9uvbgN9EikRX-suesDxGeFg69XQMavfLqIw','limit': 1}

	method = 'getHistory'
	pref= 'jetton'

	url = 'https://tonapi.io/v1/{}/{}'.format(pref,method)
	print(url)
	response = requests.get(url, params=data, headers=headers_data)
	print(response.json())

Как вы можете видеть, в параметрах мы передали аккаунт, по которому нас интересуют транзакции, мастер контракт Jetton и лимит.

### Информация по NFT

#### NFT Collection

Как и в случае с Jetton, начнем с мастер контрактов, возьмем метаданные коллекции:

	# params
	data = {'account' : 'EQCA14o1-VWhS2efqoh_9M1b_A9DtKTuoqfmkn83AbJzwnPi'}

	method = 'getCollection'
	pref= 'nft'

	url = 'https://tonapi.io/v1/{}/{}'.format(pref,method)
	print(url)
	response = requests.get(url, params=data, headers=headers_data)
	print(response.json())
	
В данном случае это коллекция юзернеймов в Телеграмме:

	{'address': '0:80d78a35f955a14b679faa887ff4cd5bfc0f43b4a4eea2a7e6927f3701b273c2', 'metadata': {'description': 'Unique addresses in Telegram’s ecosystem of more than 700 million active users.', 'external_link': 'https://fragment.com/', 'image': 'https://nft.fragment.com/usernames.svg', 'name': 'Telegram Usernames'}, 'next_item_index': 1, 'raw_collection_content': '68747470733a2f2f6e66742e667261676d656e742e636f6d2f757365726e616d65732e6a736f6e'}

#### NFT Item

За коллекцией конечно же следует элемент, возьмем NFT Item:

	# params
	data = {'addresses' : 'EQA5WX3EjeUPntk2CpPlfqIgnt4VfzlLhCIJ7WPm6B3V09WI'}

	method = 'getItems'
	pref= 'nft'

	url = 'https://tonapi.io/v1/{}/{}'.format(pref,method)
	print(url)
	response = requests.get(url, params=data, headers=headers_data)
	print(response.json())
	
Достанем юзернейм:

	response.json()['nft_items'][0]['metadata']
	
Получим:
	
	{'description': 'The @gold username and address in the Telegram ecosystem. Aliases: gold.t.me, t.me/gold',
	 'image': 'https://nft.fragment.com/username/gold.webp',
	 'name': 'gold'}

Ставь лайк репозиторию, если считаешь, что это должен быть твой юзернейм)

#### NFT Аккаунта

Tonapi предоставляет удобную возможность достать NFT аккаунта, возьмем NFT определенной коллекции, используя эндпойнт `nft/searchItems`:

	# params
	data = {'owner' : 'EQDyBC20fBqrPFEgG088izaeQOgw1ZsWTTuqp7Jo2d1Kz4tQ','collection' :'UQAaLmbRimQRuYx3UkLTv8TTgDfUL-ZIyiFCGeDb4lE06ktW','limit': 10,'offset': 1}

	method = 'searchItems'
	pref= 'nft'

	url = 'https://tonapi.io/v1/{}/{}'.format(pref,method)
	print(url)
	response = requests.get(url, params=data, headers=headers_data)
	print(response.json())
	
И посчитаем их количество:

	print(len(response.json()['nft_items']))

Получим:
	7

## Заключение

Примеры кода есть в папочке `code`. Хорошего тебе дня читатель).




















