package main

import (
	"context"
	"log"
	"fmt"
	"strings"
	
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
	
	w1 := getWallet1(api)
	w2 := getWallet2(api)
	
	
	fmt.Println(w1.Address())
	fmt.Println(w1.Address())
	block, err := api.CurrentMasterchainInfo(context.Background())
	if err != nil {
		log.Fatalln("CurrentMasterchainInfo err:", err.Error())
		return
	}

	
	balance1, err := w1.GetBalance(context.Background(), block)
	if err != nil {
		log.Fatalln("GetBalance1 err:", err.Error())
		return
	}

	fmt.Println(balance1)

	balance2, err := w2.GetBalance(context.Background(), block)
	if err != nil {
		log.Fatalln("GetBalance2 err:", err.Error())
		return
	}

	fmt.Println(balance2)

}



func getWallet1(api *ton.APIClient) *wallet.Wallet {
	words := strings.Split("your Seed phrase 1", " ")
	w, err := wallet.FromSeed(api, words, wallet.V3)
	if err != nil {
		panic(err)
	}
	return w
}

func getWallet2(api *ton.APIClient) *wallet.Wallet {
	words := strings.Split("your Seed phrase 2", " ")
	w, err := wallet.FromSeed(api, words, wallet.V3)
	if err != nil {
		panic(err)
	}
	return w
}