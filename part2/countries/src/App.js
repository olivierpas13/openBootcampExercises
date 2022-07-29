import { Filter } from "./Filter";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const countriesFetched = response.data;
      setCountries(countriesFetched);
    });
  }, []);

  return (
    <div>
      <Filter countries={countries} />
    </div>
  );
}

export default App;
