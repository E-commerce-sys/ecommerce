/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useMemo } from "react";

import playstation from "../../assets/img/playstation.png";
import speaker from "../../assets/img/echo.png";
import woman from "../../assets/img/woman.png";
import perfume from "../../assets/img/perfume.png";
import { useTranslation } from "react-i18next";

function NewArrivals({ data }) {
  const { t, i18n } = useTranslation();
  const products = useMemo(() => {
    return [...data].sort(() => Math.random() - 0.5).slice(0, 4);
  }, [data]);

  const lang = i18n.language;

  const nameKey =
    lang === "ar" ? "nameAr" : lang === "ku" ? "nameKu" : "nameEn";

  const descriptionKey =
    lang === "ar"
      ? "descriptionAr"
      : lang === "ku"
        ? "descriptionKu"
        : "descriptionEn";

  return (
    <section className="flex justify-center py-12">
      <div className="flex flex-col gap-2 md:gap-8">
        {/* Header */}
        <div className="flex justify-between mx-5 md:mx-10 items-center">
          <div className="flex flex-col gap-2 md:gap-5">
            <div className="flex items-center gap-2 md:gap-4">
              <span className="w-3 h-6 md:w-4 md:h-7 lg:w-5 lg:h-8 bg-[rgb(var(--color-primary-main))] rounded-sm"></span>
              <span className="text-[rgb(var(--color-primary-main))] font-medium text-sm md:text-base">
                {t("newArrival.feature")}
              </span>
            </div>

            <p className="text-[20px] md:text-2xl lg:text-3xl font-semibold">
              {t("newArrival.new")}
            </p>
          </div>
        </div>

        {/* Products */}
        <div className="flex justify-center px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[600px_600px] gap-2 justify-center">
            {/* PLAYSTATION */}
            {products[0] && (
              <div className="relative w-full lg:w-142.5 h-98 lg:h-150 bg-[rgb(var(--color-bg-dark))] rounded-md overflow-hidden flex items-end p-4 text-white">
                <img
                  src={playstation}
                  className="absolute right-0 bottom-0 max-h-[90%] object-contain"
                />

                <div className="relative z-10 max-w-65">
                  <p className="text-lg md:text-xl lg:text-2xl font-semibold">
                    {products[0].attributes[nameKey]}
                  </p>

                  <p className="text-[12px] md:text-sm text-[rgb(var(--color-border))] mt-2 line-clamp-3">
                    {products[0].attributes[descriptionKey]}
                  </p>

                  <button className="mt-4 underline text-sm font-medium">
                    {t("newArrival.buy")}
                  </button>
                </div>
              </div>
            )}

            {/* RIGHT SIDE */}
            <div className="grid grid-rows-[auto_auto] gap-2">
              {/* WOMEN */}
              {products[1] && (
                <div className="relative w-full lg:w-142.5 h-48 lg:h-71 bg-[rgb(var(--color-bg-dark))] rounded-md overflow-hidden flex items-center p-8 text-white">
                  <img
                    src={woman}
                    className="absolute right-0 bottom-0 max-h-[90%] object-contain"
                  />

                  <div className="relative z-10 max-w-65">
                    <p className="text-lg md:text-lg lg:text-xl font-semibold">
                      {products[1].attributes[nameKey]}
                    </p>

                    <p className="text-[12px] md:text-sm text-[rgb(var(--color-border))] mt-2 line-clamp-2">
                      {products[1].attributes[descriptionKey]}
                    </p>

                    <button className="mt-3 underline text-sm font-medium">
                      {t("newArrival.buy")}
                    </button>
                  </div>
                </div>
              )}

              {/* SPEAKER + PERFUME */}
              <div className="grid grid-cols-2 gap-2">
                {products[2] && (
                  <div className="relative w-full lg:w-67.5 h-48 lg:h-71 bg-[rgb(var(--color-bg-dark))] rounded-md overflow-hidden flex items-end p-6 text-white">
                    <img
                      src={speaker}
                      className="absolute max-h-[90%] max-w-[90%] object-contain"
                    />

                    <div className="relative z-10">
                      <p className="text-lg md:text-lg font-semibold">
                        {products[2].attributes[nameKey]}
                      </p>

                      <p className="text-[12px] md:text-sm text-[rgb(var(--color-border))] mt-2 line-clamp-2">
                        {products[2].attributes[descriptionKey]}
                      </p>

                      <button className="mt-2 underline text-sm font-medium">
                        {t("newArrival.buy")}
                      </button>
                    </div>
                  </div>
                )}

                {products[3] && (
                  <div className="relative w-full lg:w-67.5 h-48 lg:h-71 bg-[rgb(var(--color-bg-dark))] rounded-md overflow-hidden flex items-end p-6 text-white">
                    <img
                      src={perfume}
                      className="absolute max-h-[90%] max-w-[90%] object-contain"
                    />

                    <div className="relative z-10">
                      <p className="text-lg md:text-lg font-semibold">
                        {products[3].attributes[nameKey]}
                      </p>

                      <p className="text-[12px] md:text-sm text-[rgb(var(--color-border))] mt-2 line-clamp-2">
                        {products[3].attributes[descriptionKey]}
                      </p>

                      <button className="mt-2 underline text-sm font-medium">
                        {t("newArrival.buy")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;
