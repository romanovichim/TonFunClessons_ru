import { Cell, beginCell, contractAddress, toNano} from "ton-core";
import { hex } from "../build/main.compiled.json";
import { TonClient } from "ton";
import { msgToStr } from "./msgToStr";
import qs from "qs";
import qrcode from "qrcode-terminal";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";


const API_URL = "https://testnet.toncenter.com/api/v2"

// axios http client // yarn add axios
async function getData(url: string): Promise<any> {
    try {
      const config: AxiosRequestConfig = {
        url: url,
        method: "get",
      };
      const response: AxiosResponse = await axios(config);
      //console.log(response)
      return response.data.result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

async function getTransactions(address: String) {
  var transactions;
  try {
    transactions = await getData(
      `${API_URL}/getTransactions?address=${address}&limit=1`
    );
  } catch (e) {
    console.error(e);
  }
  return transactions;
}


async function onchainScript() {
    const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];
    const dataCell = new Cell();

    const address = contractAddress(0,{
        code: codeCell,
        data: dataCell,
    });
    

    console.log("Address: ",address)
    
    let transactionLink =
    'https://app.tonkeeper.com/transfer/' +
    address.toString({
        testOnly: true,
    }) +
    "?" +
    qs.stringify({
        text: "Sent simple in",
        amount: toNano("0.6").toString(10),
        //bin: beginCell().storeUint(1,32).endCell().toBoc({idx: false}).toString("base64"),
    });

    console.log("Transaction link:",transactionLink);


    qrcode.generate(transactionLink, {small: true }, (qr) => {
        console.log(qr);
    });

    


    setInterval(async () => {
        const txes = await getTransactions(address.toString());
        //console.log(txes[0].out_msgs[0].message)
        //console.log(txes[0].in_msg.source)
        if(txes[0].in_msg.source === "EQCj2gVRdFS0qOZnUFXdMliONgSANYXfQUDMsjd8fbTW-RuC") {
            
            console.log("Last tx: " + new Date(txes[0].utime * 1000))
            console.log("IN from: "+ txes[0].in_msg.source+" with msg: "+ txes[0].in_msg.message)
            console.log("OUT from: "+ txes[0].out_msgs[0].source +" with msg: "+ txes[0].out_msgs[0].message)
        }

    },10000)


    /*
    const client = new TonClient({
        endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
    })

    console.log("Adress: ", address)

    const txes = await client.getTransactions(address,{
        limit: 10,
    });
    //console.log(msgToStr(txes[1].inMessage?.body!));
    console.log(txes[0].outMessages)
        */  
    



    
}

onchainScript();