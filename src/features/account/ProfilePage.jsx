/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";
import { useUser } from "../../context/ProfileContext";

function ProfilePage() {
  const { t } = useTranslation();
  const { user, loading } = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [savedData, setSavedData] = useState({ ...formData });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.attributes.firstName,
        last_name: user.attributes.lastName,
        email: user.attributes.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setSavedData({
        first_name: user.attributes.firstName,
        last_name: user.attributes.lastName,
        email: user.attributes.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleCancel() {
    setFormData({ ...savedData });
    setIsEditing(false);
  }

  function handleSave(e) {
    e.preventDefault();
    setSavedData({ ...formData });
    setIsEditing(false);
    console.log("Saved:", formData);
  }

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="mx-auto mb-16 border border-[rgb(var(--color-border))] flex w-full min-w-0 max-w-4xl flex-col gap-6 rounded-xl p-6 sm:mb-24 sm:gap-8 md:p-8 lg:mb-32">
      <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <h1 className="text-lg font-semibold text-[rgb(var(--color-primary-main))] sm:text-xl">
          {t("myAccount.editProfile")}
        </h1>
        {!isEditing && (
          <button
            type="button"
            onClick={handleEdit}
            className="w-full shrink-0 rounded-md border border-[rgb(var(--color-border))] px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[rgb(var(--color-grey))]/50 sm:w-auto sm:px-6 sm:py-2"
          >
            {t("myAccount.edit")}
          </button>
        )}
      </div>

      <form
        className="flex min-w-0 flex-col gap-5 sm:gap-6"
        onSubmit={handleSave}
      >
        {/* Names */}
        <div className="flex w-full min-w-0 flex-col gap-4 md:flex-row md:gap-8 lg:gap-12">
          <div className="min-w-0 flex-1">
            <label className="mb-1.5 block text-sm font-medium text-[rgb(var(--color-text-main))]">
              {t("register.first_name")}
            </label>
            <Input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-[rgb(var(--color-grey))] py-[13px] px-4"
            />
          </div>
          <div className="min-w-0 flex-1">
            <label className="mb-1.5 block text-sm font-medium text-[rgb(var(--color-text-main))]">
              {t("register.last_name")}
            </label>
            <Input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-[rgb(var(--color-grey))] py-[13px] px-4"
            />
          </div>
        </div>

        {/* Email */}
        <div className="min-w-0">
          <label className="mb-1.5 block text-sm font-medium text-[rgb(var(--color-text-main))]">
            {t("myAccount.email")}
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            className="bg-[rgb(var(--color-grey))] py-[13px] px-4"
          />
        </div>

        {/* Password */}
        <div className="flex min-w-0 flex-col gap-3 sm:gap-3.5">
          <label className="text-sm font-medium text-[rgb(var(--color-text-main))]">
            {t("myAccount.passwordChanges")}
          </label>
          <Input
            type="password"
            name="currentPassword"
            placeholder={t("myAccount.currentPassword")}
            value={formData.currentPassword}
            onChange={handleChange}
            disabled={!isEditing}
            className="bg-[rgb(var(--color-grey))] py-[13px] px-4"
          />
          <Input
            type="password"
            name="newPassword"
            placeholder={t("myAccount.newPassword")}
            value={formData.newPassword}
            onChange={handleChange}
            disabled={!isEditing}
            className="bg-[rgb(var(--color-grey))] py-[13px] px-4"
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder={t("myAccount.confirmPassword")}
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={!isEditing}
            className="bg-[rgb(var(--color-grey))] py-[13px] px-4"
          />
        </div>

        {isEditing && (
          <div className="mt-2 flex w-full min-w-0 flex-col-reverse gap-2.5 sm:mt-4 sm:flex-row sm:flex-wrap sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full rounded-md border border-[rgb(var(--color-border))] px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[rgb(var(--color-grey))]/50 sm:w-auto sm:px-6 sm:py-2"
            >
              {t("account.cancel")}
            </button>
            <Button
              className="w-full p-4 sm:w-auto sm:min-w-[10rem] sm:p-5"
              type="submit"
            >
              {t("myAccount.saveChanges")}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default ProfilePage;
