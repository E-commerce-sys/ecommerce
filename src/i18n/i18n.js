import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// later you will replace these with your real JSON files
import en from "./locales/en.json";
import ar from "./locales/ar.json";
import ku from "./locales/ku.json";

const resources = {
  en: { translation: en },
  ar: { translation: ar },
  ku: { translation: ku },
};

const savedLang = localStorage.getItem("lang") || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
