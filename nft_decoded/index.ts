import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import * as borsh from '@coral-xyz/borsh'
const tokenMint = new PublicKey("SMBtHCCC6RYRutFEPb4gZqeBLUZbMNhRKaMKZZLHi7W")
const programId = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")

const seeds = [Buffer.from("metadata"), programId.toBytes(), tokenMint.toBytes()]

const [metadataPDA, bump] = PublicKey.findProgramAddressSync(seeds, programId)

const connection = new Connection(clusterApiUrl("mainnet-beta"))

async function main(){
    const accountInfo = await connection.getAccountInfo(metadataPDA)
    console.log(accountInfo?.data)
    const borshMetaDataLayout = borsh.struct([
        borsh.u8("key"),
        borsh.publicKey("updateAuthority"),
        borsh.publicKey("mint"),
        borsh.str("name"),
        borsh.str("symbol"),
        borsh.str("uri"),
        borsh.u16("sellerFeeBasisPoints"),
        borsh.option(
            borsh.vec(
                borsh.struct([
                    borsh.publicKey('address'),
                    borsh.bool('verified'),
                    borsh.u8('share')
                ]),
                "creatorArray"
            ),
            "creators"
        ),
        borsh.bool('primarySaleHappened'),
        borsh.bool('isMutable'),
        borsh.option(borsh.struct([borsh.u16('editionNounceValue')]), 'editionNounce'),
        // borsh.option(borsh.struct([borsh.u16('tokenStandardValue')]), 'tokenStandard'),
        borsh.u16('tokenStandardValue'),
        borsh.option(borsh.struct([
            borsh.bool('verified'),
            borsh.publicKey('key')
        ]),'collection')


    ])
    if (accountInfo) {
        const metadata = borshMetaDataLayout.decode(accountInfo.data)
        console.log(metadata)
    }
}
main()