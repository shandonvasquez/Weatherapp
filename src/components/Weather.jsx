import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ weatherInfo, selectedCountry }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const [countryInfo, setCountryInfo] = useState(null);

  const kelvinToCelsius = (tempKelvin) => {
    return (tempKelvin - 273.15).toFixed(1);
  };

  const KelvinToFahrenheit = (tempKelvin) => {
    return (((tempKelvin - 273.15) * 9) / 5 + 32).toFixed(1);
  };

  const handleUnitTempChange = () => {
    setIsCelsius(!isCelsius);
  };

  const resultTempConversion = isCelsius
    ? kelvinToCelsius(weatherInfo?.main.temp)
    : KelvinToFahrenheit(weatherInfo?.main.temp);

  useEffect(() => {
    if (selectedCountry) {
      // Fetch country information based on the selected country name
      axios
        .get(`https://restcountries.com/v3.1/name/${selectedCountry}`)
        .then(({ data }) => setCountryInfo(data[0]))
        .catch(({ err }) => console.log(err));
    }
  }, [selectedCountry]);

  return (
    <section className="text-center  ">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        {weatherInfo?.name}, {weatherInfo?.sys?.country}
      </h2>

      {countryInfo && (
        <div>
          <p>Country: {countryInfo?.name?.common}</p>
          <p>Capital: {countryInfo?.capital[0]}</p>
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-[auto_auto] lg:grid-cols-[auto_auto auto]">
        <section className="bg-white/60 p-2  rounded-2xl grid grid-cols-2 items-center">
          <h4 className="col-span-2">{weatherInfo?.weather[0].description} </h4>
          <span className="text-4xl font-semibold text-gray-600 animate-pulse">
            {resultTempConversion}°{isCelsius ? "C" : "F"}
          </span>

          <img
            src={`https://openweathermap.org/img/wn/${
              weatherInfo?.weather[0].main === "Clear"
                ? "01d"
                : weatherInfo?.weather[0].icon
            }@4x.png`}
            alt="Weather Icon"
            className={`animate-pulse shadow-md rounded-full ${
              weatherInfo?.weather[0].main === "Clear"
                ? "bg-yellow-200"
                : "bg-blue-200"
            } p-2`}
          />
        </section>
        <br></br>
        <section>
          <section className="bg-white bg-opacity-60 p-4 py-6 rounded-2xl grid grid-cols-3 items-center sm:grid-cols-1 lg:grid-cols-3 shadow-md">
            <article className="flex gap-2 items-center">
              <div className="w-[18px]">
                <img src={"/images/img1.png"} alt="" />
              </div>
              <span> {weatherInfo?.wind.speed}m/s </span>
            </article>

            <article className="flex gap-2 items-center">
              <div className="w-[18px]">
                <img src={"/images/img2.png"} alt="" />
              </div>
              <span> {weatherInfo?.main.humidity}% </span>
            </article>

            <article className="flex gap-2 items-center">
              <div className="w-[18px]">
                <img src={"/images/img3.png"} alt="" />
              </div>
              <span> {weatherInfo?.main.pressure}hPa </span>
            </article>
          </section>
        </section>
      </section>

      <button
        onClick={handleUnitTempChange}
        className="mt-2 px-6 py-3 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-gray-200 transform hover:scale-105 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      >
        TEMPERATURE UNIT
      </button>
      <footer className="text-center text-xs mt-6 text-gray-500">
        WEB DEVELOPER SHANDON V
      </footer>
    </section>
  );
};

export default Weather;
