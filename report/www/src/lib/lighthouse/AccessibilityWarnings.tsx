import * as React from "react";

type AccessibilityWarningProps = {
  style?: React.CSSProperties;
};

export const AccessibilityWarnings = ({ style }: AccessibilityWarningProps) => (
  <div style={style}>
    Moins de 25% des critères d'accessibilité peuvent être testés
    automatiquement, <strong>une expertise manuelle est requise</strong>.
    <br />
    <br />
    Ce score ne représente pas le score RGAA mais une partie des bonnes
    pratiques de base à appliquer.
  </div>
);
