import * as React from "react";

import { Alert, Table } from "@dataesr/react-dsfr";
import Flags from "country-flag-icons/react/3x2";

import { smallUrl } from "../utils";
import { Panel } from "./Panel";

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
const CookiesTable: React.FC<CookiesTableProps> = ({ cookies }) =>
  (cookies && cookies.length && (
    <Table rowKey="name" columns={cookiesColumns} data={cookies} />
  )) ||
  null;

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
    render: ({ details }) => details && details.message,
  },
];
const TrackersTable: React.FC<TrackersTableProps> = ({ trackers }) =>
  (trackers && trackers.length && (
    <Table
      columns={trackersColumns}
      data={trackers.filter(
        filterByKey(
          // group by type except for "unknown" trackers
          (t: ThirdPartyTracker, idx) => (t.type !== "unknown" && t.type) || idx
        )
      )}
      rowKey={(row) => row.type + row.url}
    />
  )) ||
  null;

type EndPointsTableProps = { endpoints: ThirdPartiesReportEndpoints };

const endPointsColumns = [
  {
    name: "flag",
    label: "Flag",
    render: (endpoint) => {
      if (endpoint.geoip && endpoint.geoip.country) {
        const Flag = Flags[endpoint.geoip.country.iso_code];
        return (
          endpoint.geoip.country.namesendpoint &&
          endpoint.geoip.country.namesendpoint.geoip &&
          endpoint.geoip.country.namesendpoint.geoip.country &&
          endpoint.geoip.country.namesendpoint.geoip.country.names && (
            <Flag
              style={{ width: 60 }}
              title={
                endpoint.geoip.country.namesendpoint.geoip.country.names.fr
              }
            />
          )
        );
      }
      return null;
    },
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
];

const EndPointsTable: React.FC<EndPointsTableProps> = ({ endpoints }) =>
  (endpoints && endpoints.length && (
    <Table
      columns={endPointsColumns}
      data={endpoints.sort(
        sortBy((point) => point.geoip?.country?.names?.fr || "")
      )}
      rowKey="ip"
    />
  )) ||
  null;

export const Trackers: React.FC<TrackersProps> = ({ data }) => {
  const hasIssues: (ThirdPartyCookie | ThirdPartyTracker)[] = [];
  if (data.cookies && data.cookies.length) {
    hasIssues.push(...data.cookies);
  }
  if (data.trackers && data.trackers.length) {
    hasIssues.push(...data.trackers);
  }
  return (
    (hasIssues.length && (
      <Panel
        title="Scripts tiers et cookies"
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
        <Alert
          type="success"
          title=""
          description="Aucun script third-party detecté"
        />
      </Panel>
    )
  );
};
