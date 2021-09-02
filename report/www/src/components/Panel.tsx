import * as React from "react";
import classNames from "classnames";

import { Search } from "react-feather";
import { Link } from "react-router-dom";

import styles from "./panel.cssmodule.scss";

type PanelProps = {
  title: string;
  children: React.ReactNode;
  info?: string | React.ReactNode;
  url?: string;
  className?: string;
  isExternal?: boolean;
};

export const Panel: React.FC<PanelProps> = ({
  title,
  children,
  info,
  url,
  className,
  isExternal = false,
}) => (
  <div className={classNames(styles.container, className)}>
    <div className={styles.banner}>
      <h5 className={styles.mainTitle}>{title}</h5>
      {info && <span className={styles.secondaryTitle}>{info}</span>}
      {url &&
        (isExternal ? (
          <a
            style={{ float: "right" }}
            href={url}
            target="_blank"
            rel="noreferrer noopener"
          />
        ) : (
          <Link to={url} style={{ float: "right" }}>
            <Search />
          </Link>
        ))}
    </div>
    <div className={styles.body}>{children}</div>
  </div>
);
