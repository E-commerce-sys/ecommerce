import axiosInstance from "../../../axios/axiosInstance";

export async function getAddressAPI() {
    const res = await axiosInstance.get("/api/user-addresses");
    return res.data.data;
}

export async function createAddressAPI(addressName="",city,ZIPcode=0,streetName,country="",state="",houseNumber="") {
    const res = await axiosInstance.post("/api/address",{
        data:{
            attributes:{
                addressName:addressName,
                city:city,
                streetName:streetName,
                country:country,
                state:state,
                houseNumber:houseNumber,
                zipCode:ZIPcode
            }
        }
    } );
    return res.data;
}

export async function deleteAddressAPI(addressId) {
    const res = await axiosInstance.delete(`/api/user-addresses/${addressId}`);
    return res.data;
}