/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import { useState } from "react";
import { useTranslation } from "react-i18next";

import Employees from "./Employees";

import employee1 from "../../assets/img/employee1.svg";
import employee2 from "../../assets/img/employee2.svg";
import employee3 from "../../assets/img/employee3.svg";

const ITEMS_PER_PAGE = 3;
export default function TeamBanner() {
  const { t } = useTranslation();
  const baseTeam = [
    { img: employee1, name: "Tom Cruise", role: t("about.subtitle5") },
    { img: employee2, name: "Emma Watson", role: t("about.subtitle6") },
    { img: employee3, name: "Will Smith", role: t("about.subtitle7") },
  ];

  const team = [
    ...baseTeam,
    ...baseTeam,
    ...baseTeam,
    ...baseTeam,
    ...baseTeam,
  ];
  const [current, setCurrent] = useState(0);
  const totalSlides = Math.ceil(team.length / ITEMS_PER_PAGE);
  const visible = team.slice(
    current * ITEMS_PER_PAGE,
    current * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

  return (
    <div className="flex flex-col items-center gap-8 py-12 px-4 sm:px-6 lg:px-20 overflow-hidden">
      {/* Team Cards */}
      <div
        key={current}
        className="flex justify-center gap-6 sm:gap-8 flex-wrap animate-[fadeSlide_0.4s_ease-in-out]"
      >
        {visible.map((member, index) => (
          <Employees
            key={index}
            img={member.img}
            name={member.name}
            role={member.role}
            className="
              w-full sm:w-62.5 md:w-75 lg:w-92.5 
              h-62.5 sm:h-80 lg:h-107.5 
              flex flex-col items-center
            "
          />
        ))}
      </div>

      {/* Carousel Dots */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300
              ${
                current === i
                  ? "w-6 h-3 bg-[rgb(var(--color-primary-main))]"
                  : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
              }`}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
