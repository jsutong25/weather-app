import React, { useState, useEffect } from 'react'
import './WeatherApp.css'

import location_icon from "../Assets/location-sign-svgrepo-com.svg"
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
import error_icon from "../Assets/404.png";

const WeatherApp = () => {

    const APIKey = 'cc58922e0105d6a1cef1862d3077d167';
    
    const [wicon, setWicon] = useState(cloud_icon);
    const [containerHeight, setContainerHeight] = useState('130px');

    useEffect(() => {
        document.documentElement.style.setProperty("--container-height", containerHeight);
      }, [containerHeight]);

    const handleSearchClick = () => {
        setContainerHeight('830px');
    }

    const search = async () => {

        const element = document.getElementsByClassName("cityInput")
        if(element[0].value === "") {
            return 0;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${APIKey}`;

        const response = await fetch(url);
        const data = await response.json();

        const humidity = document.getElementsByClassName("humidity-percent")
        const wind = document.getElementsByClassName("wind-rate")
        const temperature = document.getElementsByClassName("weather-temp")
        const location = document.getElementsByClassName("weather-location")

        if(data.cod === '404') {
            setWicon(error_icon);
            humidity[0].innerHTML = "";
            wind[0].innerHTML = "";
            temperature[0].innerHTML = "";
            location[0].innerHTML = "";
        }
        
        humidity[0].innerHTML = data.main.humidity + "%";
        wind[0].innerHTML = data.wind.speed + " km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp) + "°C";
        location[0].innerHTML = data.name;
        

        // humidity[0].innerHTML = data.main.humidity + "%";
        // wind[0].innerHTML = data.wind.speed + " km/h";
        // temperature[0].innerHTML = Math.floor(data.main.temp) + "°C";
        // location[0].innerHTML = data.name;

        if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
            setWicon(clear_icon);
        } else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            setWicon(cloud_icon)
        } else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
            setWicon(drizzle_icon)
        } else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setWicon(drizzle_icon)
        } else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
            setWicon(rain_icon)
        } else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWicon(rain_icon)
        } else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setWicon(snow_icon)
        } else if(data.cod === "404") {
            setWicon(error_icon);
        } else {
            setWicon(clear_icon);
        }

        handleSearchClick();

    }

  return (
    <div className='container' onClick={() => {search()}}>
        <div className='search-box'>
            <div className="location-icon">
                <img src={location_icon} alt="location_icon" width={30} height={30}/>
            </div>
        <input type="text" placeholder="Enter your location" className='cityInput' />
            <div className='search-icon' onClick={() => {search()}}>
                <img src={search_icon}
                alt='search_icon'   
                />
            </div>
        </div>

        <div className="weather-image">
            <img src={wicon} alt="cloud_icon" />
        </div>
        <div className="weather-temp"></div>
        <div className="weather-location"></div>
        <div className="data-container">
            <div className="element">
                <img src={humidity_icon} alt="" className='icon' />
                <div className="data">
                    <div className="humidity-percent"></div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon} alt="" className='icon' />
                <div className="data">
                    <div className="wind-rate"></div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp