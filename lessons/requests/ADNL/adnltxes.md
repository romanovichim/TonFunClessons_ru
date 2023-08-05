# Собираем последние траназакции

Частой задачей в ТОН является получение траназакций какого-либо аккаунта. В данном туториале мы разберем как доставать транзакции аккаунта используя АДНЛ 

## Логическое время транзакции

В бибилотеке `ton-lite-client` есть функция `getAccountTransactions` для получения транзакций аккаунта, проблема в том, что фильтр идет по логическому времени транзакции. Соответсвенно, чтобы получить последние траназакции, сначала надо достать. Сделаем это мы с помощью `getAccountState()`:

	import { LiteClient, LiteRoundRobinEngine, LiteSingleEngine, LiteEngine } from "ton-lite-client";
	import { Address, Cell, loadTransaction,parseTuple, TupleReader, beginCell  } from "ton-core";
	import { Buffer } from 'buffer';

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

		//transactions
		const address = Address.parse('EQCjk1hh952vWaE9bRguFkAhDAL5jj3xj9p0uPWrFBq_GEMS');
		const accountState = await client.getAccountState(address, master.last)
		if (!accountState.lastTx) {
			return
		}

	}

	main()

Все просто - берем последний блок, и из него получаем информацию об аккаунте. Из это информации мы достанем логическое время последней траназакции и с помощью вспомогательной фукнции `bigIntToBuffer()` представим хэш в нужном нам далее формате: 

	let lastTxLt = accountState.lastTx.lt.toString()
	let lastTxHash = bigIntToBuffer(accountState.lastTx.hash)

Вызываем метод и получим ячейку с траназакциями: 

	let lastTxLt = accountState.lastTx.lt.toString()
	let lastTxHash = bigIntToBuffer(accountState.lastTx.hash)
	
	let limit = 16 as number 
	const temp = await client.getAccountTransactions(address,lastTxLt,lastTxHash,limit)
	
Воспользуемся функцией `loadTransction` из `ton-core` и используя логическое время представим транзакции в удобном виде:

	let lastTxLt = accountState.lastTx.lt.toString()
	let lastTxHash = bigIntToBuffer(accountState.lastTx.hash)
	
	let limit = 16 as number 
	const temp = await client.getAccountTransactions(address,lastTxLt,lastTxHash,limit)
	
	console.log(temp);
	
	const cell = Cell.fromBoc(temp.transactions)
	const ltToHash: Map<string, Buffer> = new Map()
		ltToHash.set(lastTxLt, lastTxHash)

	const transactions = cell.map((c) => {
		const tx = loadTransaction(c.beginParse())
		ltToHash.set(tx.prevTransactionLt.toString(), bigIntToBuffer(tx.prevTransactionHash))
		return tx
	})
	
## Циклы и транзакции

Теперь мы можем пройтись циклом по транзакциям. Сделаем так - достанем информацию и представим её в удобно виде, информация следующая:

	export interface PlainTransaction {
	  address: string // raw
	  lt: string // bigint
	  hash: string // base64
	  data: string // base64

	  prevLt: string
	  prevHash: string
	}

Представляем в удобном виде:

	let lastTxLt = accountState.lastTx.lt.toString()
	let lastTxHash = bigIntToBuffer(accountState.lastTx.hash)
	
	let limit = 16 as number 
	const temp = await client.getAccountTransactions(address,lastTxLt,lastTxHash,limit)
	
	console.log(temp);
	
	const cell = Cell.fromBoc(temp.transactions)
	const ltToHash: Map<string, Buffer> = new Map()
		ltToHash.set(lastTxLt, lastTxHash)

	const transactions = cell.map((c) => {
		const tx = loadTransaction(c.beginParse())
		ltToHash.set(tx.prevTransactionLt.toString(), bigIntToBuffer(tx.prevTransactionHash))
		return tx
	})
	
	const txes = transactions.map((tx, i): PlainTransaction => {
		const lt = tx.lt.toString()
		const hash = ltToHash.get(lt)

		if (!hash) {
			throw new Error('Tx hash not found')
		}

		return Object.freeze({
			address: address.toString(),
			lt,
			hash: hash.toString('hex'),
			data: cell[i].toBoc().toString('base64'),
			prevLt: tx.prevTransactionLt.toString(),
			prevHash: bigIntToBuffer(tx.prevTransactionHash).toString('hex'),
		})
	})
	
Далее расмотрим информацию о транзакциях, но чтобы просмотреть сообщение отправленное с транзакцией, нам понадобиться еще одна вспомогательная функция:

	export function msgToStr(msg: Cell | undefined){
	  if (!msg) {
		return
	  }
	  const body = msg.asSlice()
	  if (body.remainingBits < 32) {
		return undefined
	  }
	  const opcode = body.loadUint(32)
	  if (opcode !== 0) {
		return 'OP: 0x' + opcode.toString(16)
	  }
	  if (body.remainingBits < 8 || body.remainingBits % 8 !== 0) {
		return undefined
	  }
	  //console.log('body.remainingBits', body.remainingBits)
	  return body.loadBuffer(body.remainingBits / 8).toString('utf-8')
	}
	
## Приводим в читаемый вид

Для пример достанем информацию по транзакциям и представим их в удобном, читаемом виде:

	import { LiteClient, LiteRoundRobinEngine, LiteSingleEngine, LiteEngine } from "ton-lite-client";
	import { Address, Cell, loadTransaction,parseTuple, TupleReader, beginCell  } from "ton-core";
	import { Buffer } from 'buffer';

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

	//for transaction
	export function bigIntToBuffer(data: bigint | undefined) {
	  if (!data) {
		return Buffer.from([])
	  }
	  const hexStr = data.toString(16)
	  const pad = hexStr.padStart(64)
	  const hashHex = Buffer.from(pad, 'hex')

	  return hashHex
	}

	export interface PlainTransaction {
	  address: string // raw
	  lt: string // bigint
	  hash: string // base64
	  data: string // base64

	  prevLt: string
	  prevHash: string
	}



	export function msgToStr(msg: Cell | undefined){
	  if (!msg) {
		return
	  }
	  const body = msg.asSlice()
	  if (body.remainingBits < 32) {
		return undefined
	  }
	  const opcode = body.loadUint(32)
	  if (opcode !== 0) {
		return 'OP: 0x' + opcode.toString(16)
	  }
	  if (body.remainingBits < 8 || body.remainingBits % 8 !== 0) {
		return undefined
	  }
	  //console.log('body.remainingBits', body.remainingBits)
	  return body.loadBuffer(body.remainingBits / 8).toString('utf-8')
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


		//transactions
		const address = Address.parse('EQCjk1hh952vWaE9bRguFkAhDAL5jj3xj9p0uPWrFBq_GEMS');
		const accountState = await client.getAccountState(address, master.last)
		if (!accountState.lastTx) {
			return
		}

		let lastTxLt = accountState.lastTx.lt.toString()
		let lastTxHash = bigIntToBuffer(accountState.lastTx.hash)

		let limit = 16 as number 
		const temp = await client.getAccountTransactions(address,lastTxLt,lastTxHash,limit)

		console.log(temp);

		const cell = Cell.fromBoc(temp.transactions)
		const ltToHash: Map<string, Buffer> = new Map()
			ltToHash.set(lastTxLt, lastTxHash)

		const transactions = cell.map((c) => {
			const tx = loadTransaction(c.beginParse())
			ltToHash.set(tx.prevTransactionLt.toString(), bigIntToBuffer(tx.prevTransactionHash))
			return tx
		})

		const txes = transactions.map((tx, i): PlainTransaction => {
			const lt = tx.lt.toString()
			const hash = ltToHash.get(lt)

			if (!hash) {
				throw new Error('Tx hash not found')
			}

			return Object.freeze({
				address: address.toString(),
				lt,
				hash: hash.toString('hex'),
				data: cell[i].toBoc().toString('base64'),
				prevLt: tx.prevTransactionLt.toString(),
				prevHash: bigIntToBuffer(tx.prevTransactionHash).toString('hex'),
			})
		})


		for (const transaction of txes) {
			const txCell = Cell.fromBoc(Buffer.from(transaction.data, 'base64'))[0]
			const data = loadTransaction(txCell.asSlice())
			console.log("Type: ",data.inMessage?.info.type); //external and internal
			console.log("Addr: ",data.inMessage?.info.src);  // from who tx
			console.log("Msg: ", msgToStr(data.inMessage?.body));
			console.log("Date",new Date(data.now*1000));
		}		

		/*
		const lastTx = txes.at(-1)
			if (lastTx) {
			  const lastTxData = loadTransaction(
				Cell.fromBoc(Buffer.from(lastTx.data, 'base64'))[0].asSlice()
			  )

			  lastTxLt = lastTxData.prevTransactionLt.toString()
			  lastTxHash = bigIntToBuffer(lastTxData.prevTransactionHash)
			}
		*/
		//console.log(txes);

	}

	main()
	
В конце вы можете видеть закомментированный кусок кода, он может понадобиться вам, если вы захотите вытащить больше чем 16 траназакций за раз, так как функций getAccountTransactions, вытакскивает максимум по 16, а значит вам нужно вызывать её циклом и доставать логическое время последней траназакции каждый раз, если вы хотите больше чем 16 траназакций.

## Заключение

Данная статья является последней в цикле про ADNL, надеюсь вам понравилось и вы поставите звездочку репозиторию. Больше полезных статей про ТОН [здесь](https://t.me/ton_learn).
