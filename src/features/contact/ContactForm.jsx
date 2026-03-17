/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { Form } from "react-router-dom";
import Button from "../../components/Button";
import { sendContactMessage } from "./contactAPI";
import { useTranslation } from "react-i18next";

function ContactForm() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    // ✅ phone: allow only digits
    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, ""); // remove anything not a number

      setForm((prev) => ({
        ...prev,
        phone: onlyNumbers,
      }));

      return;
    }

    // normal fields
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      await sendContactMessage(form);

      // reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      alert(t("contact.success") || "Message sent successfully ✅");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-225 mx-auto shadow rounded p-6 md:p-8">
      <Form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          {/* Inputs */}
          <div className="flex flex-col lg:flex-row gap-4">
            <input
              name="name"
              type="text"
              placeholder={t("contact.name")}
              value={form.name}
              onChange={handleChange}
              maxLength={50}
              className="w-full h-12 px-4 rounded bg-[rgb(var(--color-grey))] outline-none focus:ring-1 focus:ring-[rgb(var(--color-primary-main))]"
            />

            <input
              name="email"
              type="email"
              placeholder={t("contact.email")}
              value={form.email}
              onChange={handleChange}
              maxLength={80}
              className="w-full h-12 px-4 rounded bg-[rgb(var(--color-grey))] outline-none focus:ring-1 focus:ring-[rgb(var(--color-primary-main))]"
            />

            <input
              name="phone"
              type="text"
              placeholder={t("contact.phoneNumber")}
              value={form.phone}
              onChange={handleChange}
              maxLength={15}
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full h-12 px-4 rounded bg-[rgb(var(--color-grey))] outline-none focus:ring-1 focus:ring-[rgb(var(--color-primary-main))]"
            />
          </div>

          {/* Textarea */}
          <textarea
            name="message"
            placeholder={t("contact.message")}
            value={form.message}
            onChange={handleChange}
            maxLength={500}
            rows={6}
            className="w-full p-4 rounded bg-[rgb(var(--color-grey))] outline-none resize-none focus:ring-1 focus:ring-[rgb(var(--color-primary-main))]"
          />

          {/* Character counter */}
          <div className="text-sm text-gray-500 text-right">
            {form.message.length}/500
          </div>

          {/* Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? t("contact.sending") : t("contact.send")}
            </Button>{" "}
          </div>
        </div>
      </Form>
    </div>
  );
}

export default ContactForm;
