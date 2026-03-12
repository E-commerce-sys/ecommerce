/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

import en from "../../assets/icons/en.svg";
import ar from "../../assets/icons/ar.svg";
import ku from "../../assets/icons/ku.svg";

function LanguageList() {
  const { language, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "en", icon: en },
    { code: "ar", icon: ar },
    { code: "ku", icon: ku },
  ];

  return (
    <div className="relative flex justify-center">
      {/* Current Language */}
      <div className="cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
        <img
          src={languages.find((l) => l.code === language)?.icon}
          className="w-6 h-6"
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-9 w-max bg-white border border-[rgb(var(--color-grey))] rounded-md shadow-md flex flex-col">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                changeLanguage(lang.code);
                setOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
            >
              <img src={lang.icon} className="w-5 h-5" />
              <span className="uppercase text-sm">{lang.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageList;
