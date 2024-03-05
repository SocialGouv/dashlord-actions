import type { NextPage } from "next";
import Head from "next/head";

import { Dashboard } from "../src/components/Dashboard";
import report from "@/report.json";
import dashlordConfig from "@/config.json";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{dashlordConfig.title}</title>
      </Head>
      <h1>Tableau de bord</h1>
      <Dashboard report={report} />
    </>
  );
};

export default Home;
