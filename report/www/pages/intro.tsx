import type { NextPage } from "next";
import Head from "next/head";

import { Intro } from "../src/components/Intro";

const PageIntro: NextPage = () => {
  return (
    <>
      <Head>
        <title>DashLord - introduction</title>
      </Head>
      <Intro />
    </>
  );
};

export default PageIntro;
