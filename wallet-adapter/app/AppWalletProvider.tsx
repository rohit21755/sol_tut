"use client"
import React, {ReactNode, useMemo} from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'
require("@solana/wallet-adapter-react-ui/styles.css");

export default function AppWalletProvider({children}:{children: ReactNode}){
    const network = WalletAdapterNetwork.Devnet
    const endpoint = useMemo(()=> clusterApiUrl(network), [network])
    const wallets = useMemo(()=>[],[network])
    return(
        <>
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
        </>
    )
}