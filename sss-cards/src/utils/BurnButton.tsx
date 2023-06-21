import { Connection, PublicKey } from '@solana/web3.js';
import { WalletContextState, useWallet } from "@solana/wallet-adapter-react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { burnTokenAndCloseAccount } from './burnTokenAndCloseAccount';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import bs58 from 'bs58';
import Modal from 'react-modal';
import { XIcon } from '@heroicons/react/outline';
import Link from 'next/link';

type Props = {
    NFTstoBurn: string[];
    connection: Connection;
    publicKey: PublicKey | null;
    wallet: WalletContextState;
    setRefresh: Dispatch<SetStateAction<boolean>>;
};

export const BurnButton: FC<Props> = ({
    NFTstoBurn,
    connection,
    publicKey,
    wallet,
    setRefresh
}) => {

    const { setVisible } = useWalletModal();
    const [isburning, setIsburning] = useState(false);
    const [message, setMessage] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { sendTransaction } = useWallet();

    useEffect(() => {
        if (message === 'success') {
            setModalIsOpen(true);
        }
    }, [message])

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
        },
    };

    return (
        <div>
            {!isburning &&
                // <button className="fixed bottom-0 left-0 w-full h-14 flex items-center justify-center btn-primary cursor-pointer text-black disabled:bg-orange-500 disabled:cursor-not-allowed" disabled={eyeBalance < 404} onClick={() => { if (publicKey) burnTokenAndCloseAccount(NFTstoBurn, publicKey, wallet, connection, setIsburning, setMessage, setRefresh, sendTransaction); else setVisible(true) }}>Select 1 Club Card to send into the black hole.</button>
                <button className="fixed bottom-0 disabled:bg-[#353435] disabled:text-white left-0 w-full h-14 hover:bg-white flex items-center justify-center btn-primary cursor-pointer text-black bg-gray-500 disabled:cursor-not-allowed" disabled={NFTstoBurn.length < 1} onClick={() => { if (publicKey) burnTokenAndCloseAccount(NFTstoBurn, publicKey, wallet, connection, setIsburning, setMessage, setRefresh); else setVisible(true) }}>Select 1 Club Card to send into the black hole.</button>
            }

            {isburning &&
                <button className="btn btn-primary bg-transparent border-0 hover:bg-transparent hover:border-0 cursor-wait uppercase mb-4">
                    <div className="loading width-25 height-25"/>burning
                </button>
            }

            {message != 'Dark Portal Successful' &&
                <div className='font-semibold mb-2 text-white'>{message}</div>
            }

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="av-modal"
            >
                <div className="bg-black bg-opacity-90 z-index-9999 flex flex-row">
                    <div>
                        <div className="close-header">
                            <XIcon
                                className="h-6 w-6 text-white cursor-pointer ml-auto"
                                aria-hidden="true"
                                onClick={() => setModalIsOpen(false)}
                            />
                        </div>
                        <div className="px-16 pb-12 w-[457px]">
                            <div className="text-2xl text-white font-semibold mt-8 text-center">
                                Your Burn is successful. <br /> Hold your token for mint
                            </div>
                           
                           
                            {/* <p className="text-grey-500 mt-5">
                            Use Solana Pay to subscribe and follow {trader.userName}’s trades. You will be
                            notified as soon as they buy or sell any NFT in addition to gaining access to their
                            "Squawk Box," an exclusive community on Parrot for {trader.userName} to chat with
                            their subscribers.
                        </p> */}
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    );
};


