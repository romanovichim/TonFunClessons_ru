import { isWalletInfoInjected } from '@tonconnect/sdk';
import { selector } from 'recoil';
import { connector } from '../../src/connector';

export const walletsListQuery = selector({
	key: 'walletsList',
	get: async () => {
		const walletsList = await connector.getWallets();

		const embeddedWallet = walletsList.filter(isWalletInfoInjected).find((wallet) => wallet.embedded);

		return {
			walletsList,
			embeddedWallet,
		};
	},
});
