import * as React from "react";

import { Table, Badge } from "react-bootstrap";
import { getLastUrlSegment } from "../utils";

import { Panel } from "./Panel";

const orderBySeverity = (a: DependabotNode, b: DependabotNode) => {
  // high criticity first
  const severities = new Map();
  severities.set("CRITICAL", 3);
  severities.set("HIGH", 2);
  severities.set("MODERATE", 1);
  severities.set("LOW", 0);
  return (
    severities.get(b.securityVulnerability.severity) -
    severities.get(a.securityVulnerability.severity)
  );
};

const DependabotBadge = (node: DependabotNode) => {
  const severity = node.securityVulnerability.severity;
  const variant =
    severity === "LOW"
      ? "info"
      : severity === "MODERATE"
      ? "warning"
      : severity === "HIGH"
      ? "danger"
      : severity === "CRITICAL"
      ? "danger"
      : "info";
  return (
    <Badge className="w-100" variant={variant}>
      {severity}
    </Badge>
  );
};

type DependabotProps = { data: DependabotRepository; url: string };

export const Dependabot: React.FC<DependabotProps> = ({ data, url }) => {
  const nodes =
    data && data.vulnerabilityAlerts.totalCount > 0
      ? data.vulnerabilityAlerts.nodes
      : [];
  data.vulnerabilityAlerts.nodes.sort(orderBySeverity);
  return (
    (data.vulnerabilityAlerts.totalCount > 0 && (
      <Panel
        title="Dependabot"
        url={data.url + '/security/dependabot'}
        info={
          <span>
            Scan des vulnérabiliés du dépôt Github{" "}
            <a
              style={{ color: "white" }}
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.url}
            </a>
          </span>
        }
      >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: 100 }} className="text-center">
                Sévérité
              </th>
              <th>Dépendance vulnérable</th>
              <th>Vulnérabilités</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node, i: number) => {
              return (
                <tr key={node.securityVulnerability.package.name + i}>
                  <td className="text-center">
                    <DependabotBadge {...node} />
                  </td>
                  <td>{node.securityVulnerability.package.name}</td>
                  <td>
                    {node.securityVulnerability.advisory.references.map(
                      (reference, i: number) => {
                        return (
                          <p key={getLastUrlSegment(reference.url) + i}>
                            <a target="_blank" href={reference.url} rel="noopener noreferrer">
                              {getLastUrlSegment(reference.url)}
                            </a>
                            <br />
                          </p>
                        );
                      }
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Panel>
    )) ||
    null
  );
};
