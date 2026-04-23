import axiosInstance from "../../../axios/axiosInterceptor"

export async function getStaffList(search = "") {
    const params = {}
    if (search !== "") params["filter[firstNameContains]"] = search
    
    const res = await axiosInstance.get("/api/admin/staff-list", { params })
    return res.data
}

export async function addStaff(payload){
    const res = await axiosInstance.post("/api/admin/create-admin", payload)
    return res.data
}