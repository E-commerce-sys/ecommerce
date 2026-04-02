/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
// import ServiceItem from "../../components/ServiceItem";
import { useTranslation } from "react-i18next";

import ServiceItemSimple from "../../components/ServiceItemSimple";

import deliveryIcon from "../../assets/icons/delivery.svg";
import supportIcon from "../../assets/icons/CustomerService.svg";
import secureIcon from "../../assets/icons/secure.svg";

function Services() {
  const { t } = useTranslation();
  return (
    <div className="grid w-full min-w-0 max-w-full grid-cols-3 gap-4 px-4 py-20 sm:gap-6 lg:gap-10 lg:px-20">
      <ServiceItemSimple
        Icon={deliveryIcon}
        title={t("services.freeDeliveryTitle")}
        subtitle={t("services.freeDeliveryDes")}
        iconBg="bg-[rgb(var(--color-primary-main))]"
        iconBgLight="bg-[rgb(var(--color-primary-1))]"
      />

      <ServiceItemSimple
        Icon={supportIcon}
        title={t("services.supportTitle")}
        subtitle={t("services.supportDes")}
        iconBg="bg-[rgb(var(--color-primary-main))]"
        iconBgLight="bg-[rgb(var(--color-primary-1))]"
      />

      <ServiceItemSimple
        Icon={secureIcon}
        title={t("services.securityTitle")}
        subtitle={t("services.securityDes")}
        iconBg="bg-[rgb(var(--color-primary-main))]"
        iconBgLight="bg-[rgb(var(--color-primary-1))]"
      />
    </div>
  );
}

export default Services;
