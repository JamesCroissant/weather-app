import React, { useEffect, useState } from 'react';
import logo01d from '../icons/01d.svg';
import logo01n from '../icons/01n.svg';
import logo02d from '../icons/02d.svg';
import logo02n from '../icons/02n.svg';
import logo03d from '../icons/03d.svg';
import logo03n from '../icons/03n.svg';
import logo04d from '../icons/04d.svg';
import logo04n from '../icons/04n.svg';
import logo09d from '../icons/09d.svg';
import logo09n from '../icons/09n.svg';
import logo10d from '../icons/10d.svg';
import logo10n from '../icons/10n.svg';
import logo11d from '../icons/11d.svg';
import logo11n from '../icons/11n.svg';
import logo13d from '../icons/13d.svg';
import logo13n from '../icons/13n.svg';
import logo50d from '../icons/50d.svg';
import logo50n from '../icons/50n.svg';

const WeeklyForecast = ({ currentWeather, isCelsius }) => {
  const [loading, setLoading] = useState(false);
  const [weeklyData, setWeeklyData] = useState([]);

  const iconList = (icon) =>  {
    switch (icon) {
      case '01d': return logo01d
      case '01n': return logo01n
      case '02d': return logo02d
      case '02n': return logo02n
      case '03d': return logo03d
      case '03n': return logo03n
      case '04d': return logo04d
      case '04n': return logo04n
      case '09d': return logo09d
      case '09n': return logo09n
      case '10d': return logo10d
      case '10n': return logo10n
      case '11d': return logo11d
      case '11n': return logo11n
      case '13d': return logo13d
      case '13n': return logo13n
      case '50d': return logo50d
      case '50n': return logo50n
      default: return logo01d
    };
  };

  useEffect(() => {
    const getWeeklyWeather = async (lat, lon) => {
      setLoading(true);
      if (!lat) return;
      try {
        const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const weeklyForecast = data.daily.map(day => {
          const date = new Date(day.dt * 1000);
          const formattedDate = new Intl.DateTimeFormat('en-US', {
            month: 'numeric',
            day: 'numeric',
          }).format(date);
          return {
            date: formattedDate,
            weekday: weekdays[date.getDay()],
            weatherIcon: day.weather[0].icon,
            maxTempCelsius: day.temp.max.toFixed(1),
            minTempCelsius: day.temp.min.toFixed(1),
            maxTempFahrenheit: (day.temp.max * 9/5 + 32).toFixed(1),
            minTempFahrenheit: (day.temp.min * 9/5 + 32).toFixed(1),
            precipitationProbability: day.pop * 100
          };
        });
        setWeeklyData(weeklyForecast);
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setLoading(false);
      }
    }

    getWeeklyWeather(currentWeather.lat, currentWeather.lon)
  }, [currentWeather]);

  return (
    <>
      {/* <ul className={`grid sm:grid-cols-1 md:grid-cols-2 lg:flex sm:flex-row gap-1 justify-center overflow-x-auto w-7/12 sm:w-10/12 rounded-md  mx-auto mt-0 my-10 p-4 font-medium shadow-md ${innerContainer} bg-opacity-30`}> */}
      <ul className="">
        {weeklyData.slice(1).map((data, index) => {
          return (
            <li key={index} className="text-center flex flex-col items-center rounded-xl p-2">
              <p className="font-semibold text-xl">{data.date} {data.weekday}</p>
              <img 
                src={iconList(data.weatherIcon)}
                alt="Daily Weather Icon" 
                className="w-12 h-12 my-2"
                width={80}
                height={80} 
              />
              {isCelsius ? (
                <p className="pt-2 text-lg">H : {data.maxTempCelsius}°C  L : {data.minTempCelsius}°C</p>
              ) : (
                <p className="pt-2 text-lg">H : {data.maxTempFahrenheit}°F  L : {data.minTempFahrenheit}°F</p>
              )}
              <p className="py-2 mt-0 text-lg">Pre : {data.precipitationProbability}%</p>
            </li>
          );
        })}
      </ul>
    </>
  );
  
}

export default WeeklyForecast;

