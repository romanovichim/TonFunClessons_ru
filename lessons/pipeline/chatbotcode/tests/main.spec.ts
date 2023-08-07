import { Cell, Address, toNano, beginCell } from "ton-core";
import { hex } from "../build/main.compiled.json";
import { Blockchain } from "@ton-community/sandbox";
import { MainContract } from "../wrappers/MainContract";
import { send } from "process";
import "@ton-community/test-utils";
import { flattenTransaction } from "@ton-community/test-utils";



describe("msg test", () => {
    it("test", async() => {
        const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];

        const blockchain = await Blockchain.create();

        const myContract = blockchain.openContract(
            await MainContract.createFromConfig({}, codeCell)
        );

        const senderWallet = await blockchain.treasury("sender");

        const sentMessageResult = await myContract.sendInternalMessage(senderWallet.getSender(),toNano("0.05"));

        expect(sentMessageResult.transactions).toHaveTransaction({
            from: senderWallet.address,
            to: myContract.address,
            success: true,
        });

        //const arr = sentMessageResult.transactions.map(tx => flattenTransaction(tx));
        
        let reply = beginCell().storeUint(0, 32).storeStringTail("reply").endCell();

        expect(sentMessageResult.transactions).toHaveTransaction({
            body: reply,
            from: myContract.address,
            to: senderWallet.address
        });

    });
});
    