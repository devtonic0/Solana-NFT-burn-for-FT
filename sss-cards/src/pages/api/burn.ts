// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, createTransferInstruction, TOKEN_PROGRAM_ID, createBurnInstruction, createCloseAccountInstruction } from '../../../node_modules/@solana/spl-token';
import { Connection, Keypair, PublicKey, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js';
import type { NextApiRequest, NextApiResponse } from 'next'
import bs58 from 'bs58';
import { programs } from '@metaplex/js';

const {
    metadata: { Metadata },
} = programs;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const connection = new Connection("<ENDPOINT>");
    const burnWallet = Keypair.fromSecretKey(bs58.decode(process.env.USERNAME_ENCRYPT!));

    const requestData = JSON.parse(req.body)
    const NFTstoBurn = requestData.NFTstoBurn
    const owner = new PublicKey(requestData.owner)

    const blockhash = await connection.getLatestBlockhash()

    try {
        if (NFTstoBurn.length >= 1 && NFTstoBurn.some((nft: any) => !(nft === "<UPDATE_AUTH_COLLECTION>"))) {

            let totalToBurn = Math.floor(NFTstoBurn.length / 1)

            // create instructions array
            let instructions: TransactionInstruction[] = []

            // create transactions array that the user will sign
            let transactions = []

            let currentIndex = 1

            // for each NFT selected
            for (let i in NFTstoBurn) {

                // get the publickey of the NFT
                const mintPublickey = new PublicKey(NFTstoBurn[i]);

                // determine the associated token account of the NFT
                const associatedAddress = await getAssociatedTokenAddress(
                    mintPublickey,
                    owner,
                );

                // create the burn instruction
                const burnInstruction = createBurnInstruction(
                    associatedAddress,
                    mintPublickey,
                    owner,
                    1
                );

                // create the close account instruction
                const closeInstruction = createCloseAccountInstruction(
                    associatedAddress,
                    owner,
                    owner
                );

                // add the instructions to the transaction
                instructions.push(burnInstruction, closeInstruction);

                // this will only trigger and create a new tx if 5 nfts are guaranteed in the txn. Once the tx is created, instructions resets and goes through the same process for the remaining nfts (if any)
                if (currentIndex % 1 === 0) {
                    // Get the token account of the fromWallet address, and if it does not exist, create it
                    const tokenMint = new PublicKey('<MINT_TOKEN>')
                    const associatedSourceTokenAddr = await getAssociatedTokenAddress(tokenMint, burnWallet.publicKey);
                    const associatedDestinationTokenAddr = await getAssociatedTokenAddress(tokenMint, owner);
                    const receiverAccount = await connection.getAccountInfo(associatedDestinationTokenAddr);
                    if (receiverAccount === null) {
                        instructions.push(createAssociatedTokenAccountInstruction(owner, associatedDestinationTokenAddr, owner, tokenMint));
                    }

                    // create the transfer instruction
                    const sendArcanOsTokenInstruction = await createTransferInstruction(
                        associatedSourceTokenAddr,
                        associatedDestinationTokenAddr,
                        burnWallet.publicKey,
                        1
                    );
                    instructions.push(sendArcanOsTokenInstruction);

                    const transaction = new Transaction().add(...instructions);
                    transaction.feePayer = owner;
                    transaction.recentBlockhash = blockhash.blockhash;
                    transaction.partialSign({
                        publicKey: burnWallet.publicKey,
                        secretKey: burnWallet.secretKey
                    })

                    transactions.push(transaction.serialize({ requireAllSignatures: false }))

                    //reset instructions and index
                    instructions = []
                }

                currentIndex++
            }

            res.status(200).json({ transactions: transactions });

        } else {
            res.status(200).json({ transactions: null });
        }

    } catch (e) {
        console.log(e)
        res.status(200).json({ transactions: null });
    }
}