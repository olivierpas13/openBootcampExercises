export const Countries = ({ filteredCountries }) => {
  //   const countries = { filteredCountries };
  //   console.log(filteredCountries.map((country) => country.name.common));
  //   const countries = ;
  if (filteredCountries.length > 0) {
    console.log(typeof filteredCountries);
  }

  console.log(filteredCountries.map((country) => country.name.common));
  return (
    <div>
      {filteredCountries.length < 10
        ? filteredCountries.map((country) => <p> {country.name.common}</p>)
        : "Too many matches, specify another filter"}
    </div>
  );
};
