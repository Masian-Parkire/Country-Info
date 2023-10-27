// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { fetchCountryDetails } from "../Utilities/utils";
// import { Router } from "react-router-dom";

// const CountryDetails = () => {
//   const { name } = useParams();

//   const [country, setCountry] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getCountryDetails = async () => {
//       try {
//         const countryData = await fetchCountryDetails(name);
//         setCountry(countryData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching country details:", error);
//         setError(error);
//         setLoading(false);
//       }
//     };

//     getCountryDetails();
//   }, [name]);

//   return (
//     <div className="country-details p-4">
//       <h1 className="text-3xl font-bold mb-4">Country Details</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : country ? (
//         <div>
//           <h2 className="text-xl font-semibold mb-2">Country: {country.name.common}</h2>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
//               <p><strong>Region:</strong> {country.region}</p>
//               <p><strong>Capital:</strong> {country.capital}</p>
//               <p><strong>Subregion:</strong> {country.subregion}</p>
//               <p><strong>Population:</strong> {country.population}</p>
//               <p><strong>Area:</strong> {country.area} square kilometers</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Languages</h3>
//               {country.languages &&
//                 Object.values(country.languages).map((language, index) => (
//                   <p key={index}>{language}</p>
//                 ))}
//             </div>
//           </div>
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold mb-2">Borders</h3>
//             {country.borders && country.borders.length > 0 ? (
//               <ul>
//                 {country.borders.map((border, index) => (
//                   <li key={index}>{border}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No borders with other countries.</p>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p>Country not found.</p>
//       )}
//       {error && (
//         <p className="text-red-600 text-sm mt-4">Error: {error.message}</p>
//       )}
//     </div>
//   );
// };

// export default CountryDetails;
