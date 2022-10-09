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
