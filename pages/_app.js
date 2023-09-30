import '../styles/globals.css';
import { Sepolia } from '@thirdweb-dev/chains';
import {
	ThirdwebProvider,
	metamaskWallet,
	coinbaseWallet,
	walletConnect,
	localWallet,
	paperWallet,
	trustWallet,
} from "@thirdweb-dev/react";
import Head from 'next/head';
import { Montserrat } from 'next/font/google'

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const montserrat = Montserrat({
	style: ['normal'],
	subsets: ['latin'],
})
function MyApp({ Component, pageProps }) {

	return (
		<div className={montserrat.className}>
			<ThirdwebProvider
				activeChain={Sepolia}
				clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
				supportedWallets={[
					metamaskWallet(),
					coinbaseWallet(),
					walletConnect(),
					localWallet(),
					paperWallet(),
					trustWallet(),
				]}
			>
				<Component {...pageProps} />
			</ThirdwebProvider>
		</div>
	);
}

export default MyApp;
