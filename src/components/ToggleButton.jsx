import React from 'react'

const ToggleButton = ({ onChange, isCelsius}) => {
  return (
    /// dark mode
    <button
      onClick={onChange}
      className="group relative py-2 px-3 rounded-full overflow-hidden"
      >
      {/* <span className={`absolute inset-0 rounded-full ${innerContainer} opacity-0 group-hover:opacity-30 transition`}></span> */}
      <span className="relative z-10 text-xl rounded-full">{isCelsius ? '°F' : '°C'}</span>
    </button>
  )
}

export default ToggleButton