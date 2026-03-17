import { useState } from "react";
import Employees from "./Employees";
import employee1 from "../../assets/img/employee1.png";
import employee2 from "../../assets/img/employee2.png";
import employee3 from "../../assets/img/employee3.png";

const baseTeam = [
  { img: employee1, name: "Tom Cruise", role: "Founder and Chairman" },
  { img: employee2, name: "Emma Watson", role: "Managing Director" },
  { img: employee3, name: "Will Smith", role: "Product Designer" },
];

const team = [...baseTeam, ...baseTeam, ...baseTeam, ...baseTeam, ...baseTeam];

const ITEMS_PER_PAGE = 3;

export default function TeamBanner() {
  const [current, setCurrent] = useState(0);
  const totalSlides = Math.ceil(team.length / ITEMS_PER_PAGE);
  const visible = team.slice(
    current * ITEMS_PER_PAGE,
    current * ITEMS_PER_PAGE + ITEMS_PER_PAGE
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
              w-full sm:w-[250px] md:w-[300px] lg:w-[370px] 
              h-[250px] sm:h-[320px] lg:h-[430px] 
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
              ${current === i
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