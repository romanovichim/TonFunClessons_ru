import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss';
import { RecoilRoot } from 'recoil';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </RecoilRoot>,
)
