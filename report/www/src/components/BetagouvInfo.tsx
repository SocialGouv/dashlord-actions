import * as React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  Crosshair,
  FastForward,
  Star,
  Settings,
  ThumbsUp,
  Globe,
  Heart,
  Radio,
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
const getLatestPhase = (phases: BetagouvReportPhase[]) => {
  const sortedPhases = phases.sort(sortPhases);
  return sortedPhases.length
    ? getPhase(sortedPhases[sortedPhases.length - 1].name)
    : { label: "-", index: 0 }; // fallback
};

const Betagouv: React.FC<BetagouvProps> = ({ data }) => {
  const sortedPhases = data.attributes.phases.sort(sortPhases);
  return (
    <Panel title="Phases de la SE">
      <VerticalTimeline lineColor="var(--blue-france-113)">
        {sortedPhases.map((phase) => {
          const phaseData = getPhase(phase.name);
          return (
            <VerticalTimelineElement
              key={phase.name}
              className="vertical-timeline-element--work"
              contentStyle={{
                background: "var(--grey-950)",
                color: "#fff",
              }}
              contentArrowStyle={{
                borderRight: "7px solid  var(--grey-950)",
              }}
              iconStyle={{
                background: "var(--grey-950)",
                color: "var(--blue-france-113)",
              }}
              icon={<phaseData.icon />}
            >
              <h3
                className="vertical-timeline-element-title"
                style={{ color: "var(--blue-france-113)" }}
              >
                {phaseData.label}
              </h3>
              <h6
                className="vertical-timeline-element-subtitle"
                style={{ color: "var(--blue-france-113)" }}
              >
                {phase.start &&
                  format(new Date(phase.start), "PPP", {
                    locale: frLocale,
                  })}
              </h6>

              <p style={{ color: "var(--blue-france-113)" }}>
                {phaseData.description}
              </p>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </Panel>
  );
};

export { Betagouv, getLatestPhase };

// index is used??when we have similar timestamps for different phases
const phases = [
  {
    id: "investigation",
    label: "Investigation",
    description:
      "Phase exp??rimentale faite de tests et d???apprentissages terrain dans laquelle l?????quipe cherche ?? se confronter ?? de premiers utilisateurs d??s que possible.",
    icon: Crosshair,
    index: 1,
  },
  {
    id: "construction",
    label: "Construction",
    description:
      "Constituer son ??quipe et d??velopper son produit en produisant la premi??re version de la solution sur un terrain d???exp??rimentation.",
    icon: Settings,
    index: 2,
  },
  {
    id: "acceleration",
    label: "Acc??l??ration",
    description: "Avoir un produit fini d??ploy?? au niveau national.",
    icon: FastForward,
    index: 3,
  },
  { id: "success", label: "Succ??s", icon: Heart, index: 4 },
  {
    id: "transfer",
    label: "Transfert",
    description:
      "Cr??er les conditions de la reprise en assurant la p??rennit?? du projet au sein de son administration d'origine.",
    icon: ThumbsUp,
    index: 5,
  },
  { id: "alumni", label: "Partenariat termin??", icon: XCircle, index: 6 },
] as BetagouvPhase[];

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
