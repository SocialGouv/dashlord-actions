import type { NextPage } from "next";
import Head from "next/head";

import dashlordConfig from "@/config.json";

const Page404: NextPage = () => {
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

export default Page404;
