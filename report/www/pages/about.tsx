import type { NextPage } from "next";
import Head from "next/head";

import { About } from "../src/components/About";

const PageIntro: NextPage = () => {
  return (
    <>
      <Head>
        <title>DashLord - à propos</title>
      </Head>
      <About />
    </>
  );
};

export default PageIntro;
