import type { NextPage } from "next";
import Head from "next/head";

import { WappalyzerDashboard } from "../src/components/WappalyzerDashboard";

const report: DashLordReport = require("../src/report.json");

const PageWappalyzer: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wappalyzer - Technologies - Dashlord</title>
      </Head>
      <WappalyzerDashboard report={report} />
    </>
  );
};

export default PageWappalyzer;
