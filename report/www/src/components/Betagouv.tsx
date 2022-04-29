import * as React from "react"
import { Table } from "@dataesr/react-dsfr";
import { Panel } from "./Panel"


type BetagouvProps = { data: BetagouvReport }

const phasesLabel = {
    success: "Succès",
    acceleration: "Accélération",
    construction: "Construction",
    investigation: "Investigation"
}


const Betagouv: React.FC<BetagouvProps> = ({ data }) => {
    const columns = [
        { name: "name", label: "Phase", render: ({ name }) => phasesLabel[name] },
        { name: "start", label: "Start", render: ({ start }) => start || "-" },
        { name: "end", label: "End", render: ({ end }) => end || "-" }
    ]
    return (<Panel title="Phases de la SE">
        <Table rowKey="name" columns={columns} data={data.attributes.phases} />
    </Panel>)
}

export { Betagouv };
