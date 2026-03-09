import Facebook from "../assets/icons/Icon-Facebook.svg";
import Instagram from "../assets/icons/Icon-instagram.svg";
import Linkedin from "../assets/icons/Icon-Linkedin.svg";
import Twitter from "../assets/icons/Icon-Twitter.svg";
import GooglePlay from "../assets/img/Google_Play.svg";
import AppleStore from "../assets/img/App_Store.svg";
import { isLoggedIn } from "../helpers/auth";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  const loggedIn = isLoggedIn();

  return (
    <footer className="bg-[rgb(var(--color-bg-dark))] text-white py-10 w-full flex items-center justify-center">
      <div className="lg:gap-30 md:gap-20 mx-2 flex flex-wrap justify-center gap-10 w-full">
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
            <a className="text-[rgb(var(--color-text-main-1))] hover:text-white transition-colors">
              {t("footer.privacy")}
            </a>
          </p>
          <p>
            <a className="text-[rgb(var(--color-text-main-1))] hover:text-white transition-colors">
              {t("footer.terms")}
            </a>
          </p>
          <p>
            <a className="text-[rgb(var(--color-text-main-1))] hover:text-white transition-colors">
              {t("footer.faq")}
            </a>
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
              <img src={GooglePlay} className="h-7" />
              <img src={AppleStore} className="h-7" />
            </div>
          </div>

          <div className=" flex flex-row gap-4 ">
            <img
              src={Facebook}
              size={18}
              className="hover:text-white cursor-pointer transition-colors"
            />
            <img
              src={Twitter}
              size={18}
              className="hover:text-white cursor-pointer transition-colors"
            />
            <img
              src={Instagram}
              size={18}
              className="hover:text-white cursor-pointer transition-colors"
            />
            <img
              src={Linkedin}
              size={18}
              className="hover:text-white cursor-pointer transition-colors"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
