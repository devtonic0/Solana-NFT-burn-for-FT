import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import logo from 'assets/img/soldrop.png';
import Link from "next/link";

import {  ConnectWallet } from "components";
import styles from "./index.module.css";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import DiscordIcon from '../assets/icons/discord.png';

const walletPublicKey = "";

const Header = () => {
    const { publicKey } = useWallet();
  const [walletToParsePublicKey, setWalletToParsePublicKey] =
    useState<string>(walletPublicKey);

  const onUseWalletClick = () => {
    if (publicKey) {
      setWalletToParsePublicKey(publicKey?.toBase58());
    }
  };
  
    return(
        <div className="flex flex-row mb-auto relative z-[1]">
          <Image src={logo} alt="logo" width={100} height={100} className="w-[100px]" />
          <div className="ml-auto mr-4 h-[40px]">
            <ul className="text-xs sm:text-xl flex flex-row space-x-7 items-center h-full">
              <li>
                <a href="https://discord.com/invite/soldrop" target="_blank" rel="noreferrer">
                <div className='discord'/>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/soldrop_io" target="_blank" rel="noreferrer">
                <div className='twitter'/>
                </a>
              </li>
              <li>
                <a href="https://magiceden.io/marketplace/sss_og_club_card" target="_blank" rel="noreferrer">
                <div className='magic-eden'/>
                </a>
              </li>
              {/* <li>
                <Link href="/">
                  <a className="wallet-menu-button text-sm font-bold rounded-sm bg-orange-500 w-fit py-3 px-6">FAQ</a>
                </Link>
              </li> */}
              <li>
              <div className="flex-none">
                
                <WalletMultiButton className="wallet-menu-button" />
                <ConnectWallet onUseWalletClick={onUseWalletClick} />
               
              </div>
              </li>
            </ul>
          </div>
        </div>
    )
}

export default Header;