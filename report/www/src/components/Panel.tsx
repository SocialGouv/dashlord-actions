import * as React from "react";
import CallOut from "@codegouvfr/react-dsfr/CallOut";

type PanelProps = {
  title: React.ReactNode;
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
  url,
  urlText,
  target = "_blank",
}) => (
  <CallOut
    buttonProps={
      url && {
        children: urlText || "En savoir plus",
        linkProps:
          {
            href: url,
            target,
          } || undefined,
      }
    }
    title={title}
  >
    {children}
  </CallOut>
);
