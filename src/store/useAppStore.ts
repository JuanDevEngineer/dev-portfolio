import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type Language = "en" | "es";
type Theme = "light" | "dark";

type AppState = {
  theme: Theme;
  language: Language;
  languageIconId: "primary-lang-icon" | "secondary-lang-icon";
};

type AppActions = {
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
  setLanguage: (lang: "en" | "es") => void;
};

const useAppStore = create<AppState & AppActions>()(
  devtools((set) => ({
    theme: "light",
    language: "en",
    languageIconId: "secondary-lang-icon",
    setTheme: (theme) => set({ theme }),
    toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
    setLanguage: (lang) => {
      set({ 
        language: lang, 
        languageIconId: lang === "en" ? "secondary-lang-icon" : "primary-lang-icon" 
      });
    },
})))

export default useAppStore