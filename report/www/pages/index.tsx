import type { NextPage } from "next";
import Head from "next/head";

import { Dashboard } from "../src/components/Dashboard";
const report: DashLordReport = require("../src/report.json");

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>
          DashLord - tableau de bord des bonnes pratiques techniques
        </title>
      </Head>
      <Dashboard report={report} />
    </>
  );
};

export default Home;
