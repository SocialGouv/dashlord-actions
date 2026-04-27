import * as React from "react";

type AccessibilityWarningProps = {
  className?: string;
};

export const AccessibilityWarnings = ({
  className,
}: AccessibilityWarningProps) => (
  <div className={className}>
    <p className="fr-text--xs">
      Moins de 25 % des tests d&apos;accessibilité sont automatisables, <strong>une expertise manuelle reste nécessaire</strong>.
      Ce score ne reflète pas la conformité RGAA, mais une partie des bonnes pratiques de base.
    </p>
  </div>
);
