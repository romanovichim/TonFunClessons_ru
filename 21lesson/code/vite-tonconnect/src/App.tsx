import React, { useEffect } from 'react';
import { AppTitle } from '../src/components/AppTitle/AppTitle';
import { AuthButton } from '../src/components/AuthButton/AuthButton';
import { connector } from '../src/connector';
import 'antd/dist/reset.css';
import './app.scss';

function App() {
  useEffect(() => {
		connector.restoreConnection();
	}, []);

  return (
    <div className="app">
      <header>
        <AppTitle />
        <AuthButton />
      </header>
      <main>
      </main>
    </div>    
  )
}

export default App
