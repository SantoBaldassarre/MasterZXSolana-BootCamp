import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import * as fs from "fs";


const secretKey = JSON.parse(fs.readFileSync("wallet.json", "utf8"));
const payer = Keypair.fromSecretKey(Uint8Array.from(secretKey));


const mintAddress = JSON.parse(fs.readFileSync("mint.json", "utf8"));
const mint = new PublicKey(mintAddress);


const connection = new Connection("https://api.devnet.solana.com");

async function mintTokens() {
    try {
        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mint,
            payer.publicKey
        );

        await mintTo(
            connection,
            payer,
            mint,
            tokenAccount.address,
            payer,
            1000 * Math.pow(10, 9) 
        );

        console.log("Minted 1000 tokens to:", tokenAccount.address.toBase58());
    } catch (error) {
        console.error("Error minting tokens:", error);
    }
}

mintTokens();
