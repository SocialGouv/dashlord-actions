import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import uniq from "lodash.uniq";

import { Dashboard } from "../../src/components/Dashboard";
const report: DashLordReport = require("../../src/report.json");

const Tag = ({ report, tag }: { report: DashLordReport; tag: string }) => {
  return (
    <>
      <Head>
        <title>Dashlord - tag {tag}</title>
      </Head>
      <Dashboard report={report} />
    </>
  );
};

// will be passed to the page component as props
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = (params && (params.tag as string)) || "none";
  const tagReport = report.filter(
    (u: UrlReport) => u.tags && u.tags.includes(tag)
  );
  return {
    props: { tag, report: tagReport || null },
  };
};

// return list of urls to generate
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: uniq(report.flatMap((u: UrlReport) => u.tags)).map(
    (tag) => `/tag/${tag}`
  ),
  fallback: false,
});

export default Tag;
