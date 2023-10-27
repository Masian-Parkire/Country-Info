import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CountryList from './Components/CountryList';
import CountryDetails from './Components/CountryDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/country/:capital" element={<CountryDetails />} /> {/* Use 'capital' as the parameter */}
      </Routes>
    </Router>
  );
}

export default App;
