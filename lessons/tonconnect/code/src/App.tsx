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
