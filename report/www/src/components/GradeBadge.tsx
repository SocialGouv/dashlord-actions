import Badge from "@codegouvfr/react-dsfr/Badge";
import { fr } from "@codegouvfr/react-dsfr";
import { AlertProps } from "@codegouvfr/react-dsfr/Alert";
import Link from "next/link";

export const IconUnknown = () => <i className={fr.cx("ri-forbid-2-line")} />;

export const gradesSeverities = {
  A: "success",
  B: "info",
  C: "info",
  D: "warning",
  E: "warning",
  F: "error",
  G: "error",
};

export const GradeBadge = ({
  label,
  severity,
  showCheckOnSuccess = false,
  showWarningOnError = false,
  hideLabelOnWarning = false,
  title,
  warning,
  linkProps,
  style,
}: {
  label: string;
  severity?: AlertProps.Severity;
  showCheckOnSuccess?: boolean;
  showWarningOnError?: boolean;
  hideLabelOnWarning?: boolean;
  warning?: string;
  title?: string;
  linkProps?: any;
  style?: React.CSSProperties;
}) => {
  const warningNode = warning ? (
    <>
      <i
        className={fr.cx("fr-icon-warning-line")}
        title={warning}
        style={{ cursor: "pointer" }}
      />
    </>
  ) : (
    ""
  );
  const isInteger = label && label.toString().match(/^[\d]+$/);
  const letter =
    (label &&
      !isInteger &&
      label.length < 3 &&
      label.toString().substring(0, 1).toUpperCase()) ||
    "F";
  const text =
    label && isInteger ? (
      label
    ) : letter === "A" && showCheckOnSuccess ? (
      <i className={fr.cx("fr-icon-check-line")} />
    ) : letter === "F" && showWarningOnError ? (
      <i
        className={fr.cx("fr-icon-warning-line")}
        title={warning}
        style={{ cursor: "pointer" }}
      />
    ) : (
      label
    );
  const children = (
    <>
      {hideLabelOnWarning && warningNode ? null : text}
      {warningNode}
    </>
  );
  const finalSeverity = severity || gradesSeverities[letter] || "info";
  const badgeStyle = {
    fontSize: "1em",
    width: 100,
    textAlign: "center" as const,
    display: "inline-block",
    ...style,
  };

  const badge = (
    <Badge severity={finalSeverity} style={badgeStyle} noIcon>
      {children}
    </Badge>
  );

  return label ? (
    linkProps ? (
      <Link title={title} {...linkProps} className="link-discreet">
        {badge}
      </Link>
    ) : (
      badge
    )
  ) : (
    <IconUnknown />
  );
};
