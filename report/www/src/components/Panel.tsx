import * as React from "react";
import CallOut from "@codegouvfr/react-dsfr/CallOut";

type PanelProps = {
  title: React.ReactNode;
  titleAs?: "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  children: React.ReactNode;
  info?: string | React.ReactNode;
  url?: string;
  urlText?: string;
  target?: string;
  className?: string;
  isExternal?: boolean;
};

export const Panel: React.FC<PanelProps> = ({
  title,
  children,
  url = null,
  urlText = null,
  titleAs = "h2",
  target = "_blank",
}) => (
  <CallOut
    buttonProps={
      (url && {
        children: urlText || "En savoir plus",
        linkProps: {
          href: url,
          target,
        },
      }) ||
      undefined
    }
    title={title}
    titleAs={titleAs}
  >
    {children}
  </CallOut>
);
