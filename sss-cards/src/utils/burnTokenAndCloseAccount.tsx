import { getAssociatedTokenAddress, createBurnInstruction, createCloseAccountInstruction, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, getMint, createTransferCheckedInstruction, createTransferInstruction, getOrCreateAssociatedTokenAccount, createAssociatedTokenAccountInstruction } from '../../node_modules/@solana/spl-token';
import { Connection, PublicKey, Transaction, LAMPORTS_PER_SOL, Keypair, sendAndConfirmTransaction, TransactionInstruction, SystemProgram } from '@solana/web3.js';
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Dispatch, SetStateAction } from 'react';
import pino from 'pino'
import bs58 from 'bs58';
import { createPinoBrowserSend, createWriteStream } from 'pino-logflare'


// create pino-logflare stream
const stream = createWriteStream({
    apiKey: "qxwv8sVMSPgH",
    sourceToken: "a9431cdc-aff7-40bd-b198-98f2d56ad693"
});

// create pino-logflare browser stream
const logging = createPinoBrowserSend({
    apiKey: "qxwv8sVMSPgH",
    sourceToken: "a9431cdc-aff7-40bd-b198-98f2d56ad693"
});

// create pino loggger
const logger = pino({
    browser: {
        transmit: {
            send: logging,
        }
    }
}, stream);


export async function burnTokenAndCloseAccount(NFTstoBurn: string[], owner: PublicKey, wallet: WalletContextState, connection: Connection, setIsburning: Dispatch<SetStateAction<boolean>>, setMessage: Dispatch<SetStateAction<string>>, setRefresh: Dispatch<SetStateAction<boolean>>) {

    const requestData = {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ NFTstoBurn: NFTstoBurn, owner: owner.toBase58() })
    }

    const blockhash = await connection.getLatestBlockhash()

    try {
        if (NFTstoBurn.length >= 1 && NFTstoBurn.some((nft) => !(nft === "8qxN2zgN2u7vwBiNF31UTyXVYfyyZcYgGC7qyqhtMMq4"))) {

            setMessage('')
            setIsburning(true)

            const transactions = await (await fetch("/api/burn", requestData)).json()

            if (transactions.transactions !== null) {

                const signedTXs = await wallet.signAllTransactions?.(transactions.transactions.map((o: any) => Transaction.from(o.data))!)

                let totalConfirmations = 0

                for (const tx of signedTXs!) {
                    const signature = await connection.sendRawTransaction(tx.serialize())
                    const confirmed = await connection.confirmTransaction({
                        signature: signature,
                        blockhash: blockhash.blockhash,
                        lastValidBlockHeight: blockhash.lastValidBlockHeight
                    });
                    if (confirmed) {
                        totalConfirmations++
                    }
                }

                if (totalConfirmations === signedTXs?.length) {
                    setIsburning(false)
                    setRefresh(true)
                    setRefresh(false)
                    console.log('success')
                    setMessage('success');

                }
            } else {
                setMessage('Error!')
                setIsburning(false)
            }
        }
        else {
            setMessage('Please select  1 Club Card to burn')
            setIsburning(false)
        }
    } catch (error) {
        console.log('err', error);
        setIsburning(false)
    }


}
