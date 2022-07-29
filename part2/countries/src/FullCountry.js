import { Weather } from "./Weather";

export const FullCountry = ({ country, filteredCountries }) => {
  return (
    <div key={country.name.area}>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="" />
      <Weather country={country} />
    </div>
  );
};
