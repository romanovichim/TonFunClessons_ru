import { Address,beginCell,Cell,Contract, contractAddress, ContractProvider, Sender, SendMode } from "ton-core";

export class MainContract implements Contract {
    constructor(
        readonly address: Address,
        readonly init?: { code: Cell, data: Cell }
    ){}

    static createFromConfig(config: any, code: Cell, workchain = 0){
        const data = beginCell().endCell();
        const init = { code,data };
        const address = contractAddress(workchain, init);

        return new MainContract(address,init);
    }

    async sendInternalMessage(
        provider: ContractProvider,
        sender: Sender,
        value: bigint
        //op: number
    ){
        //const msg_body = beginCell().storeUint(op,32).endCell();
        const msg_body = beginCell().endCell();
        await provider.internal(sender,{
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: msg_body,
        });
    }

}

