import ServiceItem from "../../components/ServiceItem";

import deliveryIcon from "../../assets/icons/icon-delivery.svg";
import supportIcon from "../../assets/icons/Icon-Customer service.svg";
import secureIcon from "../../assets/icons/Icon-secure.svg";

function Services() {
  return (
    <div className="grid grid-cols-3 gap-6 lg:gap-10 py-20 px-6 lg:px-20 w-full">
      <ServiceItem
        icon={deliveryIcon}
        title="FREE AND FAST DELIVERY"
        subtitle="Free delivery for all orders over $140"
      />

      <ServiceItem
        icon={supportIcon}
        title="24/7 CUSTOM SERVICE"
        subtitle="Friendly 24/7 customer support"
      />

      <ServiceItem
        icon={secureIcon}
        title="MONEY BACK GUARANTEE"
        subtitle="We return money within 30 days"
      />
    </div>
  );
}

export default Services;
