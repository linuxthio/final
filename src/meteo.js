
import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '37dfbf675e5c3f619fb37b0a4876c476';

export const fetchWeather = async (ville) => {
    const { data } = await axios.get(`${URL}?q=${ville}&units=metric&lang=fr&appid=${API_KEY}`);
    // const { data } = await axios.get(`${URL}?q=${ville},${ind}&appid=${API_KEY}`);

    return data;
}


