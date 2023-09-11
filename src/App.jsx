import React, { useEffect, useState } from "react";
import axios from "axios";
import Weather from "./components/Weather";
import SearchBar from "./components/SearchBar";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);

  const success = (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const API_KEY = "237af4feae6c0b0d35bb4a115c23a2bb";

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    axios
      .get(url)
      .then(({ data }) => setWeatherInfo(data))
      .catch(({ err }) => console.log(err));
  };

  const fetchWeatherDataByCountry = (country) => {
    const API_KEY = "237af4feae6c0b0d35bb4a115c23a2bb";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${API_KEY}`;

    axios
      .get(url)
      .then(({ data }) => setWeatherInfo(data))
      .catch(({ err }) => console.log(err));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const handleSearch = (country) => {
    fetchWeatherDataByCountry(country);
  };

  return (
    <main className="bg-gradient-to-b from-gray-300 to-gray-500 min-h-screen text-gray-800 font-lato flex flex-col justify-center items-center px-4">
      <SearchBar onSearch={handleSearch} /> {/* Add the SearchBar component */}
      <Weather weatherInfo={weatherInfo} />
    </main>
  );
}

export default App;
