import { useLayoutEffect, useState, type FC } from "react";
import { Icon } from "@iconify/react";
import ReactSwitch from "react-switch";

import useAppStore from "../store/useAppStore";

interface FixedHeaderProps {
  scroll: boolean;
  onThemeSwitchChange: () => void;
  applyPickedLanguage: (
    pickedLanguage: string,
    oppositeLangIconId: string
  ) => void;
}

const FixedHeader: FC<FixedHeaderProps> = ({
  scroll,
  onThemeSwitchChange,
  applyPickedLanguage,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const theme = useAppStore((state) => state.theme);
  const language = useAppStore((state) => state.language);
  const languageIconId = useAppStore((state) => state.languageIconId);
  const setLanguage = useAppStore((state) => state.setLanguage);

  useLayoutEffect(() => {
    if (scroll) {
      setTimeout(() => {
        applyPickedLanguage(language, languageIconId);
      }, 20);
    }
  }, [scroll, language, languageIconId]);

  if (!scroll) return null; // Si el scroll es verdadero, no se muestra el header

  return (
    <div
      className="top-0 z-50 shadow"
      style={{
        position: "fixed",
        width: "100%",
        height: "70px",
        top: 0,
        padding: "1rem",
        zIndex: 100,
        backgroundColor: "rgba(255, 255, 255, 0.3)", // Fondo translúcido
        backdropFilter: "blur(10px)", // Desenfoque del fondo
        WebkitBackdropFilter: "blur(10px)", // Soporte para Safari
        transition: "backdrop-filter 0.3s ease-in-out",
      }}
    >
      <nav className="d-flex justify-content-between align-items-center">

        {/* Botón Hamburguesa */}
        <button
          className="btn d-md-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <Icon icon="mdi:menu" className="fs-2" />
        </button>

        {/* Menú datos */}
        <ul className="fixed-header gap-5 justify-content-center align-items-center">
          <li>
            <a
              href="#about"
              className="text-decoration-none text-dark"
              style={{ fontSize: "1.2rem" }}
            >
              About Me
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="text-decoration-none text-dark"
              style={{ fontSize: "1.2rem" }}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#skills"
              className="text-decoration-none text-dark"
              style={{ fontSize: "1.2rem" }}
            >
              Skills
            </a>
          </li>
        </ul>

        <div className="d-flex gap-5 justify-content-center align-items-center">
          <div className="d-flex gap-4 justify-content-center">
            <div
              onClick={() => setLanguage("en")}
              style={{ display: "inline" }}
            >
              <Icon
                className="iconify language-icon mr-5"
                icon="twemoji-flag-for-flag-united-states"
                inline={false}
                id="primary-lang-icon"
              />
            </div>
            <div
              onClick={() => setLanguage("es")}
              style={{ display: "inline" }}
            >
              <Icon
                className="iconify language-icon mr-5"
                icon="emojione-v1:flag-for-colombia"
                inline={false}
                id="secondary-lang-icon"
              />
            </div>
          </div>

          <div className="d-flex gap-4 justify-content-center">
            <ReactSwitch
              checked={theme === "dark"}
              onChange={onThemeSwitchChange}
              offColor="#baaa80"
              onColor="#353535"
              className="react-switch mx-auto"
              width={90}
              height={40}
              uncheckedIcon={
                <Icon
                  className="iconify"
                  icon="emojione-v1:full-moon"
                  inline={false}
                  style={{
                    display: "block",
                    height: "100%",
                    fontSize: 25,
                    textAlign: "end",
                    marginLeft: "20px",
                    color: "#353239",
                  }}
                />
              }
              checkedIcon={
                <Icon
                  className="iconify"
                  icon="fxemoji:whitesun"
                  inline={false}
                  style={{
                    display: "block",
                    height: "100%",
                    fontSize: 25,
                    textAlign: "end",
                    marginLeft: "10px",
                    color: "#353239",
                  }}
                />
              }
              id="icon-switch"
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default FixedHeader;
