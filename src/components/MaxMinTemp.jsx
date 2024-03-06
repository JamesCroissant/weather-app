import React from 'react'

const MaxMinTemp = ({ currentWeather, isCelsius }) => {
  return (
    <div className="flex items-center justify-around space-x-7">
      <div className="flex flex-col py-5">
        <div className="text-lg">HIGH -</div>
        <div className="font-semibold text-2xl">{isCelsius ? `${currentWeather.maxCelsius} °C` : `${currentWeather.maxFahrenheit} °F`}</div>
      </div>
      <div className="flex flex-col py-5">
        <div className="text-lg">LOW -</div>
        <div className="font-semibold text-2xl">{isCelsius ? `${currentWeather.minCelsius} °C` : `${currentWeather.minFahrenheit} °F`}</div>
      </div>
    </div>
  )
}

export default MaxMinTemp