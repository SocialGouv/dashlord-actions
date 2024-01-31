import type { AppProps } from "next/app";
import { createNextDsfrIntegrationApi } from "@codegouvfr/react-dsfr/next-pagesdir";
import { createEmotionSsrAdvancedApproach } from "tss-react/next/pagesDir";
import { fr } from "@codegouvfr/react-dsfr";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";
import Link from "next/link";
import { useRouter } from "next/router";

import { HeaderSite } from "../src/components/HeaderSite";
import { FooterSite } from "../src/components/FooterSite";

import dashlordConfig from "@/config.json";
import report from "@/report.json";

import Head from "next/head";

import "../src/dirty.css";
import "../src/overrideDSFR.css";

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
  preloadFonts: !!dashlordConfig.marianne && [
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
  ],
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
