# Ton Connect React ui отправка траназакции

В предыдущей части мы сделали простой сайт с авторизацией через TonConnect, давайте добавим функционал отправки транзакции.

## Приступим

Чтобы отправить транзакцию через tonConnectUI, нужно воспользоваться методом sendTransaction и вроде на этом можно было бы туториал и заканчивать:

	const transaction = {
		validUntil: Date.now() + 1000000,
		messages: [
			{
				address: "0:412410771DA82CBA306A55FA9E0D43C9D245E38133CB58F1457DFB8D5CD8892F",
				amount: "20000000",
				stateInit: "base64bocblahblahblah==" // just for instance. Replace with your transaction initState or remove
			},
			{
				address: "0:E69F10CC84877ABF539F83F879291E5CA169451BA7BCE91A37A5CED3AB8080D3",
				amount: "60000000",
				payload: "base64bocblahblahblah==" // just for instance. Replace with your transaction payload or remove
			}
		]
	}

	try {
		const result = await tonConnectUI.sendTransaction(transaction);

		// you can use signed boc to find the transaction 
		const someTxData = await myAppExplorerService.getTransaction(result.boc);
		alert('Transaction was sent successfully', someTxData);
	} catch (e) {
		console.error(e);
	}
	
Но на практике задача, отправки транзакции шире:
- транзакцию надо отправлять в контракт, данные о нем
- транзакций много, нужен некоторая удобная абстракция для отправки
- с транзакцией нужно отправлять payload, который нужно определять удобным образом

Для примера в данном туториале мы будем использовать контракт из предыдущего урока. TBD ссылка на него

## Используем обёртку

Создаем в `src` папку контракт и файл `ContractWrapper.ts` в него копируем обертку из предыдущего урока.

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
			value: bigint,
		){
			await provider.internal(sender,{
				value,
				sendMode: SendMode.PAY_GAS_SEPARATELY,
				body: beginCell().endCell(),
			});
		}

		async getData(provider: ContractProvider) {
			const { stack } = await provider.get("get_sender", []);
			return {
				recent_sender: stack.readAddress(),
				number: stack.readNumber(),
			};
		}

	}

Создадим папку для кастомных хуков `hooks` и создадим в ней первый кастомный хук `useInit` в файле `useInit.ts`:

	import {useEffect, useState} from 'react';

	export function useInit<T>(

	){

	}

В него добавим верхнеуровневую логику обработки состояния инициализации контракта:

	import {useEffect, useState} from 'react';

	export function useInit<T>(
	  func: () => Promise<T>,
	  deps: any[] = []
	){
	  const [state, setState] = useState<T | undefined>();
	  useEffect(()=>{
		(async () => {
			setState(await func());
		})();
	  },deps);


	  return state;
	}
	
Чтобы получать данные из блокчейна нужна точка подключения, воспользуемся для простоты в данном случае api toncenter, сделаем это в отдельном хуке `useTonClient.ts`

	import { TonClient } from "ton";
	import { useInit } from "./useInit";

	export function useTonClient() {
		return useInit(
			async () =>
				new TonClient({
					endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
				})
		);
	}

Наконец-то переходим к хуку, который будет взаимодействовать с нашим контрактом, создаем `useContractWrapper.ts` и сразу же импортируем туда созданные нами хуки и некоторые доп функции из уже установленных нами бибилиотек.

	import {useEffect, useState} from 'react';
	import { Address, OpenedContract} from 'ton-core';
	import { useInit } from './useInit';
	import { MainContract } from '../contracts/ContractWrapper';
	import { useTonClient } from './useTonClient';

	export function useContractWrapper() {

	}

Для работы с контрактом нужно подключение, создадим его с помощью хука useTonClient() и также опишем данные контракта:

	import {useEffect, useState} from 'react';
	import { Address, OpenedContract} from 'ton-core';
	import { useInit } from './useInit';
	import { MainContract } from '../contracts/ContractWrapper';
	import { useTonClient } from './useTonClient';

	export function useContractWrapper() {
		const client = useTonClient();

		const [contractData, setContractData] = useState<null | {
			recent_sender: Address;
			number: number;
		}>();

	}

Открываем контракт и достаем данные Get методом

	import {useEffect, useState} from 'react';
	import { Address, OpenedContract} from 'ton-core';
	import { useInit } from './useInit';
	import { MainContract } from '../contracts/ContractWrapper';
	import { useTonClient } from './useTonClient';

	export function useContractWrapper() {
		const client = useTonClient();

		const [contractData, setContractData] = useState<null | {
			recent_sender: Address;
			number: number;
		}>();

		const mainContract = useInit( async () => {
			if (!client) return;
			const contract = new MainContract(
				Address.parse("kQACwi82x8jaITAtniyEzho5_H1gamQ1xQ20As_1fboIfJ4h")
			);
			return client.open(contract) as OpenedContract<MainContract>;
		},[client]);

		useEffect( () => {
			async function getValue() {
				if(!mainContract) return;
				setContractData(null);
				const instack = await mainContract.getData();
				setContractData({
					recent_sender: instack.recent_sender,
					number: instack.number,
				});
			}
			getValue();
		}, [mainContract]);

	}


Остается только вернуть данные контракта и его адрес:


	import {useEffect, useState} from 'react';
	import { Address, OpenedContract} from 'ton-core';
	import { useInit } from './useInit';
	import { MainContract } from '../contracts/ContractWrapper';
	import { useTonClient } from './useTonClient';

	export function useContractWrapper() {
		const client = useTonClient();

		const [contractData, setContractData] = useState<null | {
			recent_sender: Address;
			number: number;
		}>();

		const mainContract = useInit( async () => {
			if (!client) return;
			const contract = new MainContract(
				Address.parse("kQACwi82x8jaITAtniyEzho5_H1gamQ1xQ20As_1fboIfJ4h")
			);
			return client.open(contract) as OpenedContract<MainContract>;
		},[client]);

		useEffect( () => {
			async function getValue() {
				if(!mainContract) return;
				setContractData(null);
				const instack = await mainContract.getData();
				setContractData({
					recent_sender: instack.recent_sender,
					number: instack.number,
				});
			}
			getValue();
		}, [mainContract]);

		return {
			contract_address: mainContract?.address.toString(),
			...contractData,
		};
	}

Теперь идем в  файл `App.ts` и импортируем хук `useContractWrapper`

	import './App.css'
	import { TonConnectButton } from '@tonconnect/ui-react'
	import { useContractWrapper } from './hooks/useContractWrapper'

	function App() {
	  return (
		<>
		  <TonConnectButton/>
		</>

	  )
	}

	export default App;


Вызовем хук и выведем информацию, не забыв привести адрес отправителя к строке.

	import './App.css'
	import { TonConnectButton } from '@tonconnect/ui-react'
	import { useContractWrapper } from './hooks/useContractWrapper'

	function App() {
	  const {
		recent_sender,
		number,
		contract_address,
	  } = useContractWrapper();

	  return (
		<>
		  <TonConnectButton/>
		  <div>
		  <b>Contract Address:</b>
		  <div>{contract_address}</div>
		  <b>Last Sender Address</b>
		  <div>{recent_sender?.toString()}</div>
		  <b>Check num</b>
		  <div>{number}</div>
		  </div>
		</>

	  )
	}

	export default App;

Запустите приложение с помощью команды `yarn dev`. Убедитесь, что вы видите данные смарт-контракта. 

## Отправляем траназакцию 

Предположим, что вы делаете приложение с большим количество транзакций в разные контракты, в таком случае было бы удобно сделать один хук для отправки транзакций, в который просто прокидывались бы параметры. Несмотря на то, что наш пример простой мы так и сделаем, создаем хук `useConnection.ts`:

	import { useTonConnectUI } from "@tonconnect/ui-react";
	import { Sender, SenderArguments} from "ton-core";

	export function useConnection(): {} {
		const [useTonConnectUI] = useTonConnectUI();


	}

Он будет предполагать вызов с аргументами для транзакции и возвращать объект sender(отправка траназакции) и connected(подключен ли кошелек пользователя - 
то для удобства формирования логики ui).

import { useTonConnectUI } from "@tonconnect/ui-react";
import { Sender, SenderArguments} from "ton-core";

export function useConnection(): { sender: Sender; connected: boolean} {
    const [TonConnectUI] = useTonConnectUI();

    return {
        sender: {
          send: async (args: SenderArguments) => {
            TonConnectUI.sendTransaction({
              messages: [
                {
                  address: args.to.toString(),
                  amount: args.value.toString(),
                  payload: args.body?.toBoc().toString("base64"),
                },
              ],
              validUntil: Date.now() + 6 * 60 * 1000, 
            });
          },
        },
        connected: TonConnectUI.connected,
      };

}

Поле validUntil необходимо для безопастности, чтобы при перехвате соединения, кто-нибудь не смог его отправить повторно.

Теперь нужно доработать хук `useContractWrapper.ts`, для отправки транзакции, а также обновления информации, каждые 5 секунд (время обновления блокчейна TON).

Импортируем useConnection.ts и воспользуемся им:

	import {useEffect, useState} from 'react';
	import { Address, OpenedContract} from 'ton-core';
	import { useInit } from './useInit';
	import { MainContract } from '../contracts/ContractWrapper';
	import { useTonClient } from './useTonClient';
	import { useConnection } from './useConnection';

	export function useContractWrapper() {
		const client = useTonClient();
		const connection = useConnection();

		const [contractData, setContractData] = useState<null | {
			recent_sender: Address;
			number: number;
		}>();

		const mainContract = useInit( async () => {
			if (!client) return;
			const contract = new MainContract(
				Address.parse("kQACwi82x8jaITAtniyEzho5_H1gamQ1xQ20As_1fboIfJ4h")
			);
			return client.open(contract) as OpenedContract<MainContract>;
		},[client]);

		useEffect( () => {
			async function getValue() {
				if(!mainContract) return;
				setContractData(null);
				const instack = await mainContract.getData();
				setContractData({
					recent_sender: instack.recent_sender,
					number: instack.number,
				});
			}
			getValue();
		}, [mainContract]);

		return {
			contract_address: mainContract?.address.toString(),
			...contractData,
		};
	}

Чтобы обновление происходило каждые 5 секунд, добавим функцию `sleep()` и добавим её и получение данных из Get-метода в хук `useEffect`:

	import {useEffect, useState} from 'react';
	import { Address, OpenedContract} from 'ton-core';
	import { useInit } from './useInit';
	import { MainContract } from '../contracts/ContractWrapper';
	import { useTonClient } from './useTonClient';
	import { useConnection } from './useConnection';

	export function useContractWrapper() {
		const client = useTonClient();
		const connection = useConnection();

		const sleep =(time: number) =>
			new Promise((resolve) => setTimeout(resolve, time));


		const [contractData, setContractData] = useState<null | {
			recent_sender: Address;
			number: number;
		}>();

		const mainContract = useInit( async () => {
			if (!client) return;
			const contract = new MainContract(
				Address.parse("kQACwi82x8jaITAtniyEzho5_H1gamQ1xQ20As_1fboIfJ4h")
			);
			return client.open(contract) as OpenedContract<MainContract>;
		},[client]);

		useEffect( () => {
			async function getValue() {
				if(!mainContract) return;
				setContractData(null);
				const instack = await mainContract.getData();
				setContractData({
					recent_sender: instack.recent_sender,
					number: instack.number,
				});
				await sleep(5000);
				getValue();
			}
			getValue();
		}, [mainContract]);

		return {
			contract_address: mainContract?.address.toString(),
			...contractData,
		};
	}
	
Осталось добавить функцию отправки внутреннего сообщения в `return`.

	import {useEffect, useState} from 'react';
	import { Address, OpenedContract, toNano} from 'ton-core';
	import { useInit } from './useInit';
	import { MainContract } from '../contracts/ContractWrapper';
	import { useTonClient } from './useTonClient';
	import { useConnection } from './useConnection';

	export function useContractWrapper() {
		const client = useTonClient();
		const connection = useConnection();

		const sleep =(time: number) =>
			new Promise((resolve) => setTimeout(resolve, time));


		const [contractData, setContractData] = useState<null | {
			recent_sender: Address;
			number: number;
		}>();

		const mainContract = useInit( async () => {
			if (!client) return;
			const contract = new MainContract(
				Address.parse("kQACwi82x8jaITAtniyEzho5_H1gamQ1xQ20As_1fboIfJ4h")
			);
			return client.open(contract) as OpenedContract<MainContract>;
		},[client]);

		useEffect( () => {
			async function getValue() {
				if(!mainContract) return;
				setContractData(null);
				const instack = await mainContract.getData();
				setContractData({
					recent_sender: instack.recent_sender,
					number: instack.number,
				});
				await sleep(5000);
				getValue();
			}
			getValue();
		}, [mainContract]);

		return {
			contract_address: mainContract?.address.toString(),
			...contractData,
			sendInternalMessage: () => {
				return mainContract?.sendInternalMessage(connection.sender, toNano("0.05"));
			}
		};
	}

Добавим отправку траназакции на UI, переходим в файл `App.tsx` и добавляем соединение:

	import './App.css'
	import { TonConnectButton } from '@tonconnect/ui-react'
	import { useContractWrapper } from './hooks/useContractWrapper'
	import { useConnection } from './hooks/useConnection';

	function App() {
	  const {
		recent_sender,
		number,
		contract_address,
	  } = useContractWrapper();

	  const { connected } = useConnection();


	  return (
		<>
		  <TonConnectButton/>
		  <div>
		  <b>Contract Address:</b>
		  <div>{contract_address}</div>
		  <b>Last Sender Address</b>
		  <div>{recent_sender?.toString()}</div>
		  <b>Check num</b>
		  <div>{number}</div>
		  </div>
		</>

	  )
	}

	export default App;

Соединение будет позволять отображать ссылку на отправку траназакции:

	import './App.css'
	import { TonConnectButton } from '@tonconnect/ui-react'
	import { useContractWrapper } from './hooks/useContractWrapper'
	import { useConnection } from './hooks/useConnection';

	function App() {
	  const {
		recent_sender,
		number,
		contract_address,
		sendInternalMessage,
	  } = useContractWrapper();

	  const { connected } = useConnection();


	  return (
		<>
		  <TonConnectButton/>
		  <div>
		  <b>Contract Address:</b>
		  <div>{contract_address}</div>
		  <b>Last Sender Address</b>
		  <div>{recent_sender?.toString()}</div>
		  <b>Check num</b>
		  <div>{number}</div>

		  {connected && (
			<a
			  onClick={()=>{
				sendInternalMessage();
			  }}
			>
			  Send internal Message
			</a>
		  )}


		  </div>
		</>

	  )
	}

	export default App;

Проверим отправку траназакции - `yarn dev`


## Заключение 

Подобные туториалы и разборы по сети TON я пишу в свой канал - https://t.me/ton_learn . Буду рад вашей подписке.


