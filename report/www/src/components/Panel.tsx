import * as React from "react";

import { Card } from "react-bootstrap";
import { ExternalLink, Search } from "react-feather";
import { Link } from "react-router-dom";

type PanelProps = {
  title: string;
  children: React.ReactNode;
  info?: string | React.ReactNode;
  url?: string;
  style?: object;
  className?: string;
  isExternal?: boolean;
};

export const Panel: React.FC<PanelProps> = ({
  title,
  children,
  info,
  url,
  style,
  className,
  isExternal = false,
}) => (
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
      {url &&
        (isExternal ? (
          <a
            style={{ color: "white", float: "right" }}
            href={url}
            target="_blank"
            rel="noreferrer noopener"
          >
            <ExternalLink />
          </a>
        ) : (
          <Link to={url} style={{ color: "white", float: "right" }}>
            <Search />
          </Link>
        ))}
    </Card.Title>
    <Card.Body>{children}</Card.Body>
  </Card>
);
