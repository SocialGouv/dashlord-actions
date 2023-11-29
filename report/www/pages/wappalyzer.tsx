import type { NextPage } from "next";
import Head from "next/head";

import { WappalyzerDashboard } from "../src/components/WappalyzerDashboard";
import report from '@/report.json';
import dashlordConfig from '@/config.json';

const PageWappalyzer: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wappalyzer - Technologies - {dashlordConfig.title}</title>
      </Head>
      <WappalyzerDashboard report={report} />
    </>
  );
};

export default PageWappalyzer;
