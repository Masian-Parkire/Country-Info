import axios from "axios";

const apiUrl = "https://restcountries.com/v3.1/all";

export const fetchCountry = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const fetchCountryDetails = async (countryName) => {
  try {
    const response = await axios.get(`${apiUrl}?name=${countryName}`);
    if (response.data && response.data.length > 0) {
      return response.data[0];
    } else {
      throw new Error("Country not found");
    }
  } catch (error) {
    console.error("Error fetching country details:", error);
    throw error;
  }
};

export const addCountry = async (newCountry) => {
  try {
    const response = await axios.post(apiUrl, newCountry);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCountry = async (id, updatedCountryData) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, updatedCountryData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error updating country");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchCountryDetailsByCapital = async (capital) => {
  try {
    const response = await axios.get(`${apiUrl}?capital=${capital}`);
    if (response.data && response.data.length > 0) {
      return response.data[0];
    } else {
      throw new Error("Country not found");
    }
  } catch (error) {
    console.error("Error fetching country details:", error);
    throw error;
  }
};
