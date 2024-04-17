import axios from "axios";

export default async function logout() {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_PATH}/api/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    if (data?.message === "User logged Out") {
      return true;
    }
  } catch (error: any) {}
  return false;
}
