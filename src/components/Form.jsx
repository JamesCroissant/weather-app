import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Form = ({ onSubmit }) => {
  const [city, setCity] = useState("");

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(city);
    setCity("");
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative flex items-center overflow-hidden rounded-3xl hover:shadow-md">
      <button type="submit" className="absolute text-black flex justify-center items-center w-[45px] h-[45px] border-none bg-transparent cursor-pointer rounded-3xl">
        <FontAwesomeIcon icon={faSearch} />
      </button>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleInputChange}
        className="h-[45px] py-[5px] pl-[45px] pr-[10px] border-none text-base outline-none placeholder-gray-600 rounded-3xl text-black"
      />
    </form>

  )
}

export default Form