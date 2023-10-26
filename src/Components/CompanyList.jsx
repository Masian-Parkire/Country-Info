import React, { useState, useEffect } from "react";
import { fetchUsers } from "../Utilities/utils";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [regionFilter, setRegionFilter] = useState("all"); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const getUser = await fetchUsers();
        setLoading(false);
        setUsers(getUser);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error);
      }
    };

    getUsers();
  }, []);

 
  const filteredCountries = users.filter((user) => {
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
          filteredCountries.map((user, i) => (
            <li key={i + 1} className="user-item">
              <div className="user-info">
                <span className="user-name">Name: {user.name.common}</span>
              </div>
              <div className="user-info">
                <span className="user-username">{user.region}</span>
              </div>
              <div className="user-info">
                <span className="user-username">{user.capital}</span>
              </div>
              <div className="user-info">
                <span className="user-username">
                  {user.translations.ara.official}
                </span>
              </div>
              <div className="user-info">
                <img src={user.flags.png} alt="Flag" />
              </div>
              <div className="user-info">
                <span className="user-">{user.continents}</span>
              </div>
              <div className="user-actions"></div>
            </li>
          ))
        )}
      </ul>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default UserList;
