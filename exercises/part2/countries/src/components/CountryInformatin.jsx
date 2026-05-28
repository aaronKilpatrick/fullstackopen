import Weather from './Weather';

const CountryInformation = ({ country, weather }) => {
  if (!country) return null;

  const [capitalCity] = country.capital;

  const renderLanguageList = () => {
    return Object.entries(country.languages).map(([code, lang]) => (
      <li key={code}>{lang}</li>
    ));
  };
  return (
    <div>
      <h1>{country.name.common}</h1>
      <section>
        <p>Capital: {capitalCity}</p>
        <p>Area: {country.area}</p>
      </section>
      <section>
        <h2>Languages</h2>
        <ul>{renderLanguageList()}</ul>
      </section>
      <div>
        <img alt={country.flags.alt} src={country.flags.png} />
      </div>
      <Weather weather={weather} />
    </div>
  );
};

export default CountryInformation;
