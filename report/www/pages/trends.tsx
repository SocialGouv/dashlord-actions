import type { NextPage } from "next";
import Head from "next/head";

import { Trends } from "../src/components/Trends";

import trends from "../src/trends.json";

const PageIntro: NextPage = () => {
  return (
    <>
      <Head>
        <title>Evolutions - Dashlord</title>
      </Head>
      {/*@ts-ignore*/}
      <Trends trends={trends} />
    </>
  );
};

export default PageIntro;
