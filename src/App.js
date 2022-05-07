import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img from './images/logo.png';

function App() {

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({
    temp: 0,
    humidity: 0,
    country: "",
    main: "",
    cityname: "",
    speed: 0,
    icon: ""
  });
  const typeCity = (type) => {
    console.log(type.target.value);
    setCity(type.target.value);
  }
  

  const searchweather = async () => {
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3f863df8627142b901905b782f5d5b3c`);
    console.log(resp.data);
    console.log(resp.data.main.temp);
    console.log(city);
      setWeather({
        temp: resp.data.main.temp,
        humidity: resp.data.main.humidity,
        country:resp.data.sys.country,
        main: resp.data.weather[0].description,
        cityname: resp.data.name,
        speed: resp.data.wind.speed,
        icon: resp.data.weather[0].icon
      });
    
    setCity("");
    }
    
      
  
  useEffect(() => {
    const fetchApi=async()=>{
      const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=howrah&units=metric&appid=3f863df8627142b901905b782f5d5b3c`);
   
    setWeather({
      temp: resp.data.main.temp,
      humidity: resp.data.main.humidity,
      country:resp.data.sys.country,
      main: resp.data.weather[0].description,
      cityname: resp.data.name,
      speed: resp.data.wind.speed,
      icon: resp.data.weather[0].icon
    });
    }
    fetchApi();
  },[setWeather]);
 
  return (
    <div className="App flex">
      <div className="name_app flex">
      <img src={img} className="logo" alt="logo" />
      <span>Weather App</span></div>
      <div className="search_container flex">
        <input type="text"
          onChange={typeCity} value={city}
          placeholder='enter city name'
          className='takeInput'/>

        <button onClick={searchweather} className="searchBtn">Search Now</button></div>
        

<div className='result_container flex'>

    <div className='result flex'>
        <div className='used_result flex'>
            <div className='cityName flex'>
            <span>{weather.cityname}, {weather.country}</span></div>
            <div className='temp-big'>
            <span>{weather.temp} °C</span>
            </div>
            {
              weather.main=='clear sky' ?(
                <img className="city-icon whiteNow" src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.main} />       

              )
              :
              (
                <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.main} />       

              )
            }
            <div className='main-big'>
          <span>{weather.main}</span>
        </div>
        </div>

  <div className='weather_details flex'>
        <div className='country'>
          <span>Country: </span>
          <span>{weather.country}</span>
        </div>
        <div className='temp'>
        
          <span>Temperature: </span>  
          <span>{weather.temp} °C</span>
        </div>
        <div className='humidity'>
          <span>Humidity: </span>
          <span>{weather.humidity} %</span>
        </div>
        <div className='main'>
          <span>Description: </span>
          <span>{weather.main}</span>
        </div>
        <div className='temp'>
          <span>Wind Speed: </span>
          <span>{weather.speed}km/h</span>
        </div></div>
          
        </div>
            
         
        
      </div>
    </div>

  );
}

export default App;
