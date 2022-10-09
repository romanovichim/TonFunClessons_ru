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
