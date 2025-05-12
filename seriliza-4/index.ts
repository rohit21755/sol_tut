import { clusterApiUrl, Connection, Keypair, TransactionInstruction } from "@solana/web3.js";
import * as borsh from '@coral-xyz/borsh'
import BN from 'bn.js'
const secretKey = new Uint8Array([115,123,87,5,10,234,145,243,237,56,54,152,136,68,142,143,220,130,140,225,248,40,103,236,212,23,195,18,236,17,45,42,186,52,60,12,249,181,59,204,142,140,142,186,234,134,253,187,39,208,104,59,17,138,38,242,233,6,63,178,63,104,217,212])
const payer = Keypair.fromSecretKey(secretKey)
const newKeypair = Keypair.generate()
// serialize - arragne something in sereis 
const connection = new Connection(clusterApiUrl("devnet"))
const equipPlayerSchema = borsh.struct([
    borsh.u8('variant'),
    borsh.u16('playerId'),
    borsh.u128('itemId')
])

const buffer = Buffer.alloc(1000)
equipPlayerSchema.encode(
    { variant: 2, playerId: 1435, itemId: new BN(73) },
    buffer,
  )

const instructionBuffer = buffer.subarray(0, equipPlayerSchema.getSpan(buffer))
console.log(instructionBuffer)

const instruction = new TransactionInstruction({
    keys: [
      {
        pubkey: player.publicKey,
        isSigner: true,
        isWritable: false,
      },
      {
        pubkey: playerInfoAccount,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: SystemProgram.programId,
        isSigner: false,
        isWritable: false,
      },
    ],
    data: instructionBuffer,
    programId: PROGRAM_ID,
  });
 