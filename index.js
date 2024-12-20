import queryWeather from "./dataLoader.js";

const searchInput = document.querySelector('input');
const searchButton = document.querySelector('button');

const city = document.querySelector('h1');
const max = document.querySelector('#max');
const min = document.querySelector('#min');
const desc = document.querySelector('#description');
const temp = document.querySelector('h2');
const todayImage = document.querySelector('#today-image');
const precipitations = document.querySelector('#precipitation');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');
const days = document.querySelector('#days');
const modal = document.querySelector('#modal');

function selectImage(weather) {
    if (weather === 'Partially cloudy') {
        return './icons/cloudy.png';
    } else if (weather === 'Overcast') {
        return './icons/cloud.png';
    } else if (weather === 'Clear') {
        return './icons/sun.png';
    } else if (weather === 'Rain, Partially cloudy') {
        return './icons/partcloudyrain.png';
    } else if (weather === 'Rain, Overcast') {
        return './icons/rainy.png';
    }else if (weather === 'Rain') {
        return './icons/rainy.png';
    }
}

function createDays(data) {
    days.innerHTML = '';
    for (let i = 1; i < 8; i++) {
        const day = document.createElement('div');
        day.setAttribute('class', `day`);

        const dayName = document.createElement('div');
        dayName.setAttribute('class', 'day-name');
        dayName.innerText = data.days[i].datetime;
        day.appendChild(dayName);

        const dayImage = document.createElement('img');
        dayImage.setAttribute('class', 'day-image');
        dayImage.src = selectImage(data.days[i].conditions);
        day.appendChild(dayImage);

        const minMax = document.createElement('div');
        minMax.setAttribute('class', 'day-min-max');
        
        const min = document.createElement('div');
        min.setAttribute('class', 'day-min');
        min.innerText = `${Math.round((data.days[i].tempmin - 32) * 5 / 9)}°`
        minMax.appendChild(min);

        const max = document.createElement('div');
        max.setAttribute('class', 'day-max');
        max.innerText = `${Math.round((data.days[i].tempmax - 32) * 5 / 9)}°`
        minMax.appendChild(max);

        day.appendChild(minMax);

        if (i % 2 === 0) {
            day.classList.toggle('yellow');
        }

        days.appendChild(day);
    }
}

function populateApp(location) {
        queryWeather(location).then((data) => {
            modal.classList.toggle('invisible');
            city.innerText = data.resolvedAddress;
            temp.innerText = `${Math.round((data.days[0].temp - 32) * 5 / 9)}°C`;
            max.innerText = `Max ${Math.round((data.days[0].tempmax - 32.0) * 5 / 9)}°C`;
            min.innerText = `Min ${Math.round((data.days[0].tempmin - 32.0) * 5 / 9)}°C`;
            desc.innerText = data.description;
            todayImage.src = selectImage(data.currentConditions.conditions);
            precipitations.innerText = `precip: ${data.currentConditions.precipprob}%`;
            humidity.innerText = `humidity: ${data.currentConditions.humidity}%`;
            wind.innerText = `wind: ${data.currentConditions.windspeed}mph`;
            createDays(data);
    })
}

searchButton.addEventListener('click', () => {populateApp(searchInput.value)});



populateApp('Agrigento');
