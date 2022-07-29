import { FullCountry } from "./FullCountry";
import { useEffect, useState } from "react";

export const Countries = ({ filteredCountries, countries }) => {
  const [showCountry, setShowCountry] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");

  //   console.log(showCountry);
  useEffect(() => {
    setShowCountry(false);
  }, [filteredCountries]);

  const enableCountry = (e) => {
    // console.log(e.target.id);
    setSelectedCountry(e.target.id);
    setShowCountry(true);
  };

  const showFullCountry = ({ selectedCountry }) => {
    const countryToShow = countries.filter(
      (country) => country.name.common === selectedCountry
    );
    // setSelectedCountry("");

    return { ...countryToShow };
  };

  return (
    <div>
      {filteredCountries.length === 1 ? (
        filteredCountries.map((country) => (
          <FullCountry
            key={country.name.common}
            filteredCountries={filteredCountries}
            country={country}
          />
        ))
      ) : filteredCountries.length < 10 ? (
        showCountry ? (
          <FullCountry
            country={showFullCountry({ selectedCountry })[0]}
            filteredCountries={filteredCountries}
          />
        ) : (
          filteredCountries.map((country) => (
            <div key={country.name.common}>
              <p>
                {" "}
                {country.name.common}{" "}
                <button
                  id={country.name.common}
                  onClick={(e) => enableCountry(e)}
                >
                  show
                </button>
              </p>
            </div>
          ))
        )
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
};
