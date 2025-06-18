import React, { useEffect, useRef, useState } from 'react'
import "./Weather.css"
import search_icon from "../assets/search.png"
import sunny_icon from "../assets/sunny.png"
import humidity_icon from "../assets/humidity.png"
import cloudy_icon from "../assets/cloudy.png"
import drizzley_icon from "../assets/drizzley.png"
import rainy_icon from "../assets/rainy.png"
import windy_icon from "../assets/windy.png"
import snowy_icon from "../assets/snowy.png"

const Weather = () => {


    const inputRef = useRef()


    const [weatherData, setWeatherData] = useState(false)

    const allIcons = {
        "01d": sunny_icon ,
        "01n": sunny_icon ,
        "02d": cloudy_icon,
        "02n": cloudy_icon,
        "03d": cloudy_icon,
        "03n": cloudy_icon ,
        "04d": drizzley_icon ,
        "04n": drizzley_icon,
        "09d": rainy_icon ,
        "09n": rainy_icon ,
        "10d": rainy_icon ,
        "10n": rainy_icon,
        "13d": snowy_icon,
        "13n": snowy_icon,
    }

    const search = async (city) => {

        if (city === "") {
            alert("Please enter a city!")
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3ecdbb6f1a92e66d5755440259cf078a`

            const responder = await fetch(url);
            const data = await responder.json();

            if (!responder.ok) {
                alert(data.message);
                return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || sunny_icon;
            setWeatherData({
                windspeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                humidity: data.main.humidity,
                location: data.name,
                icon: icon
            })

        } catch (error) {
            setWeatherData(false);
            console.log("Error fetching data, mots likely an API issue!")

        }
    }

    useEffect(() => {
        search("London")
    }, [])

  return (
    <div className="weather">
        <div className="search-bar">

            <input 
            ref={inputRef} 
            type="text" 
            placeholder="Search..."
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    search(inputRef.current.value)
                    inputRef.current.value="";
                }
            }} 
            />

            <img src={search_icon} alt="search icon" onClick={() => search(inputRef.current.value)}/>
        </div>
        {weatherData ? <>
        <img src={weatherData.icon} alt="weather image" className="weather-icon" />
        <p className="temperature">{weatherData.temperature}°C </p>
        <p className="location">{weatherData.location}</p>
        <div className="weather-data">
            
            <div className="col">
                <img src={humidity_icon} alt="humidity icon" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>

            <div className="col">
                <img src={windy_icon} alt="humidity icon" />
                <div>
                    <p>{weatherData.windspeed} Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>

        </div>
        </> : <>
        
        </>}

        

    </div>
  )
}

export default Weather