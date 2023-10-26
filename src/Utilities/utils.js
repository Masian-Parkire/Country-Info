import axios from "axios";

export const fetchCompany = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("bad  bad badddddd",error);
    return error;
  }
};

