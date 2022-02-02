import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import { Alert } from "@dataesr/react-dsfr";

import { Url } from "../../src/components/Url";
import { slugifyUrl } from "../../src/utils";

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
  const query = params && decodeURIComponent((params.url as []).join(""));
  const urlData = report.find((u: UrlReport) => slugifyUrl(u.url) === query);
  const url = urlData.url;
  return {
    props: { url, report: urlData || null },
  };
};

// return list of urls to generate
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: report.map(
    (u: UrlReport) => `/url/${encodeURIComponent(slugifyUrl(u.url))}`
  ),
  fallback: false,
});

export default PageUrl;
