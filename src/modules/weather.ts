import { Elysia } from "elysia";
import axios from "axios";
import { WeatherCard } from "../components/WeatherCard";
import { ErrorMessage } from "../components/ErrorMessage";

const weatherApiUrl = process.env.WEATHER_API_URL!

export const weatherModule = new Elysia({ prefix: "/weather" })
  .get("/", async ({ query }) => {
    try {
      const { city } = query;
      const url = `${weatherApiUrl}/current.json?q=${city}`
      const response = await axios.get(url, {
        params: {
          key: process.env.WEATHER_API_KEY!
        }
      })
      if (response.status === 200) {
        return WeatherCard(response.data)
      } else {
        return ErrorMessage()
      }
    } catch (err) {
      console.log(err);
    }
  })