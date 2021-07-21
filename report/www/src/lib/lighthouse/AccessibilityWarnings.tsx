import * as React from 'react';

type AccessibilityWarningProps = {
  className?: string;
};

export const AccessibilityWarnings = ({ className }: AccessibilityWarningProps) => (
  <div className={className}>
    Moins de 25% des critères d'accessibilité peuvent être testés
    automatiquement,
    {' '}
    <strong>une expertise manuelle est requise</strong>
    .
    <br />
    <br />
    Ce score ne représente pas le score RGAA mais une partie des bonnes
    pratiques de base à appliquer.
  </div>
);
