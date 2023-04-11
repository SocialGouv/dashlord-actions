import type { NextPage } from "next";
import Head from "next/head";

import { TrivyDashboard } from "../src/components/TrivyDashboard";

const report: DashLordReport = require("../src/report.json");

const PageWappalyzer: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wappalyzer - Technologies - Dashlord</title>
      </Head>
      <TrivyDashboard report={report} />
    </>
  );
};

export default PageWappalyzer;
