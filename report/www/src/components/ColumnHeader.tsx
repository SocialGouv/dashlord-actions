import * as React from "react";

import { AlertTriangle, Info } from "react-feather";
import Tooltip from "rc-tooltip";

import styles from "./columnHeader.module.scss";

type ColumnHeaderProps = {
  title: string;
  info: string;
  warning?: React.ReactNode;
};

const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  title,
  info,
  warning,
}) => (
  <div className={styles.header}>
    <span>{title}</span>
    <br />
    <Tooltip
      placement="bottom"
      trigger={["hover"]}
      overlay={<div className={styles.tooltip}>{info}</div>}
    >
      <Info size={16} className={styles.info} />
    </Tooltip>

    {warning && (
      <Tooltip
        placement="bottom"
        trigger={["hover"]}
        overlay={<div className={styles.tooltip}>{warning}</div>}
      >
        <AlertTriangle size={16} className={styles.warning} />
      </Tooltip>
    )}
  </div>
);

export default ColumnHeader;
