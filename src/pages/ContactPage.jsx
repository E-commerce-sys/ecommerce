import { Link } from "react-router-dom";
import ContactForm from "../features/contact/ContactForm";
import ContactInfo from "../features/contact/ContactInfo.jsx";
import { useTranslation } from "react-i18next";

function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="mt-16 px-4 md:px-10 lg:px-20 py-10 flex flex-col gap-8">
      {/* Breadcrumb */}
      <div>
        <span className="text-[rgb(var(--color-text-main-2))]">
          <Link to="/">{t("contact.home")}</Link> /
        </span>

        <span className="text-[rgb(var(--color-text-main))] ml-1">
          {t("contact.contact")}
        </span>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
}

export default ContactPage;
