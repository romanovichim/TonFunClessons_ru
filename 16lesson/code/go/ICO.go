package main

import (
	"context"
	"log"
	"fmt"
	"strings"

	"github.com/xssnick/tonutils-go/address"
	"github.com/xssnick/tonutils-go/liteclient"
	"github.com/xssnick/tonutils-go/tlb"
	"github.com/xssnick/tonutils-go/ton"
	"github.com/xssnick/tonutils-go/ton/wallet"
	
	"github.com/xssnick/tonutils-go/tvm/cell"
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

	// seed words of account, you can generate them with any wallet or using wallet.NewSeed() method
	words := strings.Split("approve auction convince remove convince prepare bus approve wine plastic convince trim prepare convince lock trim level goddess lock improve lock reduce wine bus", " ")

	w, err := wallet.FromSeed(api, words, wallet.V3)
	if err != nil {
		log.Fatalln("FromSeed err:", err.Error())
		return
	}

	log.Println("wallet address:", w.Address())

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

	if balance.NanoTON().Uint64() >= 100000000 {
	
	// ICO address 
	addr := address.MustParseAddr("EQD_yyEbNQeWbWfnOIowqNilB8wwbCg6nLxHDP3Rbey1eA72")

	fmt.Println("Let's send message")
	err = w.Send(context.Background(), &wallet.Message{
	 Mode: 3,
	 InternalMessage: &tlb.InternalMessage{
	  IHRDisabled: true,
	  Bounce:      true,
	  DstAddr:     addr,
	  Amount:      tlb.MustFromTON("1"),
	  Body:        cell.BeginCell().EndCell(),
	 },
	}, true)
	if err != nil {
	 fmt.Println(err)
	}



		// update chain info
		block, err = api.CurrentMasterchainInfo(context.Background())
		if err != nil {
			log.Fatalln("CurrentMasterchainInfo err:", err.Error())
			return
		}

		balance, err = w.GetBalance(context.Background(), block)
		if err != nil {
			log.Fatalln("GetBalance err:", err.Error())
			return
		}

		log.Println("transaction sent, balance left:", balance.TON())

		return
	}

	log.Println("not enough balance:", balance.TON())
}
