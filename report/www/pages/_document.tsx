import { Html, Head, Main, NextScript, DocumentProps } from "next/document";
import { augmentDocumentWithEmotionCache, dsfrDocumentApi } from "./_app";
import dashlordConfig from "@/config.json";

const { getColorSchemeHtmlAttributes, augmentDocumentForDsfr } =
  dsfrDocumentApi;

export default function Document(props: DocumentProps) {
  return (
    <Html {...getColorSchemeHtmlAttributes(props)}>
      <Head title={dashlordConfig.title} />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

augmentDocumentForDsfr(Document);

augmentDocumentWithEmotionCache(Document);
