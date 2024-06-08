import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import * as fs from "fs";

// Load the keypair from the file
const secretKey = JSON.parse(fs.readFileSync("wallet.json", "utf8"));
const payer = Keypair.fromSecretKey(Uint8Array.from(secretKey));
const connection = new Connection("https://api.devnet.solana.com");

async function initializeMint() {
    const mint = await createMint(
        connection,
        payer,
        payer.publicKey,
        null,
        9 
    );

    
    fs.writeFileSync("mint.json", JSON.stringify(mint));
    console.log("Mint created:", mint.toBase58());
}

initializeMint();
