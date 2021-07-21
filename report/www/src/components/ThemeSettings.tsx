import React, { useEffect, useState } from "react";
import {
  ToolItem,
  Modal,
  ModalTitle,
  ModalContent,
  RadioGroup,
  Radio,
  Button,
} from "@dataesr/react-dsfr";

type ThemeSettingsProps = {
};

const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
const initialTheme = darkModeQuery.matches ? "light" : "light";

const themes = [
  { label: "Thème clair", value: "light" },
  { label: "Thème sombre", value: "dark" },
];

export const ThemeSettings: React.FC<ThemeSettingsProps> = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-fr-theme", currentTheme);
  }, [currentTheme]);

  return (
    <>
      <ToolItem link="#">
        <Button
          className="fr-link fr-fi-theme-fill fr-link--icon-left"
          secondary
          title="Paramètres d'affichage"
          aria-controls="fr-theme-modal"
          data-fr-opened="false"
          onClick={() => setIsOpenModal(true)}
        >
          Paramètres d"affichage
        </Button>
      </ToolItem>
      <Modal isOpen={isOpenModal} hide={() => setIsOpenModal(false)}>
      <ModalTitle>Paramètres d"affichage</ModalTitle>
      <ModalContent id="fr-switch-theme" className="fr-switch-theme">
        <RadioGroup
          className="fr-text--regular"
          legend="Choisissez un thème pour personnaliser l’apparence du site."
          value={currentTheme}
          onChange={setCurrentTheme}
        >
          {themes.map((theme) => (
            <Radio
              key={theme.value}
              label={theme.label}
              value={theme.value}
              isExtended
            />
          ))}
        </RadioGroup>
      </ModalContent>
    </Modal>
  </>
  );
};
