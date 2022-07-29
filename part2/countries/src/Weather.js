import { useEffect, useState } from "react";
import axios from "axios";

const handleError = (error) => {
  if (!!error?.message) {
    console.log({ handledError: error.message });
  }
  console.log("default Error");
};

export const Weather = ({ country }) => {
  const [ubication, setUbication] = useState([]);
  const [temperature, setTemperature] = useState([]);

  const fetchUbication = async (country) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${country.capital}&limit=1&appid=${process.env.REACT_APP_API_KEY}`
      );
      const { data } = response;
      setUbication([data[0].lat, data[0].lon]);
    } catch (error) {
      handleError(error);
    }
  };

  const fetchWeather = async (ubication) => {
    try {
      if (ubication.length !== 0) {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${ubication[0]}&lon=${ubication[1]}&appid=${process.env.REACT_APP_API_KEY}`
        );
        const { data } = response;
        setTemperature([
          (data.main.temp - 273.15).toFixed(2),
          data.weather[0].icon,
          data.wind.speed,
        ]);
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchUbication(country);
  }, [country]);

  useEffect(() => {
    fetchWeather(ubication);
  }, [ubication]);
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>temperature {temperature[0]} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${temperature[1]}@2x.png`}
        alt=""
        width="110px"
      />
      <p>wind {temperature[2]} m/s</p>
    </div>
  );
};
