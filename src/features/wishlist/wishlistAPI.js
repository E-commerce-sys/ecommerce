import axiosInstance from "../../axios/axiosInstance";

export async function getWishlist() {
  const res = await axiosInstance("/api/wish-list-items?include=product.images");
  return res.data.data;
}

export async function postWishlist(id){
  const res = await axiosInstance.post("/api/wish-list-items",{
    data:{
      relationships:{
        product:{
          data:{
            id: Number(id)
          }
        }
      }
    }
  })
  return res.data
}

export async function deleteWishlistItem(id) {
  const res = await axiosInstance.delete(`/api/wish-list-items/${id}`)
  return res.data
}