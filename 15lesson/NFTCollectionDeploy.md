# Деплоим NFT коллекцию

## Вступление

В данном уроке мы будем деплоить NFT коллекцию с помощью библиотеки tonutils-go. Чтобы урок качественно покрывал тему деплоя NFT коллекции, мы поступим следующим образом, сначала сделаем запросы к существующий коллекции, таким образом получим примеры, что может храниться в NFT коллекции и её элементе. А потом мы создадим свою NFT коллекцию (совсем тестовую без какого-либо смысла).

Прежде чем переходить к уроку, советую посмотреть предыдущий урок, чтобы понимать, как создается кошелек и деплоятся контракты.

## Получаем информацию о Коллекции и отдельном элементе

Получение информации о коллекции, предполагает выполнение GET запросов к смарт-контракту. В данном уроке, мы будет рассматривать получение информации от смарт-контрактов, соответствующих стандартам. Урок с разбором стандарта NFT [здесь](https://github.com/romanovichim/TonFunClessons_ru/blob/main/10lesson/tenthlesson.md). Сам стандарт, можно найти [здесь](https://github.com/ton-blockchain/TIPs/issues/62).

### Какую информацию можно взять по стандарту коллекции NFT

Смарт-контракт коллекции,соответствующий стандарту, должен реализовывать Get-метод `get_collection_data()` , который вернет адрес владельца коллекции, контент коллекции, и счетчик текущих NFT в коллекции. Функция выглядит так:

	(int, cell, slice) get_collection_data() method_id {
	  var (owner_address, next_item_index, content, _, _) = load_data();
	  slice cs = content.begin_parse();
	  return (next_item_index, cs~load_ref(), owner_address);
	}

> load_data() выгружает данные из регистра c4

Если бы просто выполняли, запрос в контракт, нам бы приходилсь "парсить" слайс и прочие неприятные вещи, связанные с типами. В `tonutils-go`, есть функция `GetCollectionData` в которая позволит не заморачиваться с этим, именно её мы будем использовать далее.

Для примера возьмем какую-нибудь коллекцию с какого-нибудь маркетплейса и просто проверим информацию, которую мы получим и информацию с маркетплейса.

Адрес коллекции, который я буду использовать в этом урок:

	EQAA1yvDaDwEK5vHGOXRdtS2MbOVd1-TNy01L1S_t2HF4oLu

Судя по информации с маркетплейса в коллекции по этому адресу 13333 элементов, давайте проверим это

### Достаем информацию о NFT коллекции с помощью GO

Подключаемся к лайтсервам в основной сети:

	func main() {

		client := liteclient.NewConnectionPool()
		configUrl := "https://ton-blockchain.github.io/global.config.json"

		err := client.AddConnectionsFromConfigUrl(context.Background(), configUrl)
		if err != nil {
			panic(err)
		}

		api := ton.NewAPIClient(client)

	}

> Данная коллекция есть и в тестовой сети, так что если возьмете конфиг тестовой сети, все также будет работать

Возьмем адрес и воспользуемся функцией `GetCollectionData`, чтобы вызвать метод get_collection_data() и преобразовать данные в читаемый 

> Прежде чем вызывать `GetCollectionData` нужно установить соединеи `NewCollectionClient`

	func main() {
		client := liteclient.NewConnectionPool()
		configUrl := "https://ton-blockchain.github.io/global.config.json"

		err := client.AddConnectionsFromConfigUrl(context.Background(), configUrl)
		if err != nil {
			panic(err)
		}

		api := ton.NewAPIClient(client)

		nftColAddr := address.MustParseAddr("EQAA1yvDaDwEK5vHGOXRdtS2MbOVd1-TNy01L1S_t2HF4oLu")


		// get info about our nft's collection
		collection := nft.NewCollectionClient(api, nftColAddr)
		collectionData, err := collection.GetCollectionData(context.Background())
		if err != nil {
			panic(err)
		}
	}

Теперь в `collectionData` храниться информация об коллекции, выведем с помощью библиотеки `fmt` в консоль данные из `collectionData`.

Должно вывести следующую информацию:

	Collection addr      : EQAA1yvDaDwEK5vHGOXRdtS2MbOVd1-TNy01L1S_t2HF4oLu
		content          : http://nft.animalsredlist.com/nfts/collection.json
		owner            : EQANKN8ZnM0OzYOENTkOEg7VVgFog5fBWdCtqQro1MRmU5_2
		minted items num : 13333

Как мы можем видеть информация сходиться, также 13333 элементов в коллекции.

Итоговый код  `nftcoldata.go`:

	package main

	import (
		"context"
		"fmt"

		"github.com/xssnick/tonutils-go/address"
		"github.com/xssnick/tonutils-go/liteclient"
		"github.com/xssnick/tonutils-go/ton"
		"github.com/xssnick/tonutils-go/ton/nft"
	)

	func main() {
		client := liteclient.NewConnectionPool()
		configUrl := "https://ton-blockchain.github.io/global.config.json"

		err := client.AddConnectionsFromConfigUrl(context.Background(), configUrl)
		if err != nil {
			panic(err)
		}

		api := ton.NewAPIClient(client)

		nftColAddr := address.MustParseAddr("EQAA1yvDaDwEK5vHGOXRdtS2MbOVd1-TNy01L1S_t2HF4oLu")

		// get info about our nft's collection
		collection := nft.NewCollectionClient(api, nftColAddr)
		collectionData, err := collection.GetCollectionData(context.Background())
		if err != nil {
			panic(err)
		}

		fmt.Println("Collection addr      :", nftColAddr)
		fmt.Println("    content          :", collectionData.Content.(*nft.ContentOffchain).URI)
		fmt.Println("    owner            :", collectionData.OwnerAddress.String())
		fmt.Println("    minted items num :", collectionData.NextItemIndex)
	}
	
	
### Какую информацию можно взять по отдельному элементу NFT

Допустим мы хотим получить по адресу элемента коллекции, его контент, допустим ссылку на картинку. И вроде все должно быть просто, дергаем Get-метод и получаем информацию. НО в [соответствии со стандартом NFT в TON](https://github.com/ton-blockchain/TIPs/issues/62), таким образом мы не получим полную ссылку, а лишь часть, так называем индивидуальный контент элемента.

Чтобы получить полный контент(адрес), нужно:
- по get-методу элемента `get_nft_data()`, получим индекс элемента и индивидуальный контент, а также признак инициализации
- проверить проинициализирован ли элемент (Подробнее об этом в 10 уроке, где разбирается стандарт NFT)
- если элемент инициализирован, то по get-методу коллекции `get_nft_content(int index, cell individual_content)`, получим 
полный контент (полный адрес) по отдельному элементу

### Достаем информацию о NFT элементе с помощью GO

Адрес элемента, который я буду использовать ниже:

	UQBzmkmGYAw3qNEQYddY-FjWRPJRjg7Vv2B1Dns3FrERcaRH

Попробуем взять информацию об этом элементе NFT.

Установим соединение с лайтсерверами:

	func main() {
		client := liteclient.NewConnectionPool()
		configUrl := "https://ton-blockchain.github.io/global.config.json"

		err := client.AddConnectionsFromConfigUrl(context.Background(), configUrl)
		if err != nil {
			panic(err)
		}

		api := ton.NewAPIClient(client)

	}

Вызовем get-метод элемента `get_nft_data()` и выведем в консоль полученную информацию:

	func main() {
		client := liteclient.NewConnectionPool()
		configUrl := "https://ton-blockchain.github.io/global.config.json"

		err := client.AddConnectionsFromConfigUrl(context.Background(), configUrl)
		if err != nil {
			panic(err)
		}

		api := ton.NewAPIClient(client)


		nftAddr := address.MustParseAddr("UQBzmkmGYAw3qNEQYddY-FjWRPJRjg7Vv2B1Dns3FrERcaRH")
		item := nft.NewItemClient(api, nftAddr)

		nftData, err := item.GetNFTData(context.Background())
		if err != nil {
			panic(err)
		}

		fmt.Println("NFT addr         :", nftAddr.String())
		fmt.Println("    initialized  :", nftData.Initialized)
		fmt.Println("    owner        :", nftData.OwnerAddress.String())
		fmt.Println("    index        :", nftData.Index)
		
	}

Помимо информации, которую мы вывели у нас также есть информация о коллекции, получить мы её можем с помощью следующего кода:

		// get info about our nft's collection
		collection := nft.NewCollectionClient(api, nftData.CollectionAddress)
		
Осталось проверить инициализирован ли элемент и вызвать get-метод коллекции `get_nft_content(int index, cell individual_content)`, чтобы получить ссылку на элемент.

	// get info about our nft's collection
	collection := nft.NewCollectionClient(api, nftData.CollectionAddress)

		if nftData.Initialized {
			// get full nft's content url using collection method that will merge base url with nft's data
			nftContent, err := collection.GetNFTContent(context.Background(), nftData.Index, nftData.Content)
			if err != nil {
				panic(err)
			}
			fmt.Println("    part content :", nftData.Content.(*nft.ContentOffchain).URI)
			fmt.Println("    full content :", nftContent.(*nft.ContentOffchain).URI)
		} else {
			fmt.Println("    empty content")
		}


Итоговый код  `nftitemdata.go`:

	func main() {
		client := liteclient.NewConnectionPool()
		configUrl := "https://ton-blockchain.github.io/global.config.json"

		err := client.AddConnectionsFromConfigUrl(context.Background(), configUrl)
		if err != nil {
			panic(err)
		}

		api := ton.NewAPIClient(client)


		nftAddr := address.MustParseAddr("UQBzmkmGYAw3qNEQYddY-FjWRPJRjg7Vv2B1Dns3FrERcaRH")
		item := nft.NewItemClient(api, nftAddr)

		nftData, err := item.GetNFTData(context.Background())
		if err != nil {
			panic(err)
		}

		fmt.Println("NFT addr         :", nftAddr.String())
		fmt.Println("    initialized  :", nftData.Initialized)
		fmt.Println("    owner        :", nftData.OwnerAddress.String())
		fmt.Println("    index        :", nftData.Index)

		// get info about our nft's collection
		collection := nft.NewCollectionClient(api, nftData.CollectionAddress)

		if nftData.Initialized {
			// get full nft's content url using collection method that will merge base url with nft's data
			nftContent, err := collection.GetNFTContent(context.Background(), nftData.Index, nftData.Content)
			if err != nil {
				panic(err)
			}
			fmt.Println("    part content :", nftData.Content.(*nft.ContentOffchain).URI)
			fmt.Println("    full content :", nftContent.(*nft.ContentOffchain).URI)
		} else {
			fmt.Println("    empty content")
		}
	}

По итогу должны получить следующий элемент: https://nft.animalsredlist.com/nfts/11030.json

## Деплоим смарт-контракт коллекции

После того как мы научились смотреть информацию о чужих коллекциях и элементах, попробуем задеплоить свою коллекцию и элемент в тестовой сети. Прежде чем двигаться дальше, советую пройти предыдущий урок, так как останавливаться на том как создать кошелек, создать hexBOC форму контракта и деплоить контракт в тестовую сеть здесь я разбирать не буду.

Разберем, что нужно для деплоя коллекции. Первое, что нам необходимо это hеxBOC представление контракта, второе это начальные данные для регистра  `с4`.

Начнём со второго, по стандарту определим данные, которые нужно положить в `с4`. Удобно посмотреть на функцию загружающую данные из примера [контракта коллекции](https://github.com/ton-blockchain/token-contract/blob/main/nft/nft-collection.fc).

	(slice, int, cell, cell, cell) load_data() inline {
	  var ds = get_data().begin_parse();
	  return 
		(ds~load_msg_addr(), ;; owner_address
		 ds~load_uint(64), ;; next_item_index
		 ds~load_ref(), ;; content
		 ds~load_ref(), ;; nft_item_code
		 ds~load_ref()  ;; royalty_params
		 );
	}

Адресом владельца пускай будет адрес кошелька, который мы будем использовать для деплоя, поэтому адрес передадим в функцию в качестве аругмента:

	func getContractData(collectionOwnerAddr, royaltyAddr *address.Address) *cell.Cell {

	}

Также необходимо передать адрес под роялти, который мы будем передавать в параметрах роялти. В данном примере мы не будем устанавливать какие-либо значения роялти и поэтому передадим нули. (Про параметры рояли можно почитать [здесь](https://github.com/ton-blockchain/TEPs/blob/afb3b967db3cf693f1b667f771150056d53944d5/text/0066-nft-royalty-standard.md)) 


	func getContractData(collectionOwnerAddr, royaltyAddr *address.Address) *cell.Cell {

		royalty := cell.BeginCell().
			MustStoreUInt(0, 16).
			MustStoreUInt(0, 16).
			MustStoreAddr(royaltyAddr).
			EndCell()

	}

Теперь соберем часть с контентом, он подразделяется на две ячейки `collection_content` и `common_content` в соответствии со стандартом:

	func getContractData(collectionOwnerAddr, royaltyAddr *address.Address) *cell.Cell {
		royalty := cell.BeginCell().
			MustStoreUInt(0, 16).
			MustStoreUInt(0, 16).
			MustStoreAddr(royaltyAddr).
			EndCell()

		collectionContent := nft.ContentOffchain{URI: "https://tonutils.com"}
		collectionContentCell, _ := collectionContent.ContentCell()

		commonContent := nft.ContentOffchain{URI: "https://tonutils.com/nft/"}
		commonContentCell, _ := commonContent.ContentCell()

		contentRef := cell.BeginCell().
			MustStoreRef(collectionContentCell).
			MustStoreRef(commonContentCell).
			EndCell()

	}

Индекс будет равный нулю, а для кода создадим отдельную функцию `getNFTItemCode()`, которая просто будет хранить код контракта отдельного элемента в формате hexBOC. По итогу получаем:

	func getContractData(collectionOwnerAddr, royaltyAddr *address.Address) *cell.Cell {

		royalty := cell.BeginCell().
			MustStoreUInt(0, 16).
			MustStoreUInt(0, 16).
			MustStoreAddr(royaltyAddr).
			EndCell()

		collectionContent := nft.ContentOffchain{URI: "https://tonutils.com"}
		collectionContentCell, _ := collectionContent.ContentCell()

		commonContent := nft.ContentOffchain{URI: "https://tonutils.com/nft/"}
		commonContentCell, _ := commonContent.ContentCell()

		contentRef := cell.BeginCell().
			MustStoreRef(collectionContentCell).
			MustStoreRef(commonContentCell).
			EndCell()

		data := cell.BeginCell().MustStoreAddr(collectionOwnerAddr).
			MustStoreUInt(0, 64).
			MustStoreRef(contentRef).
			MustStoreRef(getNFTItemCode()).
			MustStoreRef(royalty).
			EndCell()

		return data
	}

Остается только задеплоить контракт:

	addr, err := w.DeployContract(context.Background(), tlb.MustFromTON("0.02"),
		msgBody, getNFTCollectionCode(), getContractData(w.Address(), nil), true)
	if err != nil {
		panic(err)
	}

Полный код [здесь](https://github.com/xssnick/tonutils-go/blob/master/example/deploy-nft-collection/main.go).

## Минт элемента в коллекцию

Добавление элемента в коллекцию называется mint. Если посмотреть на [пример контракта коллекции](https://github.com/ton-blockchain/token-contract/blob/main/nft/nft-collection.fc), то можно увидеть, что для минта нового элемента NFT, нужно отправить internal сообщение.

Соответственно:
- Вызовем get-метод коллекции `get_collection_data()`, чтобы получить нужный нам индекс для минта
- Вызовем get-метод коллекции `get_nft_address_by_index(int index)`, чтобы получить адрес NFT элемента
- Соберем полезную нагрузку (Индекс элемента, адрес кошелька, небольшой кол-во TON для , контент)
- Отправим сообщение на адрес смарт-контракта коллекции с нашей полезной нагрузкой

Начнем, подключаемся к лайтсерверам:

	func main() {
		client := liteclient.NewConnectionPool()

		// connect to mainnet lite server
		err := client.AddConnection(context.Background(), "135.181.140.212:13206", "K0t3+IWLOXHYMvMcrGZDPs+pn58a17LFbnXoQkKc2xw=")
		if err != nil {
			panic(err)
		}

		// initialize ton api lite connection wrapper
		api := ton.NewAPIClient(client)

	}

"Собираем" кошелек, и делаем вызов `get_collection_data()` для получения индекса:

	func main() {
		client := liteclient.NewConnectionPool()

		// connect to mainnet lite server
		err := client.AddConnection(context.Background(), "135.181.140.212:13206", "K0t3+IWLOXHYMvMcrGZDPs+pn58a17LFbnXoQkKc2xw=")
		if err != nil {
			panic(err)
		}

		// initialize ton api lite connection wrapper
		api := ton.NewAPIClient(client)
		w := getWallet(api)

		collectionAddr := address.MustParseAddr("EQCSrRIKVEBaRd8aQfsOaNq3C4FVZGY5Oka55A5oFMVEs0lY")
		collection := nft.NewCollectionClient(api, collectionAddr)

		collectionData, err := collection.GetCollectionData(context.Background())
		if err != nil {
			panic(err)
		}
	}

> Важно использовать кошелек, адрес, которого мы положили в `c4` при деплое контракта коллекции иначе при минте, будет возникать ошибка, так как в контракте есть проверка адреса с которого можно минтить (Выглядит так: `throw_unless(401, equal_slices(sender_address, owner_address));`).

Теперь получим адрес элемента вызывав get-метод коллекции `get_nft_address_by_index(int index)`, чтобы получить адрес NFT элемента и приготовим полезную нагрузку:

	func main() {
		client := liteclient.NewConnectionPool()

		// connect to mainnet lite server
		err := client.AddConnection(context.Background(), "135.181.140.212:13206", "K0t3+IWLOXHYMvMcrGZDPs+pn58a17LFbnXoQkKc2xw=")
		if err != nil {
			panic(err)
		}

		// initialize ton api lite connection wrapper
		api := ton.NewAPIClient(client)
		w := getWallet(api)

		collectionAddr := address.MustParseAddr("EQCSrRIKVEBaRd8aQfsOaNq3C4FVZGY5Oka55A5oFMVEs0lY")
		collection := nft.NewCollectionClient(api, collectionAddr)

		collectionData, err := collection.GetCollectionData(context.Background())
		if err != nil {
			panic(err)
		}

		nftAddr, err := collection.GetNFTAddressByIndex(context.Background(), collectionData.NextItemIndex)
		if err != nil {
			panic(err)
		}

		mintData, err := collection.BuildMintPayload(collectionData.NextItemIndex, w.Address(), tlb.MustFromTON("0.01"), &nft.ContentOffchain{
			URI: fmt.Sprint(collectionData.NextItemIndex) + ".json",
		})
		if err != nil {
			panic(err)
		}
	}

Осталось дело за малым, отправить сообщение от кошелька в смарт-контракт коллекции и вывести данные о нашем элементе (проверим, что все прошло правильно, вызвав get-метод `get_nft_data()` - посмотрим правильная ли информация приходит).

	func main() {
		client := liteclient.NewConnectionPool()

		// connect to mainnet lite server
		err := client.AddConnection(context.Background(), "135.181.140.212:13206", "K0t3+IWLOXHYMvMcrGZDPs+pn58a17LFbnXoQkKc2xw=")
		if err != nil {
			panic(err)
		}

		// initialize ton api lite connection wrapper
		api := ton.NewAPIClient(client)
		w := getWallet(api)

		collectionAddr := address.MustParseAddr("EQCSrRIKVEBaRd8aQfsOaNq3C4FVZGY5Oka55A5oFMVEs0lY")
		collection := nft.NewCollectionClient(api, collectionAddr)

		collectionData, err := collection.GetCollectionData(context.Background())
		if err != nil {
			panic(err)
		}

		nftAddr, err := collection.GetNFTAddressByIndex(context.Background(), collectionData.NextItemIndex)
		if err != nil {
			panic(err)
		}

		mintData, err := collection.BuildMintPayload(collectionData.NextItemIndex, w.Address(), tlb.MustFromTON("0.01"), &nft.ContentOffchain{
			URI: fmt.Sprint(collectionData.NextItemIndex) + ".json",
		})
		if err != nil {
			panic(err)
		}

		fmt.Println("Minting NFT...")
		mint := wallet.SimpleMessage(collectionAddr, tlb.MustFromTON("0.025"), mintData)

		err = w.Send(context.Background(), mint, true)
		if err != nil {
			panic(err)
		}

		fmt.Println("Minted NFT:", nftAddr.String(), 0)

		newData, err := nft.NewItemClient(api, nftAddr).GetNFTData(context.Background())
		if err != nil {
			panic(err)
		}

		fmt.Println("Minted NFT addr: ", nftAddr.String())
		fmt.Println("NFT Owner:", newData.OwnerAddress.String())
	}

Полный код [здесь](https://github.com/xssnick/tonutils-go/blob/master/example/nft-mint/main.go).

## Задание

Задеплойте свою коллекцию и создайте элемент NFT в тестовой сети, после попробуйте взять информацию о коллекции и элементе, скриптами из начала урока.

## Заключение

Новые уроки публикую [сюда](https://t.me/ton_learn), на [главной странице](https://github.com/romanovichim/TonFunClessons_ru) есть адрес для донатов, если вдруг вы хотите помочь выпускам новых уроков. Отдельно хочу поблагодарить разработчиков https://github.com/xssnick/tonutils-go , которые делают большое дело.
