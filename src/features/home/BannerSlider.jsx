/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import Button from "../../components/Button";
// import iphone from "../../assets/img/iphone.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18n";

function BannerSlider({ banners }) {
  const [active, setActive] = useState(0);
  const sliderRef = useRef(null);
  const { t } = useTranslation();

  const isRTL = i18n.language === "ar" || i18n.language === "ku";

  function startSlider() {
    if (!banners?.length) return;

    sliderRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % banners.length);
    }, 3000);
  }

  function resetSlider(index) {
    clearInterval(sliderRef.current);
    setActive(index);
    startSlider();
  }

  useEffect(() => {
    startSlider();

    return () => clearInterval(sliderRef.current);
  }, [banners]);

  if (!banners?.length) return null;

  return (
    <section className="hidden w-full md:flex justify-center py-10">
      <div className="relative w-[90%] max-w-300 overflow-hidden rounded-md">
        {/* SLIDER */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(${isRTL ? active * 100 : -active * 100}%)`,
          }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="w-full shrink-0 h-80 bg-[rgb(var(--color-bg-dark))] text-white flex items-center justify-between px-30"
            >
              {/* TEXT */}
              <div className="flex flex-col gap-4 max-w-100">
                <p className="text-sm text-[rgb(var(--color-text-main-1))]">
                  {banner.attributes.subtitle}
                </p>

                <h2 className="text-4xl font-semibold">
                  {banner.attributes.title}
                </h2>

                <Link to="/products">
                  <Button>{t("newArrival.buy")}</Button>
                </Link>
              </div>

              {/* IMAGE */}
              <img
                src={banner.attributes.image}
                alt={banner.attributes.title}
                className="h-[90%] object-contain"
              />
            </div>
          ))}
        </div>

        {/* DOTS */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => resetSlider(index)}
              className={`w-3 h-3 rounded-full transition cursor-pointer ${
                index === active
                  ? "bg-[rgb(var(--color-primary-main))] scale-110 border border-white"
                  : "bg-[rgb(var(--color-text-main-1))]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BannerSlider;
