import React, { useState } from 'react';
import {
  ToolItem,
  Modal,
  ModalTitle,
  ModalContent,
  RadioGroup,
  Radio,
  Button
} from "@dataesr/react-dsfr";

const changeTheme = (theme: string) => {
  document.documentElement.setAttribute("data-fr-theme", theme);
}

type ThemeSettingsProps = {
}

export const ThemeSettings: React.FC<ThemeSettingsProps> = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const initialTheme = darkModeQuery.matches ? 'dark' : 'light';
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  const themes = [{ label: "Thème clair", value: 'light' }, { label: "Thème sombre", value: 'dark' }];
  return (
    <ToolItem link="#" >
      <Button
        className="fr-link fr-fi-theme-fill fr-link--icon-left"
        secondary
        title="Paramètres d'affichage"
        aria-controls="fr-theme-modal"
        data-fr-opened="false"
        onClick={() => setIsOpenModal(true)}>
        Paramètres d'affichage
      </Button>
      <Modal isOpen={isOpenModal} hide={() => setIsOpenModal(false)}>
        <ModalTitle>Paramètres d'affichage</ModalTitle>
        <ModalContent id="fr-switch-theme" className="fr-switch-theme">
          <RadioGroup
            className="fr-text--regular"
            legend="Choisissez un thème pour personnaliser l’apparence du site."
          >
            {themes.map((theme) =>
              <Radio
                key={theme.value}
                id={`fr-radios-theme-${theme.value}`}
                label={theme.label}
                value={theme.value}
                name="fr-radios-theme"
                isExtended
                checked={currentTheme === theme.value}
                onChange={() => { changeTheme(theme.value); setCurrentTheme(theme.value) }}
              />)}
          </RadioGroup>
        </ModalContent>
      </Modal>
    </ToolItem>
  )
};