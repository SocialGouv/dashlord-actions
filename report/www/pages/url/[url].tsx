import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";

import { Url } from "../../src/components/Url";
import { Alert } from "@dataesr/react-dsfr";

const report: DashLordReport = require("../../src/report.json");

const PageUrl = ({ report, url }: { report: UrlReport; url: string }) => {
  if (!report) {
    return <Alert type="error" title={`Impossible de trouver le rapport`} />;
  }
  return (
    <>
      <Head>
        <title>DashLord - {url}</title>
      </Head>
      <Url url={url} report={report} />;
    </>
  );
};

// will be passed to the page component as props
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const url = params && decodeURIComponent(params.url as string);
  console.log("url", url);
  const urlData = report.find((u: UrlReport) => u.url === url);
  return {
    props: { url, report: urlData || null },
  };
};

// return list of urls to generate
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: report.map((u: UrlReport) => `/url/${encodeURIComponent(u.url)}`),
  fallback: true,
});

export default PageUrl;
