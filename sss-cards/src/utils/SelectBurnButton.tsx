import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '../../node_modules/@solana/spl-token';
import { Connection, PublicKey } from '@solana/web3.js';
import { FC, useEffect, useState } from 'react';

type Props = {
    tokenMintAddress: string;
    NFTstoBurn: any;
    publicKey: PublicKey | null;
    connection: Connection
};

export const SelectBurnButton: FC<Props> = ({
    tokenMintAddress,
    NFTstoBurn,
    publicKey,
    connection
}) => {

    const [amount, setAmount] = useState(0);

    useEffect(() => {

        async function BalanceIsNull() {
            const mintPublickey = new PublicKey(tokenMintAddress);
            try {

                if (publicKey) {

                    const associatedAddress = await getAssociatedTokenAddress(
                        mintPublickey,
                        publicKey,
                        undefined,
                        TOKEN_PROGRAM_ID,
                        ASSOCIATED_TOKEN_PROGRAM_ID,
                    );

                    const getbalance = await connection.getTokenAccountBalance(associatedAddress)

                    const quantity = getbalance.value.amount;
                    setAmount(parseInt(quantity, 10))
                }
            }
            catch (error) {
                const err = (error as any)?.message;
                if (err.includes('could not find account')) {
                    setAmount(0)
                }
            }
        }
        BalanceIsNull();
    }, []);

    const [isSelected, setIsSelected] = useState(false);


    return (
        <div>
            {!isSelected && amount != 0 &&
                <button className="btn bg-[#f39b189c] hover:bg-[#f39b189c] uppercase mb-2 sm:mb-4 sm:mr-1" onClick={() => { setIsSelected(true); NFTstoBurn.push(tokenMintAddress) }}>select</button>
            }
            {isSelected && amount != 0 &&
                <button className="btn bg-[#f39b189c] hover:bg-[#f39b189c] uppercase mb-2 sm:mb-4 sm:mr-1" onClick={() => { setIsSelected(false); NFTstoBurn.splice(NFTstoBurn.indexOf(tokenMintAddress), 1) }}>unselect</button>
            }

            {amount == 0 &&
                <button className="btn btn-primary uppercase mb-2 sm:mb-4 sm:mr-1" disabled>success!</button>
            }


        </div>
    );
};


