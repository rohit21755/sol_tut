import { Keypair, PublicKey, Connection, SystemProgram, clusterApiUrl, Transaction, sendAndConfirmTransaction, TransactionInstruction, LAMPORTS_PER_SOL} from '@solana/web3.js'

const connection = new Connection(clusterApiUrl('devnet'))
const senderSecretKye = new Uint8Array([115,123,87,5,10,234,145,243,237,56,54,152,136,68,142,143,220,130,140,225,248,40,103,236,212,23,195,18,236,17,45,42,186,52,60,12,249,181,59,204,142,140,142,186,234,134,253,187,39,208,104,59,17,138,38,242,233,6,63,178,63,104,217,212])
const sender = Keypair.fromSecretKey(senderSecretKye)
const recipient = new PublicKey("H8czndQQmC9x1NRQeKksv8Kj5mr66KYWeH3ox4FC8XC9")

// const ix = SystemProgram.transfer({
//     fromPubkey: sender.publicKey,
//     toPubkey: recipient,
//     lamports: 100000
// })

// const tx = new Transaction().add(ix)

// const sx = await sendAndConfirmTransaction(connection, tx, [sender])
// console.log(sx)
const lamports = BigInt(0.1 * LAMPORTS_PER_SOL)
const instructionBuffer: Buffer = Buffer.alloc(4+8)
instructionBuffer.writeUInt32LE(2,0)
instructionBuffer.writeBigInt64LE(lamports,4)

const transferInstruction = new TransactionInstruction({
    keys: [
        {pubkey: sender.publicKey, isSigner: true, isWritable: true},
        {pubkey: recipient, isSigner: false, isWritable: true}
    ],
    programId: SystemProgram.programId,
    data: instructionBuffer
})

const tx = new Transaction().add(transferInstruction)
const sx = await sendAndConfirmTransaction(connection, tx, [sender])
console.log(sx)