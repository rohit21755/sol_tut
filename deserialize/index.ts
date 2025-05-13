import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import * as borsh from '@coral-xyz/borsh' 
const programId = Keypair.generate().publicKey
const [pda, bump] = PublicKey.findProgramAddressSync([Buffer.from("GLOBAL_STATE")], programId)
console.log(pda.toBase58(), bump)

const pda2 = PublicKey.createProgramAddressSync([Buffer.from("GLOBAL_STATE"), Buffer.from([bump])], programId)

console.log(pda2.toBase58())

console.log(PublicKey.isOnCurve(pda))
console.log(PublicKey.isOnCurve(pda2))
const connection = new Connection(clusterApiUrl('devnet'))
const borshAccountSchema = borsh.struct([
    borsh.bool('initialized'),
    borsh.u8('rating'),
    borsh.str('title'),
    borsh.str('description'),
  ])
const fetchProgramAccounts = async () => {
    try {
    const newPub = new PublicKey("CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN")
      const accounts = await connection.getProgramAccounts(newPub);
  
      accounts.forEach(({ pubkey, account }) => {
        console.log("Account:", pubkey.toBase58());
        // console.log("Data buffer:", account.data.toString());
        const {title, rating, description} = borshAccountSchema.decode(account.data)
        console.log(title, rating, description)
      });
    } catch (error) {
      console.error("Error fetching program accounts:", error);
    }
  };
  
fetchProgramAccounts();
