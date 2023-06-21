
import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div  className=" flex flex-col h-screen justify-between min-h-screen">
      <Head>
        <title>Soldrop Club Cards</title>
        <meta
          name="description"
          content="Burn your SSS Club Cards, earn a token."
        />
      </Head>
      <HomeView />
    
    </div>
  );
};

export default Home;
