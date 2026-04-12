import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function BuyNowLink({ productId, className, label }) {
  if (productId == null || productId === "") return null;
  return (
    <Link
      to={`/search/${productId}`}
      state={{ from: "/" }}
      className={className}
    >
      {label}
    </Link>
  );
}

function NewArrivals({ data }) {
  const { t, i18n } = useTranslation();

  const lang = i18n.language;

  const nameKey =
    lang === "ar" ? "nameAr" : lang === "ku" ? "nameKu" : "nameEn";

  const descriptionKey =
    lang === "ar"
      ? "descriptionAr"
      : lang === "ku"
        ? "descriptionKu"
        : "descriptionEn";

  return (
    <section className="flex justify-center py-12 w-full min-w-0 overflow-x-hidden">
      <div className="flex w-full min-w-0 max-w-[1240px] flex-col gap-2 md:gap-8 px-5 md:px-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 md:gap-5">
            <div className="flex items-center gap-2 md:gap-4">
              <span className="w-3 h-6 md:w-4 md:h-7 lg:w-5 lg:h-8 bg-[rgb(var(--color-primary-main))] rounded-sm"></span>
              <span className="text-[rgb(var(--color-primary-main))] font-medium text-sm md:text-base">
                {t("newArrival.feature")}
              </span>
            </div>

            <p className="text-[20px] md:text-2xl lg:text-3xl font-semibold">
              {t("newArrival.new")}
            </p>
          </div>
        </div>

        {/* data: two columns only from xl (1280px); lg is single column to avoid 600+600px overflow */}
        <div className="flex w-full min-w-0 justify-center">
          <div className="grid w-full min-w-0 max-w-full grid-cols-1 gap-2 xl:grid-cols-2 xl:max-w-[1224px]">
            {/* PLAYSTATION */}
            {data[0] && (
              <div className="relative h-98 w-full min-w-0 overflow-hidden rounded-md bg-[rgb(var(--color-bg-dark))] p-4 text-white flex items-end xl:h-150 xl:w-full xl:max-w-[570px]">
                <img
                  src={data[0].attributes.newArrivalImage}
                  className="absolute right-0 bottom-0 max-h-[90%] object-contain"
                />

                <div className="relative z-10 max-w-65">
                  <p className="text-lg md:text-xl lg:text-2xl font-semibold">
                    {data[0].attributes[nameKey]}
                  </p>

                  <p className="text-[12px] md:text-sm text-[rgb(var(--color-border))] mt-2 line-clamp-3">
                    {data[0].attributes[descriptionKey]}
                  </p>

                  <BuyNowLink
                    productId={data[0].id}
                    className="mt-4 inline-block text-sm font-medium underline"
                    label={t("newArrival.buy")}
                  />
                </div>
              </div>
            )}

            {/* RIGHT SIDE */}
            <div className="grid min-w-0 w-full grid-rows-[auto_auto] gap-2 xl:max-w-[570px]">
              {/* WOMEN */}
              {data[1] && (
                <div className="relative h-48 w-full min-w-0 overflow-hidden rounded-md bg-[rgb(var(--color-bg-dark))] p-8 text-white flex items-center xl:h-77">
                  <img
                    src={data[1].attributes.newArrivalImage}
                    className="absolute right-0 bottom-0 max-h-[90%] object-contain"
                  />

                  <div className="relative z-10 max-w-65">
                    <p className="text-lg md:text-lg lg:text-xl font-semibold">
                      {data[1].attributes[nameKey]}
                    </p>

                    <p className="text-[12px] md:text-sm text-[rgb(var(--color-border))] mt-2 line-clamp-2">
                      {data[1].attributes[descriptionKey]}
                    </p>

                    <BuyNowLink
                      productId={data[1].id}
                      className="mt-2 inline-block text-sm font-medium underline"
                      label={t("newArrival.buy")}
                    />
                  </div>
                </div>
              )}

              {/* SPEAKER + PERFUME */}
              <div className="grid min-w-0 w-full grid-cols-2 gap-2">
                {data[2] && (
                  <div className="relative h-48 w-full min-w-0 overflow-hidden rounded-md bg-[rgb(var(--color-bg-dark))] p-6 text-white flex items-end xl:h-71">
                    <img
                      src={data[2].attributes.newArrivalImage}
                      className="absolute max-h-[90%] max-w-[90%] object-contain"
                    />

                    <div className="relative z-10">
                      <p className="text-lg md:text-lg font-semibold">
                        {data[2].attributes[nameKey]}
                      </p>

                      <p className="text-[12px] md:text-sm text-[rgb(var(--color-border))] mt-2 line-clamp-2">
                        {data[2].attributes[descriptionKey]}
                      </p>

                      <BuyNowLink
                        productId={data[2].id}
                        className="mt-2 inline-block text-sm font-medium underline"
                        label={t("newArrival.buy")}
                      />
                    </div>
                  </div>
                )}

                {data[3] && (
                  <div className="relative h-48 w-full min-w-0 overflow-hidden rounded-md bg-[rgb(var(--color-bg-dark))] p-6 text-white flex items-end xl:h-71">
                    <img
                      src={data[3].attributes.newArrivalImage}
                      className="absolute max-h-[90%] max-w-[90%] object-contain"
                    />

                    <div className="relative z-10">
                      <p className="text-lg md:text-lg font-semibold">
                        {data[3].attributes[nameKey]}
                      </p>

                      <p className="text-[12px] md:text-sm text-[rgb(var(--color-border))] mt-2 line-clamp-2">
                        {data[3].attributes[descriptionKey]}
                      </p>

                      <BuyNowLink
                        productId={data[3].id}
                        className="mt-2 inline-block text-sm font-medium underline"
                        label={t("newArrival.buy")}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;
