import { UpdownIoDashboard } from '@/components/UpdownIoDashboard';
import dashlordConfig from '@/config.json';
import report from '@/report.json';
import { NextPage } from 'next';
import Head from 'next/head';

const PageUpdownio: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>Updown.io - Disponibilité - {dashlordConfig.title}</title>
      </Head>
      <UpdownIoDashboard report={report} updownioStatusPage={dashlordConfig.updownioStatusPage}/>
    </>
  );
};

export default PageUpdownio;