import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import { Alert } from "@dataesr/react-dsfr";

import { Dashboard } from "../../src/components/Dashboard";
import report from "@/report.json";
import dashlordConfig from "@/config.json";
import { isToolEnabled } from "src/utils";

const PageStartup = ({ report, id }: { report: UrlReport[]; id: string }) => {
  if (!report || report.length === 0) {
    return (
      <Alert
        type="error"
        title={`Impossible de trouver le rapport pour "${id}"`}
      />
    );
  }
  return (
    <>
      <Head>
        <title>
          {id} - {dashlordConfig.title}
        </title>
      </Head>
      <Dashboard report={report} />
    </>
  );
};

// will be passed to the page component as props
export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!isToolEnabled("betagouv")) {
    throw Error("error, route not enabled");
  }
  const id = params && params.id && params.id.length && params.id[0];
  const startupReport = report.filter((u) => u.betaId && u.betaId === id);
  return {
    props: { id, report: startupReport },
  };
};

// return list of urls to generate
export const getStaticPaths: GetStaticPaths = async () => {
  if (!isToolEnabled("betagouv")) {
    return { paths: [], fallback: false };
  }
  const startupsIds = dashlordConfig.urls
    .filter((u) => u.betaId)
    .map((u) => u.betaId);
  const paths = startupsIds.map((id) => `/startup/${id}`);
  return {
    paths,
    fallback: false,
  };
};
export default PageStartup;
