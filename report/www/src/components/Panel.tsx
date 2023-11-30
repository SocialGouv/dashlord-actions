import * as React from "react";
import classNames from "classnames";
import Tooltip from "rc-tooltip";

import { Search, Info } from "react-feather";
import Link from "next/link";

import styles from "./panel.module.scss";

type PanelProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  info?: string | React.ReactNode;
  url?: string;
  urlText?: string;
  className?: string;
  isExternal?: boolean;
};

export const Panel: React.FC<PanelProps> = ({
  title,
  children,
  info,
  url,
  urlText = "",
  className,
  isExternal = false,
}) => (
  <div className={classNames(styles.container, className)}>
    <div className={styles.banner}>
      <h5 className={styles.mainTitle}>{title}</h5>
      {info && (
        <Tooltip overlay={info}>
          <Info size={20} style={{ marginLeft: 5, cursor: "pointer" }} />
        </Tooltip>
      )}
      {url &&
        (isExternal ? (
          <a
            style={{ float: "right" }}
            href={url}
            target="_blank"
            rel="noreferrer noopener"
          >
            {urlText}
          </a>
        ) : (
          <Link prefetch={false} href={url}>
            <a style={{ float: "right" }}>
              {urlText}
              <Search />
            </a>
          </Link>
        ))}
    </div>
    <div className={styles.body}>{children}</div>
  </div>
);
