/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import TeamBanner from "./TeamBanner";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ServiceItemSimple from "../../components/ServiceItemSimple";

import deliveryIcon from "../../assets/icons/icon-delivery.svg";
import supportIcon from "../../assets/icons/Icon-Customer service.svg";
import secureIcon from "../../assets/icons/Icon-secure.svg";
import ServiceItemCard from "../../components/ServiceItemCard";
import StoreIcon from "../../assets/icons/Store-Icon.svg";
import StoreHover from "../../assets/icons/Store-Hover.svg";
import Shopping from "../../assets/icons/Shopping-Bag-Icon.svg";
import ShoppingHover from "../../assets/icons/Shopping-Hover.svg";
import Dolar from "../../assets/icons/Icon-Sale.svg";
import DolarHover from "../../assets/icons/Sale-Hover.svg";
import Moneybag from "../../assets/icons/Icon-Moneybag.svg";
import MoneybagHover from "../../assets/icons/Moneybag-Hover.svg";

function About() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col gap-24 mt-16 px-4 md:px-10 lg:px-20 py-10 ">
      {/* Breadcrumb */}
      <div>
        <span className="text-[rgb(var(--color-text-main-2))]">
          <Link to="/">{t("contact.home")}</Link> /
        </span>

        <span className="text-[rgb(var(--color-text-main))] ml-1">
          {t("about.about")}{" "}
        </span>
      </div>
      {/* 

      {/* Our Story Section */}
      <div className="flex flex-col lg:flex-row gap-19 items-center justify-end">
        <div className="flex flex-col gap-10 ">
          <h1 className="text-[54px] font-semibold">{t("about.story")}</h1>
          <p>{t("about.paragraph1")}</p>
          <p>{t("about.paragraph2")}</p>
        </div>
        <img
          src="src/assets/img/About-Image.png"
          className="w-full max-w-176.25 h-auto lg:h-152.25 object-cover rounded-md"
          alt="About"
        />
      </div>

      {/* Stats Section */}
      <div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <ServiceItemCard
            Icon={StoreIcon}
            IconHover={StoreHover}
            title="10.5k"
            subtitle={t("about.subtitle1")}
          />

          <ServiceItemCard
            Icon={Shopping}
            IconHover={ShoppingHover}
            title="33k"
            subtitle={t("about.subtitle2")}
          />

          <ServiceItemCard
            Icon={Dolar}
            IconHover={DolarHover}
            title="45.5k"
            subtitle={t("about.subtitle3")}
          />

          <ServiceItemCard
            Icon={Moneybag}
            IconHover={MoneybagHover}
            title="25k"
            subtitle={t("about.subtitle4")}
          />
        </div>
      </div>

      {/* Team Banner */}
      <TeamBanner />

      {/* Services Section */}
      <div className="grid grid-cols-3 gap-6 lg:gap-10 px-6 lg:px-20 w-full mb-5">
        <ServiceItemSimple
          Icon={deliveryIcon}
          title={t("services.freeDeliveryTitle")}
          subtitle={t("services.freeDeliveryDes")}
        />

        <ServiceItemSimple
          Icon={supportIcon}
          title={t("services.supportTitle")}
          subtitle={t("services.supportDes")}
        />

        <ServiceItemSimple
          Icon={secureIcon}
          title={t("services.securityTitle")}
          subtitle={t("services.securityDes")}
        />
      </div>
    </div>
  );
}

export default About;
