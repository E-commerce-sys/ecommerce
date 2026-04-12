import { useTranslation } from "react-i18next";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { useAddress } from "../../context/AddressContext";
function AddressPage() {
  const { t } = useTranslation();
  const { address, setAddress, createAddress, fetchAddress, deleteAddress } =
    useAddress();
  const [newAddress, setNewAddress] = useState({
    address_name: "",
    house_number: "",
    street_name: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [formData, setFormData] = useState([]);
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    if (!address?.length) {
      setSelectedIndex(-1);
      setIsEditing(true);
      return;
    }

    const mapped = address
      .filter((addr) => addr?.attributes)
      .map((addr) => ({
        id: addr.id,
        address_name: addr.attributes.addressName ?? `Address ${addr.id}`,
        house_number: addr.attributes.houseNumber ?? "",
        street_name: addr.attributes.streetName ?? "",
        city: addr.attributes.city ?? "",
        state: addr.attributes.state ?? "",
        zip_code: addr.attributes.zipCode ?? "",
        country: addr.attributes.country ?? "",
      }));

    setFormData(mapped);
    setSavedData(mapped);
    setSelectedIndex(0);
    setIsEditing(false);
  }, [address]);

  function handleChange(e) {
    const { name, value } = e.target;

    if (selectedIndex === -1) {
      setNewAddress((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) =>
        prev.map((addr, i) =>
          i === selectedIndex ? { ...addr, [name]: value } : addr,
        ),
      );
    }
  }

  async function handleDelete() {
    const currentId = formData[selectedIndex]?.id;
    if (!currentId) return;

    await deleteAddress(currentId);
    setSelectedIndex(0);
  }

  function handleCancel() {
    setFormData([...savedData]);
    setIsEditing(false);
    if (selectedIndex === -1) {
      setSelectedIndex(0);
      setNewAddress({
        address_name: "",
        house_number: "",
        street_name: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
      });
    }
  }

  async function handleSave(e) {
    e.preventDefault();

    if (selectedIndex === -1) {
      await createAddress(
        newAddress.address_name,
        newAddress.city,
        newAddress.zip_code,
        newAddress.street_name,
        newAddress.country,
        newAddress.state,
        newAddress.house_number,
      );

      await fetchAddress();

      setSelectedIndex(0);
      setNewAddress({
        address_name: "",
        house_number: "",
        street_name: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
      });
    } else {
      setSavedData([...formData]);
      setAddress([...formData]);
    }

    setIsEditing(false);
  }
  const currentAddress =
    selectedIndex === -1 ? newAddress : formData[selectedIndex];
  return (
    <div className="mx-auto mb-16 border border-[rgb(var(--color-border))] flex w-full min-w-0 max-w-4xl flex-col gap-6 rounded-xl p-6 sm:mb-24 sm:gap-8 md:p-8 lg:mb-32">
      <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <h1 className="text-lg font-semibold text-[rgb(var(--color-primary-main))] sm:text-xl">
          {t("addressPage.editAddress")}
        </h1>
        {!isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            className="w-full shrink-0 rounded-md border border-[rgb(var(--color-border))] px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[rgb(var(--color-grey))]/50 sm:w-auto sm:px-6 sm:py-2"
          >
            {t("addressPage.delete")}
          </button>
        )}
      </div>

      <form
        className="flex min-w-0 flex-col gap-5 sm:gap-6"
        onSubmit={handleSave}
      >
        {/* Address Selector */}
        <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <label className="shrink-0 text-sm font-medium text-[rgb(var(--color-text-main))] sm:min-w-[8rem]">
            {t("addressPage.currentAddress")}
          </label>
          <select
            className="min-w-0 w-full max-w-md rounded-md border border-[rgb(var(--color-border))] bg-[rgb(var(--color-grey))] px-3 py-2.5 text-sm outline-none focus:border-[rgb(var(--color-primary-main))] focus:ring-1 focus:ring-[rgb(var(--color-primary-main))]"
            value={selectedIndex}
            onChange={(e) => {
              const val = Number(e.target.value);
              setSelectedIndex(val);
              setIsEditing(val === -1);
            }}
          >
            {formData.map((address, i) => (
              <option key={i} value={i}>
                {address.address_name}
              </option>
            ))}
            <option value={-1}>{t("addressPage.newAddress")}</option>
          </select>
        </div>

        {/* Fields */}
        <div className="flex w-full min-w-0 flex-col gap-4 md:flex-row md:gap-8 lg:gap-12">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            {selectedIndex === -1 && (
              <div className="w-full min-w-0">
                <label className="mb-1.5 block text-sm font-medium text-[rgb(var(--color-text-main))]">
                  {t("addressPage.addressName")}
                </label>
                <Input
                  type="text"
                  name="address_name"
                  value={newAddress.address_name}
                  onChange={handleChange}
                  className="bg-[rgb(var(--color-grey))] py-[13px] px-4"
                />
              </div>
            )}
            <div className="w-full min-w-0">
              <label className="mb-1.5 block text-sm font-medium text-[rgb(var(--color-text-main))]">
                {t("addressPage.houseNumber")}
              </label>
              <Input
                type="text"
                name="house_number"
                value={currentAddress ? currentAddress.house_number : ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="bg-[rgb(var(--color-grey))] py-[13px] px-4"
              />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <label className="mb-1.5 block text-sm font-medium text-[rgb(var(--color-text-main))]">
              {t("addressPage.streetName")}
            </label>
            <Input
              type="text"
              name="street_name"
              value={currentAddress ? currentAddress.street_name : ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-[rgb(var(--color-grey))] py-[13px] px-4"
            />
          </div>
        </div>

        <div className="flex w-full min-w-0 flex-col gap-4 md:flex-row md:gap-8 lg:gap-12">
          <div className="min-w-0 flex-1">
            <label className="mb-1.5 block text-sm font-medium text-[rgb(var(--color-text-main))]">
              {t("addressPage.city")}
            </label>
            <Input
              type="text"
              name="city"
              value={currentAddress ? currentAddress.city : ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-[rgb(var(--color-grey))] py-[13px] px-4"
            />
          </div>
          <div className="min-w-0 flex-1">
            <label className="mb-1.5 block text-sm font-medium text-[rgb(var(--color-text-main))]">
              {t("addressPage.state")}
            </label>
            <Input
              type="text"
              name="state"
              value={currentAddress ? currentAddress.state : ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-[rgb(var(--color-grey))] py-[13px] px-4"
            />
          </div>
        </div>

        <div className="flex w-full min-w-0 flex-col gap-4 md:flex-row md:gap-8 lg:gap-12">
          <div className="min-w-0 flex-1">
            <label className="mb-1.5 block text-sm font-medium text-[rgb(var(--color-text-main))]">
              {t("addressPage.country")}
            </label>
            <Input
              type="text"
              name="country"
              value={currentAddress ? currentAddress.country : ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-[rgb(var(--color-grey))] py-[13px] px-4"
            />
          </div>
          <div className="min-w-0 flex-1">
            <label className="mb-1.5 block text-sm font-medium text-[rgb(var(--color-text-main))]">
              {t("addressPage.zipCode")}
            </label>
            <Input
              type="text"
              name="zip_code"
              value={currentAddress ? currentAddress.zip_code : ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-[rgb(var(--color-grey))] py-[13px] px-4"
            />
          </div>
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

export default AddressPage;
