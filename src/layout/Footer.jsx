/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

import Facebook from "../assets/icons/Facebook.svg";
import Instagram from "../assets/icons/Instagram.svg";
import Linkedin from "../assets/icons/Linkedin.svg";
import Twitter from "../assets/icons/Twitter.svg";
import GooglePlay from "../assets/img/Google_Play.svg";
import AppleStore from "../assets/img/App_Store.svg";

function Footer() {
  const { t } = useTranslation();
  const { loggedIn } = useAuth();

  return (
    <footer className="flex w-full min-w-0 max-w-full items-center justify-center overflow-x-hidden bg-[rgb(var(--color-bg-dark))] py-10 text-white">
      <div className="mx-2 flex w-full min-w-0 max-w-full flex-wrap justify-center gap-10 md:gap-20 lg:gap-30">
        <div className=" flex flex-col gap-4 ">
          <h3 className="font-bold text-lg ">Exclusive</h3>
          <p className="font-semibold text-[rgb(var(--color-text-main-1))]">
            {t("footer.subscribe")}
          </p>
          <p className="text-[rgb(var(--color-text-main-1))] ">
            {t("footer.discount")}
          </p>
          <Link
            to="/about"
            className="text-[rgb(var(--color-text-main-1))]  hover:text-white transition-colors"
          >
            {t("footer.about")}
          </Link>
        </div>

        <div className=" flex flex-col gap-4 ">
          <h3 className="font-semibold text-lg">{t("footer.account")}</h3>
          <p>
            {loggedIn ? (
              <Link
                to="/account"
                className="text-[rgb(var(--color-text-main-1))] hover:text-white transition-colors"
              >
                {t("navbar.account")}
              </Link>
            ) : (
              <Link
                to="/register"
                className="text-[rgb(var(--color-text-main-1))] hover:text-white transition-colors"
              >
                {t("footer.login")}
              </Link>
            )}
          </p>
          <p>
            <Link
              to="/cart"
              className="text-[rgb(var(--color-text-main-1))] hover:text-white transition-colors"
            >
              {t("footer.cart")}
            </Link>
          </p>
          <p>
            <Link
              to="/wishlist"
              className="text-[rgb(var(--color-text-main-1))] hover:text-white transition-colors"
            >
              {t("footer.wishlist")}
            </Link>
          </p>
          <p>
            <Link
              to="/"
              className="text-[rgb(var(--color-text-main-1))] hover:text-white transition-colors"
            >
              {t("footer.shop")}
            </Link>
          </p>
        </div>
        <div className=" flex flex-col gap-4 ">
          <h3 className="font-semibold text-lg ">{t("footer.shop")}</h3>
          <p>
            <Link to="/Privacy&Policy" className="text-[rgb(var(--color-text-main-1))] hover:text-white transition-colors">
              {t("footer.privacy")}
            </Link>
          </p>
          <p>
            <Link to="/TOS" className="text-[rgb(var(--color-text-main-1))] hover:text-white transition-colors">
              {t("footer.terms")}
            </Link>
          </p>
          <p>
            <Link to="/FAQ" className="text-[rgb(var(--color-text-main-1))] hover:text-white transition-colors">
              {t("footer.faq")}
            </Link>
          </p>
          <p>
            <Link
              to="/contact"
              className="text-[rgb(var(--color-text-main-1))] hover:text-white transition-colors"
            >
              {t("footer.contact")}
            </Link>
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">{t("footer.download")}</h3>
          <p className="text-[rgb(var(--color-text-main-1))] text-xs mb-3">
            {t("footer.save")}
          </p>
          <div className="flex gap-2 mb-4">
            <div className="bg-white p-1 rounded w-16 h-16" />
            <div className="flex flex-col gap-2">
              <Link to="https://play.google.com/store/apps/details?id=pl.dotsystems.fastlink&pcampaignid=web_share" target="_blank">
              <img src={GooglePlay} className="h-7" />
              </Link>
              <Link to="https://apps.apple.com/us/app/fastlink-4g-lte/id1215675378" target="_blank">
              <img src={AppleStore} className="h-7" />
              </Link>
            </div>
          </div>

          <div className=" flex flex-row gap-4 ">
            <Link to="https://www.facebook.com/Fastlink4G/" target="_blank">
            <img
              src={Facebook}
              size={18}
              className="hover:text-white cursor-pointer transition-colors"
            />
            </Link>
            <Link to="https://www.instagram.com/fastlink_official/" target="_blank">
            <img
              src={Twitter}
              size={18}
              className="hover:text-white cursor-pointer transition-colors"
            />
            </Link>
            <Link to="https://www.instagram.com/fastlink_official/" target="_blank">
            <img
              src={Instagram}
              size={18}
              className="hover:text-white cursor-pointer transition-colors"
            />
            </Link>
            <Link to="https://www.linkedin.com/company/fastlink4g/posts/" target="_blank">
            <img
              src={Linkedin}
              size={18}
              className="hover:text-white cursor-pointer transition-colors"
            />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
