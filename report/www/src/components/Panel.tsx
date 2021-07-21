import * as React from "react";

import { Search } from "react-feather";
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
  <div style={{ marginBottom: 20, border: '1px solid var(--g300)', ...style }} className={className}>
    <div style={{ backgroundColor: "var(--g200)", color: "var(--g700)", padding: 16 }}>
      <h5 style={{ display: "inline-block", margin: 0 }}>{title}</h5>
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
            style={{ float: "right"}}
            href={url}
            target="_blank"
            rel="noreferrer noopener"
          >
          </a>
        ) : (
          <Link to={url} style={{ color: "white", float: "right" }}>
            <Search />
          </Link>
        ))}
    </div>
    <div style={{ padding: 16 }}>{children}</div>
  </div>
);
