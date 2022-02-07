import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import { Alert } from "@dataesr/react-dsfr";

import { Url } from "../../src/components/Url";
import { slugifyUrl } from "../../src/utils";

const report: DashLordReport = require("../../src/report.json");

const PageUrl = ({
  report,
  url,
  selectedTab,
}: {
  report: UrlReport;
  url: string;
  selectedTab: string;
}) => {
  if (!report) {
    return <Alert type="error" title={`Impossible de trouver le rapport`} />;
  }
  return (
    <>
      <Head>
        <title>DashLord - {url}</title>
      </Head>
      <Url url={url} report={report} selectedTab={selectedTab} />
    </>
  );
};

// create nested urls for tabs
const tabs = ["best-practices", "disponibilite", "securite", "informations"];

// will be passed to the page component as props
export const getStaticProps: GetStaticProps = async ({ params }) => {
  let selectedTab = "";
  if (Array.isArray(params.url)) {
    let fullUrl = decodeURIComponent((params.url as []).join(""));
    if (params.url.length > 1) {
      const lastPart = params.url[params.url.length - 1];
      if (tabs.indexOf(lastPart) > -1) {
        // use selected tab
        fullUrl = decodeURIComponent(
          (params.url.slice(0, params.url.length - 1) as []).join("")
        );
        selectedTab = lastPart;
      }
    }
    const urlData = report.find(
      (u: UrlReport) => slugifyUrl(u.url) === fullUrl
    );
    const url = urlData.url;
    return {
      props: { selectedTab, url, report: urlData || null },
    };
  }
  return { props: {} };
};

// return list of urls to generate
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = report.flatMap((u: UrlReport) => [
    ...tabs.map(
      (tab) => `/url/${encodeURIComponent(slugifyUrl(u.url))}/${tab}`
    ),
    `/url/${encodeURIComponent(slugifyUrl(u.url))}`,
  ]);
  return {
    paths,
    fallback: false,
  };
};
export default PageUrl;
