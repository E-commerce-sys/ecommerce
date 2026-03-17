import axiosInstance from "../../axios/axiosInstance";

export async function sendContactMessage(form) {
  try {
    const payload = {
      data: {
        type: "contact",
        attributes: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        },
      },
    };

    const response = await axiosInstance.post("/api/contacts", payload);

    return response.data.data;
  } catch (error) {
    console.log(error.response?.data);

    // handle JSON:API errors
    const apiError = error?.response?.data;

    if (apiError?.errors?.length > 0) {
      throw new Error(apiError.errors[0].message);
    }

    throw new Error("Something went wrong");
  }
}
