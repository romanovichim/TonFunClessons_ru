package main

import (
	"context"
	"log"
	"fmt"
	"strings"
	
	"github.com/xssnick/tonutils-go/liteclient"
	"github.com/xssnick/tonutils-go/ton"
	"github.com/xssnick/tonutils-go/ton/wallet"
	_ "github.com/xssnick/tonutils-go/tlb"
	_ "github.com/xssnick/tonutils-go/tvm/cell"
	"github.com/xssnick/tonutils-go/address"
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
	
	
	/*
	fmt.Println("Let's send message")
	err = w.Send(context.Background(), &wallet.Message{
	 Mode: 3,
	 InternalMessage: &tlb.InternalMessage{
	  IHRDisabled: true,
	  Bounce:      true,
	  DstAddr:     address.MustParseAddr("EQDMDW_yieAzov6kuUgDGnho0Q6p6lfwylwPs3hIR4PA-VsR"),
	  Amount:      tlb.MustFromTON("0.05"),
	  Body:        cell.BeginCell().MustStoreUInt(11, 32).EndCell(),
	 },
	}, true)
	if err != nil {
	 fmt.Println(err)
	}
	*/
	
	block, err := api.CurrentMasterchainInfo(context.Background())
	if err != nil {
		log.Fatalln("CurrentMasterchainInfo err:", err.Error())
		return
	}
	
	fmt.Println("Get Method")
	addr := address.MustParseAddr("EQDMDW_yieAzov6kuUgDGnho0Q6p6lfwylwPs3hIR4PA-VsR")

	// run get method 
	res, err := api.RunGetMethod(context.Background(), block, addr, "get_total")
	if err != nil {
		// if contract exit code != 0 it will be treated as an error too
		panic(err)
	}

	fmt.Println(res)


}



func getWallet(api *ton.APIClient) *wallet.Wallet {
	words := strings.Split("kick file message hint snack avoid fade avoid liquid damage nut file wish install tobacco avoid liquid wrist damage ribbon file hurt message wrist", " ")
	w, err := wallet.FromSeed(api, words, wallet.V3)
	if err != nil {
		panic(err)
	}
	return w
}

