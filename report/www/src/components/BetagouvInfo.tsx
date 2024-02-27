import * as React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  Crosshair,
  FastForward,
  Settings,
  ThumbsUp,
  Heart,
  XCircle,
} from "react-feather";
import format from "date-fns/format";
import frLocale from "date-fns/locale/fr";

import { Panel } from "./Panel";

type BetagouvProps = { data: BetagouvReport };
type BetagouvPhase = {
  id: string;
  label: string;
  description?: string;
  icon: React.FunctionComponent;
  index: number;
};

// return latest phase augmented data if any
export const getLatestPhase = (allphases: BetagouvReportPhase[]) => {
  const sortedPhases = allphases.sort(sortPhases);
  return sortedPhases.length
    ? getPhase(sortedPhases[sortedPhases.length - 1].name)
    : { label: "-", index: 0 }; // fallback
};

export const Betagouv: React.FC<BetagouvProps> = ({ data }) => {
  const sortedPhases = data.attributes.phases.sort(sortPhases);
  return (
    <Panel title="Phases de la SE">
      <VerticalTimeline lineColor="var(--text-action-high-blue-france)">
        {sortedPhases.map((phase) => {
          const phaseData = getPhase(phase.name);
          return (
            <VerticalTimelineElement
              key={phase.name}
              className="vertical-timeline-element--work"
              contentStyle={{
                background: "var(--background-default-grey)",
                color: "var(--text-default-grey)",
              }}
              contentArrowStyle={{
                borderRight:
                  "7px solid  var(--background-default-moutarde-active)",
              }}
              iconStyle={{
                background: "var(--background-default-grey)",
                color: "var(--text-action-high-blue-france)",
              }}
              icon={<phaseData.icon />}
            >
              <h3
                className="vertical-timeline-element-title"
                style={{ color: "var(--text-action-high-blue-france)" }}
              >
                {phaseData.label}
              </h3>
              <h6
                className="vertical-timeline-element-subtitle"
                style={{ color: "var(--text-action-high-blue-france)" }}
              >
                {phase.start &&
                  format(new Date(phase.start), "PPP", {
                    locale: frLocale,
                  })}
              </h6>

              <p style={{ color: "var(--text-action-high-blue-france)" }}>
                {phaseData.description}
              </p>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </Panel>
  );
};

// index is used when we have similar timestamps for different phases
const phases = [
  {
    id: "investigation",
    label: "Investigation",
    description:
      "Phase expérimentale faite de tests et d’apprentissages terrain dans laquelle l’équipe cherche à se confronter à de premiers utilisateurs dès que possible.",
    icon: Crosshair,
    index: 1,
  },
  {
    id: "construction",
    label: "Construction",
    description:
      "Constituer son équipe et développer son produit en produisant la première version de la solution sur un terrain d’expérimentation.",
    icon: Settings,
    index: 2,
  },
  {
    id: "acceleration",
    label: "Accélération",
    description: "Avoir un produit fini déployé au niveau national.",
    icon: FastForward,
    index: 3,
  },
  { id: "success", label: "Succès", icon: Heart, index: 4 },
  {
    id: "transfer",
    label: "Transfert",
    description:
      "Créer les conditions de la reprise en assurant la pérennité du projet au sein de son administration d'origine.",
    icon: ThumbsUp,
    index: 5,
  },
  { id: "alumni", label: "Partenariat terminé", icon: XCircle, index: 6 },
] as BetagouvPhase[];

export const phaseSeverities = {
  accélération: "info",
  construction: "warning",
  "partenariat terminé": "error",
  transfert: "success",
  succès: "success",
};

const getPhase = (phase: string) => phases.find((f) => f.id === phase);

// sort some input phases
const sortPhases = (a: BetagouvReportPhase, b: BetagouvReportPhase) => {
  if (a.start === b.start) {
    // order dictated by phases definitions
    return (
      phases.find((p) => p.id === a.name).index -
      phases.find((p) => p.id === b.name).index
    );
  }
  // order dictated by date
  return new Date(a.start).getTime() - new Date(b.start).getTime();
};
