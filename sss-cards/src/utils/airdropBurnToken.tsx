
import { Connection, PublicKey, Transaction, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction } from '@solana/web3.js';
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, createTransferInstruction, getOrCreateAssociatedTokenAccount } from '../../node_modules/@solana/spl-token';

export async function airdropBurnToken(owner: PublicKey, connection: Connection, ) {
    // try {
    //     const burnWallet = Keypair.fromSecretKey(bs58.decode())

    //     // Get the token account of the fromWallet address, and if it does not exist, create it
    //     const token = await getAssociatedTokenAddress(
    //         new PublicKey('2zoV3B6bNfczetCUAVHVCZSJ3TYstEa7WuHKkQCcxf6T'),
    //         burnWallet.publicKey,
    //         undefined,
    //         TOKEN_PROGRAM_ID,
    //         ASSOCIATED_TOKEN_PROGRAM_ID,
    //     );

    //     const tokenAccountInstruction = await getOrCreateAssociatedTokenAccount(
    //         connection,
    //         burnWallet,
    //         new PublicKey('2zoV3B6bNfczetCUAVHVCZSJ3TYstEa7WuHKkQCcxf6T'),
    //         owner
    //     );

    //     // create the transfer instruction
    //     const transferInstruction = await createTransferInstruction(
    //         token,
    //         tokenAccountInstruction.address,
    //         burnWallet.publicKey,
    //         1,
    //         undefined,
    //         TOKEN_PROGRAM_ID,
    //     );

    //     const transaction = new Transaction().add(transferInstruction);
    //     const response = await sendAndConfirmTransaction(connection, transaction, [burnWallet]);
    //     console.log(response);

    // } catch(err) {
    //     console.log('error', err);
    // }
}