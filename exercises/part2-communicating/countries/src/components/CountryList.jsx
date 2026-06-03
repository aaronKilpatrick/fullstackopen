const CountryList = ({ countries, onClick }) => {
  const MAX_COUNTRIES = 10;

  if (!countries) return null;

  if (countries.length > MAX_COUNTRIES)
    return <div>Too many matches, specify another filter</div>;

  return (
    <div>
      {countries.map((country) => {
        return (
          <div key={country.cca3}>
            <span>{country.name.common}</span>{' '}
            <button onClick={() => onClick(country)}>Show</button>
          </div>
        );
      })}
    </div>
  );
};

export default CountryList;
