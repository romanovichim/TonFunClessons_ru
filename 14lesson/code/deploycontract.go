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
	words := strings.Split("kick file message hint snack avoid fade avoid liquid damage nut file wish install tobacco avoid liquid wrist damage ribbon file hurt message wrist", " ")
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