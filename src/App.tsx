import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import { Icon } from "@iconify/react";
import ReactSwitch from "react-switch";

import { ParticlesBackground } from "./components/ui/ParticlesBackground";

import { Info } from "./types";
import { Lang } from "./types/lang";

import useScrollTop from "./hooks/useScrollTop";
import useAppStore from "./store/useAppStore";

import "./App.scss";
import FixedHeader from "./components/FixedHheader";
import Loader from "./components/ui/Loader";
import Footer from "./components/Footer";

const Header = lazy(() => import("./components/Header"));
const About = lazy(() => import("./components/About"));
const Projects = lazy(() => import("./components/Projects"));
const Skills = lazy(() => import("./components/Skills"));

const App = () => {
  const [resumeData, setResumeData] = useState<Lang>();
  const [sharedData, setSharedData] = useState<Info>();
  const scroll = useScrollTop(600);

  const setThemeApp = useAppStore((state) => state.setTheme);
  const language = useAppStore((state) => state.language);
  const languageIconId = useAppStore((state) => state.languageIconId);

  useEffect(() => {
    loadSharedData();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.body.setAttribute("data-theme", savedTheme);
    } else {
      document.body.setAttribute("data-theme", "light");
    }
  }, []);

  useEffect(() => {
    if (sharedData) {
      setTimeout(() => {
        applyPickedLanguage(language, languageIconId);
      }, 20);
    }
  }, [sharedData]);

  const loadSharedData = useCallback(() => {
    fetch("data/portfolio_shared_data.json", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSharedData(data);
        document.title = `${data.basic_info?.name} | Portfolio`;
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [setSharedData]);

  const loadResumeFromPath = useCallback(
    (path: string) => {
      fetch(`data/${path}`, { cache: "no-store" })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setResumeData(data);
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    [setResumeData]
  );

  const swapCurrentlyActiveLanguage = useCallback(
    (oppositeLangIconId: string) => {
      const pickedLangIconId =
        oppositeLangIconId === languageIconId
          ? "primary-lang-icon"
          : "secondary-lang-icon";
      // document?.getElementById(oppositeLangIconId)?.removeAttribute("filter");
      // document?.getElementById(pickedLangIconId)?.setAttribute("filter", "brightness(40%)");
      document?.querySelectorAll(`#${oppositeLangIconId}`)?.forEach((el) => {
        el.removeAttribute("filter");
      });
      document?.querySelectorAll(`#${pickedLangIconId}`)?.forEach((el) => {
        el.setAttribute("filter", "brightness(40%)");
      });
    },
    []
  );

  const applyPickedLanguage = useCallback(
    (pickedLanguage: string, oppositeLangIconId: string) => {
      swapCurrentlyActiveLanguage(oppositeLangIconId);
      document.documentElement.lang = pickedLanguage;
      const resumePath =
        pickedLanguage === language
          ? `res_primaryLanguage.json`
          : `res_secondaryLanguage.json`;
      loadResumeFromPath(resumePath);
    },
    [swapCurrentlyActiveLanguage, loadResumeFromPath]
  );

  const setTheme = () => {
    const dataThemeAttribute = "data-theme";
    const body = document.body;
    const currentTheme = body.getAttribute(dataThemeAttribute);
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    body.setAttribute(dataThemeAttribute, newTheme);
    setThemeApp(newTheme); // Actualiza el estado global de tu aplicación
    // Guardar el tema en localStorage
    localStorage.setItem("theme", newTheme);
  };

  const onThemeSwitchChange = () => setTheme();

  return (
    <div className="container-back">
      <Suspense fallback={<Loader />}>
        <ParticlesBackground />

        {/* Sticky Menu */}
        <FixedHeader
          scroll={scroll}
          onThemeSwitchChange={onThemeSwitchChange}
          applyPickedLanguage={applyPickedLanguage}
        />
        <Header
          sharedData={sharedData?.basic_info ?? {}}
          applyPickedLanguage={applyPickedLanguage}
          changeThme={setTheme}
        />

        <About
          resumeBasicInfo={resumeData?.basic_info}
          sharedBasicInfo={sharedData?.basic_info}
        />
        <Projects
          resumeProjects={resumeData?.projects}
          resumeBasicInfo={resumeData?.basic_info}
        />
        <Skills
          sharedSkills={sharedData?.skills}
          resumeBasicInfo={resumeData?.basic_info}
        />

        <Footer sharedBasicInfo={sharedData?.basic_info ?? {}} />
      </Suspense>
    </div>
  );
};

export default App;
