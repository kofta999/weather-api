import axios from "axios";
const weatherApiUrl = process.env.WEATHER_API_URL!;

export const fetchWeather = async (city: string) => {
  const url = `${weatherApiUrl}/current.json?q=${city}`;
  const response = await axios.get(url, {
    params: {
      key: process.env.WEATHER_API_KEY!,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
}