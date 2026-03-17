/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
// import ServiceItem from "../../components/ServiceItem";

import ServiceItemSimple from "../../components/ServiceItemSimple";
import deliveryIcon from "../../assets/icons/icon-delivery.svg";
import supportIcon from "../../assets/icons/Icon-Customer service.svg";
import secureIcon from "../../assets/icons/Icon-secure.svg";
import { useTranslation } from "react-i18next";

function Services() {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-3 gap-6 lg:gap-10 py-20 px-6 lg:px-20 w-full">
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
