import { createInitializeMint2Instruction, createMint, getMinimumBalanceForRentExemptMint,transfer, getOrCreateAssociatedTokenAccount, MINT_SIZE, mintTo, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
    const connection = new Connection(clusterApiUrl("devnet"))   
    const secret = new Uint8Array([115,123,87,5,10,234,145,243,237,56,54,152,136,68,142,143,220,130,140,225,248,40,103,236,212,23,195,18,236,17,45,42,186,52,60,12,249,181,59,204,142,140,142,186,234,134,253,187,39,208,104,59,17,138,38,242,233,6,63,178,63,104,217,212])
    const payer = Keypair.fromSecretKey(secret)
// async function main(){

//     const mint = await createMint(connetion,payer,payer.publicKey,payer.publicKey,6)
//     console.log(mint.toBase58())
//     const tokenAccount = await getOrCreateAssociatedTokenAccount(connetion, payer, mint, payer.publicKey)
//     const sx = await mintTo(connetion, payer, mint, tokenAccount.address, payer, 100)
//     console.log(sx)
// }
// main()

async function main() {
    // const lamports = await getMinimumBalanceForRentExemptMint(connection)
    // const mintAccount = Keypair.generate()
    // const ix1 = SystemProgram.createAccount({
    //     fromPubkey: payer.publicKey,
    //     newAccountPubkey: mintAccount.publicKey,
    //     lamports: lamports,
    //     space: MINT_SIZE,
    //     programId: TOKEN_PROGRAM_ID
    // })

    // const ix2 = createInitializeMint2Instruction(mintAccount.publicKey, 6, payer.publicKey, payer.publicKey)

    // const tx = new Transaction().add(ix1, ix2)

    // const  sx = await sendAndConfirmTransaction(connection, tx, [payer, mintAccount])
    // console.log(sx)
    // console.log("new address: ", mintAccount.publicKey.toBase58())
    // new Promise(r => setTimeout(r, 5000))
    // const payerTokenAccount = await getOrCreateAssociatedTokenAccount(connection, payer, new PublicKey('HmMUeJszX4UPAxMjYjZppGZAFueN9FVmhcFv8ixc1ega'), payer.publicKey)
    // console.log(payerTokenAccount.address.toBase58())

    // const sx2 = await mintTo(connection, payer, new PublicKey('HmMUeJszX4UPAxMjYjZppGZAFueN9FVmhcFv8ixc1ega'), payerTokenAccount.address, payer, 10 * 10 ** 6)
    // console.log(sx2)
 

    const user = Keypair.generate()

    const userTokenAccount = await getOrCreateAssociatedTokenAccount(connection, payer, new PublicKey('HmMUeJszX4UPAxMjYjZppGZAFueN9FVmhcFv8ixc1ega'), user.publicKey)

    console.log(userTokenAccount.address.toBase58())
    
    
    const sigx = await transfer(connection, payer, new PublicKey("C5suok2bQdpAre6rwndMoL6FGzEqE6GHpJotTaNbMMB9"), userTokenAccount.address, payer, 5 * 10 ** 6)
    console.log(sigx)
}

main()
