# Chatbot Smart Contract Testing

В данном туториале мы напишем тесты для смарт-контракта чат-бота. Основная задача, научиться рассматривать под лупой транзакции в `@ton-community/sandbox`, а также разобрать как делать тесты в тестовой сети или другими словами onchain тесты.

Начнем с обычных тестов.

## Проверяем есть ли траназакция 

Так как мы используем проект предыдущего туториала как шаблон, каркас тестов у нас уже есть, откроем файл `main.spec.ts` и удалим оттуда, все что касается GET метода:

	import { Cell, Address, toNano } from "ton-core";
	import { hex } from "../build/main.compiled.json";
	import { Blockchain } from "@ton-community/sandbox";
	import { MainContract } from "../wrappers/MainContract";
	import { send } from "process";
	import "@ton-community/test-utils";

	describe("test tests", () => {
		it("test of test", async() => {
			const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];

			const blockchain = await Blockchain.create();

			const myContract = blockchain.openContract(
				await MainContract.createFromConfig({}, codeCell)
			);

			const senderWallet = await blockchain.treasury("sender");

			const sentMessageResult = await myContract.sendInternalMessage(senderWallet.getSender(),toNano("0.05"));

			expect(sentMessageResult.transactions).toHaveTransaction({
				from: senderWallet.address,
				to: myContract.address,
				success: true,
			});

		});
	});
    
Мы видим, что на данный момент, проверяется, отправлена ли транзакция в наш смарт-контракт. Происходит, это благодаря объекту `sentMessageResult.transactions`. Давайте рассмотрим его пристально и разберемся, что мы может тестить опираясь на этот объект. 

Если мы просто выведем в консоль этот объект, он будет состоять из большого количества raw информации, для удобства воспользуемся `flattenTransaction` из `@ton-community/test-utils`:

	import { Cell, Address, toNano } from "ton-core";
	import { hex } from "../build/main.compiled.json";
	import { Blockchain } from "@ton-community/sandbox";
	import { MainContract } from "../wrappers/MainContract";
	import { send } from "process";
	import "@ton-community/test-utils";
	import { flattenTransaction } from "@ton-community/test-utils";



	describe("msg test", () => {
		it("test", async() => {
			const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];

			const blockchain = await Blockchain.create();

			const myContract = blockchain.openContract(
				await MainContract.createFromConfig({}, codeCell)
			);

			const senderWallet = await blockchain.treasury("sender");

			const sentMessageResult = await myContract.sendInternalMessage(senderWallet.getSender(),toNano("0.05"));

			expect(sentMessageResult.transactions).toHaveTransaction({
				from: senderWallet.address,
				to: myContract.address,
				success: true,
			});

			const arr = sentMessageResult.transactions.map(tx => flattenTransaction(tx));
			console.log(arr)


		});
	});
    
То, что вы видите в консоли, можно использовать для тестов, давайте проверим, что сообщение, которое отправил наш чат-бот, равно reply.

Сооберем сообщение, в соответсвии с тем, что мы собирали в смарт-контракте.

	let reply = beginCell().storeUint(0, 32).storeStringTail("reply").endCell();
	
Теперь, используя сообщения, проверим, что такая транзакция есть:

	import { Cell, Address, toNano, beginCell } from "ton-core";
	import { hex } from "../build/main.compiled.json";
	import { Blockchain } from "@ton-community/sandbox";
	import { MainContract } from "../wrappers/MainContract";
	import { send } from "process";
	import "@ton-community/test-utils";
	import { flattenTransaction } from "@ton-community/test-utils";



	describe("msg test", () => {
		it("test", async() => {
			const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];

			const blockchain = await Blockchain.create();

			const myContract = blockchain.openContract(
				await MainContract.createFromConfig({}, codeCell)
			);

			const senderWallet = await blockchain.treasury("sender");

			const sentMessageResult = await myContract.sendInternalMessage(senderWallet.getSender(),toNano("0.05"));

			expect(sentMessageResult.transactions).toHaveTransaction({
				from: senderWallet.address,
				to: myContract.address,
				success: true,
			});

			//const arr = sentMessageResult.transactions.map(tx => flattenTransaction(tx));

			let reply = beginCell().storeUint(0, 32).storeStringTail("reply").endCell();

			expect(sentMessageResult.transactions).toHaveTransaction({
				body: reply,
				from: myContract.address,
				to: senderWallet.address
			});

		});
	});
    
Запустите тесты с помощью команды `yarn test` и увидите, что все работает. Таким образом мы можем в тестах собирать объекты такие же как в смарт-контракте и проверять, что транзакция была.

## Onchain тесты

Иногда может возникнуть ситуация, что вам надо прогнать работу ваших смарт-контрактов в тестовой сети(ситуация когда контрактов очень много). Попробуем сделать это на нашем примере.

В папке `scripts` сделаем файл `onchain.ts`, для удобства запуска, добавим в `package.json` `"onchain": "ts-node ./scripts/onchain.ts"`: 

	  "scripts": {
		"compile": "ts-node ./scripts/compile.ts",
		"test": "yarn jest",
		"deploy": "yarn compile && ts-node ./scripts/deploy.ts",
		"onchain": "ts-node ./scripts/onchain.ts"
	  },

Первое, что нам понадобиться для тестов, это адрес смарт-контракта, соберем его:

	import { Cell, beginCell, contractAddress, toNano} from "ton-core";
	import { hex } from "../build/main.compiled.json";
	import { TonClient } from "ton";

	async function onchainScript() {
		const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];
		const dataCell = new Cell();

		const address = contractAddress(0,{
			code: codeCell,
			data: dataCell,
		});

		console.log("Address: ",address)

	}

	onchainScript();

Тест для тестовой сети, будет предлагать нам задеплоить траназакцию через QR код в наш смарт-контракт и каждые 10 секунд проверять появилась ли ответ в сети.

> Это конечно же упрощения для примера, суть просто показать логику.

Соберем QR код, по которому мы будем проводить траназакцию через Tonkeeper. Для нашего примера, важно, чтобы количество TON было достаточным, чтобы не вызывать исключение записанное в контракте.

	import { Cell, beginCell, contractAddress, toNano} from "ton-core";
	import { hex } from "../build/main.compiled.json";
	import { TonClient } from "ton";
	import qs from "qs";
	import qrcode from "qrcode-terminal";

	async function onchainScript() {
		const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];
		const dataCell = new Cell();

		const address = contractAddress(0,{
			code: codeCell,
			data: dataCell,
		});

		console.log("Address: ",address)

		let transactionLink =
		'https://app.tonkeeper.com/transfer/' +
		address.toString({
			testOnly: true,
		}) +
		"?" +
		qs.stringify({
			text: "Sent simple in",
			amount: toNano("0.6").toString(10),
		});

		console.log("Transaction link:",transactionLink);


		qrcode.generate(transactionLink, {small: true }, (qr) => {
			console.log(qr);
		});

	}

	onchainScript();

Чтобы получать данные из тестовой сети нам нужен какой-то источник данных. Данные можно получить по ADNL от Liteservers, но о ADNL поговорим в следующих туториалах. В данном туториале воспользуем API TON центра.

	const API_URL = "https://testnet.toncenter.com/api/v2"
	
Запросы будем делать через Http-клиент [axios](https://axios-http.com/ru/docs/intro), установим: `yarn add axios`.

Среди методов Toncenter, нам нужен getTransactions c параметром limit 1, т.е будем брать последнюю транзакцию. Напишем две вспомогательные функции для запроса информации:

	// axios http client // yarn add axios
	async function getData(url: string): Promise<any> {
		try {
		  const config: AxiosRequestConfig = {
			url: url,
			method: "get",
		  };
		  const response: AxiosResponse = await axios(config);
		  //console.log(response)
		  return response.data.result;
		} catch (error) {
		  console.error(error);
		  throw error;
		}
	  }

	async function getTransactions(address: String) {
	  var transactions;
	  try {
		transactions = await getData(
		  `${API_URL}/getTransactions?address=${address}&limit=1`
		);
	  } catch (e) {
		console.error(e);
	  }
	  return transactions;
	}

Теперь нам нужна функция, которая будет с интервалом вызывать API, для этого есть удобный метод [SetInterval](https://developer.mozilla.org/docs/Web/API/setInterval):

	import { Cell, beginCell, contractAddress, toNano} from "ton-core";
	import { hex } from "../build/main.compiled.json";
	import { TonClient } from "ton";
	import qs from "qs";
	import qrcode from "qrcode-terminal";
	import axios, { AxiosRequestConfig, AxiosResponse } from "axios";


	const API_URL = "https://testnet.toncenter.com/api/v2"

	// axios http client // yarn add axios
	async function getData(url: string): Promise<any> {
		try {
		  const config: AxiosRequestConfig = {
			url: url,
			method: "get",
		  };
		  const response: AxiosResponse = await axios(config);
		  //console.log(response)
		  return response.data.result;
		} catch (error) {
		  console.error(error);
		  throw error;
		}
	  }

	async function getTransactions(address: String) {
	  var transactions;
	  try {
		transactions = await getData(
		  `${API_URL}/getTransactions?address=${address}&limit=1`
		);
	  } catch (e) {
		console.error(e);
	  }
	  return transactions;
	}

	async function onchainScript() {
		const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];
		const dataCell = new Cell();

		const address = contractAddress(0,{
			code: codeCell,
			data: dataCell,
		});


		console.log("Address: ",address)

		let transactionLink =
		'https://app.tonkeeper.com/transfer/' +
		address.toString({
			testOnly: true,
		}) +
		"?" +
		qs.stringify({
			text: "Sent simple in",
			amount: toNano("0.6").toString(10),
			//bin: beginCell().storeUint(1,32).endCell().toBoc({idx: false}).toString("base64"),
		});

		console.log("Transaction link:",transactionLink);


		qrcode.generate(transactionLink, {small: true }, (qr) => {
			console.log(qr);
		});

		setInterval(async () => {
			const txes = await getTransactions(address.toString());
			if(txes[0].in_msg.source === "EQCj2gVRdFS0qOZnUFXdMliONgSANYXfQUDMsjd8fbTW-RuC") {

			}

		},10000)


	}

	onchainScript();

Здесь важно отметить, что API отдает транзакции, а не сообщения, соответственно нам надо проверить, что IN пришло адреса нашего кошелька(здесь я его просто захардкодил) и сообщение(которое мы положили под QR), а в OUT вывести cообщение первого сообщения. Также выведем дату, получим:


	import { Cell, beginCell, contractAddress, toNano} from "ton-core";
	import { hex } from "../build/main.compiled.json";
	import { TonClient } from "ton";
	import qs from "qs";
	import qrcode from "qrcode-terminal";
	import axios, { AxiosRequestConfig, AxiosResponse } from "axios";


	const API_URL = "https://testnet.toncenter.com/api/v2"

	// axios http client // yarn add axios
	async function getData(url: string): Promise<any> {
		try {
		  const config: AxiosRequestConfig = {
			url: url,
			method: "get",
		  };
		  const response: AxiosResponse = await axios(config);
		  //console.log(response)
		  return response.data.result;
		} catch (error) {
		  console.error(error);
		  throw error;
		}
	  }

	async function getTransactions(address: String) {
	  var transactions;
	  try {
		transactions = await getData(
		  `${API_URL}/getTransactions?address=${address}&limit=1`
		);
	  } catch (e) {
		console.error(e);
	  }
	  return transactions;
	}

	async function onchainScript() {
		const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];
		const dataCell = new Cell();

		const address = contractAddress(0,{
			code: codeCell,
			data: dataCell,
		});


		console.log("Address: ",address)

		let transactionLink =
		'https://app.tonkeeper.com/transfer/' +
		address.toString({
			testOnly: true,
		}) +
		"?" +
		qs.stringify({
			text: "Sent simple in",
			amount: toNano("0.6").toString(10),
			//bin: beginCell().storeUint(1,32).endCell().toBoc({idx: false}).toString("base64"),
		});

		console.log("Transaction link:",transactionLink);


		qrcode.generate(transactionLink, {small: true }, (qr) => {
			console.log(qr);
		});

		setInterval(async () => {
			const txes = await getTransactions(address.toString());
			if(txes[0].in_msg.source === "EQCj2gVRdFS0qOZnUFXdMliONgSANYXfQUDMsjd8fbTW-RuC") {

            	console.log("Last tx: " + new Date(txes[0].utime * 1000))
            	console.log("IN from: "+ txes[0].in_msg.source+" with msg: "+ txes[0].in_msg.message)
            	console.log("OUT from: "+ txes[0].out_msgs[0].source +" with msg: "+ txes[0].out_msgs[0].message)
			}

		},10000)


	}

	onchainScript();

Запускаем командой `yarn onchain`, сканируем QR, отправляем траназакцию и ждем, когда придет наша траназакция.

## Заключение

Надеюсь вам понравилсь серия про pipeline. Буду благодарен звездочке на репозитории.