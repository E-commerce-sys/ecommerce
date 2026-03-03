import { useLanguage } from "../../context/LanguageContext";

function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage("en")}
        className={`px-3 py-1 rounded border ${
          language === "en" ? "bg-black text-white" : "bg-white"
        }`}
      >
        EN
      </button>

      <button
        onClick={() => changeLanguage("ar")}
        className={`px-3 py-1 rounded border ${
          language === "ar" ? "bg-black text-white" : "bg-white"
        }`}
      >
        AR
      </button>

      <button
        onClick={() => changeLanguage("ku")}
        className={`px-3 py-1 rounded border ${
          language === "ku" ? "bg-black text-white" : "bg-white"
        }`}
      >
        KU
      </button>
    </div>
  );
}

export default LanguageSwitcher;
