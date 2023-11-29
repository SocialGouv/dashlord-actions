import type { NextPage } from "next";
import Head from "next/head";

import { Trends } from "../src/components/Trends";
import trends from '@/trends.json';
import dashlordConfig from '@/config.json';

const PageIntro: NextPage = () => {
  return (
    <>
      <Head>
        <title>Evolutions - {dashlordConfig.title}</title>
      </Head>
      <Trends trends={trends} />
    </>
  );
};

export default PageIntro;
