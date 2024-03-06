import React from 'react'

const ClimateInfo = ({ currentWeather }) => {
  return (
    <>
      {/* <div className={`flex flex-col sm:flex-row justify-around items-center  w-7/12 sm:w-10/12 mx-auto rounded-md m-4 mb-12 ${innerContainer} bg-opacity-30 shadow-md`}> */}
      <div className="flex flex-col">
        <div className="text-center my-5">
          <p className="font-bold text-2xl my-2">{currentWeather.humidity}%</p>
          <p className="text-xl sm:text-lg">Humidity</p>
        </div>
        <div className="text-center my-5">
          <p className="font-bold text-2xl my-2">{currentWeather.wind}km/h</p>
          <p className="text-xl sm:text-lg">Wind Spped</p>
        </div>
        <div className="text-center my-5">
          <p className="font-bold text-2xl my-2">{currentWeather.pressure}hpa</p>
          <p className="text-xl sm:text-lg">Pressure</p>
        </div>
      </div>
    </>
  )
}

export default ClimateInfo