import * as React from "react";

import { Card } from "react-bootstrap";
import { ExternalLink } from "react-feather";

type PanelProps = {
  title: string;
  children: React.ReactNode;
  info?: string | React.ReactNode;
  url?: string;
  style?: object;
  className?:string;
};

export const Panel: React.FC<PanelProps> = ({ title, children, info, url, style, className }) => (
  <Card style={{ marginBottom: 20, ...style }} className={className}>
    <Card.Title style={{ background: "#000091", color: "white", padding: 10 }}>
      {title}
      {info && (
        <span
          style={{ fontWeight: "normal", fontSize: "0.6em", marginLeft: 10 }}
        >
          {info}
        </span>
      )}
      {url && (
        <a
          style={{ color: "white", float: "right" }}
          href={url}
          target="_blank"
          rel="noreferrer noopener"
        >
          <ExternalLink />
        </a>
      )}
    </Card.Title>
    <Card.Body>{children}</Card.Body>
  </Card>
);
