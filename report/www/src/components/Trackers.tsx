import * as React from "react";

import { Alert, Table } from "react-bootstrap";
import Flags from "country-flag-icons/react/3x2";

import { smallUrl } from "../utils";
import { Panel } from "./Panel";

type TrackersProps = { data: ThirdPartiesReport };

type CookiesTableProps = { cookies: ThirdPartiesReportCookies };

const CookiesTable: React.FC<CookiesTableProps> = ({ cookies }) =>
  (cookies && cookies.length && (
    <Table striped bordered hover style={{ marginBottom: 10 }}>
      <thead>
        <tr>
          <th className="bg-dark text-white" colSpan={4}>
            Cookies
          </th>
        </tr>
        <tr>
          <th>name</th>
          <th>domain</th>
          <th className="text-center">httpOnly</th>
          <th className="text-center">secure</th>
        </tr>
      </thead>
      <tbody>
        {cookies.map((cookie, i: number) => (
          <tr key={cookie.name + "" + i}>
            <td>{cookie.name}</td>
            <td>{cookie.domain}</td>
            <td className="text-center">{cookie.httpOnly ? "✔️" : "❌"}</td>
            <td className="text-center">{cookie.secure ? "✔️" : "❌"}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )) ||
  null;

const smallLinkify = (url: string) => (
  <a href={url}>{smallUrl(url).substring(0, 25) + "..."}</a>
);

type TrackersTableProps = { trackers: ThirdPartiesReportTrackers };

const TrackersTable: React.FC<TrackersTableProps> = ({ trackers }) =>
  (trackers && trackers.length && (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th className="bg-dark text-white" colSpan={3}>
            Third-parties ressources
          </th>
        </tr>
        <tr>
          <th>type</th>
          <th>url</th>
          <th>remédiation</th>
        </tr>
      </thead>
      <tbody>
        {trackers.map((tracker, i: number) => {
          return (
            <tr key={tracker.url + i}>
              <td>{tracker.type}</td>
              <td>{smallLinkify(tracker.url)}</td>
              <td>{tracker.details && tracker.details.message}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  )) ||
  null;

type EndPointsTableProps = { endpoints: ThirdPartiesReportEndpoints };

const EndPointsTable: React.FC<EndPointsTableProps> = ({ endpoints }) =>
  (endpoints && endpoints.length && (
    <Table striped bordered hover style={{ marginBottom: 10 }}>
      <thead>
        <tr>
          <th style={{ width: 100 }}>Flag</th>
          <th>Hostname</th>
          <th>IP</th>
          <th>City</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {endpoints.map((endpoint, i: number) => {
          const Flag =
            (endpoint.geoip &&
              endpoint.geoip.country &&
              Flags[endpoint.geoip.country.iso_code]) ||
            null;
          return (
            <tr key={endpoint.hostname + "-" + endpoint.ip}>
              <td className="text-center">
                {Flag && endpoint.geoip && endpoint.geoip.country && (
                  <Flag
                    style={{ width: 60 }}
                    title={endpoint.geoip.country.names.fr}
                  />
                )}
              </td>
              <td>{endpoint.hostname}</td>
              <td>{endpoint.ip}</td>
              <td>
                {(endpoint.geoip &&
                  endpoint.geoip.city &&
                  endpoint.geoip.city.names.fr) ||
                  "?"}
              </td>

              <td>
                {(endpoint.geoip &&
                  endpoint.geoip.country &&
                  endpoint.geoip.country.names.fr) ||
                  "?"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  )) ||
  null;

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
