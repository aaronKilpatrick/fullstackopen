import { useState, useEffect } from 'react';

import CountryInformation from './components/CountryInformatin';
import CountryList from './components/CountryList';
import SearchForm from './components/SearchForm';

import countriesService from './services/countriesService';
import weatherService from './services/weatherService';

const App = () => {
  const [country, setCountry] = useState(null);
  const [countriesData, setCountriesData] = useState([]);
  const [countryWeather, setCountryWeather] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    countriesService.getAll().then((allCountries) => {
      setCountriesData(allCountries);
    });
  }, []);

  useEffect(() => {
    if (!country) return;

    const [capitalCity] = country.capital;
    weatherService.getWeatherByCity(capitalCity).then((weatherData) => {
      setCountryWeather(weatherData);
    });
  }, [country]);

  const filterCountries = (searchQuery) => {
    setFilteredCountries(
      countriesData.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  };

  const handleChange = (e) => {
    setCountry(null);
    setValue(e.target.value);
    filterCountries(e.target.value);
  };

  const handleCountrySelect = (selectedCountry) => {
    setCountryWeather(null);
    setCountry(selectedCountry);
  };

  const renderContent = () => {
    if (country) {
      return <CountryInformation country={country} weather={countryWeather} />;
    }

    return (
      <CountryList
        countries={filteredCountries}
        onClick={handleCountrySelect}
      />
    );
  };

  return (
    <>
      <SearchForm value={value} onChange={(e) => handleChange(e)} />
      {renderContent()}
    </>
  );
};

export default App;
