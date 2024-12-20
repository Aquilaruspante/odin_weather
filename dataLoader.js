const API_KEY = '48DBL9Y9LJFJZJVTP54BCVDFA';
const URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline'

export default async function queryWeather(location) {
    try {
        const modal = document.querySelector('#modal');
        modal.classList.toggle('invisible');
        const response = await fetch(`${URL}/${location}?key=${API_KEY}`, { mode: 'cors' });
        const responseData = await response.json();

        console.log(responseData);
        return responseData;
    } catch (e) {
        console.log('error', e);
    }
    
}

