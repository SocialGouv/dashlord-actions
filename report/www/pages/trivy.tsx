import type { NextPage } from "next";
import Head from "next/head";

import { TrivyDashboard } from "../src/components/TrivyDashboard";

const report: DashLordReport = require("../src/report.json");

const PageTrivy: NextPage = () => {
  return (
    <>
      <Head>
        <title>Trivy - Images Docjer - Dashlord</title>
      </Head>
      <TrivyDashboard report={report} />
    </>
  );
};

export default PageTrivy;
