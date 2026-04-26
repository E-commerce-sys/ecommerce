import { useTranslation } from "react-i18next";

function OrderProgress({ currentStatus }) {
  const { t, i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];
  const isRtl = lang === "ar" || lang === "ku";
  const steps = ["pending", "preparing", "shipping", "delivering", "arrived"];
  const normalizedStatus = String(currentStatus ?? "pending")
    .trim()
    .toLowerCase();

  const rawIndex = steps.indexOf(normalizedStatus);
  const currentIndex = rawIndex === -1 ? 0 : rawIndex;
  const progressPct =
    steps.length > 1 ? (currentIndex / (steps.length - 1)) * 100 : 100;

  return (
    <div className="flex w-full min-w-0 flex-col items-center gap-3 rounded-2xl border border-[rgb(var(--color-border))] py-4 sm:gap-4 sm:rounded-3xl sm:py-6">
      <div
        className="relative w-full max-w-3xl px-2 sm:px-4"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="relative flex w-full items-center">
          <div
            className="pointer-events-none absolute start-2 end-2 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[rgb(var(--color-grey))]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute start-2 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[rgb(var(--color-border))] transition-all duration-500"
            style={{
              width: `max(0px, calc((100% - 1rem) * ${progressPct / 100}))`,
            }}
            aria-hidden
          />

          {steps.map((step, index) => {
            const isActive = index <= currentIndex;

            return (
              <div
                key={step}
                className="relative z-10 flex min-w-0 flex-1 flex-col items-center"
              >
                <div
                  className={`h-3.5 w-3.5 shrink-0 rounded-full border-2 border-white shadow-sm transition-all duration-300 sm:h-5 sm:w-5 ${
                    isActive ? getColor(step) : "bg-gray-200"
                  }`}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-2 flex w-full min-w-0 sm:mt-3">
          {steps.map((step) => (
            <div
              key={`${step}-label`}
              className="flex min-w-0 flex-1 justify-center px-0.5"
            >
              <p className="max-w-[3.25rem] text-center text-[0.65rem] leading-tight break-words text-[rgb(var(--color-text-main-3))] sm:max-w-[4.5rem] sm:text-xs">
                {t(`accountFeature.orderStatus.${step}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderProgress;

function getColor(step) {
  switch (step) {
    case "pending":
      return "bg-gray-400";
    case "preparing":
      return "bg-[#FBBF24]";
    case "shipping":
      return "bg-[#8B5CF6]";
    case "delivering":
      return "bg-[#F97316]";
    case "arrived":
      return "bg-[#22C55E]";
    default:
      return "bg-gray-200";
  }
}
