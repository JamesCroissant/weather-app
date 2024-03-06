import React from 'react';
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


const Icon = ({ currentWeather }) => {
  
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

  return (
    <div className="px-4">
      <div className="flex justify-center items-center w-full">
        <img 
          src={iconList(currentWeather.icon)}
          alt="Weather Icon"
          width={100}
          height={100}
        />
      </div>
      <div className="text-center text-2xl">
        <p>{currentWeather.condition}</p>
      </div>
    </div>
  )
}

export default Icon