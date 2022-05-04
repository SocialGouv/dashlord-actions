import * as React from "react"
import { Table } from "@dataesr/react-dsfr";
import { Panel } from "./Panel"

type BetagouvProps = { data: BetagouvReport }

const Betagouv: React.FC<BetagouvProps> = ({ data }) => {
    const columns = [
        { name: "name", label: "Phase", render: ({ name }) => getPhaseLabel(name) },
        { name: "start", label: "Start", render: ({ start }) => start || "-" },
        { name: "end", label: "End", render: ({ end }) => end || "-" }
    ]
    return (<Panel title="Phases de la SE">
        <Table rowKey="name" columns={columns} data={data.attributes.phases} />
    </Panel>)
}

export { Betagouv, getPhaseLabel };

function getPhaseLabel(phase: string) {
    switch (phase) {
        case "investigation":
            return "Investigation";
        case "construction":
            return "Construction";
        case "acceleration":
            return "Accélération";
        case "success":
            return "Succès";
        default:
            return phase
    }
}