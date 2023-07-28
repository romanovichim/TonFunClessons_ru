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
	
	seed1 := wallet.NewSeed()
	fmt.Println("Seed phrase one:")
	fmt.Println(seed1)
	
	w1, err := wallet.FromSeed(api, seed1, wallet.V3)
	if err != nil {
		log.Fatalln("FromSeed err:", err.Error())
		return
	}
	fmt.Println("Address one:")
	fmt.Println(w1.Address())

	seed2 := wallet.NewSeed()
	fmt.Println("Seed phrase two:")
	fmt.Println(seed2)
	
	w2, err := wallet.FromSeed(api, seed2, wallet.V3)
	if err != nil {
		log.Fatalln("FromSeed err:", err.Error())
		return
	}
	fmt.Println("Address two:")
	fmt.Println(w2.Address())



	block, err := api.CurrentMasterchainInfo(context.Background())
	if err != nil {
		log.Fatalln("CurrentMasterchainInfo err:", err.Error())
		return
	}

	balance1, err := w1.GetBalance(context.Background(), block)
	if err != nil {
		log.Fatalln("GetBalance err:", err.Error())
		return
	}
	fmt.Println("Balance one:")
	fmt.Println(balance1)
	
	balance2, err := w2.GetBalance(context.Background(), block)
	if err != nil {
		log.Fatalln("GetBalance err:", err.Error())
		return
	}
	fmt.Println("Balance two:")
	fmt.Println(balance2)

}