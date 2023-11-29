import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import uniq from "lodash.uniq";

import { Dashboard } from "../../src/components/Dashboard";
import report from '@/report.json';
import dashlordConfig from '@/config.json';

const Tag = ({ report, tag }: { report: DashLordReport; tag: string }) => {
  return (
    <>
      <Head>
        <title>Catégorie {tag} - {dashlordConfig.title}</title>
      </Head>
      <Dashboard report={report} />
    </>
  );
};

// will be passed to the page component as props
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = (params && (params.category as string)) || "none";
  const categoryReport = report.filter(
    (u: UrlReport) => u.category && u.category === category
  );
  return {
    props: { category, report: categoryReport || null },
  };
};

// return list of urls to generate
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: uniq(report.map((u: UrlReport) => `/category/${u.category}`)),
  fallback: false,
});

export default Tag;
