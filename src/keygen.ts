import { Keypair } from "@solana/web3.js";
import * as fs from "fs";

const keypair = Keypair.generate();


const keypairJson = JSON.stringify(Array.from(keypair.secretKey));
fs.writeFileSync("wallet.json", keypairJson);


console.log("Public Key:", keypair.publicKey.toString());
