import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import * as React from "react";
import { Container } from "@dataesr/react-dsfr";
import Head from "next/head";
import { init } from "@socialgouv/matomo-next";

import "@gouvfr/dsfr/dist/utility/utility.main.min.css";
import "@gouvfr/dsfr/dist/dsfr/dsfr.main.min.css";
import "rc-tooltip/assets/bootstrap.css";

import { HeaderSite } from "../src/components/HeaderSite";
import { FooterSite } from "../src/components/FooterSite";

import "../src/custom.css";

const dashlordConfig: DashlordConfig = require("../src/config.json");

const report: DashLordReport = require("../src/report.json");

const MATOMO_URL = dashlordConfig.matomoUrl;
const MATOMO_SITE_ID = dashlordConfig.matomoId;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const fluid =
    router.asPath === "/" ||
    router.asPath.match(/^\/tag\/.+/) ||
    router.asPath.match(/^\/category\/.+/);
  React.useEffect(() => {
    init({ url: MATOMO_URL, siteId: "" + MATOMO_SITE_ID });
  }, []);
  return (
    <div>
      <Head>
        <meta charSet="utf-8" lang="FR-fr" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="Dashboard des applications" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <title>DashLord</title>
      </Head>
      <HeaderSite report={report} />
      <Container fluid={fluid}>
        <div role="main" className="fr-my-4w">
          <Component {...pageProps} />
        </div>
      </Container>
      <FooterSite />
    </div>
  );
}

export default MyApp;
