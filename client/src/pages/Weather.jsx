import React, { useState } from "react";
import { Search } from "lucide-react";

const WeatherPage = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;

  const fetchWeather = async (searchQuery) => {
    if (!apiKey) {
      setError(
        "API key is missing. Please set REACT_APP_OPENWEATHER_KEY in .env"
      );
      return;
    }

    if (!searchQuery.trim()) {
      setError("Please enter a location");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          searchQuery
        )}&units=metric&appid=${apiKey}`
      );
      const data = await res.json();
      console.log(data);

      if (data.cod === 401) {
        setError("Invalid API key. Please check your key in .env");
      } else if (data.cod !== 200) {
        setError("Location not found. Try again.");
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeather(query);
    }
  };

  const handleButtonClick = () => {
    fetchWeather(query);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-200 via-blue-100 to-green-50 text-slate-800 px-4">
      {/* Search Bar */}
      <div className="w-full max-w-md mb-8 flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Enter city or village name..."
            className="w-full pl-10 py-3 rounded-lg shadow-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={handleKeyPress}
          />
        </div>
        <button
          onClick={handleButtonClick}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer"
        >
          Search
        </button>
      </div>

      {/* Loading State */}
      {loading && <p className="text-slate-600 text-lg">Fetching weather...</p>}

      {/* Error */}
      {error && <p className="text-red-600 font-medium">{error}</p>}

      {/* Weather Info */}
      {weather && (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <h2 className="text-3xl font-bold mb-2">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-lg text-slate-600 mb-4">
            {weather.weather[0].description
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </p>
          <h1 className="text-6xl font-extrabold mb-4">
            {Math.round(weather.main.temp)}°C
          </h1>

          <div className="grid grid-cols-3 gap-4 text-slate-700 text-sm">
            <div>
              <p className="font-semibold">Feels Like</p>
              <p>{Math.round(weather.main.feels_like)}°C</p>
            </div>
            <div>
              <p className="font-semibold">Humidity</p>
              <p>{weather.main.humidity}%</p>
            </div>
            <div>
              <p className="font-semibold">Wind</p>
              <p>{Math.round(weather.wind.speed)} m/s</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Note */}
      <p className="mt-12 text-sm text-slate-500">
        Powered by <span className="font-semibold">Krishi Mitra</span>
      </p>
    </div>
  );
};

export default WeatherPage;
