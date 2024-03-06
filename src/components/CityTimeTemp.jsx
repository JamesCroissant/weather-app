import React, { useEffect, useState } from 'react'

const CityTimeTemp = ({ currentWeather, isCelsius }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const utcDate = new Date();
      const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000 + currentWeather.timezone * 1000);
      const formattedTime = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'short',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(localDate);
      setTime(formattedTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [currentWeather.timezone]);

  return (
    <div className="flex flex-col items-center text-center space-y-5">
      <div>
        <p className="text-3xl md:text-5xl font-bold pt-4 pb-2">{currentWeather.cityName}</p>
        <p className="text-xl py-2">{time}</p>
      </div>
      <div className="flex items-center">
        <p className="text-4xl pb-4 font-semibold">{isCelsius ? `${currentWeather.celsius} °C` : `${currentWeather.fahrenheit} °F`}</p>
      </div>
    </div>
  )
}

export default CityTimeTemp;