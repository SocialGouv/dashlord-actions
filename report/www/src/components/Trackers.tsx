import * as React from 'react';

import { Alert, Table } from '@dataesr/react-dsfr';
import Flags from 'country-flag-icons/react/3x2';

import { smallUrl } from '../utils';
import { Panel } from './Panel';

type TrackersProps = { data: ThirdPartiesReport };

type CookiesTableProps = { cookies: ThirdPartiesReportCookies };

const cookiesColumns = [
  { name: 'name', label: 'Cookies' },
  { name: 'domain', label: 'Domaine' },
  { name: 'httpOnly', label: 'HTTP Only', render: ({ httpOnly }) => (httpOnly ? '✔️' : '❌') },
  { name: 'secure', label: 'Secure', render: ({ secure }) => (secure ? '✔️' : '❌') },
];
const CookiesTable: React.FC<CookiesTableProps> = ({ cookies }) => (cookies && cookies.length && (
<Table
  caption="Cookies"
  captionPosition="none"
  rowKey="name"
  columns={cookiesColumns}
  data={cookies}
/>
))
  || null;

const smallLinkify = (url: string) => (
  <a href={url}>{`${smallUrl(url).substring(0, 25)}...`}</a>
);

type TrackersTableProps = { trackers: ThirdPartiesReportTrackers };

const trackersColumns = [
  { name: 'type', label: 'Type' },
  { name: 'url', label: 'URL', render: ({ url }) => smallLinkify(url) },
  { name: 'details', label: 'Remédiation', render: ({ details }) => details && details.message },
];
const TrackersTable: React.FC<TrackersTableProps> = ({ trackers }) => (trackers && trackers.length && (
<Table
  caption="Trackers"
  captionPosition="none"
  columns={trackersColumns}
  data={trackers}
  rowKey="url"
/>
))
  || null;

type EndPointsTableProps = { endpoints: ThirdPartiesReportEndpoints };

const endPointsColumns = [
  {
    name: 'flag',
    label: 'Flag',
    render: (endpoint) => {
      if (endpoint.geoip && endpoint.geoip.country) {
        const Flag = Flags[endpoint.geoip.country.iso_code];
        return (
          <Flag
            style={{ width: 60 }}
            title={endpoint.geoip.country.names.fr}
          />
        );
      }
      return null;
    },
  },
  {
    name: 'hostname',
    label: 'Hostname',
  },
  {
    name: 'ip',
    label: 'IP',
  },
  {
    name: 'city',
    label: 'City',
    render: (endpoint) => (endpoint.geoip
    && endpoint.geoip.city
    && endpoint.geoip.city.names.fr)
    || '?',
  },
  {
    name: 'country',
    label: 'Country',
    render: (endpoint) => (endpoint.geoip
    && endpoint.geoip.country
    && endpoint.geoip.country.names.fr)
    || '?',
  },
];
const EndPointsTable: React.FC<EndPointsTableProps> = ({ endpoints }) => (endpoints && endpoints.length && (

<Table
  caption="End Points"
  captionPosition="none"
  columns={endPointsColumns}
  data={endpoints}
  rowKey="ip"
/>
))
  || null;

export const Trackers: React.FC<TrackersProps> = ({ data }) => {
  const hasIssues = [];
  if (data.cookies && data.cookies.length) {
    hasIssues.push(...data.cookies);
  }
  if (data.trackers && data.trackers.length) {
    hasIssues.push(...data.trackers);
  }
  return (
    (hasIssues.length && (
      <Panel
        title="Third parties"
        info="Scripts tiers embarqués dans la page web"
      >
        <CookiesTable cookies={data.cookies} />
        <TrackersTable trackers={data.trackers} />
        <EndPointsTable endpoints={data.endpoints} />
      </Panel>
    )) || (
      <Panel
        title="Third parties"
        info="Scripts tiers embarqués dans la page web"
      >
        <Alert variant="success">Aucun script third-party detecté</Alert>
      </Panel>
    )
  );
};
