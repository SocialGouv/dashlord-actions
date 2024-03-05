import { useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import { init } from "@socialgouv/matomo-next";

import { fr } from "@codegouvfr/react-dsfr";
import { createEmotionSsrAdvancedApproach } from "tss-react/next/pagesDir";
import { createNextDsfrIntegrationApi } from "@codegouvfr/react-dsfr/next-pagesdir";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";

import { HeaderSite } from "../src/components/HeaderSite";
import { FooterSite } from "../src/components/FooterSite";

import dashlordConfig from "@/config.json";
import report from "@/report.json";

import "../src/dirty.css";
import "../src/overrideDSFR.css";

const MATOMO_URL = dashlordConfig.matomoUrl;
const MATOMO_SITE_ID = dashlordConfig.matomoId;

declare module "@codegouvfr/react-dsfr/next-pagesdir" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

const { withDsfr, dsfrDocumentApi } = createNextDsfrIntegrationApi({
  defaultColorScheme: "system",
  Link,
  useLang: () => {
    const { locale = "fr" } = useRouter();
    return locale;
  },
  preloadFonts:
    (!!dashlordConfig.marianne && [
      //"Marianne-Light",
      //"Marianne-Light_Italic",
      "Marianne-Regular",
      //"Marianne-Regular_Italic",
      "Marianne-Medium",
      //"Marianne-Medium_Italic",
      "Marianne-Bold",
      //"Marianne-Bold_Italic",
      //"Spectral-Regular",
      //"Spectral-ExtraBold"
    ]) ||
    [],
});

export { dsfrDocumentApi };

const { withAppEmotionCache, augmentDocumentWithEmotionCache } =
  createEmotionSsrAdvancedApproach({
    key: "css",
  });

export { augmentDocumentWithEmotionCache };

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // dashboard views
  const isFluid =
    router.asPath === "/" ||
    router.asPath.startsWith("/tag/") ||
    router.asPath.startsWith("/category/") ||
    router.asPath.startsWith("/startup/");

  useEffect(() => {
    if (MATOMO_URL && MATOMO_SITE_ID) {
      init({ url: MATOMO_URL, siteId: "" + MATOMO_SITE_ID });
    }
  }, []);
  return (
    <>
      <Head>
        <title>{dashlordConfig.title.trim()}</title>
        <meta charSet="utf-8" lang="FR-fr" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="Dashboard des applications" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
      </Head>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
        className={dashlordConfig.marianne ? "" : "nonGovernementalWebsite"}
      >
        <MuiDsfrThemeProvider>
          <HeaderSite report={report} />

          <div
            className={fr.cx(
              "fr-container",
              (isFluid && ["fr-container-xl--fluid", "fr-px-4w"]) || null
            )}
            style={{
              flex: 1,
              ...fr.spacing("padding", {
                topBottom: "10v",
              }),
            }}
            id="content"
          >
            <Component {...pageProps} />
          </div>

          <FooterSite />
        </MuiDsfrThemeProvider>
      </div>
    </>
  );
}

export default withDsfr(withAppEmotionCache(App));
