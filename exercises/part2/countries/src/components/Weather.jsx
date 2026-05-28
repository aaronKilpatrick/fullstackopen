const Weather = ({ weather }) => {
  if (!weather) return null;
  const weatherImgUrl = `https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`;

  return (
    <section>
      <h2>Weather in {weather.name}</h2>
      <p>Temperature {weather.main.temp} &deg;C</p>
      <img src={weatherImgUrl} alt={weather.weather.description} />
      <p>Wind {weather.wind.speed} m/s</p>
    </section>
  );
};

export default Weather;
