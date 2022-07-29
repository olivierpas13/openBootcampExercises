import { useState } from "react";
import { Countries } from "./Countries";

export const Filter = ({ countries }) => {
  const [filteredCountries, setFilteredCountries] = useState([]);

  const findCountries = (searchString, countries) => {
    const results = countries.filter((country) => {
      return !!country?.name?.common
        ?.toLowerCase()
        .match(searchString.toLowerCase());
    });
    setFilteredCountries(results.filter((result) => result));
  };

  const handleFilteredCountries = (event) => {
    findCountries(event.target.value, countries);
  };

  return (
    <div>
      <p>
        find countries <input type="text" onChange={handleFilteredCountries} />
      </p>
      <Countries filteredCountries={filteredCountries} countries={countries} />
    </div>
  );
};
