"use client"
import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, sendAndConfirmRawTransaction, Transaction, SystemProgram, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
export default function Home() {
  const wallet = useWallet()
  const {connection} = useConnection()
  const sendSol = async () => {
    if (!wallet.connected && !wallet.publicKey) return
   
    const recipient = new PublicKey("DXs2eDbV9V8pCnrMvXYNT6skgEYCHTGRHYa4a9PainkB")
    const ix = SystemProgram.transfer({
      //@ts-ignore
      fromPubkey: wallet.publicKey,
      toPubkey: recipient,
      lamports: 1 * LAMPORTS_PER_SOL
    })
    const  tx = new Transaction().add(ix)
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
     //@ts-ignore
    tx.feePayer = wallet.publicKey
    const sx = await wallet.sendTransaction(tx, connection)
    console.log(sx)
  }
  return (
    <div>
      <WalletMultiButton />
      <button onClick={sendSol}>send</button>
    </div>
  );
}
