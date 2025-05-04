import { FC, useState, useEffect, useMemo } from "react";

import { Typewriter } from "react-simple-typewriter";
import ReactSwitch from "react-switch";
import { Icon } from "@iconify/react";
import useAppStore from "../store/useAppStore";

interface HeaderProps {
  sharedData: any;
  applyPickedLanguage: (
    pickedLanguage: string,
    oppositeLangIconId: string
  ) => void;
  changeThme?: () => void;
}

const Header: FC<HeaderProps> = ({ sharedData, applyPickedLanguage, changeThme }) => {
  const [titles, setTitles] = useState<string[]>([]);

  const theme = useAppStore((state) => state.theme);
  const language = useAppStore((state) => state.language)
  const languageIconId = useAppStore((state) => state.languageIconId)
  const setLanguage = useAppStore((state) => state.setLanguage)

  useEffect(() => {
    if (sharedData) {
      const mappedTitles =
        sharedData?.titles?.map((title: string) => title.toUpperCase()) ?? [];
      setTitles(mappedTitles);
    }
  }, [sharedData]);

  useEffect(() => {
    applyPickedLanguage(language, languageIconId);
  }, [language, languageIconId]);
  
  const onThemeSwitchChange = () => {
    if (changeThme) {
      changeThme();
    }
  };

  const HeaderTitleTypeAnimation = useMemo(() => {
    return () => (
      <p className="title-styles">
        <Typewriter
          words={titles} // Puede ser un solo nombre o un array de nombres
          loop={50} // `false` si solo quieres que lo escriba una vez
          typeSpeed={70} // Velocidad de tipeo opcional
          deleteSpeed={50} // Velocidad de borrado si `loop` es `true`
          delaySpeed={1000} // Pausa antes de borrar o siguiente palabra
        />
      </p>
    );
  }, [titles]);

  return (
    <header id="home" style={{ height: '100vh', display: "block" }}>
      <div className="row aligner" style={{ height: "100%" }}>
        <div className="col-md-12">
          <div>
            <Icon
              className="iconify header-icon"
              icon="la:laptop-code"
              inline={false}
            />
            <br />
            <h1 className="mb-0">
              {/* <Typical steps={[name]} wrapper="p" /> */}
              <p>
                <Typewriter
                  words={[sharedData.name]} // Puede ser solo 1 palabra o varias
                />
              </p>
            </h1>
            <div className="title-container">
              <HeaderTitleTypeAnimation />
            </div>
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
        <div className="col-md-12 d-flex gap-5 justify-content-center language">
          <div
            onClick={() => setLanguage("en")}
            style={{ display: "inline" }}
          >
            <Icon
              className="iconify language-icon mr-5"
              icon="twemoji-flag-for-flag-united-states"
              inline={false}
              id={"primary-lang-icon"}
              filter="brightness(40%)"
            />
          </div>
          <div
            onClick={() => setLanguage("es")}
            style={{ display: "inline" }}
          >
            <Icon
              className="iconify language-icon"
              icon="emojione-v1:flag-for-colombia"
              inline={false}
              id={"secondary-lang-icon"}
            ></Icon>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
