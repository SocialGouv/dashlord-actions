import orderBy from 'lodash.orderby';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as H from 'history';
import { useMemo, useState } from 'react';
import { Table } from '@dataesr/react-dsfr';
import 'react-base-table/styles.css';
import {
  AlertTriangle, Info, Search, Slash,
} from 'react-feather';
import { Link } from 'react-router-dom';
import { AccessibilityWarnings } from '../lib/lighthouse/AccessibilityWarnings';
import { isToolEnabled, letterGradeValue, smallUrl } from '../utils';
import { Grade } from './Grade';

type DashboardProps = { report: DashLordReport };

const IconUnknown = () => <Slash size={20} />;

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
  <div style={{ textAlign: 'center' }}>
    <span style={{ fontSize: '0.9em' }}>
      {title}
      <br />
      <Tooltip
        placement="bottom"
        trigger={['hover']}
        overlay={<div style={{ maxWidth: 300 }}>{info}</div>}
      >
        <Info size={16} style={{ cursor: 'pointer' }} />
      </Tooltip>
    </span>

    {warning && (
      <Tooltip
        placement="bottom"
        trigger={['hover']}
        overlay={<div style={{ maxWidth: 300 }}>{warning}</div>}
      >
        <AlertTriangle
          size={16}
          style={{
            stroke: 'var(--danger)',
            marginLeft: 5,
            cursor: 'pointer',
          }}
        />
      </Tooltip>
    )}
  </div>
);

type SortState = {
  key: string;
  order: SortOrder;
  column: { [column: string]: string };
};

const defaultSort = {
  key: 'url',
  order: 'asc',
  column: { dataKey: 'url' },
} as SortState;

const percent = (num: number | undefined): string => (num !== undefined && `${Math.floor(num * 100)} %`) || '-';

const defaultColumnProps = {
  width: 120,
  sortable: true,
  align: 'center',
} as {
  width: number;
  sortable: boolean;
  align: 'center' | 'left' | 'right';
};

const lighthouseColumnProps = ({
  id,
  title,
  info,
  warning,
}: {
  id: string;
  title: string;
  info: string;
  warning?: any;
}) => ({
  headerRenderer: () => <ColumnHeader title={title} info={info} warning={warning} />,
  dataGetter: ({ rowData }: { rowData: any }) => {
    const { summary } = rowData as UrlReport;
    const scoreKey = `lighthouse_${id}`;
    // @ts-expect-error
    if (summary[scoreKey] === undefined) {
      return -1;
    }
    // @ts-expect-error
    return summary[scoreKey];
  },
  cellRenderer: ({ rowData }: { rowData: any }) => {
    const { summary } = rowData as UrlReport;
    const gradeKey = `lighthouse_${id}Grade`;
    const scoreKey = `lighthouse_${id}`;
    return (
      <GradeBadge
          // @ts-expect-error
        grade={summary[gradeKey]}
          // @ts-expect-error
        label={percent(summary[scoreKey])}
        to={{
          pathname: `/url/${encodeURIComponent((rowData as UrlReport).url)}`,
          hash: 'lighthouse',
        }}
      />
    );
  },
});

const GradeBadge = ({
  grade,
  label,
  to,
}: {
  grade: string | undefined;
  label?: string | number | undefined;
  to?: H.LocationDescriptor<unknown> | undefined;
}) => (grade ? <Grade small grade={grade} label={label} to={to} /> : <IconUnknown />);

export const Dashboard: React.FC<DashboardProps> = ({ report }) => {
  const [sortBy, setSortBy] = useState(defaultSort);
  const onColumnSort = (column: any) => {
    setSortBy(column);
  };

  const sortedReport = useMemo(() => {
    const getSortedRows = (rows: any) => orderBy(
      rows,
      (row) => {
        if (sortBy.column.dataGetter) {
          // @ts-expect-error
          return sortBy.column.dataGetter({ rowData: row });
        } if (sortBy.column.key) {
          return row[sortBy.column.key];
        }
      },
      sortBy.order,
    );

    return getSortedRows(report);
  }, [sortBy, report]);

  const getSummaryData = (rowData, grade) => {
    const { summary } = rowData as UrlReport;
    return (
      (summary[grade]
        && letterGradeValue(summary[grade]))
      || -1
    );
  };

  const getColumn = (id, title, info, warning, hash, gradeKey, gradeLabel = undefined) => ({
    name: id,
    sortable: true,
    sortMethod: (a, b) => getSummaryData(a, 'httpGrade') - getSummaryData(b, 'httpGrade'),
    label: title,
    headerRender: () => (
      <ColumnHeader
        title={title}
        info={info}
        warning={warning}
      />
    ),
    render: (rowData) => {
      const { summary } = rowData as UrlReport;
      return (
        <GradeBadge
          grade={summary[gradeKey]}
          label={gradeLabel && gradeLabel(summary)}
          to={{
            pathname: `/url/${encodeURIComponent((rowData as UrlReport).url)}`,
            hash,
          }}
        />
      );
    },
  });

  const lightHouseColumn = (id, title, info) => getColumn(
    id,
    title,
    info,
    <AccessibilityWarnings />,
    'lighthouse',
    `lighthouse_${id}Grade`,
    (summary) => percent(summary[`lighthouse_${id}`]),
  );

  let columns = [
    {
      name: 'url',
      label: 'URL',
      sortable: true,
      render: (rowData) => (
        <Link
          to={`/url/${encodeURIComponent((rowData as UrlReport).url)}`}
        >
          <Search size={16} />
                &nbsp;
          {smallUrl((rowData as UrlReport).url)}
        </Link>
      ),
    },
  ];
  if (isToolEnabled('lighthouse')) {
    columns = columns.concat([
      lightHouseColumn(
        'accessibility',
        'Accessibilité',
        "Bonnes pratiques en matière d'accessibilité web (LightHouse)",
      ),
      lightHouseColumn(
        'performance',
        'Performance',
        'Performances de chargement des pages web (LightHouse)',
      ),
      lightHouseColumn(
        'seo',
        'SEO',
        'Bonnes pratiques en matière de référencement naturel (LightHouse)',
      ),
    ]);
  }

  if (isToolEnabled('testssl')) {
    columns.push(
      getColumn('ssl',
        'SSL',
        'Niveau de confiance du certificat SSL (testssl.sh)',
        undefined,
        'testssl',
        'testsslGrade'),
    );
  }

  if (isToolEnabled('http')) {
    columns.push(
      getColumn('http',
        'HTTP',
        'Bonnes pratiques de configuration HTTP (Mozilla observatory)',
        undefined,
        'http',
        'httpGrade'),
    );
  }

  if (isToolEnabled('updownio')) {
    columns = columns.concat([
      getColumn('updownio',
        'Disponibilité',
        'Disponibilité du service (updown.io)',
        undefined,
        'updownio',
        'uptimeGrade',
        (summary) => percent((summary.uptime || 0) / 100)),
      getColumn('updownio2',
        'Apdex',
        'Apdex: Application Performance Index : indice de satisfaction des attentes de performance (updown.io)',
        undefined,
        'updownio',
        'apdexGrade',
        (summary) => summary.apdex),
    ]);
  }

  if (isToolEnabled('dependabot')) {
    columns.push(
      getColumn('dependabot',
        'Vulnérabilités',
        'Vulnérabilités applicatives detectées dans les dépendances du code (dependabot)',
        undefined,
        'dependabot',
        'dependabotGrade',
        (summary) => summary.dependabotCount),
    );
  }

  if (isToolEnabled('codescan')) {
    columns.push(
      getColumn('codescan',
        'CodeQL',
        'Potentielles vulnérabilités ou erreurs detectées dans les codes sources (codescan)',
        undefined,
        'codescan',
        'codescanGrade',
        (summary) => summary.codescanCount),
    );
  }

  if (isToolEnabled('nmap')) {
    columns = columns.concat([
      getColumn('nmap',
        'Nmap',
        'Vulnérabilités réseau detectées par Nmap',
        undefined,
        'nmap',
        'nmapGrade'),
      getColumn('nmap2',
        'Ports ouverts',
        'Ports TCP ouverts détectés par nmap',
        undefined,
        'nmap',
        'nmapOpenPortsGrade',
        (summary) => summary.nmapOpenPortsCount)]);
  }

  if (isToolEnabled('thirdparties')) {
    columns = columns.concat([
      getColumn('trackers',
        'Trackers',
        'Nombre de scripts externes détectés',
        <div>
          Certains scripts externes légitimes peuvent être
          considérés comme trackers.
        </div>,
        'thirdparties',
        'trackersGrade',
        (summary) => summary.trackersCount),
      getColumn('cookies',
        'Cookies',
        'Nombre de cookies présents',
        undefined,
        'thirdparties',
        'cookiesGrade',
        (summary) => summary.cookiesCount),
    ]);
  }

  if (isToolEnabled('stats')) {
    columns.push(
      getColumn('stats',
        'Stats',
        'Présence de la page des statistiques',
        undefined,
        'stats',
        'statsGrade',
        (summary) => summary.statsCount),
    );
  }

  return (
    <Table
      data={sortedReport}
      columns={columns}
      rowKey="url"
    />
  );
};
