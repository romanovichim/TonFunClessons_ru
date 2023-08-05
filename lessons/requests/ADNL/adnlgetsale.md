# Get метод через ADNL

## Вступление

Частой задачей в TON является получение данных от смарт-контрактов через Get методы. В данном туториале, мы достанем данные о NFT коллекции через Get метод смарт-контракта коллекции. А также поговорим о логике продажи NFT в TON и как правильно доставать инфу о продаже.

## Вступление

Так как смарт-контракт коллекции является стандартом, то мы можем посмотреть сигнатуру метода. `get_collection_data()` возвращает:

- `next_item_index` - количество развернутых в настоящее время элементов NFT в коллекции. 
- `collection_content` - содержимое коллекции в формате, соответствующем стандарту TEP-64. 
- `owner_address` -адрес владельца коллекции, нулевой адрес, если нет владельца.

Для того, чтобы сделать запрос нужен последний блок, как его доставать мы разбирали в предыдущем туториале:

	import { LiteClient, LiteRoundRobinEngine, LiteSingleEngine, LiteEngine } from "ton-lite-client";
	import { Address} from "ton-core";

	async function main() {
		const engines: LiteEngine[] = [];
		engines.push(new LiteSingleEngine({
			host: `tcp://${intToIP(server.ip)}:${server.port}`,
			publicKey: Buffer.from(server.id.key, 'base64'),
		}));
		const engine: LiteEngine = new LiteRoundRobinEngine(engines);
		const client = new LiteClient({ engine });
		const master = await client.getMasterchainInfo()

	}
	
Возьмем адрес любой коллекции в TON, например `EQAo92DYMokxghKcq-CkCGSk_MgXY5Fo1SPW20gkvZl75iCN` и вызовем его Get метод, используя полученный блок:

	let executed = await client.runMethod(Address.parse(addrStr), 'get_collection_data', Buffer.alloc(0), master.last);
	if (!executed.result) {
		return
	}
	
Get методы могут принимать параметры, так как в стандартном методе `get_collection_data` параметров нет мы прокидываем `Buffer.alloc(0)` - объект нулевого размера.

В ответе мы получим стек, который надо распарсить, выглядеть это будет так:

	// collection
	const addrStr="EQAo92DYMokxghKcq-CkCGSk_MgXY5Fo1SPW20gkvZl75iCN";
	let executed = await client.runMethod(Address.parse(addrStr), 'get_collection_data', Buffer.alloc(0), master.last);
	if (!executed.result) {
		return
	}
	let resultTuple = parseTuple(Cell.fromBoc(Buffer.from(executed.result, 'base64'))[0])
	let parsed = new TupleReader(resultTuple);
	
Теперь можно начинать вычитывать данные, например индекс следующего элемента коллекции:

	let next_item_index = parsed.readBigNumber();
	
А также адрес владельца и ячейку с контентом:

	let collection_content = parsed.readCell();
	let owner_address = parsed.readAddress();
	
Если вы выведите данные в консоль, вы увидете значение, адрес и ячейку, ячейка содержит в себе контент, хранение данного контента тоже описывается стандартом, хранение данных описано здесь в пункте `Content representation`, данные тут.

Самый частое представление данных, это `Offchain snake format`, давайте его и распарсим:

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

		//int 0x46495850,    ;; fix price sale ("FIXP")
		//int is_complete 
		//int created_at
		//slice marketplace_address
		//slice nft_address
		//slice nft_owner_address
		//int full_price
		//slice marketplace_fee_address
		//int marketplace_fee
		//slice royalty_address
		//int royalty_amount


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

	}

	main()
	
Функция `decodeOffChainContent()` проверяет по префиксу, что это оффчейн хранение контента и 'разбирает' ячейку превращая её в нужную нам ссылку.

## Информация о продаже - логика сбора данных

Понимания как работают смарт-контракты, можно достать почти любую информацию из сети. В TON акторная модель, соответственно, чтобы понять, где взять информацию, нужно понять цепочку смарт-контрактов.

Давайте представим некую задачу и попробуем рассмотреть цепочку. Допустим мы хотим анализировать последние продажи происходящие на NFT маркетплейсе. Тогда примерно понимая как работают продажи NFT в TON(разборы смарт-контрактов тут) мы:

рассмотрим доступный нам элемент NFT и проанализируем как происходит передача владения данного элемента используя эксплорер
рассмотрим смарт-контракт маркетплейса или иной смарт-контракт в который приходят сообщения о продажах - это даст нам список последних продаж
разберем какие типы смарт-контрактов реализуют продажи - продавать можно аукционом, просто выставив на продажу или например сделать предложение о продаже владельцу NFT
посмотрим в каждом типе GET-методы,т.е какую информацию возвращают смарт-контракты продажи
из GET-методов мы получим информацию про NFT, а значит нам останется достать информацию о конкретных элементах, для этого нужно понимать, как работает стандарт
Попробуем пройти это путь для маркетплейса Getgems, возьмем какую-нибудь NFT и двигаясь от неё попробуем найти нужную нам инфу.

Находим на маркетплейсе какую-нибудь NFT, которую уже продавали:

https://tonscan.org/address/EQCSfecskd3PuZJ_eBa1VogJ-okmoIaUOpnWTDdqNpe2OPl7

Посмотрим историю транзакций, видим, что есть траназакция от коллекции - т.е деплой NFT и есть смарт-контракт продажи:

https://tonscan.org/address/EQCd205E1KdajfW29w7BRyWhiOZwZSPbirMathS8CaTEO83e

Если рассмотреть смарт-контракт продажи, станет ясно, что по его логике последняя транзакция идет в смарт-контракт маркетплейса, а именно сюда:

https://tonscan.org/address/EQCjk1hh952vWaE9bRguFkAhDAL5jj3xj9p0uPWrFBq_GEMS

Теперь у нас есть гипотеза, что если брать траназакции данного смарт-контракта, мы сможем получать информацию о продажах, но мы помним, что продажи бывают разные, полазив по смарт-контракту маркетплейса, мы найдем:

Продажи, пример: https://tonscan.org/address/EQCd205E1KdajfW29w7BRyWhiOZwZSPbirMathS8CaTEO83e
Предложения о продажах, пример: https://tonscan.org/address/EQBikL59x3fXgG4CYXTZBiCHiBhLOHp1cYKL4bBqTRL-5ywu
Продажи по аукциону, пример: https://tonscan.org/address/EQBLQRjs7unG_ruz3Ismly_3_aXFD_wthmbTSUtdh6te4B1e
Изучим Get-методы данных смарт-контрактов, рассмотрев вкладку Contract в эксполрере. Видим, что для обычных продаж и аукционов, есть метод get_nft_data().

Для продаж:

	(int, int, int, slice, slice, slice, int, slice, int, slice, int) get_sale_data() method_id {
		var (
			is_complete,
			created_at,
			marketplace_address,
			nft_address,
			nft_owner_address,
			full_price,
			fees_cell
		) = load_data();

		var (
			marketplace_fee_address,
			marketplace_fee,
			royalty_address,
			royalty_amount
		) = load_fees(fees_cell);

		return (
			0x46495850,    ;; fix price sale ("FIXP")
			is_complete == 1,
			created_at,
			marketplace_address,
			nft_address,
			nft_owner_address,
			full_price,
			marketplace_fee_address,
			marketplace_fee,
			royalty_address,
			royalty_amount
		);
	}
Для аукционов:

	; 1  2    3    4      5      6      7    8      9    10     11   12   13     14   15   16   17   18   19   20
	(int, int, int, slice, slice, slice, int, slice, int, slice, int, int, slice, int, int, int, int, int, int, int) get_sale_data() method_id {
		init_data();

		var (
				mp_fee_addr,
				mp_fee_factor,
				mp_fee_base,
				royalty_fee_addr,
				royalty_fee_factor,
				royalty_fee_base
		) = get_fees();

		return (
				0x415543, ;; 1 nft aucion ("AUC")
				end?, ;; 2
				end_time, ;; 3
				mp_addr, ;; 4
				nft_addr, ;; 5
				nft_owner, ;; 6
				last_bid, ;; 7
				last_member, ;; 8
				min_step, ;; 9
				mp_fee_addr, ;; 10
				mp_fee_factor, mp_fee_base, ;; 11, 12
				royalty_fee_addr, ;; 13
				royalty_fee_factor, royalty_fee_base, ;; 14, 15
				max_bid, ;; 16
				min_bid, ;; 17
				created_at?, ;; 18
				last_bid_at, ;; 19
				is_canceled? ;; 20
		);
	}
Заметьте первые переменные, которые возвращают методы одинаковые, значит, чтобы достать информацию, какой элемент продали, нам надо будет делать одинаковый запрос для двух этих типов. Для предложений ситуация иная, там есть метод `get_offer_data()`.

	(int, int, int, int, slice, slice, slice, int, slice, int, int, slice, int, int, int) get_offer_data() method_id {
		var (
				is_complete,
				created_at, finish_at,
				marketplace_address,
				nft_address,
				offer_owner_address,
				full_price,
				fees_cell,
				can_deploy
		) = load_data();

		var (
				marketplace_fee_address,
				marketplace_factor, marketplace_base,
				royalty_address,
				royalty_factor, royalty_base
		) = load_fees(fees_cell);

		int royalty_amount = get_percent(full_price, royalty_factor, royalty_base);
		int marketplace_fee = get_percent(full_price, marketplace_factor, marketplace_base);
		int profit_price = full_price - royalty_amount - marketplace_fee;

		return (
				0x4f46464552,    ;; offer ("OFFER")
				is_complete == 1,
				created_at, finish_at,
				marketplace_address,
				nft_address,
				offer_owner_address,
				full_price,
				marketplace_fee_address,
				marketplace_factor, marketplace_base,
				royalty_address,
				royalty_factor, royalty_base,
				profit_price
		);
	}
Из данных методов мы сможем получить адрес коллекции, адрес элемента и цену по которой произшла продажа. Теперь изучив стандарты мы можем получить информацию об элементах, которые были проданы.

Выглядеть это будет следующим образом, сначала сделаем запрос в элемент `get_nft_data()` , получим индивидуальный контент ячейки и индекс элемента. Теперь идем в смарт-контракт коллекции, там нам нужен метод `get_nft_content(int index, cell individual_content)`, который и вернет нам ячейку с контентом.

## Заключение

Делать Get-запросы и доставать контент через ANDL мы умеем, осталось только научиться доставать траназакции - этим мы займемся в следующем туториале.