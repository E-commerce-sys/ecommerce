import StoreIcon from "../../assets/icons/Store-Icon.svg?react";
import ShoppingBag from "../../assets/icons/Shopping-Bag-Icon.svg?react";
import SaleIcon from "../../assets/icons/Icon-Sale.svg?react";
import RevenueIcon from "../../assets/icons/Icon-Moneybag.svg?react";
import ServiceItem from "../../components/ServiceItem";
import TeamBanner from "./TeamBanner";
import deliveryIcon from "../../assets/icons/icon-delivery.svg?react";
import supportIcon from "../../assets/icons/Icon-Customer service.svg?react";
import secureIcon from "../../assets/icons/Icon-secure.svg?react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function About() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col gap-12">
      {/* Breadcrumb */}
      <div className="mt-[100px] mb-[50px] px-4 sm:px-6 lg:px-[125px] ">
        <Link to='/' className="hover:underline text-[rgb(var(--color-text-main-1))]">Home /</Link> About
      </div>

      {/* Our Story Section */}
      <div className="flex flex-col lg:flex-row gap-10 items-center px-4 sm:px-6 lg:px-[125px]">
        <div className="flex flex-col gap-10 ">
            <h1 className="text-[54px] font-semibold">Our Story</h1>
            <p>Launced in 2015, Exclusive is South Asia's 
                premier online shopping marketplace with 
                an active presense in Bangladesh. Supported 
                by wide range of tailored marketing, data and service solutions, 
                Exclusive has 10,500 sellers and 300 brands and serves 3 millions 
                customers across the region. 
            </p>
            <p>Exclusive has more than 1 Million products to offer, growing at a very fast.
                Exclusive offers a diverse assotment in categories ranging  from consumer.
            </p>
        </div>
        <img
          src="src/assets/img/About-Image.png"
          className="w-full max-w-[705px] h-auto lg:h-[609px] object-cover rounded-md"
          alt="About"
        />
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-[125px] mt-10">
  <ServiceItem
    Icon={StoreIcon}
    title="10.5k"
    subtitle="Sellers active on our site"
    className="border border-[rgb(var(--color-text-main-3))] hover:bg-[rgb(var(--color-primary-main))] w-full h-[180px] sm:h-[220px] lg:h-[250px] py-[20px] sm:py-[30px] lg:py-[40px] transition-colors duration-300"
    text_hover="group-hover:text-white"
    icon_bg="bg-black group-hover:bg-[rgb(var(--color-grey))]"
    iconClassName="group-hover:text-black"
  />
  <ServiceItem
    Icon={SaleIcon}
    title="33k"
    subtitle="Monthly Product Sales"
    className="border border-[rgb(var(--color-text-main-3))] hover:bg-[rgb(var(--color-primary-main))] w-full h-[180px] sm:h-[220px] lg:h-[250px] py-[20px] sm:py-[30px] lg:py-[40px] transition-colors duration-300"
    text_hover="group-hover:text-white"
    icon_bg="bg-black group-hover:bg-[rgb(var(--color-grey))]"
    iconClassName="group-hover:text-black"
  />
  <ServiceItem
    Icon={ShoppingBag}
    title="45.5k"
    subtitle="Customers active on our site"
    className="border border-[rgb(var(--color-text-main-3))] hover:bg-[rgb(var(--color-primary-main))] w-full h-[180px] sm:h-[220px] lg:h-[250px] py-[20px] sm:py-[30px] lg:py-[40px] transition-colors duration-300"
    text_hover="group-hover:text-white"
    icon_bg="bg-black group-hover:bg-[rgb(var(--color-grey))]"
    iconClassName="group-hover:text-black"
  />
  <ServiceItem
    Icon={RevenueIcon}
    title="25k"
    subtitle="Annual gross sale on our site"
    className="border border-[rgb(var(--color-text-main-3))] hover:bg-[rgb(var(--color-primary-main))] w-full h-[180px] sm:h-[220px] lg:h-[250px] py-[20px] sm:py-[30px] lg:py-[40px] transition-colors duration-300"
    text_hover="group-hover:text-white"
    icon_bg="bg-black group-hover:bg-[rgb(var(--color-grey))]"
    iconClassName="group-hover:text-black"
  />
</div>

      {/* Team Banner */}
      <TeamBanner />

      {/* Services Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 py-20 px-4 sm:px-6 lg:px-[125px] w-full mb-10">
        <ServiceItem
          Icon={deliveryIcon}
          title={t("services.freeDeliveryTitle")}
          subtitle={t("services.freeDeliveryDes")}
          icon_bg="bg-[rgb(var(--color-bg-dark))]"
        />
        <ServiceItem
          Icon={supportIcon}
          title={t("services.supportTitle")}
          subtitle={t("services.supportDes")}
          icon_bg="bg-[rgb(var(--color-bg-dark))]"
        />
        <ServiceItem
          Icon={secureIcon}
          title={t("services.securityTitle")}
          subtitle={t("services.securityDes")}
          icon_bg="bg-[rgb(var(--color-bg-dark))]"
        />
      </div>
    </div>
  );
}

export default About;