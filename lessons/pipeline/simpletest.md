# Smart Contract Pipeline Part2 - Тестирование смарт-контракта

## Вступление

В [первой части](https://github.com/romanovichim/TonFunClessons_ru/blob/main/lessons/pipeline/simplesmartcontract.md) мы рассмотрели каркас проекта и написали простой смарт-контракт, пришло время тестов.

## Начнем работать над тестами

Для тестов нам понадобится фреймворк для тестирования, в нашем случае это будет [jest](https://jestjs.io), также нам нужно эмулировать работу блокчейна, для этого мы будем использовать [ton-community/sandbox ](https://github.com/ton-community/sandbox). Устанавливаем:

	yarn add @ton-community/sandbox jest ts-jest @types/jest ton --dev
	
Чтобы использовать jest framework, вам нужен файл конфигурации. Создадим файл jets.config.js и добавим туда:

	/** @type {import('ts-jest').JestConfigWithTsJest} */
	module.exports = {
	  preset: 'ts-jest',
	  testEnvironment: 'node',
	};
	
Создадим папку для тестов - папку `tests`. А внутри мы создадим файл `main.spec.ts`.
Проверим, правильно ли мы все установили, запустив примитивный тест, добавим в файл `main.spec.ts` следующий код:

	describe("test tests", () => {
		it("test of test", async() => {});
	});

Запустите его с помощью команды `yarn jest`, вы должны увидеть, что тесты пройдены. Для удобства запуска тестов модернизируем файл `package.json`.

	{
	  "name": "third",
	  "version": "1.0.0",
	  "main": "index.js",
	  "license": "MIT",
	  "devDependencies": {
		"@swc/core": "^1.3.59",
		"@ton-community/func-js": "^0.6.2",
		"@ton-community/sandbox": "^0.11.0",
		"@types/jest": "^29.5.1",
		"@types/node": "^20.2.1",
		"jest": "^29.5.0",
		"ton": "^13.5.0",
		"ton-core": "^0.49.1",
		"ton-crypto": "^3.2.0",
		"ts-jest": "^29.1.0",
		"ts-node": "^10.9.1",
		"typescript": "^5.0.4"
	  },
	  "scripts": {
		"compile": "ts-node ./scripts/compile.ts",
		"test": "yarn jest"
	  }
	}

Теперь импортируем скомпилированный контракт и `Cell` из `ton-core` в файл `main.spec.ts`, чтобы контракт можно было открыть:

	import { Cell } from "ton-core";
	import { hex } from "../build/main.compiled.json";

	describe("test tests", () => {
		it("test of test", async() => {});
	});
	
Получаем ячейку с кодом:

	import { Cell } from "ton-core";
	import { hex } from "../build/main.compiled.json";


	describe("test tests", () => {
		it("test of test", async() => {
			const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];


		});
	});
	
Перейдем к использованию `@ton-community/sandbox`. Первое, что нужно сделать, - это использовать локальную версию блокчейна.

	import { Cell } from "ton-core";
	import { hex } from "../build/main.compiled.json";
	import { Blockchain } from "@ton-community/sandbox";

	describe("test tests", () => {
		it("test of test", async() => {
			const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];

			const blockchain = await Blockchain.create();
		});
	});

Для удобства взаимодействия с контрактом используются обертки. Простейшая обертка описывает развертывание контракта (а именно какие исходные данные, а также его методы или взаимодействие с ними).

Создайте папку `wrappers` и создайте в ней обертку `MainContract.ts` и сразу импортируйте в нее тип контракта и `ton-core`:

	import { Contract } from "ton-core";
	
Мы создаем класс нашего контракта, реализуя `Contract`:

	import { Contract } from "ton-core";

	export class MainContract implements Contract {

	}

При создании объекта класса вызывается конструктор. Напишем его, а также импортируем необходимые типы — адрес и ячейка.

	import { Address,Cell,Contract } from "ton-core";

	export class MainContract implements Contract {
		constructor(
			readonly address: Address,
			readonly init?: { code: Cell, data: Cell }
		){}
	}

Чтобы понять, почему конструктор именно такой, советую начать с [здесь](https://docs.ton.org/develop/howto/step-by-step).

Самое важное, что нужно знать сейчас, это то, что «данные» — это данные, которые будут находиться в регистре c4 при инициализации контракта.

Для удобства данные для контракта возьмем из конфига, поэтому создадим для этого статический класс.

	import { Address,beginCell,Cell,Contract, contractAddress } from "ton-core";

	export class MainContract implements Contract {
		constructor(
			readonly address: Address,
			readonly init?: { code: Cell, data: Cell }
		){}

		static createFromConfig(config: any, code: Cell, workchain = 0){
			const data = beginCell().endCell();
			const init = { code,data };
			const address = contractAddress(workchain, init);

			return new MainContract(address,init);
		}
	}

Для того, чтобы развернуть смарт-контракт, вам нужен код смарт-контракта и его исходные данные, все это мы поместим в конфиг для удобства тестов и развертывания.

Возвращаемся к файлу main.spec.ts. Теперь у нас есть код и оболочка, давайте воспользуемся функцией `openContract` из `ton-community/sandbox`, чтобы открыть контракт с помощью конфигурации.

	import { Cell, Address  } from "ton-core";
	import { hex } from "../build/main.compiled.json";
	import { Blockchain } from "@ton-community/sandbox";
	import { MainContract } from "../wrappers/MainContract";

	describe("test tests", () => {
		it("test of test", async() => {
			const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];

			const blockchain = await Blockchain.create();

			const myContract = blockchain.openContract(
				await MainContract.createFromConfig({}, codeCell)
			);
		});
	});
	
Конфиг пока пуст, вернемся к нему позже. Теперь импортируем `Адрес` из `ton-core`, он нам понадобится для тестов. Чтобы протестировать контракт, нам нужна сущность, которая позволит нам отправлять сообщения, в «песочнице» это «казначейство».

	import { Cell, Address } from "ton-core";
	import { hex } from "../build/main.compiled.json";
	import { Blockchain } from "@ton-community/sandbox";
	import { MainContract } from "../wrappers/MainContract";

	describe("test tests", () => {
		it("test of test", async() => {
			const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];

			const blockchain = await Blockchain.create();

			const myContract = blockchain.openContract(
				await MainContract.createFromConfig({}, codeCell)
			);

			const senderWallet = await blockchain.treasury("sender");
		});
	});

Итак, для тестов нам нужно отправлять внутренние сообщения. Поэтому необходимо модифицировать нашу обертку. Давайте добавим `sendInternalMessage` в `MainContract.ts`.

	import { Address,beginCell,Cell,Contract, contractAddress, ContractProvider, Sender, SendMode } from "ton-core";

	export class MainContract implements Contract {
		constructor(
			readonly address: Address,
			readonly init?: { code: Cell, data: Cell }
		){}

		static createFromConfig(config: any, code: Cell, workchain = 0){
			const data = beginCell().endCell();
			const init = { code,data };
			const address = contractAddress(workchain, init);

			return new MainContract(address,init);
		}

		async sendInternalMessage(
			provider: ContractProvider,
			sender: Sender,
			value: bigint,
		){
			await provider.internal(sender,{
				value,
				sendMode: SendMode.PAY_GAS_SEPARATELY,
				body: beginCell().endCell(),
			});
		}
	}

Вернитесь к тестовому файлу `main.spec.ts` и используйте метод, который мы только что написали в обертке:

	import { Cell, Address, toNano } from "ton-core";
	import { hex } from "../build/main.compiled.json";
	import { Blockchain } from "@ton-community/sandbox";
	import { MainContract } from "../wrappers/MainContract";
	import { send } from "process";

	describe("test tests", () => {
		it("test of test", async() => {
			const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];

			const blockchain = await Blockchain.create();

			const myContract = blockchain.openContract(
				await MainContract.createFromConfig({}, codeCell)
			);

			const senderWallet = await blockchain.treasury("sender");

			myContract.sendInternalMessage(senderWallet.getSender(),toNano("0.05"));
		});
	});
	
В обертке можно было увидеть, что значение TON, которое нужно отправить, имеет тип bigint, поэтому в самих тестах используется удобная функция `toNano`, которая переводит удобочитаемое число в `bigInt`. Чтобы проверить, правильно ли сработала отправка сообщения, нужно вызвать `getMethod`, так как в случае отправки сообщения сначала нужно поработать с оберткой. Добавьте его в `MainContract.ts`:

		import { Address,beginCell,Cell,Contract, contractAddress, ContractProvider, Sender, SendMode } from "ton-core";

		export class MainContract implements Contract {
			constructor(
				readonly address: Address,
				readonly init?: { code: Cell, data: Cell }
			){}

			static createFromConfig(config: any, code: Cell, workchain = 0){
				const data = beginCell().endCell();
				const init = { code,data };
				const address = contractAddress(workchain, init);

				return new MainContract(address,init);
			}

			async sendInternalMessage(
				provider: ContractProvider,
				sender: Sender,
				value: bigint,
			){
				await provider.internal(sender,{
					value,
					sendMode: SendMode.PAY_GAS_SEPARATELY,
					body: beginCell().endCell(),
				});
			}

			async getData(provider: ContractProvider) {
				const { stack } = await provider.get("get_sender", []);
				return {
					recent_sender: stack.readAddress(),
					number: stack.readNumber(),
				};
			}
	}


Наконец-то мы сделали все подготовительные шаги к тестам и теперь можем их делать, для удобства установим `test-utils`. Эта библиотека позволит нам использовать кастомные совпадения для нашей тестовой среды Jest.

	yarn add @ton-community/test-utils
	

Импортируем утилиты в файл с тестами и так же передаем в переменную результат отправки сообщения.

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
		});
	});
	
Здесь мы добавим первый тест, мы проверим, что транзакция с нашим сообщением прошла.

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

Далее мы вызываем метод get и проверяем, что возвращается правильный адрес в соответствии с логикой контракта.

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

			const getData = await myContract.getData();

			expect(getData.recent_sender.toString()).toBe(senderWallet.address.toString());

		});
	});
	
Запустите тесты, написав в консоли: `yarn test`. Если вы все сделали правильно, вы должны увидеть:

	Pass
	Test Suites: 1 passed, 1 total
	Tests:       1 passed, 1 total

Осталось проверить равенств сохраненных значений, проверим с помощью `toEqual()`:

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

			const getData = await myContract.getData();

			expect(getData.recent_sender.toString()).toBe(senderWallet.address.toString());
			expect(getData.number).toEqual(1); 
		});
	});
    
## Conclusion

Тесты пройдены и нужно деплоить контракт в сеть, в следующем туториале мы сделаем удобную систему деплоя.