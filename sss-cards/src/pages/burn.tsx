import type { NextPage } from "next";
import Head from "next/head";
import { BurnView } from "../views";


const Home: NextPage = (props) => {
  return (
    <div className=" flex flex-col h-screen justify-between ">
      <Head>
        <title>Soldrop Club Cards</title>/
        <meta name="description" content="Burn your SSS Club Cards" />
      </Head>
      <BurnView />
     
    </div>
  );
};

export default Home;