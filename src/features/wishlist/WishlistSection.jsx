import Button from "../../components/Button";
import WishlistItem from "./WishlistItem";
import { useTranslation } from "react-i18next";

function WishlistSection({ shared }) {
  const { t } = useTranslation();
  const count =
    shared === null ? "…" : shared.total;

  return (
    <section className="mx-auto flex w-full min-w-0 max-w-[1240px] flex-col gap-10 px-5 md:px-10">
      <div className="flex items-center justify-between">
        <h1 className="text-[20px]">
          {t("wishlist.wishlist")} ({count})
        </h1>

        <Button variant="outline">{t("wishlist.moveToCart")}</Button>
      </div>

      <div className="flex">
        <WishlistItem shared={shared} />
      </div>
    </section>
  );
}

export default WishlistSection;
