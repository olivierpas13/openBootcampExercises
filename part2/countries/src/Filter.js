import { useState } from "react";
import { Countries } from "./Countries";

export const Filter = ({ countries }) => {
  const [filteredCountries, setFilteredCountries] = useState("");

  const findCountries = (searchString, countries) => {
    const results = countries.filter((country) => {
      return !!country?.name?.common
        ?.toLowerCase()
        .match(searchString.toLowerCase());
    });
    setFilteredCountries(results.filter((result) => result));
    console.log(filteredCountries);
  };

  const handleFilteredCountries = (event) => {
    findCountries(event.target.value, countries);
    // console.log(event.target.value);
  };
  // console.log(filteredCountries);
  return (
    <div>
      <p>
        find countries <input type="text" onChange={handleFilteredCountries} />
        <Countries filteredCountries={filteredCountries} />
      </p>
    </div>
  );
};
