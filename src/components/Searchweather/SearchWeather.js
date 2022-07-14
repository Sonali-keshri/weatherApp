import React, { useState} from 'react'
import "./SearchWeather.css";
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { GiSnowman } from "react-icons/gi";
// import ReactAnimatedWeather from "react-animated-weather";
// import {BsFillCloudFill,BsFillCloudRainHeavyFill,BsFillCloudSnowFill,BsFillCloudLightningFill
// ,BsFillCloudsFill,BsFillCloudDrizzleFill} from "react-icons/bs";



function SearchWeather() {
    const [searchItem, setSearchItem] = useState("");
    const [data, setData] = useState({
        name: "",
        main: "",
        icon: "",
        temp: 0,
        temp_max: 0,
        temp_min: 0,
        humidity: 0,
        speed: 0,
        sunrise: 0,
        sunset: 0,
        country: ""
    });
    
    const itemEvent = (event) => {
        setSearchItem(event.target.value);
    };

    // API Call
    const searchLocation = (event) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchItem}&appid=fa38549830a85d1f7c54ee1376b9b4b5`)
            .then((response) => {
                setData({
                    name: response.data.name,
                    main: response.data.weather[0].main,
                    icon: response.data.weather[0].icon,
                    temp: response.data.main.temp,
                    temp_max: response.data.main.temp_max,
                    temp_min: response.data.main.temp_min,
                    humidity: response.data.main.humidity,
                    speed: response.data.wind.speed,
                    sunrise: response.data.sys.sunrise,
                    sunset: response.data.sys.sunset,
                    country: response.data.sys.country
                })
            })
            setSearchItem('')
        }
 
    // Current Date and Time
    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString('default', { month: 'long' });
    let day = d.toLocaleString('default', { weekday: 'long' });
    
    let time = d.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
    
    // Sunrise 
    if(data.sunrise){
    let sunrise = data.sunrise;
    let newSunriseDate = new Date(sunrise*1000);
    let sunrisehours = newSunriseDate.getHours();
    let sunriseMin = newSunriseDate.getMinutes();
    let sunrisesec = newSunriseDate.getSeconds();
    var sunriseTime = (sunrisehours +':'+sunriseMin+':'+sunrisesec);
    }

    // Sunset
    if(data.sunset){
    let sunset = data.sunset;
    let newSunsetDate = new Date(sunset*1000);
    let sunsethours = newSunsetDate.getHours();
    let sunsetMin = newSunsetDate.getMinutes();
    let sunsetsec = newSunsetDate.getSeconds();
    var sunsetTime = (sunsethours+':'+sunsetMin+":"+sunsetsec);
    }
    let temp = (data.temp - 273.15).toFixed(0);
    let max_Temp = (data.temp_max - 273.15).toFixed(1);
    let min_Temp = (data.temp_min - 273.15).toFixed(1);
    return (
        <>
            <div className='wrapper' >
                <div className='container'>
                    <section className='firsthalf'>
                        <h3 className='logo'><span>Snowa.</span><GiSnowman className="snowIcon"/></h3>
                        <h1 className='degree'>{data.temp?temp:""}&deg;C</h1>
                        <div className='bottompart'>
                            <div className='name'>
                                <h1>{data.name}</h1>
                                <p>{time}<br />{day}, {date} {month} '{year}</p>
                            </div>
                            <div className='descrption'>
                                {data.main?<i className={`fa-solid fa-cloud cloud`}></i>:""}
                                <p>{data.main}</p>
                            </div>
                        </div>
                    </section>
                    <section className='secondhalf'>
                        <div>
                            <input type="text" placeholder="Search City" className='searchbar' value={searchItem} onChange={itemEvent} />
                            <FaSearch className='searchicon' onClick={searchLocation} />
                        </div>
                        <div className='weatherDetailsbox'>
                            <h2>Weather Details</h2><br/>
                            <hr />
                            <div className='detail'>
                                <div>
                                    <p>Humidity</p>
                                    <p>Speed</p>
                                    <p>Sunrise</p>
                                    <p>Sunset</p>
                                    <p>Max Temp</p>
                                    <p>Min temp</p>
                                </div>
                                <div className='value'>
                                    <p>{data.humidity?data.humidity:"0"}%</p>
                                    <p>{data.speed}km/h</p>
                                    <p>{sunriseTime?sunriseTime:"00:00:00"}</p>
                                    <p>{sunsetTime?sunsetTime:"00:00:00"}</p>
                                    <p>{data.temp_max?max_Temp:""}&deg;</p>
                                    <p>{data.temp_min?min_Temp:""}&deg;</p>
                                </div>
                            </div>
                            <hr />
                        </div>

                    </section>


                </div>
            </div>
        </>
    )
}

export default SearchWeather;
