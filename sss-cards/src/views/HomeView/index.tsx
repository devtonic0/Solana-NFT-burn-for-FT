import Link from "next/link";
import { FC, useEffect } from "react";
import Header from "components/Header";
import { useWallet } from "@solana/wallet-adapter-react";

export const HomeView: FC = ({ }) => {

  const { publicKey } = useWallet();

  useEffect(() => {
    if (publicKey) window.location.href = '/burn'
  }, [publicKey])

  return (
    <div className="container mx-auto max-w-6xl p-8 2xl:px-0 min-h-screen">
      <Header />
<div className="background">
      <video autoPlay muted loop className="w-screen h-screen fixed top-0 left-0 z-0 object-cover">
        <source src="/back.mp4" type="video/mp4" />
      </video>
      
      </div>
      {/* <div className="max-w-4xl mx-auto text-center mt-20 cursor-pointer">
          <Link href="/burn">
            <div className="p-4 border text-orange-500 border-orange-500 hover:border-color-white hover:text-white ">
              <a className="text-4xl font-bold mb-5">
                Enter the sacrifice tombe
              </a>
            </div>
          </Link>
        </div> */}
      
      <div className="background text-right flex flex-col flex-grow justify-end items-end text-white h-[calc(100%-164px)] relative z-[1]">
        <div className="space-y-7 max-w-[600px]">
          <div className="text1">SSS Club Cards Burn</div>
          <div className="text2">step 1 - connect your wallet</div>
          <div className="text2">step 2 - choose Club Cards to burn</div>
          <div className="text2">step 3 - sacrifice them & receive SPL token to mint a Soldrop PFP</div>
        </div>
      </div>
      <div className="text-right flex flex-col flex-grow justify-end items-end text-white h-[calc(100%-164px)] relative z-[1]">
        <div className="space-y-7 max-w-[600px]">
          <div className="text1">SSS Club Cards Burn</div>
        </div>
      </div>
    
    </div>
    
    
  );
};