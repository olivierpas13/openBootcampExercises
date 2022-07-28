export const Countries = ({ filteredCountries }) => {
  return (
    <div>
      {filteredCountries.length === 1 ? (
        filteredCountries.map((country) => (
          <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h2>languages:</h2>
            <ul>
              {Object.values(country.languages).map((language) => (
                <li>{language}</li>
              ))}
            </ul>
            <img src={country.flags.png} alt="" />
          </div>
        ))
      ) : filteredCountries.length < 10 ? (
        filteredCountries.map((country) => (
          <p key={country.name.common}> {country.name.common}</p>
        ))
      ) : (
        <p>"Too many matches, specify another filter"</p>
      )}
    </div>
  );
};
