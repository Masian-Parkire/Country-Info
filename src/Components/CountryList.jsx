import React, { useState, useEffect } from "react";
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import { fetchCountry } from "../Utilities/utils";
import { Link } from 'react-router-dom';

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
        console.log({ countryData });
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
    <div className="bg-black p-4">
      <h1 className="text-2xl font-bold text-white text-center my-8">
        Country List
      </h1>

      <div className="flex justify-center items-center my-4">
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="px-4 py-2 bg-green-300 text-black rounded-lg border-2 hover:bg-indigo-900"
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
          className="px-4 py-2 bg-green-300 text-white rounded-lg border-2 hover:bg-indigo-900 ml-4"
        />
      </div>

      <div className="text-center my-4 ml-32" >
        <h2 className="text-xl font-semibold text-white mb-2">Add/Update Country</h2>
        <div className="flex flex-wrap">
          <input
            type="text"
            placeholder="Name"
            value={newCountry.name}
            onChange={(e) => setNewCountry({ ...newCountry, name: e.target.value })}
            className="w-full md:w-64 px-4 py-2 bg-green-300 text-white rounded-lg border-2 hover:bg-indigo-900 mb-2 mr-2"
          />
          <input
            type="text"
            placeholder="Region"
            value={newCountry.region}
            onChange={(e) => setNewCountry({ ...newCountry, region: e.target.value })}
            className="w-full md:w-64 px-4 py-2 bg-green-300 text-white rounded-lg border-2 hover:bg-indigo-900 mb-2 mr-2"
          />
          <input
            type="text"
            placeholder="Capital"
            value={newCountry.capital}
            onChange={(e) => setNewCountry({ ...newCountry, capital: e.target.value })}
            className="w-full md:w-64 px-4 py-2 bg-green-300 text-white rounded-lg border-2 hover:bg-indigo-900 mb-2 mr-2"
          />
          <input
            type="text"
            placeholder="Continents"
            value={newCountry.continents}
            onChange={(e) => setNewCountry({ ...newCountry, continents: e.target.value })}
            className="w-full md:w-64 px-4 py-2 bg-green-300 text-white rounded-lg border-2 hover:bg-indigo-900 mb-2 mr-2"
          />

          {editingCountry ? (
            <button
              onClick={updateCountryData}
              className="px-2 py-1 w-24 bg-blue-500 text-black rounded-lg border-2 hover:bg-blue-700 mb-4 ml-8 "
            >
              Update
            </button>
          ) : (
            <button
            onClick={addCountry}
            className="px-2 py-1 w-24 bg-blue-500 text-black rounded-lg border-2 hover:bg-blue-700 mb-4 ml-8 "
          >
            Add
          </button>
          
          )}
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 my-3">
          {filteredCountries.map((country, i) => (
            <div key={i + 1} className="bg-white p-4 rounded-md shadow">
              <Link to={`/country/${country.id}`}>
                <img src={country.flags.png} alt="Flag" className="w-32 h-20 m-auto" />
              </Link>

              <div className="mt-2">
                <span className="text-lg font-semibold">Name: {country.name.common}</span>
              </div>
              <div>
                <span className="text-lg">Region: {country.region}</span>
              </div>
              <div>
                <span className="text-lg">Capital: {country.capital}</span>
              </div>
              <div>
                <span className="text-lg">
                  Translations: {country.translations && country.translations.ara && country.translations.ara.official}
                </span>
              </div>
              <div>
                <span className="text-lg">Continents: {country.continents}</span>
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => editCountry(country)}
                  className="px-4 py-2 bg-green-300 text-white rounded-lg border-2 hover:bg-indigo-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCountry(country)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg border-2 hover:bg-indigo-900"
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
