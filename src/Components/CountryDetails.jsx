import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCountryDetailsByCapital } from '../Utilities/utils';

const CountryDetails = () => {
  const { capital } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCountryDetails = async () => {
      try {
        const countryDetails = await fetchCountryDetailsByCapital(capital);
        setCountry(countryDetails);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getCountryDetails();
  }, [capital]);

  const handleGoBack = () => {
    navigate('/');
  };

    return (
      <div className="bg-f7f7f7 border border-red-500 p-4 rounded-lg shadow-lg m-4 max-w-2xl text-gray-700 text-center flex flex-col items-center">
  
        <h1 className="text-3xl font-bold mb-4">Country Details</h1>
        {loading ? (
          <p className="loading-message">Loading...</p>
        ) : country ? (
          <div>
            <h2 className="text-xl font-semibold mb-2">Country: {country.name.common}</h2>
            <img src={country.flags.png} alt="Flag" className="max-w-full border border-gray-300 rounded-lg m-4" />
            <p><strong>Capital:</strong> {country.capital}</p>
            <p><strong>Subregion:</strong> {country.subregion}</p>
            <p><strong>Population:</strong> {country.population}</p>
            <p><strong>Area:</strong> {country.area} square kilometers</p>
            <div>
              <h3 className="text-lg font-semibold mb-2">Languages</h3>
              {country.languages && Object.values(country.languages).map((language, index) => (
                <p key={index}>{language}</p>
              ))}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Borders</h3>
              {country.borders && country.borders.length > 0 ? (
                <ul>
                  {country.borders.map((border, index) => (
                    <li key={index}>{border}</li>
                  ))}
                </ul>
              ) : (
                <p>No borders with other countries.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-red-600 text-sm mt-4">Country not found.</p>
        )}
        {error && (
          <p className="text-red-600 text-sm mt-4">Error: {error.message}</p>
        )}
        <button className="btn-back bg-blue-500 text-white py-2 px-4 rounded-lg mt-4" onClick={handleGoBack}>
          Country List
        </button>
      </div>
    );
  };
  


export default CountryDetails;
