import type { NextPage } from "next";
import Head from "next/head";

import { About } from "../src/components/About";
import dashlordConfig from "@/config.json";

const PageIntro: NextPage = () => {
  return (
    <>
      <Head>
        <title>À propos - {dashlordConfig.title}</title>
      </Head>
      <h1>À propos</h1>
      <About />
    </>
  );
};

export default PageIntro;
