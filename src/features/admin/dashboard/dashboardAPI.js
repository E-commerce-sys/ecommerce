import axiosInstance from "../../../axios/axiosInterceptor";

export async function getStats(){
    const res = await axiosInstance.get("/api/admin/dashboard-statistics")
    console.log(res.data.data)
    return res.data.data
}