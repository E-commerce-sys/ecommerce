/* eslint-disable react/react-in-jsx-scope */
import phone from "../../assets/icons/phone.svg";
import email from "../../assets/icons/email.svg";
import { useTranslation } from "react-i18next";

function ContactInfo() {
  const { t } = useTranslation();

  return (
    <div className="w-full lg:w-[320px] shadow rounded-xl p-6">
      <div className="flex flex-col">
        {/* CALL */}
        <div className="flex flex-col gap-6 border-b border-[rgb(var(--color-text-main))] pb-6">
          <div className="flex gap-4 items-center">
            <div className="bg-[rgb(var(--color-primary-main))] w-10 h-10 rounded-full flex justify-center items-center shrink-0">
              <img src={phone} alt="phone" className="w-5 h-5" />
            </div>

            <p className="font-medium text-[rgb(var(--color-text-main))]">
              {t("contact.call")}
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm md:text-base">
            <p>{t("contact.available")}</p>
            <p>{t("contact.phone")}</p>
          </div>
        </div>

        {/* EMAIL */}
        <div className="flex flex-col gap-6 pt-6">
          <div className="flex gap-4 items-center">
            <div className="bg-[rgb(var(--color-primary-main))] w-10 h-10 rounded-full flex justify-center items-center shrink-0">
              <img src={email} alt="email" className="w-5 h-5" />
            </div>

            <p className="font-medium text-[rgb(var(--color-text-main))]">
              {t("contact.write")}
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm md:text-base">
            <p>{t("contact.fill")}</p>
            <p>customer@exclusive.com</p>
            <p>support@exclusive.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
