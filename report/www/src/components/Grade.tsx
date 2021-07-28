import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as H from 'history';
import { Link } from 'react-router-dom';
import Badge from './Badge';

type GradeProps = {
  grade: string;
  label?: string | number | null;
  to?: H.LocationDescriptor<unknown>;
  small?: boolean;
};

const grades = {
  A: 'success',
  B: 'info',
  C: 'info',
  D: 'warning',
  E: 'danger',
  F: 'danger',
} as Record<string, string>;

export const Grade: React.FC<GradeProps> = ({
  grade, label, to, small,
}) => {
  const newGrade = (`${grade}`).substring(0, 1).toUpperCase();
  const variant = grades[newGrade] || 'danger';

  const title = label !== undefined ? label : grade;

  return (
    <Badge
      variant={variant}
      style={{ minWidth: 60, fontSize: small ? '1.1em' : '2em' }}
    >
      {to ? <Link to={to}>{title}</Link> : title }
    </Badge>
  );
};
