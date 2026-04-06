import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import JustForYou from "./JustForYou";
import WishlistSection from "./WishlistSection";
import { getWishlist, getPagination } from "./wishlistAPI";

/**
 * One bootstrap request for page 1 + meta so WishlistSection and JustForYou
 * do not each call getWishlist independently (fewer re-renders / duplicate API).
 */
function Wishlist() {
  const { t } = useTranslation();
  const [shared, setShared] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const [items, meta] = await Promise.all([
          getWishlist(1),
          getPagination(1),
        ]);
        if (!cancelled) {
          setShared({
            items: items ?? [],
            total: meta?.total ?? 0,
            lastPage: meta?.last_page ?? 1,
          });
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setShared({ items: [], total: 0, lastPage: 1 });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mt-20 mb-[222px] flex flex-col gap-20">
      <div className="mx-[100px]">
        <span className="text-[rgb(var(--color-text-main-2))]">
          <Link to="/">{t("contact.home")}</Link> /
        </span>

        <span className="ml-1 text-[rgb(var(--color-text-main))]">
          {t("wishlist.wishlist")}
        </span>
      </div>
      <WishlistSection shared={shared} />
      <JustForYou
        wishlistItems={shared?.items}
        sharedReady={shared !== null}
      />
    </div>
  );
}

export default Wishlist;
