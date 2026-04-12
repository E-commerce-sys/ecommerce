import { useTranslation } from "react-i18next";

function FAQ() {
  const { t } = useTranslation();
  return (
    <div className="mt-20">
      <h1>{t("footer.faq")}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus
        sequi perferendis aliquid, illo nihil nulla eos expedita quos aperiam
        explicabo ullam voluptates iusto inventore obcaecati beatae commodi hic
        deleniti esse.
      </p>
    </div>
  );
}

export default FAQ;
