import React, { useState, useEffect } from "react";
import { fetchCompany } from "../Utilities/utils";

const CompanyList = () => {
  const [company, setCompany] = useState([]);
  const [regionFilter, setRegionFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCompany = async () => {
      try {
        const getUser = await fetchCompany();
        setLoading(false);
        setCompany(getUser);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error);
      }
    };

    getCompany();
  }, []);


  const filteredCountries = company.filter((user) => {
    if (regionFilter === "all") {
      return true; 
    } else {
      return user.region === regionFilter;
    }
  });

  return (
    <div className="user-list">
      <h1 className="title">User Management</h1>
      <select
        value={regionFilter}
        onChange={(e) => setRegionFilter(e.target.value)}
      >
        <option value="all">All Regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
      <ul className="user-ul">
       
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredCountries.map((company, i) => (
            <li key={i + 1} className="company-item">
              <div className="company-info">
                <span className="company-name">Name: {company.name.common}</span>
              </div>
              <div className="company-info">
                <span className="company-username">{company.region}</span>
              </div>
              <div className="company-info">
                <span className="company-username">{company.capital}</span>
              </div>
              <div className="company-info">
                <span className="company-username">
                  {company.translations.ara.official}
                </span>
              </div>
              <div className="company-info">
                <img src={company.flags.png} alt="Flag" />
              </div>
              <div className="user-info">
                <span className="user-">{company.continents}</span>
              </div>
             
            </li>
          ))
        )}
      </ul>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default CompanyList ;
