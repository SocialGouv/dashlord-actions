import * as React from "react";
import Badge from "./Badge";

import styles from "./grade.module.scss";

type GradeProps = {
  grade: string;
  label?: string | number | null;
  warning?: string | null;
  to?: string;
  small?: boolean;
  colorVariant?: ColorVariant;
  style?: React.CSSProperties;
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
  colorVariant,
  style,
}) => {
  const newGrade = `${grade}`.substring(0, 1).toUpperCase();
  const variant = colorVariant || grades[newGrade] || "danger";

  const title = label !== undefined ? label : grade;

  return (
    <Badge
      variant={variant}
      className={styles[small ? "small" : "big"]}
      to={to}
      style={style}
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
