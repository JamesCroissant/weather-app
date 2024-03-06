import { useEffect, useState } from 'react';
import './App.css';
import Loading from "./components/Loading";
import Form from './components/Form';
import CityTimeTemp from './components/CityTimeTemp';
import ToggleButton from './components/ToggleButton';
import Icon from './components/Icon';
import MaxMinTemp from './components/MaxMinTemp';
import ClimateInfo from './components/ClimateInfo';
import WeeklyForecast from './components/WeeklyForecast';
import ImageList from './components/ImageList';


function App() {
  const [loading, setLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({
    "cityName" : "",
    "humidity": "",
    "wind": "",
    "pressure": "",
    "celsius": 0,
    "fahrenheit":  0,
    "maxCelsius": 0,
    "maxFahrenheit": 0,
    "minCelsius": 0,
    "minFahrenheit": 0,
    "icon": "",
    "precipitation": "",
    "timezone": "",
    "condition": "",
    "lon" : "",
    "lat" : ""
  });
  const [backgroundColors, setBackgroundColors] = useState({
    OuterContainer : "bg-white",
    MiddleContainer : "bg-white",
    InnerContainer : "bg-white"
  });
  const [currentCity, setCurrentCity] = useState("Vancouver")
  const [isCelsius, setIsCelsius] = useState(true);
  const [imageList, setImageList] = useState([]);


  useEffect(() => {
    const fetchWeather = async (city) => {
      setLoading(true);
      if (!city) return;
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCurrentWeather({
          "cityName" : data.name,
          "humidity": data.main.humidity,
          "wind": data.wind.speed,
          "pressure": data.main.pressure,
          "celsius": data.main.temp.toFixed(1),
          "fahrenheit": ((data.main.temp * 9/5) + 32).toFixed(1),
          "maxCelsius": (data.main.temp_max).toFixed(1),
          "maxFahrenheit": ((data.main.temp_max * 9/5) + 32).toFixed(1),
          "minCelsius": (data.main.temp_min).toFixed(1),
          "minFahrenheit": ((data.main.temp_min * 9/5) + 32).toFixed(1),
          "icon": data.weather[0].icon,
          "precipitation": data.rain ? data.rain['1h'] : 0,
          "timezone": data.timezone,
          "condition": data.weather[0].main,
          "lon" : data.coord.lon,
          "lat" : data.coord.lat,
        })
        setLoading(false);
        return 
      } catch (error) {
        console.error('Fetch error:', error);
        setLoading(false);
      }
    }
    const fetchTourismImage = async (city) => {
      if (!city) return;
      try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${import.meta.env.VITE_UNSPLASH_API_KEY}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setImageList(data.results);
        return
      } catch (error) {
        console.error('Fetch error:', error);
        return;
      }
    }

    fetchWeather(currentCity);
    fetchTourismImage(currentCity);

  }, [currentCity]);

  const handleSubmit = (city) => {
    setCurrentCity(city);
  }

  const toggleChange = () => {
    setIsCelsius(!isCelsius);
  }

  
  const mapWeatherConditionToType = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Thunderstorm':
      case 'Drizzle':
      case 'Rain':
        return 'rainy';
      case 'Snow':
        return 'rainy';
      case 'Mist':
      case 'Smoke':
      case 'Haze':
      case 'Dust':
      case 'Fog':
      case 'Sand':
      case 'Ash':
      case 'Squall':
      case 'Tornado':
      case 'Clouds':
        return 'cloudy';
      case 'Clear':
        return 'sunny';
      default:
        return 'sunny';
    }
  };

  useEffect(() => {
    if(currentWeather.condition) {
      const conditionType = mapWeatherConditionToType(currentWeather.condition);
      
      switch (conditionType) {
        case 'rainy':
          setBackgroundColors({
            OuterContainer: "bg-sky-200",
            MiddleContainer: "bg-sky-600",
            InnerContainer: "bg-gray-500"
          });
          break;
        case 'cloudy':
          setBackgroundColors({
            OuterContainer: "bg-gray-200",
            MiddleContainer: "bg-slate-400",
            InnerContainer: "bg-gray-700"
          });
          break;
        default: // sunny
          setBackgroundColors({
            OuterContainer: "bg-amber-100",
            MiddleContainer: "bg-amber-300",
            InnerContainer: "bg-orange-400"
          });
      }
    }
    
  }, [currentWeather.condition]);

  return (
    <>
      <div className={`${backgroundColors.OuterContainer}`}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className={`w-8/12 mx-auto rounded-lg p-3 ${backgroundColors.MiddleContainer} bg-opacity-80 shadow-md text-white`}>
              <div className="font-sans flex items-center justify-center space-x-3 p-4 rounded-lg">
                <Form
                  onSubmit={handleSubmit}
                />
                <ToggleButton
                  onChange={toggleChange}
                  isCelsius={isCelsius}
                  innerContainer={backgroundColors.InnerContainer}
                />
              </div>
              <div className="flex flex-col justify-evenly p-4 sm:flex-row">
                <div className="sm:max-w-xs sm:flex items-center">
                  <CityTimeTemp
                    currentWeather={currentWeather}
                    currentCity={currentCity}
                    isCelsius={isCelsius}
                  />
                </div>
                <div className="mx-auto sm:mx-0 sm:max-w-xsr">
                  <Icon 
                    currentWeather={currentWeather} 
                  />
                  <MaxMinTemp 
                    currentWeather={currentWeather} 
                    isCelsius={isCelsius}
                  />
                </div>
              </div>

              <ClimateInfo
                currentWeather={currentWeather}
                innerContainer={backgroundColors.InnerContainer}
              />

              <WeeklyForecast
                currentWeather={currentWeather}
                isCelsius={isCelsius}
                innerContainer={backgroundColors.InnerContainer}
              />

              <ImageList
                imageList={imageList}
                cityName={currentWeather.cityName}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default App




//   useEffect(() => {
//     async function getDefaultWeather() {
//       try {
//         setLoading(true);
//         const defaultCity = await getDefaultCity();
//         if (!defaultCity) {
//           console.error('Could not determine the default city');
//           return;
//         }
//         setDefaultCity(defaultCity);
//         const { currentWeather, weeklyForecast } = await fetchWeatherData(defaultCity);
//         const imageUrls = await fetchTourismImage(defaultCity);
//         setCurrentWeather(currentWeather);

//         setWeeklyForecast(weeklyForecast);
//         setImageUrls(imageUrls.map(img => img.urls.regular));
//         setLoading(false);
//       } catch (error) {
//         console.error('Failed to fetch weather data:', error);
//         setLoading(false);
//       }
//     }
//     getDefaultWeather();
//   }, []);



//   const handleInputChange = (e) => {
//     setCurrentCity(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { currentWeather, weeklyForecast } = await fetchWeatherData(currentCity);
//     setCurrentWeather(currentWeather);
//     setWeeklyForecast(weeklyForecast);
//     const colors = setBackgroundColor(currentWeather.condition);
//     setBackgroundColors(colors);
//     const imageUrls = await fetchTourismImage(currentCity);
//     setImageUrls(imageUrls.map(img => img.urls.regular));
//     setCurrentCity('');
//   };


//   return (
//     <>
//       <div className={`${backgroundColors.OuterContainer}`}>
//         {loading ? (
//             <Loading />
//           ) : (
//             <>
//               <div className={`w-8/12 mx-auto rounded-lg p-3 ${backgroundColors.MiddleContainer} bg-opacity-80 shadow-md text-white`}>
//                 <div className="font-sans flex items-center justify-center space-x-3 p-4 rounded-lg">
//                   <Form
//                     handleSubmit={handleSubmit}
//                     currentCity={currentCity}
//                     handleInputChange={handleInputChange}
//                   />

//                   <ToggleButton
//                     toggleChange={toggleChange}
//                     isCelsius={isCelsius}
//                     innerContainer={backgroundColors.InnerContainer}
//                   />
//                 </div>
//                 <div className="flex flex-col justify-evenly p-4 sm:flex-row">
//                   <div className="sm:max-w-xs sm:flex items-center">
//                     <CityTimeTemp
//                       cityName={currentWeather.cityName}
//                       celsius={currentWeather.celsius}
//                       fahrenheit={currentWeather.fahrenheit}
//                       time={time}
//                       currentCity={defaultCity}
//                       isCelsius={isCelsius}
//                     />
//                   </div>
//                   <div className="mx-auto sm:mx-0 sm:max-w-xsr">
//                     <Icon
//                       icon={currentWeather.icon}
//                       condition={currentWeather.condition}
//                     />
//                     <MaxMinTemp
//                       maxCelsius={currentWeather.maxCelsius}
//                       minCelsius={currentWeather.minCelsius}
//                       maxFahrenheit={currentWeather.maxFahrenheit}
//                       minFahrenheit={currentWeather.minFahrenheit}
//                       isCelsius={isCelsius}
//                     />
//                   </div>
//                 </div>

//                 <ClimateInfo
//                   humidity={currentWeather.humidity}
//                   wind={currentWeather.wind}
//                   pressure={currentWeather.pressure}
//                   innerContainer={backgroundColors.InnerContainer}
//                 />

//                 <WeeklyForecast
//                   weeklyForecast={weeklyForecast}
//                   isCelsius={isCelsius}
//                   innerContainer={backgroundColors.InnerContainer}
//                 />

//                 <Image
//                   imageUrls={imageUrls}
//                   cityName={currentWeather.cityName}
//                   innerContainer={backgroundColors.InnerContainer}
//                 />

//               </div>

//             </>
//           )}
//       </div>
//     </>
//   )
// }

// export default App