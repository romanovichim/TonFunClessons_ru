package main

import (
	"context"
	"github.com/xssnick/tonutils-go/address"
	_ "github.com/xssnick/tonutils-go/tlb"
	"github.com/xssnick/tonutils-go/ton/jetton"
	_ "github.com/xssnick/tonutils-go/ton/nft"
	_ "github.com/xssnick/tonutils-go/ton/wallet"
	"log"
	_ "strings"

	"github.com/xssnick/tonutils-go/liteclient"
	"github.com/xssnick/tonutils-go/ton"
)

func main() {
	client := liteclient.NewConnectionPool()

	// connect to testnet lite server
	err := client.AddConnectionsFromConfigUrl(context.Background(), "https://ton-blockchain.github.io/testnet-global.config.json")
	if err != nil {
		panic(err)
	}

	// initialize ton api lite connection wrapper
	api := ton.NewAPIClient(client)
	
	// jetton contract address
	contract := address.MustParseAddr("EQD_yyEbNQeWbWfnOIowqNilB8wwbCg6nLxHDP3Rbey1eA72")
	master := jetton.NewJettonMasterClient(api, contract)

    // get jetton wallet for account
    ownerAddr := address.MustParseAddr("EQAIz6DspthuIkUaBZaeH7THhe7LSOXmQImH2eT97KI2Dl4z")
	tokenWallet, err := master.GetJettonWallet(context.Background(), ownerAddr)
	if err != nil {
		log.Fatal(err)
	}

	tokenBalance, err := tokenWallet.GetBalance(context.Background())
	if err != nil {
		log.Fatal(err)
	}

	log.Println("token balance:", tokenBalance.String())

}

