
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState()
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const toDate = () => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'Nocvember',
      'December',
    ];
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`
    return date;

  }

  const search = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setQuery('');
      setWeather({ ...weather, loading: true });
      const url = 'https://api.openweathermap.org/data/2.5/weather?';
      const appid = '023431cfe3cf64071acaac1e6f01b225';

      await axios
        .get(url
          , {
            params: {
              q: query,
              units: 'metric',
              appid: appid,
            },
          }
        )
        .then((res) => {
          console.log('res', res);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setQuery('');
          console.log('error', error);
        });
    }
  };

  return (
    <div className="App">
      <h1>
        Know Weather using react js App  <span>
          
        </span>
      </h1>
      <div className='search-bar'>
        <input
          type="text"
          className='city-search'
          placeholder='Search city'
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        />
      </div>

      {
        weather.loading && (
          <>
          <br></br>
          <br></br>
          <h4>Searching...</h4>
          </>
        )
      }
      {
        weather.error && (
          <>
          <br></br>
          <br></br>
          <span className='error-message'>
            {}
               Sorry city not found, please try again.
            {/* chulindra */}
          </span>
          </>
        )
      }

      {
        weather && weather.data && weather.data.main && (
          <div>
            <div className='city-name'>
              <h2>
                {weather.data.name}, <span>{weather.data.sys.country}</span>
              </h2>
            </div>
            <div className='date'>
              <span>{toDate()}</span>
            </div>
            <div className='icon-temp'>
              <img
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
              />
              {Math.round(weather.data.main.temp)}
              <sup className='deg'>°C</sup>
            </div>
            <div className='des-wind'>
              <p>{weather.data.weather[0].description.toUpperCase()}</p>
              <p>Wind speed: {weather.data.wind.speed}m/s</p>
            </div>
          </div>
        )
      }

    </div>
  );
}

export default App;