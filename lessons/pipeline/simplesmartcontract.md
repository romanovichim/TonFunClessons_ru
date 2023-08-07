# Smart Contract Pipeline Part1 - Пишем простой смарт-контракт и компилируем его

## Вступление

Современным инструментом работы со смарт-контрактами в блокчейн TON является [blueprint](https://github.com/ton-org/blueprint/), он позволяет быстро создавать структуру проекта и сразу преступать к удобной разработке. Именно blueprint используется в моих уроках по языку разработки смарт-контрактов FunC.

Для успешной работы с blueprint нужно уметь работать с его различными компонентами, поэтому в этой серии туториалов мы разберем:

- создание проекта, простого смарт-контракт и его компиляция с помощью https://github.com/ton-community/func-js 
- протестируем смарт-контракт используя https://github.com/ton-org/sandbox
- сделаем деплой в тестовую сеть удобным: генерация QR-кода, который мы будем подтверждать в кошельке
- TON является акторной моделью - смарт-контракты общаются между собой сообщениям - напишем смарт-контракт чат-бот, который будет отвечать сообщением на сообщение)
- протестируем смарт-контракт чат-бот и научимся тестировать смарт-контракты отправляющие сообщения

Начнем с создания простого смарт-контракта и его компиляции.

## Инициализация проекта

Создайте папку для своего проекта и зайдите в нее.

	// Windows example
	mkdir test_folder
	cd test_folder
	
В этом туториале мы будем использовать менеджер пакетов `yarn`.

	yarn init
	
Давайте инициализируем `yarn` и прокликаем вопросы консоли, так как это тестовый пример. После этого мы должны получить файл `package.json` в папке.

Теперь добавим typescript и необходимые библиотеки. Установите их как dev dependencies:

	yarn add typescript ts-node @types/node @swc/core --dev
	
Создайте файл `tsconfig.json`. он нужен для конфигурации компиляции проекта. Добавим к нему:

	{
		"compilerOptions": {
			"target" : "es2020",
			"module" : "commonjs",
			"esModuleInterop" : true,
			"forceConsistentCasingInFileNames": true,
			"strict" : true,
			"skipLibCheck" : true,
			"resolveJsonModule" : true

		},
		"ts-node": {
			"transpileOnly" : true,
			"transpile" : "ts-node/transpilers/swc"
		}
	}

В этом туториале мы не будем останавливаться на том, что означает каждая строка конфигураций, потому что этот туториал посвящен смарт-контрактам. Теперь установим библиотеки, необходимые для работы с TON:

	yarn add ton-core ton-crypto @ton-community/func-js  --dev
	
Теперь давайте создадим смарт-контракт на FunC. Создайте папку `contracts` и файл `main.fc` с минимальным кодом:

	() recv_internal(int msg_value, cell in_msg, slice in_msg_body) impure {

	} 

`recv_internal` вызывается, когда смарт-контракт получает входящее внутреннее сообщение. В стеке есть некоторые переменные, когда [TVM инициирует](https://docs.ton.org/learn/tvm-instructions/tvm-overview#initialization-of-tvm), задав аргументы в recv_internal, мы даем смарт-контракт понимание кода о некоторых из них.

Теперь давайте напишем скрипт, который будет компилировать наш шаблон смарт-контракта. Создадим папку `scripts` и файл `compile.ts` в ней.

Чтобы мы могли использовать этот скрипт, нам нужно добавить его как параметр в менеджере пакетов, т.е. в файле `package.json`, он будет выглядеть так:

	{
	  "name": "test_folder",
	  "version": "1.0.0",
	  "main": "index.js",
	  "license": "MIT",
	  "devDependencies": {
		"@swc/core": "^1.3.63",
		"@ton-community/func-js": "^0.6.2",
		"@types/node": "^20.3.1",
		"ton-core": "^0.49.1",
		"ton-crypto": "^3.2.0",
		"ts-node": "^10.9.1",
		"typescript": "^5.1.3"
	  },
	  "scripts": {
		  "compile" : "ts-node ./scripts/compile.ts"
	  }
	}

Теперь перейдем к написанию скрипта компиляции в файле `compile.ts`. Здесь оговоримся, что результатом компиляции будет представление [bag of Cell](https://docs.ton.org/develop/data-formats/cell-boc) в формате base64-кодированной строки . Этот результат нужно где-то сохранить, поэтому давайте создадим папку `build`.

Наконец мы добираемся до файла компиляции, первое, что мы делаем, это компилируем наш код с помощью функции `compileFunc`:

	import * as fs from "fs";
	import { readFileSync } from "fs";
	import process from "process";
	import { Cell } from "ton-core";
	import { compileFunc } from "@ton-community/func-js";

	async function compileScript() {

		const compileResult = await compileFunc({
			targets: ["./contracts/main.fc"], 
			sources: (path) => readFileSync(path).toString("utf8"),
		});

		if (compileResult.status ==="error") {
			console.log("Error happend");
			process.exit(1);
		}

	}
	compileScript();
	
Полученный hexBoС будет записан в папку:

	import * as fs from "fs";
	import { readFileSync } from "fs";
	import process from "process";
	import { Cell } from "ton-core";
	import { compileFunc } from "@ton-community/func-js";

	async function compileScript() {

		const compileResult = await compileFunc({
			targets: ["./contracts/main.fc"], 
			sources: (path) => readFileSync(path).toString("utf8"),
		});

		if (compileResult.status ==="error") {
			console.log("Error happend");
			process.exit(1);
		}

		const hexBoC = 'build/main.compiled.json';

		fs.writeFileSync(
			hexBoC,
			JSON.stringify({
				hex: Cell.fromBoc(Buffer.from(compileResult.codeBoc,"base64"))[0]
					.toBoc()
					.toString("hex"),
			})

		);

	}

	compileScript();
	
Для удобства можно разбавить код `console.log()`, чтобы было понятно, что сработало, а что нет при компиляции, например, можно добавить в конец:

	console.log("Compiled, hexBoC:"+hexBoC);

Который выведет полученный hexBoC.

## Перейдем к самому смарт-контракту

Для создания контрактов нам понадобится стандартная библиотека функций FunC. Создайте папку `imports` внутри папки `contracts` и добавьте туда [этот](https://github.com/ton-blockchain/ton/blob/master/crypto/smartcont/stdlib.fc) файл.

Теперь перейдите в файл `main.fc` и импортируйте библиотеку, теперь файл выглядит так:

	#include "imports/stdlib.fc";

	() recv_internal(int msg_value, cell in_msg, slice in_msg_body) impure {

	} 

Кратко пробежимся по контракту, подробные разборы и уроки по FunC есть [здесь](https://github.com/romanovichim/TonFunClessons_ru).

Смарт-контракт, который мы напишем, будет хранить адрес отправителя внутреннего сообщения, а также хранить номер один в смарт-контракте. Также будет реализован метод Get, который при вызове будет возвращать адрес последнего отправителя сообщения в контракт и единицу.

В нашу функцию приходит внутреннее сообщение, оттуда мы сначала получим служебные флаги, а потом адрес отправителя, который сохраним:

	#include "imports/stdlib.fc";

	() recv_internal(int msg_value, cell in_msg, slice in_msg_body) impure {
		slice cs = in_msg.begin_parse();
		int flags = cs~load_uint(4);
		slice sender_address = cs~load_msg_addr();

	} 

Сохраним адрес и единицу в контракте, т.е. запишем данные в регистр `c4`.

	#include "imports/stdlib.fc";

	() recv_internal(int msg_value, cell in_msg, slice in_msg_body) impure {
		slice cs = in_msg.begin_parse();
		int flags = cs~load_uint(4);
		slice sender_address = cs~load_msg_addr();

		set_data(begin_cell().store_slice(sender_address).store_uint(1,32).end_cell());
	} 

Пришло время метода Get, метод вернет адрес и число, поэтому начнем с `(slice,int)`

	(slice,int) get_sender() method_id {

	}

В самом методе получаем данные из регистра и возвращаем их пользователю:

	#include "imports/stdlib.fc";

	() recv_internal(int msg_value, cell in_msg, slice in_msg_body) impure {
		slice cs = in_msg.begin_parse();
		int flags = cs~load_uint(4);
		slice sender_address = cs~load_msg_addr();

		set_data(begin_cell().store_slice(sender_address).store_uint(1,32).end_cell());
	} 

	(slice,int) get_sender() method_id {
		slice ds = get_data().begin_parse();
		return (ds~load_msg_addr(),ds~load_uint(32));
	}
	

Финальная версия:

	#include "imports/stdlib.fc";

	() recv_internal(int msg_value, cell in_msg, slice in_msg_body) impure {
		slice cs = in_msg.begin_parse();
		int flags = cs~load_uint(4);
		slice sender_address = cs~load_msg_addr();

		set_data(begin_cell().store_slice(sender_address).store_uint(1,32).end_cell());
	} 

	(slice,int) get_sender() method_id {
		slice ds = get_data().begin_parse();
		return (ds~load_msg_addr(),ds~load_uint(32));
	}
	
Запускаем компиляцию с помощью команды `yarn compile` и получаем файл c `main.compiled.json` в папке `build`:

	{"hex":"b5ee9c72410104010035000114ff00f4a413f4bcf2c80b0102016203020015a1418bda89a1f481a63e610028d03031d0d30331fa403071c858cf16cb1fc9ed5474696b07"}

## Conclusion

Следующим шагом мы будем писать тесты к выполнению смарт-контракта, спасибо за внимание.
