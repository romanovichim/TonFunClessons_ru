# Smart Contract Pipeline Part3 - Удобный деплой в тестовую сеть

## Вступление

В первых двух частях мы разбирали [компиляцию](https://github.com/romanovichim/TonFunClessons_ru/blob/main/lessons/pipeline/simplesmartcontract.md) и [тестирование](https://github.com/romanovichim/TonFunClessons_ru/blob/main/lessons/pipeline/simpletest.md), в этом туториале мы сделаем удобный деплой нашего контракта в тестовую сеть, для этого сгенерируем ссылку для деплоя, которую представим в виде QR кода, просканируем код кошельком и таким образом, задеплоим контракт.

Может возникнуть вопрос, что за ссылка для деплоя? - для деплоя смарт-контракта нужно отправить сообщение с данными о контракте, сделаем это следующим образом, сформируем [deeplink](https:/ /github.com/tonkeeper/wallet-api) для кошелька Tonkeeper в этот диплинк мы будем передавать все данные для деплоя и далее по ссылке можно будет сделать QR, который при сканировании кошельком будет деплоить контракт, передавая всю информацию в блокчейн.

## Скрипт деплоя

Давайте создадим отдельный файл для деплоя в тестовой сети `deploy.ts`.

### StateInit

[StateInit](https://docs.ton.org/develop/data-formats/msg-tlb#stateinit-tl-b) служит для доставки исходных данных в контракт и используется при развертывании контракта.
 
Верхнеуровнево для развертывания в тестовой или основной сети нам нужно отправить в сеть сообщение с StateInit. `StateInit` состоит из ячейки с кодом и ячейки с данными, а адрес смарт-контракта примерно равен: `hash(исходный код, начальное состояние)`.

Давайте соберем `StateInit` и отправим сообщение для деплоя.

В файле `deploy.ts` создайте функцию `deployContract()`:

```ts
async function deployContract() {
}

deployContract()
```
Сделаем импорт нужных доп функций из `ton-core`, а также нашего смарт-контракта в `hex` формате:

```ts
import { Cell, StateInit, beginCell, contractAddress, storeStateInit, toNano } from "ton-core";
import { hex } from "../build/main.compiled.json";

async function deployContract() {
}

deployContract()
```
Ячейку с кодом мы получим из `hex` представления контракта, стартовых данных не будет – создаем пустую ячейку. Теперь у нас готовы данные для формирования `StateInit`

```ts
import { Cell, StateInit, beginCell, contractAddress, storeStateInit, toNano } from "ton-core";
import { hex } from "../build/main.compiled.json";

async function deployContract() {
	const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];
	const dataCell = new Cell();   

	const stateInit: StateInit = {
		code: codeCell,
		data: dataCell,
	};
}

deployContract()
```
Теперь нам нужно собрать `StateInit`, сначала создав `Builder` (биты данных и ссылки на другие ячейки можно хранить в `Builder`, а затем `Builder` можно превратить в новую ячейку.), но мы используем вспомогательные функции из `ton-core` например  `storeStateInit`, получаем:

```ts
import { Cell, StateInit, beginCell, contractAddress, storeStateInit, toNano } from "ton-core";
import { hex } from "../build/main.compiled.json";

async function deployContract() {
	const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];
	const dataCell = new Cell();   

	const stateInit: StateInit = {
		code: codeCell,
		data: dataCell,
	};
	
	const stateInitBuilder = beginCell();
	storeStateInit(stateInit)(stateInitBuilder);
	const stateInitCell = stateInitBuilder.endCell();

}

deployContract()
```

Выше мы сказали, что получить адрес можно из исходных данных, сделаем это с помощью `contractAddress`:

```ts
import { Cell, StateInit, beginCell, contractAddress, storeStateInit, toNano } from "ton-core";
import { hex } from "../build/main.compiled.json";

async function deployContract() {
	const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];
	const dataCell = new Cell();   

	const stateInit: StateInit = {
		code: codeCell,
		data: dataCell,
	};

	const stateInitBuilder = beginCell();
	storeStateInit(stateInit)(stateInitBuilder);
	const stateInitCell = stateInitBuilder.endCell();

	const address = contractAddress(0, {
		code: codeCell,
		data: dataCell,
	});

}

deployContract()
```

### QR код

Приступим к формированию строки для развертывания контракта:

Установите библиотеку для удобной генерации строк

```bash
yarn add qs @types/qs --dev
```
И библиотека для генерации QR-кода.

```bash
yarn add qrcode-terminal @types/qrcode-terminal --dev
 ```
Для отправки сообщения нам нужно использовать deeplink [/transfer](https://github.com/tonkeeper/wallet-api#payment-urls):

```
ton://transfer/<address>
ton://transfer/<address>?amount=<nanocoins>
ton://transfer/<address>?text=<url-encoded-utf8-text>
ton://transfer/<address>?bin=<url-encoded-base64-boc>
ton://transfer/<address>?bin=<url-encoded-base64-boc>&init=<url-encoded-base64-boc>

https://app.tonkeeper.com/transfer/<address>
https://app.tonkeeper.com/transfer/<address>?amount=<nanocoins>
https://app.tonkeeper.com/transfer/<address>?text=<url-encoded-utf8-text>
https://app.tonkeeper.com/transfer/<address>?bin=<url-encoded-base64-boc>
https://app.tonkeeper.com/transfer/<address>?bin=<url-encoded-base64-boc>&init=<url-encoded-base64-boc>
```
С помощью библиотеки qs соберем следующую строку:

 ```ts
	 let deployLink =
		'https://app.tonkeeper.com/transfer/' +
		address.toString({
			testOnly: true,
		}) +
		"?" +
		qs.stringify({
			text: "Deploy contract by QR",
			amount: toNano("0.1").toString(10),
			init: stateInitCell.toBoc({idx: false}).toString("base64"),
		});
```

Теперь QR код:

```ts
	qrcode.generate(deployLink, {small: true }, (qr) => {
		console.log(qr);
	});
 ```
 
В конце сгенерируем ссылку на обозреватель блокчейна в тестовой сети, для нашего удобства — после развёртывания мы увидим, что контракт готов.

Окончательный код

```ts
import { Cell, StateInit, beginCell, contractAddress, storeStateInit, toNano } from "ton-core";
import { hex } from "../build/main.compiled.json";
import qs from "qs";
import qrcode from "qrcode-terminal";

async function deployContract() {
	const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];
	const dataCell = new Cell();   

	const stateInit: StateInit = {
		code: codeCell,
		data: dataCell,
	};

	const stateInitBuilder = beginCell();
	storeStateInit(stateInit)(stateInitBuilder);
	const stateInitCell = stateInitBuilder.endCell();

	const address = contractAddress(0, {
		code: codeCell,
		data: dataCell,
	});


	let deployLink =
		'https://app.tonkeeper.com/transfer/' +
		address.toString({
			testOnly: true,
		}) +
		"?" +
		qs.stringify({
			text: "Deploy contract by QR",
			amount: toNano("0.1").toString(10),
			init: stateInitCell.toBoc({idx: false}).toString("base64"),
		});

	qrcode.generate(deployLink, {small: true }, (qr) => {
		console.log(qr);
	});

	let scanAddr = 
		'https://testnet.tonscan.org/address/' +
		address.toString({
			testOnly: true,
		})

	console.log(scanAddr);

	}

deployContract()
 ```

Обновите файл `package.json`, добавив `"deploy": "yarn compile && ts-node ./scripts/deploy.ts"` в скрипты:

```ts
{
  "name": "test_folder",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
	"@swc/core": "^1.3.63",
	"@ton-community/func-js": "^0.6.2",
	"@ton-community/sandbox": "^0.11.0",
	"@types/jest": "^29.5.2",
	"@types/node": "^20.3.1",
	"@types/qrcode-terminal": "^0.12.0",
	"@types/qs": "^6.9.7",
	"jest": "^29.5.0",
	"qrcode-terminal": "^0.12.0",
	"qs": "^6.11.2",
	"ton": "^13.5.0",
	"ton-core": "^0.49.1",
	"ton-crypto": "^3.2.0",
	"ts-jest": "^29.1.0",
	"ts-node": "^10.9.1",
	"typescript": "^5.1.3"
 },
  "scripts": {
	"compile": "ts-node ./scripts/compile.ts",
	"test": "yarn jest",
	"deploy": "yarn compile && ts-node ./scripts/deploy.ts"
  },
  "dependencies": {
	"@ton-community/test-utils": "^0.2.0"
  }
}
```

Осталось все это запустить:
1. в консоли набираем команду yarn deploy
2. отсканируйте QR-код в Tonkeeper, переключенном на тестовую сеть
3. подтвердите транзакцию
4. смотрим в эксплорере что контракт развернуть

##  Заключение

Спасибо за внимание, в двух следующих туторилах мы уделим внимание сообщениям, от чего отталкиваться при написании тестов и как писать тесты для тестовой сети.



