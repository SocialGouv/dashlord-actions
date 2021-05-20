import * as React from "react";

import { Table } from "react-bootstrap";

import { Panel } from "./Panel";


type WappalyzerProps = { data: WappalyzerReport };

export const Wappalyzer: React.FC<WappalyzerProps> = ({ data }) => {
    return (
        (data && (
            <Panel
                title="Wappalyzer"
                info="Détection des technologies"
            >
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: 250 }}>
                                name
                            </th>
                            <th>categories</th>
                            <th>website</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.technologies && data.technologies.map((techno: any, i: number) => {
                            return (
                                <tr key={techno.name + i}>
                                    <td>
                                        {techno.name}
                                    </td>
                                    <td>{techno.categories && techno.categories.map((cat: any) => cat.name).join(", ")}</td>
                                    <td><a href={techno.website} target="_blank" rel="nopoener noreferrer">{techno.website}</a></td>
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
