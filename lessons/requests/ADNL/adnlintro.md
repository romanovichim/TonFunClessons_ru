# ADNL Intro

При создании Web3/блокчейн приложений возникает задача получения данных из блокчейна, например посмотреть последние транзакции аккаунта или дернуть в Гет метод контракта.

Для этой задачи можно пользоваться сервисами посредниками, которые либо индексируют блокчейн и отдают вам агрегированную информацию, либо представляют собой прокси сервис прокидывающий ваши запросы через себя. Но использование посредника может нести риски, ошибки или намеренное искажение фактов, может привести к фроду.

В TON есть сетевые протоколы, через которые можно получать информацию грубо говоря без посредника. Одним из таких протоколов является ADNL. В данном туториале, мы подключимся к Лайтсерверам и получим информацию об аккаунте через ANDL.

ADNL — это оверлейный, одноранговый, ненадежный (небольшой) протокол дейтаграмм, работающий поверх UDP в IPv4 (в будущем — IPv6), с необязательным запасным вариантом TCP, если UDP недоступен.

С помощью ANDL вы можете получать данные из блокчейна TON без посредников

## Вступление

У каждого участника есть 256-битный адрес ADNL. Протокол ADNL позволяет отправлять (ненадежно) и получать дейтаграммы, используя только адреса ADNL. IP-адреса и порты скрыты протоколом ADNL.

Для установления соединения используется механизм рукопожатия. Клиент подключается к серверу с помощью TCP и отправляет пакет подтверждения ADNL, который содержит абстрактный адрес сервера, открытый ключ клиента и зашифрованные параметры сеанса AES-CTR, которые определяются клиентом.

Для подключения к Lightclients нам нужен их список:
- Основная сеть: https://ton.org/global.config.json
- Тестовая сеть: https://ton.org/testnet-global.config.json

[Подробнее] (https://docs.ton.org/learn/networking/low-level-adnl) о протоколе.

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
		
Установим модуль для работы c TON:

	npm install ton ton-core ton-crypto
		
И конечно же 

	npm install ton-lite-client
		
## Подключаемся 

`ton-lite-client` мы будем использовать для подключения по ADNL к лайт серверам. Создадим файл `example.ts`, сделаем импорт библиотек и зададим функцию `main`:


	import { LiteClient, LiteRoundRobinEngine, LiteSingleEngine, LiteEngine } from "ton-lite-client";
	import { Address} from "ton-core";

	async function main() {

	}

	main()

Библиотека использует механизм [Round-robin](https://en.wikipedia.org/wiki/Round-robin_scheduling) для распределния задач/запросов между лайтсерверами. Соответственно мы можем закинуть несколько лайтсеров к которым будем подключатся, но для простоты примера возьмем один и добавим его в массив `engines`.

Зайдем в https://ton.org/global.config.json и возьмем данные по лайтсерверу.

	import { LiteClient, LiteRoundRobinEngine, LiteSingleEngine, LiteEngine } from "ton-lite-client";
	import { Address} from "ton-core";

	let server = {
		"ip": -2018145068,
		"port": 13206,
		"id": {
			"@type": "pub.ed25519",
			"key": "K0t3+IWLOXHYMvMcrGZDPs+pn58a17LFbnXoQkKc2xw="
		}
	}

	async function main() {
		const engines: LiteEngine[] = [];

	}

	main()

IP надо представить в другом формате, для этого напишем вспомогательную функцию `intToIP` и поместим объект в массив `engine`.

	import { LiteClient, LiteRoundRobinEngine, LiteSingleEngine, LiteEngine } from "ton-lite-client";
	import { Address} from "ton-core";

	function intToIP(int: number) {
		var part1 = int & 255;
		var part2 = ((int >> 8) & 255);
		var part3 = ((int >> 16) & 255);
		var part4 = ((int >> 24) & 255);

		return part4 + "." + part3 + "." + part2 + "." + part1;
	}

	let server = {
		"ip": -2018145068,
		"port": 13206,
		"id": {
			"@type": "pub.ed25519",
			"key": "K0t3+IWLOXHYMvMcrGZDPs+pn58a17LFbnXoQkKc2xw="
		}
	}

	async function main() {
		const engines: LiteEngine[] = [];
		engines.push(new LiteSingleEngine({
			host: `tcp://${intToIP(server.ip)}:${server.port}`,
			publicKey: Buffer.from(server.id.key, 'base64'),
		}));
		const engine: LiteEngine = new LiteRoundRobinEngine(engines);

	}

	main()
	
С помощью `engine` мы можем инициализировать подключение:

	import { LiteClient, LiteRoundRobinEngine, LiteSingleEngine, LiteEngine } from "ton-lite-client";
	import { Address} from "ton-core";

	function intToIP(int: number) {
		var part1 = int & 255;
		var part2 = ((int >> 8) & 255);
		var part3 = ((int >> 16) & 255);
		var part4 = ((int >> 24) & 255);

		return part4 + "." + part3 + "." + part2 + "." + part1;
	}

	let server = {
		"ip": -2018145068,
		"port": 13206,
		"id": {
			"@type": "pub.ed25519",
			"key": "K0t3+IWLOXHYMvMcrGZDPs+pn58a17LFbnXoQkKc2xw="
		}
	}

	async function main() {
		const engines: LiteEngine[] = [];
		engines.push(new LiteSingleEngine({
			host: `tcp://${intToIP(server.ip)}:${server.port}`,
			publicKey: Buffer.from(server.id.key, 'base64'),
		}));
		const engine: LiteEngine = new LiteRoundRobinEngine(engines);
		const client = new LiteClient({ engine });


	}

	main()


Теперь, поскольку мы уже знаем, как генерировать пакеты TL для Lite API, мы можем запросить информацию о текущем блоке мастерчейна TON. Блок masterchain используется во многих дальнейших запросах в качестве входного параметра для указания состояния (момент), в котором нам нужна информация.

В данном туториале наша задача будет получить текущую информацию об аккаунте, а значит нам понадобиться последний блок, достанем его через `getMasterchainInfo()`:

	import { LiteClient, LiteRoundRobinEngine, LiteSingleEngine, LiteEngine } from "ton-lite-client";
	import { Address} from "ton-core";

	function intToIP(int: number) {
		var part1 = int & 255;
		var part2 = ((int >> 8) & 255);
		var part3 = ((int >> 16) & 255);
		var part4 = ((int >> 24) & 255);

		return part4 + "." + part3 + "." + part2 + "." + part1;
	}

	let server = {
		"ip": -2018145068,
		"port": 13206,
		"id": {
			"@type": "pub.ed25519",
			"key": "K0t3+IWLOXHYMvMcrGZDPs+pn58a17LFbnXoQkKc2xw="
		}
	}

	async function main() {
		const engines: LiteEngine[] = [];
		engines.push(new LiteSingleEngine({
			host: `tcp://${intToIP(server.ip)}:${server.port}`,
			publicKey: Buffer.from(server.id.key, 'base64'),
		}));
		const engine: LiteEngine = new LiteRoundRobinEngine(engines);
		const client = new LiteClient({ engine });
		const master = await client.getMasterchainInfo()
		console.log('master', master.;last)

	}

	main()
	
Теперь получим информацию об аккаунте, возьмем аккаунт, который мы будем использовать смарт-контракт маркетплейса Getgems:

	import { LiteClient, LiteRoundRobinEngine, LiteSingleEngine, LiteEngine } from "ton-lite-client";
	import { Address} from "ton-core";

	function intToIP(int: number) {
		var part1 = int & 255;
		var part2 = ((int >> 8) & 255);
		var part3 = ((int >> 16) & 255);
		var part4 = ((int >> 24) & 255);

		return part4 + "." + part3 + "." + part2 + "." + part1;
	}

	let server = {
		"ip": -2018145068,
		"port": 13206,
		"id": {
			"@type": "pub.ed25519",
			"key": "K0t3+IWLOXHYMvMcrGZDPs+pn58a17LFbnXoQkKc2xw="
		}
	}

	async function main() {
		const engines: LiteEngine[] = [];
		engines.push(new LiteSingleEngine({
			host: `tcp://${intToIP(server.ip)}:${server.port}`,
			publicKey: Buffer.from(server.id.key, 'base64'),
		}));
		const engine: LiteEngine = new LiteRoundRobinEngine(engines);
		const client = new LiteClient({ engine });
		//console.log('get master info')
		const master = await client.getMasterchainInfo()
		//console.log('master', master)

		const address = Address.parse('EQCjk1hh952vWaE9bRguFkAhDAL5jj3xj9p0uPWrFBq_GEMS');
		const accountState = await client.getAccountState(address, master.last)

		console.log('state', accountState)	

	}

	main()
	
	
Запустим скрипт с помощью команды `ts-node example.ts`. Теперь в консоли мы видим инфу об аккаунте в последнем блоке в сети. Наиболее интересным для нас в будущем будет lastTx, ,благодаря этому полю можно будет достать последние транзакции, но это будет в следующих туториалах.



