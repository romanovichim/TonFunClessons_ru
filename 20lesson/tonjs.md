# Запросы в TON с помощью JS: достаем данные NFT

Часто Web3 приложения или Dapps выглядят архитектурно выглядят как Фронтенд, который вызывает методы смарт-контрактов. Соответственно нужно уметь делать запросы на JS в блокчейн. В TON мало примеров на JS, поэтому я решил сделать небольшой наглядный туториал.

## Вступление

Web 3 приложения часто строятся вокруг стандартов, существующих в блокчейне, в TON это NFT и Jetton. Для стандарта NFT распространенной задачей является получение адресов NFT конкретной коллекции. Поэтому в данном туториале:

 - мы достаем данные об NFT коллекции
 - получим адрес NFT по индексу
 
и все это на JS.

### Устанавливаем библиотеки

Для запросов в TON нам понадобиться `typescript` и модулями для работы с TON.
Для работы с Typescript нам понадобятся:
- Node.js — среда, в которой вы будете запускать компилятор TypeScript.
- Компилятор TypeScript — модуль Node.js, который компилирует TypeScript в JavaScript.

> Глубоко погружаться в Node.js мы не будем, инструкции по его установке есть [здесь](https://nodejs.org/en/download/): 

Для удобства работы с модулями создадим файл `package.json` c помощью пакетного менеджера `npm`:
1.  В консоли перейдите в папку вашего проекта (где будем писать скрипты)
2.  Введите в консоли 

		npm init
		
3. Ответьте на вопросы в консоли и убедитесь, что файл `package.json` создан

Теперь установим `typescript`. В командной строке вводим следующую команду:

		npm install typescript
		
После установки вы можете ввести следующую команду, чтобы проверить текущую версию компилятора TypeScript:

		tsc --v

Также установим пакет ts-node для выполнения TypeScript в консоли и REPL для node.js.

		npm install  ts-node

Осталось установить модули для работы c TON:

		npm install ton ton-core ton-crypto
		
Отлично, теперь можно приступать к скриптам.

## Достаем информацию о Коллекции

Чтобы получить информацию об NFT коллекции нам нужно вызвать GET-метод смарт-контракта коллекции, для этого надо:
- использовать некий API сервис, который взаимодействует с Лайт серверами блокчейна TON 
- через этот клиент вызвать нужный GET-метод
- преобразовать полученные данные в читаемый вид

В данном туториале мы воспользуемся [toncenter API](https://github.com/toncenter/ton-http-api), для запроса воспользуемся клиентом на js, библиотеки [ton.js](https://www.npmjs.com/package/ton).

Создадим скрипт `collection.ts`. Импортируем  из библиотеки клиент:

	import { TonClient } from 'ton';
	
И подключаемся к toncenter:

	import { TonClient } from 'ton';

	export const toncenter = new TonClient({
		endpoint: 'https://toncenter.com/api/v2/jsonRPC',
	});
	
> Для простоты примера мы не используем API ключ, поэтому мы будем лимитированы одним запросом в минуту, для создания ключа можете воспользоваться ботом https://t.me/tonapibot

Теперь посмотрим в [стандарт NFT коллекций на TON](https://github.com/ton-blockchain/TEPs/blob/master/text/0062-nft-standard.md) для того, чтобы понять какой GET-метод нужно вызвать. По стандарту видно, что нам нужна функция `get_collection_data()`, которая вернет нам:

- `next_item_index` — количество развернутых в данный момент элементов NFT в коллекции.
- `collection_content` — содержимое коллекции в формате, соответствующем стандарту [TEP-64](https://github.com/ton-blockchain/TEPs/blob/master/text/0064-token-data-standard.md).
- `owner_address` - адрес владельца коллекции, нулевой адрес, если нет владельца.

Воспользуемся синтаксическим сахаром `async/await` и вызовем данный метод для какой-нибудь коллекции в TON:

	import { TonClient } from 'ton';

	export const toncenter = new TonClient({
		endpoint: 'https://toncenter.com/api/v2/jsonRPC',
	});

	export const nftCollectionAddress = Address.parse('UQApA79Qt8VEOeTfHu9yKRPdJ_dADvspqh5BqV87PgWD998f');

	(async () => {
		let { stack } = await toncenter.callGetMethod(
			nftCollectionAddress, 
			'get_collection_data'
		);

	})().catch(e => console.error(e));
	
Для преобразования данных в читаемый вид, воспользуемся библиотекой `ton-core`:

	import { Address } from 'ton-core';
	
Преобразуем nextItemIndex в строку, вычитаем ячейку с контентом и преобразуем адрес:

	import { TonClient } from 'ton';
	import { Address } from 'ton-core';

	export const toncenter = new TonClient({
		endpoint: 'https://toncenter.com/api/v2/jsonRPC',
	});

	export const nftCollectionAddress = Address.parse('UQApA79Qt8VEOeTfHu9yKRPdJ_dADvspqh5BqV87PgWD998f');

	(async () => {
		let { stack } = await toncenter.callGetMethod(
			nftCollectionAddress, 
			'get_collection_data'
		);
		let nextItemIndex = stack.readBigNumber();
		let contentRoot = stack.readCell();
		let owner = stack.readAddress();

		console.log('nextItemIndex', nextItemIndex.toString());
		console.log('contentRoot', contentRoot);
		console.log('owner', owner);
	})().catch(e => console.error(e));
	
Запустим скрипт с помощью `ts-node`. Должно получиться следующее:

![collection](./img/1.png)

## Достаем адрес элемента Коллекции по индексу

Теперь решим задачу по получению адреса по индексу, мы опять будем вызывать GET-метод смарт-контракта коллекции. В соответствии со стандартом, для этой задачи подходит метод `get_nft_address_by_index(int index)`, который возвращает `slice address`.

Данный метод принимает параметр `int index` и на первый взгляд выглядит так, как будто нужно просто передать значение с типом `int` в смарт-контракт. Это конечно так, но так как виртуальная машина TON использует регистры то значение с типом `int` нужно будет передать в кортеже. Для этого в библиотеке `ton.js` есть `TupleBuilder` .

	import { TupleBuilder } from 'ton';

Запишем в кортеж значение 0:

	import { TonClient } from 'ton';
	import { Address } from 'ton-core';
	import { TupleBuilder } from 'ton';

	export const toncenter = new TonClient({
		endpoint: 'https://toncenter.com/api/v2/jsonRPC',
	});

	export const nftCollectionAddress = Address.parse('EQDvRFMYLdxmvY3Tk-cfWMLqDnXF_EclO2Fp4wwj33WhlNFT');

	(async () => {
		let args = new TupleBuilder();
		args.writeNumber(0);


	})().catch(e => console.error(e));

Остается сделать запрос и преобразовать адрес с помощью `readAddress()`:

	import { TonClient } from 'ton';
	import { Address } from 'ton-core';
	import { TupleBuilder } from 'ton';

	export const toncenter = new TonClient({
		endpoint: 'https://toncenter.com/api/v2/jsonRPC',
	});

	export const nftCollectionAddress = Address.parse('EQDvRFMYLdxmvY3Tk-cfWMLqDnXF_EclO2Fp4wwj33WhlNFT');

	(async () => {
		let args = new TupleBuilder();
		args.writeNumber(0);

		let { stack } = await toncenter.callGetMethod(
			nftCollectionAddress, 
			'get_nft_address_by_index',
			args.build(),
		);
		let nftAddress = stack.readAddress();

		console.log('nftAddress', nftAddress.toString());
	})().catch(e => console.error(e));

Запустим скрипт с помощью `ts-node`. Должно получиться следующее:

![address](./img/2.png)

## Заключение

Подобные разборы и туториалы я публикую в телеграм канале https://t.me/ton_learn буду рад вашей подписке.
