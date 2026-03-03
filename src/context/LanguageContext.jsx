import { createContext, useContext, useEffect, useMemo, useState } from "react";
import i18n from "../i18n/i18n";

const LanguageContext = createContext(null);

const isRTL = (lng) => lng === "ar" || lng === "ku"; // Sorani Kurdish is RTL

function applyDirection(lng) {
  document.documentElement.dir = isRTL(lng) ? "rtl" : "ltr";
  document.documentElement.lang = lng;
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(i18n.language || "en");

  useEffect(() => {
    applyDirection(language);
  }, [language]);

  const changeLanguage = async (lng) => {
    setLanguage(lng);
    localStorage.setItem("lang", lng);
    applyDirection(lng);
    await i18n.changeLanguage(lng);
  };

  const value = useMemo(
    () => ({
      language,
      dir: isRTL(language) ? "rtl" : "ltr",
      changeLanguage,
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
