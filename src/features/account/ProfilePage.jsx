/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";

function ProfilePage() {
  const {t}=useTranslation()

  const userData = {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@gmail.com",
  };

  // useEffect()            for API integration

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [savedData, setSavedData] = useState({ ...formData });

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

  return (
    <div className="flex flex-col gap-10 w-full min-[1154px]:w-225  px-4 md:px-10 py-[30px] mb-[150px] shadow rounded">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-[20px] font-semibold text-[rgb(var(--color-primary-main))]">
          {t("myAccount.editProfile")}
        </h1>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="rounded-sm font-medium transition-all duration-200 flex items-center justify-center border border-gray-300 px-6 py-2 text-sm hover:bg-gray-50 cursor-pointer"
          >
            {t("myAccount.edit")}
          </button>
        )}
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSave}>
        {/* Names */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-[50px] w-full">
          <div className="w-full">
            <label>{t("register.first_name")}</label>
            <Input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-[rgb(var(--color-grey))] py-[13px] px-4"
            />
          </div>
          <div className="w-full">
            <label>{t("register.last_name")}</label>
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
        <div>
          <label>{t("myAccount.email")}</label>
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
          <div className="flex flex-col gap-2">
            <label>{t("myAccount.passwordChanges")}</label>
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
          <div className="flex justify-end gap-2.5 mt-5 flex-wrap">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-sm font-medium transition-all duration-200 flex items-center justify-center border border-gray-300 px-6 py-2 text-sm hover:bg-gray-50 cursor-pointer"
            >
              {t("account.cancel")}
            </button>
            <Button className="w-full sm:w-auto p-5" type="submit">{t("myAccount.saveChanges")}</Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default ProfilePage;
