import * as React from 'react';

import { Table } from '@dataesr/react-dsfr';
import Badge from './Badge';
import { Panel } from './Panel';

const orderBySeverity = (a: ZapReportSiteAlert, b: ZapReportSiteAlert) => {
  // high criticity first
  const order = parseInt(b.riskcode) - parseInt(a.riskcode);
  if (order === 0) {
    // high confidence first
    return parseInt(b.confidence) - parseInt(a.confidence);
  }
  return order;
};

const OwaspBadge = (row: ZapReportSiteAlert) => {
  const severity = row.riskcode;
  const variant = severity === '0'
    ? 'info'
    : severity === '1'
      ? 'info'
      : severity === '2'
        ? 'warning'
        : severity === '3'
          ? 'danger'
          : 'info';
  return (
    <Badge className="w-100" variant={variant}>
      {row.riskdesc}
    </Badge>
  );
};

type OwaspProps = { data: ZapReport; url: string };

const columns = [
  { name: 'risk', label: 'Risk/Confidence', render: (alert) => <OwaspBadge {...alert} /> },
  { name: 'name', label: 'Name' },
];

export const Owasp: React.FC<OwaspProps> = ({ data, url }) => {
  const alerts = (data && data.site && data.site.flatMap((site) => site.alerts)) || [];
  alerts.sort(orderBySeverity);
  return (
    (alerts.length && (
      <Panel
        isExternal
        title="OWASP"
        url={url}
        info="Scan de vulnérabiliés OWASP baseline"
      >
        <Table
          columns={columns}
          data={alerts}
          rowKey="name"
        />
      </Panel>
    ))
    || null
  );
};
