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


const OFF_CHAIN_CONTENT_PREFIX = 0x01

export function flattenSnakeCell(cell: Cell) {
  let c: Cell | null = cell

  let res = Buffer.alloc(0)

  while (c) {
    const cs = c.beginParse()
    if (cs.remainingBits === 0) {
      return res
    }
    if (cs.remainingBits % 8 !== 0) {
      throw Error('Number remaining of bits is not multiply of 8')
    }

    const data = cs.loadBuffer(cs.remainingBits / 8)
    res = Buffer.concat([res, data])
    c = c.refs && c.refs[0]
  }

  return res
}

export function decodeOffChainContent(content: Cell) {
  const data = flattenSnakeCell(content)

  const prefix = data[0]
  if (prefix !== OFF_CHAIN_CONTENT_PREFIX) {
    throw new Error(`Unknown content prefix: ${prefix.toString(16)}`)
  }
  return data.slice(1).toString()
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

	
	//GET METHOD

	// collection
	/*
	const addrStr="EQAo92DYMokxghKcq-CkCGSk_MgXY5Fo1SPW20gkvZl75iCN";
	let executed = await client.runMethod(Address.parse(addrStr), 'get_collection_data', Buffer.alloc(0), master.last);
	if (!executed.result) {
		return
	}
	let resultTuple = parseTuple(Cell.fromBoc(Buffer.from(executed.result, 'base64'))[0])
	let parsed = new TupleReader(resultTuple);
	//(int next_item_index, cell collection_content, slice owner_address)
	//console.log(parsed);
	let next_item_index = parsed.readBigNumber();
	let collection_content = parsed.readCell();
	let owner_address = parsed.readAddress();
	console.log("Content link: " ,decodeOffChainContent(collection_content));
	console.log("Owner Address: ", owner_address);
	*/
	
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