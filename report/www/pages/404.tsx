import dashlordConfig from '@/config.json';
import type { NextPage } from "next";
import Head from "next/head";

const PageIntro: NextPage = () => {
  return (
    <>
      <Head>
        <title>{dashlordConfig.title} - Page non trouvée</title>
      </Head>
      <br />
      <br />
      <br />
      <br />
      <p>
        <strong>Oops, ce lien n&apos;est plus valable :/</strong>
      </p>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default PageIntro;
