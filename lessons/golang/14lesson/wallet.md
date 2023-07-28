# Создаем кошелек и деплоим контракт с помощью GO

## Вступление

В tondev чате часто возникают вопросы про взаимодействие с TON с помощью популярных языков программирования, особенно часто встречаются вопросы про взаимодействие с NFT коллекциями и контрактами в целом. Поэтому для [ton_learn](https://t.me/ton_learn) я решил сделать 2 урока, где мы взаимодействуем с блокчейном TON с помощью некоторых скриптов, так, чтобы читатель по итогу мог легко работать со смарт-контрактами в ТОН.

Задачи следующие:
- в этом уроке мы сделаем заготовку с кошельком, которую будем использовать далее, а также разберемся как деплоить и взаимодействовать с контрактом из первого урока
- в следующем уроке будем деплоить NFT коллекцию, а также подергаем Get-методы

Для работы с TON скриптами будем использовать библиотеку для GO [tonutils-go](https://github.com/xssnick/tonutils-go). Данная библиотека имеет отличный баланс между верхнеуровневостью и низкоуровневостью, таким образом она позволяет писать простые скрипты, но в тоже время не лишает нас различных возможностей работы с блокчейном TON.

Даже если вы не знакомы с GO я уверен, что данный урок и скрипты будут вам понятны, но на всякий случай в самом конце урока есть ссылки на материалы, которые позволят вам быстро освоиться с GO.

> Хочется также отметить, что  данной библиотеки хорошая документация с примерами.

## Создаем кошелек

Кошелек необходим нам, чтобы отправлять сообщения внутри TON (те, что приходят в recv_internal()). По сути кошелек это смарт-контракт, способный принимать внешние сообщения (те, что recv_external()) и отправлять внутренние. Поэтому прежде чем переходить к деплою смарт-контракта, сначала создадим кошелек. 

### Подключаемся к сети

Кошелек в сети TON является смарт-контрактом, чтобы задеплоить смарт-контракт в тестовую или основную сеть, нам необходимо подключиться к сети, для этого нужен её конфиг:
- [конфиг тестовой сети](https://ton-blockchain.github.io/testnet-global.config.json)
- [конфиг основной сети](https://ton-blockchain.github.io/global.config.json)(mainnet)

Взаимодействовать с сетью мы будем через лайтсерверы.

> Легкий клиент (англ. lite-client) — это программное обеспечение, которое подключается к полным узлам для взаимодействия с блокчейном. Они помогают пользователям получать доступ к блокчейну и взаимодействовать с ним без необходимости синхронизации всего блокчейна.

Итак, выполним подключение:

	client := liteclient.NewConnectionPool()

	configUrl := "https://ton-blockchain.github.io/testnet-global.config.json"
	
	err := client.AddConnectionsFromConfigUrl(context.Background(), configUrl)
	if err != nil {
		panic(err)
	}
	api := ton.NewAPIClient(client)

Получаем api лайтсервера.

> Если вы посмотрите на конфиги, вы можете увидеть несколько лайтсерверов внутри, какой выбирает библиотека? - Первый с которым будет успешное соединение

### Seed фраза

Для генерации кошелька нам нужна пара публичный/приватный ключ (получать их будет с помощью Seed фразы) и структура [InitialAccountWallet](https://github.com/ton-blockchain/ton/blob/master/tl/generate/scheme/tonlib_api.tl#L60), соответствующая одному из доступных версий кошельков.

> Seed фраза - последовательность из слов используемых для генерации ключей.

Сгенерируем seed фразу c помощью `wallet.NewSeed()` и напечатаем её, чтобы можно было скопировать и использовать кошелек в будущем.

	seed := wallet.NewSeed()
	fmt.Println("Seed phrase:")
	fmt.Println(seed)

Эту фразу можно и нужно сохранить, чтобы использовать кошелек в будущем.

Генерируем кошелек и выводим адрес.

	w, err := wallet.FromSeed(api, seed, wallet.V3)
	if err != nil {
		log.Fatalln("FromSeed err:", err.Error())
		return
	}

	fmt.Println(w.Address())

Подробнее про разные версии кошельков можно прочитать [здесь](https://github.com/toncenter/tonweb/blob/master/src/contract/wallet/WalletSources.md). 

### "Активируем" кошелек

В соответствии с [документацией](https://ton-blockchain.github.io/docs/#/payment-processing/overview?id=deploying-wallet) на полученный адрес необходимо отправить Toncoin. В тестовой сети для этого есть бот https://t.me/testgiver_ton_bot . По основной сети, приложу официальную [страницу](https://ton-blockchain.github.io/buy-toncoin).

### Получаем баланс

Наш кошелек готов и чтобы получить баланс, необходимо получить текущую информацию о сети (а именно текущий блок).

	block, err := api.CurrentMasterchainInfo(context.Background())
	if err != nil {
		log.Fatalln("CurrentMasterchainInfo err:", err.Error())
		return
	}
	
И далее из блока получить баланс:

	balance, err := w.GetBalance(context.Background(), block)
	if err != nil {
		log.Fatalln("GetBalance err:", err.Error())
		return
	}

	fmt.Println(balance)

Итоговый код `createwallet.go `:

	package main

	import (
		"context"
		"log"
		"fmt"

		"github.com/xssnick/tonutils-go/liteclient"
		"github.com/xssnick/tonutils-go/ton"
		"github.com/xssnick/tonutils-go/ton/wallet"
	)

	func main() {


		client := liteclient.NewConnectionPool()

		configUrl := "https://ton-blockchain.github.io/testnet-global.config.json"


		err := client.AddConnectionsFromConfigUrl(context.Background(), configUrl)
		if err != nil {
			panic(err)
		}
		api := ton.NewAPIClient(client)

		seed := wallet.NewSeed()
		fmt.Println("Seed phrase:")
		fmt.Println(seed)

		w, err := wallet.FromSeed(api, seed, wallet.V3)
		if err != nil {
			log.Fatalln("FromSeed err:", err.Error())
			return
		}

		fmt.Println(w.Address())

		block, err := api.CurrentMasterchainInfo(context.Background())
		if err != nil {
			log.Fatalln("CurrentMasterchainInfo err:", err.Error())
			return
		}


		balance, err := w.GetBalance(context.Background(), block)
		if err != nil {
			log.Fatalln("GetBalance err:", err.Error())
			return
		}

		fmt.Println(balance)

	}

Прежде, чем двигаться дальше вынесем генерацию кошелька по сид фразе в отдельную функцию.

### Функция под кошелек

Так как у нас уже есть сид фраза, нам не надо её больше генерировать, остается только собрать кошелек. 

	func getWallet(api *ton.APIClient) *wallet.Wallet {
		words := strings.Split("write your seed phrase here", " ")
		w, err := wallet.FromSeed(api, words, wallet.V3)
		if err != nil {
			panic(err)
		}
		return w
	}
	
Пример с генерацией кошелька с подобной функцией есть в отдельном файле `walletfunc.go`.

## Деплоим смарт-контракт

### hexBoc смарт-контракта 

Теперь, когда у нас есть кошелек с балансом Toncoin на нем, мы можем деплоить смарт-контракты. В библиотеке `tonutils-go` можно деплоить смарт-контракт в форме hexBoc. Boc это сериализованная форма смарт-контракта(bag-of-cells).

Самый простой способ перевести смарт-контракт в подобную форму — это использовать fift скрипт. Возьмем fift код из первого смарт-контракта и напишем скрипт, который переведет его в hexBoc.

	"Asm.fif" include
	// automatically generated from `C:\Users\7272~1\AppData\Local\toncli\toncli\func-libs\stdlib-tests.func` `C:\Users\7272~1\Documents\chain\firsttest\wallet\func\code.func` 
	PROGRAM{
	  DECLPROC recv_internal
	  128253 DECLMETHOD get_total
	  recv_internal PROC:<{
		//  in_msg_body
		DUP	//  in_msg_body in_msg_body
		SBITS	//  in_msg_body _2
		32 LESSINT	//  in_msg_body _4
		35 THROWIF
		32 LDU	//  _24 _23
		DROP	//  n
		c4 PUSH	//  n _11
		CTOS	//  n ds
		64 LDU	//  n _26 _25
		DROP	//  n total
		SWAP	//  total n
		ADD	//  total
		NEWC	//  total _18
		64 STU	//  _20
		ENDC	//  _21
		c4 POP
	  }>
	  get_total PROC:<{
		// 
		c4 PUSH	//  _1
		CTOS	//  ds
		64 LDU	//  _8 _7
		DROP	//  total
	  }>
	}END>c

> Если вы проходили первый урок, то Fift код контракта лежит в папке fift

Теперь скрипт, который переведет код в формат hexBOC:

	#!/usr/bin/fift -s
	"TonUtil.fif" include
	"Asm.fif" include

	."first contract:" cr

	"first.fif" include
	2 boc+>B dup Bx. cr cr

Подробно останавливаться на fift не будет, это выходит, за рамки этого урока, отмечу только:
- boc+>B - сериализует в формат boc
- cr - выводит в строку значение

> Запустить скрипт можно либо с помощью знакомого нам toncli, а именно `toncli fift run` , либо как описано [здесь](https://ton-blockchain.github.io/docs/#/compile?id=fift).

Пример скрипта, находится в файле `print-hex.fif`.

По итогу мы получим:

	B5EE9C72410104010038000114FF00F4A413F4BCF2C80B0102016202030032D020D749C120F263D31F30ED44D0D33F3001A0C8CB3FC9ED540011A1E9FBDA89A1A67E61A6614973

### Подходим к деплою контракта

Берем нашу заготовку с кошельком `walletfunc.go` из неё сделаем скрипт деплоя контракта. Первое что сделаем, это добавим фукнцию`getContractCode()`, которая будет преобразовывать hexBOC полученный ранее в байты:

	func getContractCode() *cell.Cell {
		var hexBOC = "B5EE9C72410104010038000114FF00F4A413F4BCF2C80B0102016202030032D020D749C120F263D31F30ED44D0D33F3001A0C8CB3FC9ED540011A1E9FBDA89A1A67E61A6614973"
		codeCellBytes, _ := hex.DecodeString(hexBOC)

		codeCell, err := cell.FromBOC(codeCellBytes)
		if err != nil {
			panic(err)
		}

		return codeCell
	}

### Процесс деплоя смарт-контракта

Для деплоя смарт-контракта, нам необходимо сформировать `StateInit`. `StateInit` это комбинация кода смарт-контракта, который у нас уже есть и данных смарт-контракта. Данные смарт-контракта, это то, что мы хотим положить в регистр `с4`, часто туда кладется адрес владельца смарт-контракта, для управления им. Примеры вы могли видеть в 9 и 10 уроках, где в `с4` хранился владелец NFT коллекции или Jetton. В нашем примере мы можем туда положить 0 или любое число, главное 64 бит, чтобы он было 64 бит, для корректной работы логики контракта. Для данных сделаем отдельную функцию:

	func getContractData() *cell.Cell {
		data := cell.BeginCell().MustStoreUInt(2, 64).EndCell()

		return data
	}

Их StateInit благодаря хэшированию вычисляется адрес смарт-контракта. 

На полученный адрес необходимо отправить сообщение и что важно не забыть про небольшое количество TON, так как смарт-контракты должны иметь положительный баланс, чтобы иметь возможность платить за хранение и обработку своих данных в блокчейне.

Также для сообщения необходимо подготовить некоторое тело, но оно может быть и пустым в зависимости от вашей ситуации.

В `tonutils-go` вся эта логика находится внутри функции `DeployContract`, вызов её в нашем случае будет выглядеть так:

	msgBody := cell.BeginCell().MustStoreUInt(0, 64).EndCell()

	fmt.Println("Deploying NFT collection contract to net...")
	addr, err := w.DeployContract(context.Background(), tlb.MustFromTON("0.02"),
		msgBody, getContractCode(), getContractData(), true)
	if err != nil {
		panic(err)
	}

	fmt.Println("Deployed contract addr:", addr.String())

Параметр `true` указывает на необходимость "подождать" подтверждение отправки сообщения.

> Важно отметить, что так как адрес мы получаем хэширование, то задеплоить два раза один и тот же контракт с одинаковыми данными не получиться, сообщение просто придет в уже существующий контракт.

Итоговый код `deploycontract.go`:

	package main

	import (
		"context"
		"log"
		"fmt"
		"encoding/hex"
		"strings"

		"github.com/xssnick/tonutils-go/liteclient"
		"github.com/xssnick/tonutils-go/ton"
		"github.com/xssnick/tonutils-go/ton/wallet"
		"github.com/xssnick/tonutils-go/tlb"
		"github.com/xssnick/tonutils-go/tvm/cell"
	)

	func main() {


		client := liteclient.NewConnectionPool()

		configUrl := "https://ton-blockchain.github.io/testnet-global.config.json"


		err := client.AddConnectionsFromConfigUrl(context.Background(), configUrl)
		if err != nil {
			panic(err)
		}
		api := ton.NewAPIClient(client)

		w := getWallet(api)

		fmt.Println(w.Address())

		block, err := api.CurrentMasterchainInfo(context.Background())
		if err != nil {
			log.Fatalln("CurrentMasterchainInfo err:", err.Error())
			return
		}


		balance, err := w.GetBalance(context.Background(), block)
		if err != nil {
			log.Fatalln("GetBalance err:", err.Error())
			return
		}

		fmt.Println(balance)



		msgBody := cell.BeginCell().MustStoreUInt(0, 64).EndCell()

		fmt.Println("Deploying NFT collection contract to net...")
		addr, err := w.DeployContract(context.Background(), tlb.MustFromTON("0.02"),
			msgBody, getContractCode(), getContractData(), true)
		if err != nil {
			panic(err)
		}

		fmt.Println("Deployed contract addr:", addr.String())

	}


	func getWallet(api *ton.APIClient) *wallet.Wallet {
		words := strings.Split("write your seed phrase here", " ")
		w, err := wallet.FromSeed(api, words, wallet.V3)
		if err != nil {
			panic(err)
		}
		return w
	}

	func getContractCode() *cell.Cell {
		var hexBOC = "B5EE9C72410104010038000114FF00F4A413F4BCF2C80B0102016202030032D020D749C120F263D31F30ED44D0D33F3001A0C8CB3FC9ED540011A1E9FBDA89A1A67E61A6614973"
		codeCellBytes, _ := hex.DecodeString(hexBOC)

		codeCell, err := cell.FromBOC(codeCellBytes)
		if err != nil {
			panic(err)
		}

		return codeCell
	}

	func getContractData() *cell.Cell {
		data := cell.BeginCell().MustStoreUInt(2, 64).EndCell()

		return data
	}

## Отправляем сообщение

Теперь давайте протестируем наш смарт-контракт, а именно отправим сообщение, после которого контракт должен будет сложить его с числом в регистре с4 и сохранить получившееся значение. Возьмем нашу заготовку с кошельком `walletfunc.go` и в неё добавим код отправки сообщения:

	fmt.Println("Let's send message")
	err = w.Send(context.Background(), &wallet.Message{
	 Mode: 3,
	 InternalMessage: &tlb.InternalMessage{
	  IHRDisabled: true,
	  Bounce:      true,
	  DstAddr:     address.MustParseAddr("your contract address"),
	  Amount:      tlb.MustFromTON("0.05"),
	  Body:        cell.BeginCell().MustStoreUInt(11, 32).EndCell(),
	 },
	}, true)
	if err != nil {
	 fmt.Println(err)
	}

Схема сообщения все та же, что и раньше) Подробнее разобрано в 3 уроке. Отправляем мы сообщение от нашего кошелька.

## Вызываем GET метод

Теперь осталось проверить про суммировались ли значения в смарт-контракте. Для этого в tonutils-go есть RunGetMethod(), в который надо передать текущий блок, адрес смарт-контракта, метод и параметры для методы.

	fmt.Println("Get Method")
	addr := address.MustParseAddr("your contract address")

	// run get method 
	res, err := api.RunGetMethod(context.Background(), block, addr, "get_total")
	if err != nil {
		// if contract exit code != 0 it will be treated as an error too
		panic(err)
	}

	fmt.Println(res)

Важно отметить, если вы отправите сообщение и вызовите Get контракт подряд, данные могут не успеть обновиться в блокчейне и вы можете получить старое значение. Поэтому добавляем между отправкой сообщений и Get методом, получение нового блока. И [time.Sleep](https://www.geeksforgeeks.org/time-sleep-function-in-golang-with-examples/). Либо комментируем отправку сообщения и отдельно вызываем get метод).

> В TON блоки обновляются 5 секунд.

Примерный код, находится в файле `sendandget.go`

## Заключение

В следующем уроке мы будем деплоить nft коллекцию. Также хотел отметить, что у tonutil-go на их странице есть адрес для донатов.

## Дополнение по GO

Собрал здесь пару ссылок, который ускорят ваше понимает скриптов из данного урока.

### Установка GO

https://go.dev/

### Hello world на GO

https://gobyexample.com/hello-world

### Синтаксис за 15 минут

https://learnxinyminutes.com/docs/go/

### Ошибка No required module

https://codesource.io/how-to-install-github-packages-in-golang/

### Что такое context

https://gobyexample.com/context