import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as fs from "fs";

const secretKey = JSON.parse(fs.readFileSync("wallet.json", "utf8"));
const keypair = Keypair.fromSecretKey(Uint8Array.from(secretKey));

const connection = new Connection("https://api.devnet.solana.com");

async function requestAirdrop() {
    const airdropSignature = await connection.requestAirdrop(
        keypair.publicKey,
        2 * LAMPORTS_PER_SOL
    );

    await connection.confirmTransaction(airdropSignature);
    console.log("Airdrop completed for address:", keypair.publicKey.toString());
}

requestAirdrop();
