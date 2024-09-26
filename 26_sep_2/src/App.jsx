import { useState, useEffect } from 'react';
import './App.css';

const apiKey = "341501caafad681951306380a4c3adf8";
const api = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

function App() {
  const [userData, setUserData] = useState(null); 
  const [searchcity, setSearchcity] = useState(""); 
  const [filteredcity, setFilteredcity] = useState(null); 
  
  const handleSearch = async () => {
    if (searchcity) {
      try {
        const response = await fetch(api(searchcity));
        if (response.ok) {
          const data = await response.json();
          setFilteredcity(data);
        } else {
          setFilteredcity(null); 
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setFilteredcity(null); 
      }
    }
  };

  return (
    <>
      <h1>City Weather</h1>
    
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={searchcity}
          onChange={(e) => setSearchcity(e.target.value)}
        />
        <button onClick={handleSearch}>Search by city</button>
      </div>

      {filteredcity && (
        <div>
          <h2>{filteredcity.name}</h2>
          <p>Temperature: {(filteredcity.main.temp - 273.15).toFixed(2)} °C</p>
          <p>Weather: {filteredcity.weather[0].description}</p>
          <p>Humidity: {filteredcity.main.humidity}%</p>
          <p>Wind Speed: {filteredcity.wind.speed} m/s</p>
        </div>
      )}
    </>
  );
}

export default App;
