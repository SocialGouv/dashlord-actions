import * as React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import * as H from "history";
import Badge from "./Badge";

import styles from "./grade.cssmodule.scss";

type GradeProps = {
  grade: string;
  label?: string | number | null;
  warning?: string | null;
  to?: H.LocationDescriptor<unknown>;
  small?: boolean;
};

const grades = {
  A: "success",
  B: "info",
  C: "info",
  D: "warning",
  E: "warning",
  F: "danger",
} as Record<string, string>;

export const Grade: React.FC<GradeProps> = ({
  grade,
  warning,
  label,
  to,
  small,
}) => {
  const newGrade = `${grade}`.substring(0, 1).toUpperCase();
  const variant = grades[newGrade] || "danger";

  const title = label !== undefined ? label : grade;

  return (
    <Badge
      variant={variant}
      className={styles[small ? "small" : "big"]}
      to={to}
    >
      {title}
      {warning && (
        <span title={warning} style={{ marginLeft: 5 }}>
          ⚠️
        </span>
      )}
    </Badge>
  );
};
