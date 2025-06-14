import axios from "axios";

export const uploadCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "atwymgd9");
  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/dm5uvtj7t/image/upload`,
    formData
  );
  return { url: data?.secure_url };
};
export const calculateDiscount = (price, discount) => {
  return Math.ceil(price - (price * discount) / 100);
};
export function configure(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
export const brands = [
  "Apple",
  "Samsung",
  "Xiaomi",
  "OnePlus",
  "Oppo",
  "Vivo",
  "Realme",
  "Motorola",
  "LG",
  "Nokia",
  "Sony",
  "Toshiba",
  "MI",
  "Asus",
  "Lenovo",
  "Huawei",
  "HP",
  "Google",
  "Dell",
  "Redmi",
  "Honor",
  "Acer",
  "Haier",
  "Whirlpool",
  "boAt",
  "noise",
  "FIRE-BOLTT",
];