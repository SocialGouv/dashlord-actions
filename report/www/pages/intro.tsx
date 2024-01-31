import type { NextPage } from "next";
import Head from "next/head";

import { Intro } from "@/components/Intro";
import dashlordConfig from "@/config.json";

const PageIntro: NextPage = () => {
  return (
    <>
      <Head>
        <title>{dashlordConfig.title} - introduction</title>
      </Head>
      <Intro />
    </>
  );
};

export default PageIntro;
