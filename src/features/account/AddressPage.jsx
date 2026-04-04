/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState,useEffect } from "react";
function AddressPage() {
  const {t}=useTranslation()
  const [newAddress, setNewAddress] = useState({
  address_name: "",
  house_number: "",
  street_name: "",
  city: "",
  state: "",
  zip_code: "",
  country: "",
});
  const userData = [
    {
      id: 1,
      address_name: "Address 1",
      street_name: "1st Street",
      house_number: "47A",
      city: "Dallas",
      state: "Texas",
      country: "USA",
      zip_code: 123,
    },
    {
      id: 2,
      address_name: "Address 2",
      street_name: "2nd Street",
      house_number: "52B",
      city: "Houston",
      state: "Texas",
      country: "USA",
      zip_code: 456,
    },
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [formData, setFormData] = useState(
  userData.map((address) => ({
    address_name: address.address_name,
    house_number: address.house_number,
    street_name: address.street_name,
    city: address.city,
    state: address.state,
    zip_code: address.zip_code,
    country: address.country,
  }))
);

  const [savedData, setSavedData] = useState([...formData]);

  useEffect(() => {
  if (selectedIndex === -1) {
    setIsEditing(true);
  }
}, [selectedIndex]);

  function handleChange(e) {
  const { name, value } = e.target;
  
  if (selectedIndex === -1) {
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  } else {
    setFormData((prev) =>
      prev.map((address, i) =>
        i === selectedIndex ? { ...address, [name]: value } : address
      )
    );
  }
}

  function handleEdit() {
    setIsEditing(true);
  }

  function handleCancel() {
    setFormData([...savedData]);
    setIsEditing(false);
  }

  function handleSave(e) {
  e.preventDefault();
  
  if (selectedIndex === -1) {
    const updatedData = [...formData, newAddress];
    setFormData(updatedData);
    setSavedData(updatedData);
    setSelectedIndex(updatedData.length - 1);
    setNewAddress({ house_number: "", street_name: "", city: "", state: "", zip_code: "", country: "" });
  } else {
    setSavedData([...formData]);
  }
  
  setIsEditing(false);
}


  const currentAddress = selectedIndex === -1 ? newAddress : formData[selectedIndex];
  return  <div className="flex flex-col gap-10 w-full min-[1154px]:w-225 px-4 md:px-10 py-[30px] mb-[150px] shadow rounded">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-[20px] font-semibold text-[rgb(var(--color-primary-main))]">
          {t("addressPage.editAddress")}
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

        {/* Address Selector */}
        <div className="flex gap-5 items-center">
          <label>{t("addressPage.currentAddress")}</label>
          <select
          className="bg-[rgb(var(--color-grey))] w-100 py-2 px-3 rounded"
          value={selectedIndex}
          onChange={(e) => setSelectedIndex(Number(e.target.value))}
          
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
        <div className="flex flex-col md:flex-row gap-5 md:gap-[50px] w-full">
          <div className="w-full">
            {selectedIndex === -1 && (
            <div className="w-full">
              <label>{t("addressPage.addressName")}</label>
              <Input
                type="text"
                name="address_name"
                value={newAddress.address_name}
                onChange={handleChange}
                className="bg-[rgb(var(--color-grey))] py-[13px] px-4"
              />
            </div>
          )}
            <label>{t("addressPage.houseNumber")}</label>
            <Input
              type="text"
              name="house_number"
              value={currentAddress ? currentAddress.house_number : ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-[rgb(var(--color-grey))] py-[13px] px-4"
            />
          </div>
          <div className="w-full">
            <label>{t("addressPage.streetName")}</label>
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

        <div className="flex flex-col md:flex-row gap-5 md:gap-[50px] w-full">
          <div className="w-full">
            <label>{t("addressPage.city")}</label>
            <Input
              type="text"
              name="city"
              value={currentAddress ? currentAddress.city : ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-[rgb(var(--color-grey))] py-[13px] px-4"
            />
          </div>
          <div className="w-full">
            <label>{t("addressPage.state")}</label>
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

        <div className="flex flex-col md:flex-row gap-5 md:gap-[50px] w-full">
          <div className="w-full">
            <label>{t("addressPage.country")}</label>
            <Input
              type="text"
              name="country"
              value={currentAddress ? currentAddress.country : ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="bg-[rgb(var(--color-grey))] py-[13px] px-4"
            />
          </div>
          <div className="w-full">
            <label>{t("addressPage.zipCode")}</label>
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

        {/* Actions */}
        {isEditing && (
          <div className="flex justify-end gap-2.5 mt-5 flex-wrap">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-sm font-medium transition-all duration-200 flex items-center justify-center border border-gray-300 px-6 py-2 text-sm hover:bg-gray-50 cursor-pointer"
            >
              {t("account.cancel")}
            </button>
            <Button className="w-full sm:w-auto p-5" type="submit">
              {t("myAccount.saveChanges")}
            </Button>
          </div>
        )}
      </form>
    </div>;
}

export default AddressPage;
