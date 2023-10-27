import React, { useState, useEffect } from "react";
import { fetchCountry, updateCountry, addCountry } from "../Utilities/utils";
import './style.css'

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [regionFilter, setRegionFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCountry, setNewCountry] = useState({
    name: "",
    region: "",
    capital: "",
    translations: "",
    flags: "",
    continents: "",
  });
  const [editingCountry, setEditingCountry] = useState(null);

  useEffect(() => {
    const getCountry = async () => {
      try {
        const countryData = await fetchCountry();
        setLoading(false);
        setCountries(countryData);
        console.log({countryData});
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError(error);
      }
    };
    getCountry();
  }, []);

  const filteredCountries = countries.filter((country) => {
    if (regionFilter === "all" && searchTerm === "") {
      return true;
    } else if (regionFilter === "all" && searchTerm !== "") {
      return country.name.common.toLowerCase().startsWith(searchTerm.toLowerCase());
    } else if (regionFilter !== "all" && searchTerm === "") {
      return country.region === regionFilter;
    } else {
      return (
        country.region === regionFilter &&
        country.name.common.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    }
  });

  const addCountry = () => {
    if (newCountry.name) {
      setCountries([...countries, newCountry]);
      setNewCountry({
        name: "",
        region: "",
        capital: "",
        translations: "",
        flags: "",
        continents: "",
      });
    }
  };

  const editCountry = (country) => {
    setEditingCountry(country);
    setNewCountry({ ...country }); 
  };

  const updateCountryData = () => {
    if (editingCountry) {
      const updatedCountries = countries.map((country) =>
        country.name === editingCountry.name ? newCountry : country
      );
      setCountries(updatedCountries);
      setNewCountry({
        name: "",
        region: "",
        capital: "",
        translations: "",
        flags: "",
        continents: "",
      });
      setEditingCountry(null);
    }
  };

  const deleteCountry = (country) => {
    const updatedCountries = countries.filter((c) => c !== country);
    setCountries(updatedCountries);
  };

  return (
    <div className="country-list p-4">
      <h1 className="text-3xl font-bold mb-4">Country List</h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="w-full md:w-2/5 p-2 border rounded-md mb-2 md:mb-0"
        >
          <option value="all">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-2/5 p-2 border rounded-md mb-2 md:mb-0"
        />

        <div className="text-right">
          <h2 className="text-xl font-semibold mb-2">Add/Update Country</h2>
          <div className="flex flex-col items-center md:items-start">
            <input
              type="text"
              placeholder="Name"
              value={newCountry.name.common}
              onChange={(e) =>
                setNewCountry({ ...newCountry, name: e.target.value })
              }
              className="w-full md:w-64 p-2 border rounded-md mb-2"
            />
            <input
              type="text"
              placeholder="Region"
              value={newCountry.region}
              onChange={(e) =>
                setNewCountry({ ...newCountry, region: e.target.value })
              }
              className="w-full md:w-64 p-2 border rounded-md mb-2"
            />
            <input
              type="text"
              placeholder="Capital"
              value={newCountry.capital}
              onChange={(e) =>
                setNewCountry({ ...newCountry, capital: e.target.value })
              }
              className="w-full md:w-64 p-2 border rounded-md mb-2"
            />
    
            <input
              type="text"
              placeholder="Continents"
              value={newCountry.continents}
              onChange={(e) =>
                setNewCountry({ ...newCountry, continents: e.target.value })
              }
              className="w-full md:w-64 p-2 border rounded-md mb-2"
            />
            {editingCountry ? (
              <button
                onClick={updateCountryData}
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Update
              </button>
            ) : (
              <button
                onClick={addCountry}
                className="addbutton"
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="countries">
          {filteredCountries.map((country, i) => (
            <div key={i + 1} className="country-item p-4 border rounded-md shadow">
              <img src={country.flags.png} alt="Flag" className="flagImage" />
              <div className="country-info">
                <span className="country-name">Name: {country.name.common}</span>
              </div>
              <div className="country-info">
                <span className="country-username">Region: {country.region}</span>
              </div>
              <div className="country-info">
                <span className="country-username">Capital: {country.capital}</span>
              </div>
              <div className="country-info">
                <span className="country-username">
                  Translations: {country.translations && country.translations.ara && country.translations.ara.official}
                </span>
              </div>
              <div className="country-info">
                <span className="country-">Continents: {country.continents}</span>
              </div>
              <div className="country-actions flex justify-between mt-2">
                <button
                  onClick={() => editCountry(country)}
                  className="editbutton"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCountry(country)}
                  className="deletebutton"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-red-600 text-sm mt-4">Error: {error.message}</p>
      )}
    </div>
  );
};

export default CountryList;
