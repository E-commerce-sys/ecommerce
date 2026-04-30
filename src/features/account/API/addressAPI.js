import axiosInstance from "../../../axios/axiosInstance";

export async function getAddressAPI() {
    const res = await axiosInstance.get("/api/user-addresses");
    return res.data.data;
}

export async function createAddressAPI(data, options = {}) {
  const attributes = {};

  if (data.city) attributes.city = data.city;
  if (data.street_name) attributes.streetName = data.street_name;
  if (data.address_name) attributes.addressName = data.address_name;
  if (data.country) attributes.country = data.country;
  if (data.state) attributes.state = data.state;
  if (data.house_number) attributes.houseNumber = data.house_number;
  if (data.zip_code) attributes.zipCode = data.zip_code;

  const config =
    options.isMain === true ? { params: { isMain: true } } : undefined;

  const res = await axiosInstance.post(
    "/api/address",
    { data: { attributes } },
    config,
  );
  return res.data;
}
export async function deleteAddressAPI(addressId) {
    const res = await axiosInstance.delete(`/api/user-addresses/${addressId}`);
    return res.data;
}