import type { NextPage } from "next";
import Head from "next/head";

import { Intro } from "@/components/Intro";
import dashlordConfig from "@/config.json";

const PageIntro: NextPage = () => {
  return (
    <>
      <Head>
        <title>Introduction - {dashlordConfig.title}</title>
      </Head>
      <Intro />
    </>
  );
};

export default PageIntro;
