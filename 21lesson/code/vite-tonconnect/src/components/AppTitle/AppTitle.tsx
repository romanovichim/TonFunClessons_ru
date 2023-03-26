import { CHAIN } from '@tonconnect/sdk';
import React, { useEffect, useRef, useState } from 'react';
import { useTonWallet } from '../../../src/hooks/useTonWallet';
import './style.scss';

const chainNames = {
	[CHAIN.MAINNET]: 'mainnet',
	[CHAIN.TESTNET]: 'testnet',
};

export function AppTitle() {
	const wallet = useTonWallet();

	return (
		<>
			<div className="dapp-title">
				<span className="dapp-title__text">My Dapp</span>
				{wallet && <span className="dapp-title__badge">{chainNames[wallet.account.chain]}</span>}
			</div>
		</>
	);
}
