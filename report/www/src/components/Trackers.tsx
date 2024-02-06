import * as React from "react";

import Alert from "@codegouvfr/react-dsfr/Alert";
import Table from "@codegouvfr/react-dsfr/Table";

import Flags from "country-flag-icons/react/3x2";

import { smallUrl } from "../utils";
import { Panel } from "./Panel";
import { BadgeUpdatedAt } from "./BadgeUpdatedAt";

type TrackersProps = { data: ThirdPartiesReport };

type CookiesTableProps = { cookies: ThirdPartiesReportCookies };

const sortBy = (accessor) => (a, b) => accessor(a).localeCompare(accessor(b));

const filterByKey = (accessor) => (item, idx, arr) =>
  !arr.find((v, j) => j < idx && accessor(v, idx) === accessor(item, idx + 1));

const cookiesColumns = [
  { name: "name", label: "Cookies" },
  { name: "domain", label: "Domaine" },
  {
    name: "httpOnly",
    label: "HTTP Only",
    render: ({ httpOnly }) => (httpOnly ? "✔️" : "❌"),
  },
  {
    name: "secure",
    label: "Secure",
    render: ({ secure }) => (secure ? "✔️" : "❌"),
  },
];
const CookiesTable: React.FC<CookiesTableProps> = ({ cookies }) => {
  const tableData = [
    cookiesColumns.map((col) => col.name),
    ...((cookies &&
      cookies.map((cookie) => {
        return cookiesColumns.map((col) =>
          col.render ? col.render(cookie) : cookie[col.name]
        );
      })) ||
      []),
  ];
  return (cookies && cookies.length && <Table data={tableData} />) || null;
};

const smallLinkify = (url: string) => (
  <a href={url}>{`${smallUrl(url).substring(0, 25)}...`}</a>
);

type TrackersTableProps = { trackers: ThirdPartiesReportTrackers };

const trackersColumns = [
  { name: "type", label: "Type" },
  {
    name: "url",
    label: "URL",
    render: ({ url }) => {
      return smallLinkify(url);
    },
  },
  {
    name: "details",
    label: "Remédiation",
    render: ({ details = {} }: { details?: any }) => details && details.message,
  },
];

const TrackersTable: React.FC<TrackersTableProps> = ({ trackers }) => {
  const tableData = [
    trackersColumns.map((col) => col.name),
    ...((trackers &&
      trackers.map((tracker) => {
        return trackersColumns.map((col) =>
          col.render ? col.render(tracker) : tracker[col.name]
        );
      })) ||
      []),
  ];

  return (trackers && trackers.length && <Table data={tableData} />) || null;
};
type EndPointsTableProps = { endpoints: ThirdPartiesReportEndpoints };

const endPointsColumns = [
  {
    name: "flag",
    label: "Flag",
    render: (endpoint) => {
      if (endpoint.geoip?.country) {
        const Flag = Flags[endpoint.geoip.country.iso_code];
        const title = endpoint.geoip.country.names.fr;
        return <Flag style={{ width: 60 }} title={title} />;
      }
      return null;
    },
  },
  {
    name: "country",
    label: "Country",
    render: (endpoint) =>
      (endpoint.geoip &&
        endpoint.geoip.country &&
        endpoint.geoip.country.names &&
        endpoint.geoip.country.names.fr) ||
      "?",
  },
  {
    name: "hostname",
    label: "Hostname",
  },
  {
    name: "ip",
    label: "IP",
  },
  {
    name: "city",
    label: "City",
    render: (endpoint) =>
      (endpoint.geoip &&
        endpoint.geoip.city &&
        endpoint.geoip.city.names &&
        endpoint.geoip.city.names.fr) ||
      "?",
  },
];

const EndPointsTable: React.FC<EndPointsTableProps> = ({ endpoints }) => {
  const tableData = [
    endPointsColumns.map((col) => col.name),
    ...((endpoints &&
      endpoints.map((endpoint) => {
        return endPointsColumns.map((col) =>
          col.render ? col.render(endpoint) : endpoint[col.name]
        );
      })) ||
      []),
  ];

  //sortBy((point) => point.geoip?.country?.names?.fr || "");
  return (endpoints && endpoints.length && <Table data={tableData} />) || null;
};

export const Trackers: React.FC<TrackersProps> = ({ data }) => {
  return (
    <>
      <Panel
        title={
          <div>
            Cookies
            <BadgeUpdatedAt
              date={data.headers && data.headers.date}
              style={{ verticalAlign: "middle", paddingLeft: 10 }}
            />
          </div>
        }
      >
        <p>Cookies déposés par le site web au chargement de la page</p>
        <br />
        {(data.cookies && data.cookies.length && (
          <CookiesTable cookies={data.cookies} />
        )) || (
          <Alert
            severity="success"
            title=""
            description="Aucun cookie detecté"
          />
        )}
      </Panel>
      <Panel
        title={
          <div>
            Scripts tiers
            <BadgeUpdatedAt
              date={data.headers && data.headers.date}
              style={{ verticalAlign: "middle", paddingLeft: 10 }}
            />
          </div>
        }
      >
        <p>Scripts tiers chargés par la page</p>
        <br />
        {(data.trackers && data.trackers.length && (
          <>
            <TrackersTable trackers={data.trackers} />
            <EndPointsTable endpoints={data.endpoints} />
          </>
        )) || (
          <Alert
            severity="success"
            title=""
            description="Aucun script tiers detecté"
          />
        )}
      </Panel>
    </>
  );
};
