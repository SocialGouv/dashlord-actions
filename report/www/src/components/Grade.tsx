import * as React from "react";

import { Badge } from "react-bootstrap";

type GradeProps = {
  grade: string | number;
  label?: string | number | null;
  small?: boolean;
};

const grades = {
  A: "success",
  B: "info",
  C: "info",
  D: "warning",
  E: "danger",
  F: "danger",
} as Record<string, string>;

export const Grade: React.FC<GradeProps> = ({ grade, label, small }) => {
  const newGrade = (grade + "").substring(0, 1).toUpperCase();
  const variant = grades[newGrade] || "danger";

  return (
    <Badge
      variant={variant}
      style={{ minWidth: 60, fontSize: small ? "1.1em" : "2em" }}
    >
      {label !== undefined ? label : grade}
    </Badge>
  );
};
