import Link from "next/link";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { Loader, SelectAndConnectWalletButton } from "components";
import { NftCard } from "./NftCard";
import styles from "./index.module.css";
import { BurnButton } from "utils/BurnButton";
import Header from "components/Header";

const walletPublicKey = "";

export const BurnView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [walletToParsePublicKey, setWalletToParsePublicKey] =
    useState<string>(walletPublicKey);
  const { publicKey } = useWallet();

  const [refresh, setRefresh] = useState(false);
  const [allSelectedNfts, setAllSelectedNfts] = useState([]);



  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: walletToParsePublicKey,

    connection,
  });

  let errorMessage
  if (error) {
    errorMessage = error.message
  }

  useEffect(() => {
    getBalance();
  }, [publicKey])

  useEffect(() => {
    if (publicKey) {
      setWalletToParsePublicKey(publicKey?.toBase58());
    }
  }, [publicKey, nfts])

  const getBalance = async () => {





  };


  return (
    <div className="container mx-auto max-w-6xl p-8 2xl:px-0 font-typewriter">
      <Header />
<div className="background">
      <video autoPlay muted loop className="background w-screen h-screen fixed top-0 left-0 z-0 object-cover">
        <source src="/back.mp4" type="video/mp4" />
      </video>
      </div>
      <div className="text-center pt-2 relative">
        <div className="hero min-h-16 p-0 pt-10">
          <div className="text-center hero-content w-full">
            <div className="w-full">
              <div className="flex flex-row justify-end">

              </div>
              <div className="clubCard"> 
        <a href="https://club-cards.soldrop.io" rel="noreferrer">
         Club Cards
          </a>
          </div> 
          
          <div className="nauts"> 
        <a href="https://nauts.soldrop.io" rel="noreferrer">
         Nauts
          </a>
          </div> 
              <hr className="border border-#D7D7D6 w-full" />

              <h2 className="mt-6 mb-5 text-white text-2xl text-#D7D7D6">
                Choose any Club Card to burn
              </h2>

              <div className="mb-auto my-10">
                {!publicKey && <div>
                  <h2 className="text-white">Please connect wallet</h2>
                </div>}
                {error && errorMessage != "Invalid address: " ? (
                  <div>
                    <h1>Error Occured</h1>
                    {(error as any)?.message}
                  </div>
                ) : null}

                {!error && isLoading &&
                  <div>
                    <Loader />
                  </div>
                }
                {!error && !isLoading && !refresh &&
                  <NftList nfts={nfts} error={error} setRefresh={setRefresh} setAllSelectedNfts={setAllSelectedNfts} />
                }
              </div>

              
            </div>
            
          </div>
         
        </div>
        <BurnButton NFTstoBurn={allSelectedNfts} connection={connection} publicKey={publicKey} wallet={wallet} setRefresh={setRefresh} />
      </div>

    </div>
    
  );
};

type NftListProps = {
  nfts: NftTokenAccount[];
  error?: Error;
  setRefresh: Dispatch<SetStateAction<boolean>>
  setAllSelectedNfts: any;
};

const NftList = ({ nfts, error, setRefresh, setAllSelectedNfts }: NftListProps) => {
  if (error) {
    return null;
  }

  if (!nfts?.length) {
    return (
      <div className="text-center text-white text-2xl pt-16">
        No NFTs found in this wallet
        
      </div>
    );
  }
  const [selectedNfts, setSelectedNfts] = useState<string[]>([]);

  const onSelect = (nftMint: string) => {
    if (selectedNfts.some((nft) => nft === nftMint)) {
      const newList = selectedNfts.filter((nft) => nft !== nftMint);
      setSelectedNfts(newList);
    } else {
      setSelectedNfts([...selectedNfts, nftMint]);
    }
  }

  useEffect(() => {
    setAllSelectedNfts(selectedNfts);
  }, [selectedNfts])

  const areAllSelected = JSON.stringify(selectedNfts) === JSON.stringify(nfts?.filter((nft) => nft.updateAuthority === "8qxN2zgN2u7vwBiNF31UTyXVYfyyZcYgGC7qyqhtMMq4").map((nft) => nft.mint))

  return (
    <div>
      
      <button className= "selectAll"onClick={() => {
        if (areAllSelected) {
          setSelectedNfts([]);
        } else {
          setSelectedNfts(nfts?.filter((nft) => nft.updateAuthority === "8qxN2zgN2u7vwBiNF31UTyXVYfyyZcYgGC7qyqhtMMq4").map((nft) => nft.mint));
        }
      }}>{areAllSelected ? "De-select all" : "Select all"}</button>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent items-start mb-14">
        {nfts?.filter((nft) => nft.updateAuthority === "<UPDATE_AUTH>").map((nft) => (
          <NftCard key={JSON.stringify(nft.mint + selectedNfts.includes(nft.mint))} details={nft} onSelect={onSelect} selected={selectedNfts.includes(nft.mint)} />
        ))}
        
      </div>
      
      {nfts?.filter((nft) => nft.updateAuthority === "8qxN2zgN2u7vwBiNF31UTyXVYfyyZcYgGC7qyqhtMMq4").length === 0 && <span className="text-white">No NFT&apos;s found</span>}
      
    </div>
    
  );
};

