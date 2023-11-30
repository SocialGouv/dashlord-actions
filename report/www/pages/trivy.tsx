import type { NextPage } from "next";
import Head from "next/head";

import { TrivyDashboard } from "../src/components/TrivyDashboard";
import report from '@/report.json';
import dashlordConfig from '@/config.json';

const PageTrivy: NextPage = () => {
  return (
    <>
      <Head>
        <title>Trivy - Images Docker - {dashlordConfig.title}</title>
      </Head>
      <TrivyDashboard report={report} />
    </>
  );
};

export default PageTrivy;
