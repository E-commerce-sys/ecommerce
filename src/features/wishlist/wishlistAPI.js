import axiosInstance from "../../axios/axiosInstance";

// export async function getWishlist() {
//   const res = await axiosInstance("/api/wish-list?include=items");
//   return res.data.data.included.items;
// }

export async function postWishlist(id){
  const res = await axiosInstance.post("/api/wish-list-items",{
    data:{
      relationships:{
        product:{
          data:{
            id: id
          }
        }
      }
    }
  })
  return res.data
}