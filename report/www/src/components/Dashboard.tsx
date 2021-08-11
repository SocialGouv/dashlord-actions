import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as H from 'history';
import { Table } from '@dataesr/react-dsfr';
import {
  Search, Slash,
} from 'react-feather';
import { Link } from 'react-router-dom';
import { AccessibilityWarnings } from '../lib/lighthouse/AccessibilityWarnings';
import { isToolEnabled, letterGradeValue, smallUrl } from '../utils';
import { Grade } from './Grade';
import ColumnHeader from './ColumnHeader';

type DashboardProps = { report: DashLordReport };

const IconUnknown = () => <Slash size={20} />;

const percent = (num: number | undefined): string => (num !== undefined && `${Math.floor(num * 100)} %`) || '-';

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
  const getSummaryData = (rowData, grade) => {
    const { summary } = rowData as UrlReport;
    return (
      (summary[grade]
        && letterGradeValue(summary[grade]))
      || -1
    );
  };

  const getColumn = (
    id: string,
    title: string,
    info: string,
    warning: JSX.Element | undefined,
    hash: string,
    gradeKey: string,
    gradeLabel: ((s: UrlReportSummary) => string| number | undefined) | undefined = undefined,
  ) => ({
    name: id,
    sortable: true,
    sort: (a, b) => getSummaryData(a, gradeKey) - getSummaryData(b, gradeKey),
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
      data={report}
      columns={columns}
      rowKey="url"
    />
  );
};
