const container = document.querySelector('.container');
const search = document.querySelector('.search-field button');
const weatherField = document.querySelector('.weather-field');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.Error');

search.addEventListener('click', () => {

  const APIKey = '4c28062f523c2dde4f78b22d97c0021c';
  const city = document.querySelector('.search-field input').value;

  if (city === '')
    return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {

      if (json.cod === '404') {
        container.style.height = '400px';
        weatherField.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
      }

      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      const image = document.querySelector('.weather-field img');
      const temperature = document.querySelector('.weather-field .temperature');
      const description = document.querySelector('.weather-field .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      switch (json.weather[0].main) {
        case 'Clear':
          image.src = 'assets/img/clear.png';
          break;

        case 'Rain':
          image.src = 'assets/img/rain.png';
          break;

        case 'Snow':
          image.src = 'assets/img/snow.png';
          break;

        case 'Clouds':
          image.src = 'assets/img/cloud.png';
          break;

        case 'Mist':
          image.src = 'assets/img/mist.png';
          break;

        default:
          image.src = '';
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherField.style.display = '';
      weatherDetails.style.display = '';
      weatherField.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      container.style.height = '590px';


    });


});
