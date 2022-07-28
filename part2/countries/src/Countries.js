export const Countries = ({ filteredCountries }) => {
  //   const countries = { filteredCountries };
  //   console.log(filteredCountries.map((country) => country.name.common));
  //   const countries = ;
  //   if (filteredCountries.length > 0) {
  // }
  //   console.log(typeof filteredCountries);

  //   console.log(filteredCountries.map((country) => country.name.common));
  return (
    <div>
      {filteredCountries.length === 1 ? (
        filteredCountries.map((country) => (
          <div>
            {/* {country.map((pais) =>
              pais.languages.map((language) =>
                language.map((key) => console.log(key))
              )
            )}{" "} */}
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h2>languages:</h2>
            {/* <p>{country.languages}</p> */}
            {/* {console.log(country.languages.map((pais) => pais.languages))} */}
            {/* {country.languages.map((language) => language.map((key) => console.log(key)))} */}
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
