# Ton Connect React ui кнопка авторизации

TonConnect UI React — это набор пользовательского интерфейса React для TonConnect SDK. Используйте его для подключения вашего приложения к кошелькам TON через протокол TonConnect в приложениях React.

Использование TonConnect UI React, позволит вам быстро создавать авторизацию и приложения на TON.

### Tonkeeper

Для того, чтобы воспользоваться, нужен кошелек на TON, ссылка на TONkeeper: https://tonkeeper.com/

## Устанавливаем зависимости

Make a folder for your project and go into it.

	// Windows example
	mkdir tcon_folder
	cd tcon_folder
	
Прежде чем начать, в вашей системе должны быть установлены `Node` и `yarn`. В нашем туториале будем использовать `vite` - инструмент настройки среды разработки. С помощью него бы сразу сделаем шаблон приложения:

	yarn create vite react_ui_connect --template react-ts

Перейдем в папку с проектом:

	cd react_ui_connect
	
Установим "базовые" зависимости:

	yarn
	
Для работы с TON нам понадобяться:

	yarn add ton ton-core ton-crypto
	
Если прямо сейчас вызвать библиотеки ton(например преобразовать адрес и вывести его пользователю), то вы увидите ошибку Buffer is not defined. Чтобы обойти эту проблему, установим:

	yarn add vite-plugin-node-polyfills

Нужно это, чтобы решить polyfill проблему, также для её решения надо настроить конфиг `vite`. Открываем `vite.config.ts` и видим настройки шаблона:

	import { defineConfig } from 'vite'
	import react from '@vitejs/plugin-react'

	// https://vitejs.dev/config/
	export default defineConfig({
	  plugins: [react()],
	})

Добавим в неё `vite-plugin-node-polyfills`:

	import { defineConfig } from 'vite'
	import react from '@vitejs/plugin-react'
	import { nodePolyfills } from "vite-plugin-node-polyfills";

	// https://vitejs.dev/config/
	export default defineConfig({
	  plugins: [react(),nodePolyfills()],
	})

Осталось установить `TON Connect react-ui`:

	yarn add @tonconnect/ui-react

## Манифест

Когда пользователь подключается к приложению, через `TON Connect`, кошелек показывает пользователю информацию о подключении - куда подключается пользователь. Чтобы передать эту информацию от приложения в `TON Connect` нужно сделать файл манифест, который мы будем передавать при создании подключения, между нашим приложением и кошельком.

Параметры или по-другому метаданные имеют следующие поля:

{
  "url": "<app-url>",                        // required
  "name": "<app-name>",                      // required
  "iconUrl": "<app-icon-url>",               // required
  "termsOfUseUrl": "<terms-of-use-url>",     // optional
  "privacyPolicyUrl": "<privacy-policy-url>" // optional
}

Хорошей практикой является размещение манифеста c метаданными в корне вашего приложения, но можно расположить и на гитхабе.

Для примера возьмем ссылку на гитхаб из репозитория с примером:

	const manifestUrl = 'https://gist.githubusercontent.com/siandreev/75f1a2ccf2f3b4e2771f6089aeb06d7f/raw/d4986344010ec7a2d1cc8a2a9baa57de37aaccb8/gistfile1.txt';

Когда у нас готов манифест, можно переходить к соединению.

## Соединение

Открываем файл `src\main.tsx` и импортируем в него `TonConnectUIProvider`: 

	import React from 'react'
	import ReactDOM from 'react-dom/client'
	import App from './App.tsx'
	import './index.css'
	import {TonConnectUIProvider} from "@tonconnect/ui-react"

	ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	  <React.StrictMode>
		<App />
	  </React.StrictMode>,
	)

Добавим манифест:

	import React from 'react'
	import ReactDOM from 'react-dom/client'
	import App from './App.tsx'
	import './index.css'
	import {TonConnectUIProvider} from "@tonconnect/ui-react"

	const manifestUrl = 'https://gist.githubusercontent.com/siandreev/75f1a2ccf2f3b4e2771f6089aeb06d7f/raw/d4986344010ec7a2d1cc8a2a9baa57de37aaccb8/gistfile1.txt';

	ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	  <React.StrictMode>
		<App />
	  </React.StrictMode>,
	)

Чтобы создать подключение, нужно обернуть наше приложение в `TonConnectUIProvider`, выглядеть это может так:

	//import React from 'react'
	import ReactDOM from 'react-dom/client'
	import App from './App.tsx'
	import './index.css'
	import {TonConnectUIProvider} from "@tonconnect/ui-react"

	const manifestUrl = 'https://gist.githubusercontent.com/siandreev/75f1a2ccf2f3b4e2771f6089aeb06d7f/raw/d4986344010ec7a2d1cc8a2a9baa57de37aaccb8/gistfile1.txt';

	ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	  <TonConnectUIProvider manifestUrl={manifestUrl}>
		<App />
	  </TonConnectUIProvider>
	)

Теперь у нас есть подключение, его мы будем использовать для кнопки авторизации.

## Кнопка авторизации

Переходим в файл `App.tsx` и удаляем все лишнее внутри первого `div` и удалим лишне лого из импорта:

	import { useState } from 'react'
	import './App.css'

	function App() {
	  const [count, setCount] = useState(0)

	  return (
		<>
		</>
	  )
	}

	export default App

Для создания кнопки авторизации будем использовать `TonConnect Button`. `TonConnect Button` is universal UI component for initializing connection. After wallet is connected it transforms to a wallet menu. Импортируем компонент:

	import { useState } from 'react'
	import './App.css'
	import { TonConnectButton } from '@tonconnect/ui-react'


	function App() {
	  const [count, setCount] = useState(0)

	  return (
		<>

		</>
	  )
	}

	export default App

Так как это компонент, мы можем просто вызвать его внутри функции:

	import { useState } from 'react'
	import './App.css'
	import { TonConnectButton } from '@tonconnect/ui-react'


	function App() {
	  const [count, setCount] = useState(0)

	  return (
		<>
		  <TonConnectButton/>
		</>
	  )
	}

	export default App

Запустим приложение командой `yarn dev`. И введем в браузере полученную ссылку. Должны увидеть:
	
![image](https://user-images.githubusercontent.com/18370291/246772802-49be02b5-6612-450a-8b72-8da3d2d68f28.png)

Нажмите на кнопку и вы увидеть QR и возможность выбора кошелька:

![image](https://user-images.githubusercontent.com/18370291/246774239-3666e7ce-d496-4da5-a0de-92ee32721395.png)

Выберите Tonkeeper во вкладке кошельки, QR измениться:

![image](https://user-images.githubusercontent.com/18370291/246774718-49b0114c-938a-44bc-8ad8-ff48c72aa0f0.png)

Авторизуемся с помощью Tonkeeper, кнопка измениться и будет отображать ваш адрес. В выпадающем списке будет кнопка дисконект и возможность скопировать адрес.

	
![image](https://user-images.githubusercontent.com/18370291/246775110-cc231038-7f2d-4831-b536-f6187663b391.png)

И это все с помощью одного компонента, который мы добавили одной строчкой кода. В следующем туториале, мы разберемся как после авторизации взаимодействовать со смарт-контрактами, отправляя транзакции.


## Заключение 

В следующей части мы добавим отправку транзакции, а также вызов Get-метода, для проверки отправки транзакции. Подобные туториалы и разборы по сети TON я пишу в свой канал - https://t.me/ton_learn . Буду рад вашей подписке.


