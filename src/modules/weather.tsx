import { Elysia, t } from "elysia";
import axios from "axios";
import { WeatherCard } from "../components/Weather/WeatherCard";
import { ErrorMessage } from "../components/ErrorMessage";
import { WeatherForm } from "../components/Weather/WeatherForm";
import { BaseHtml } from "../components/BaseHtml";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { WeatherHome } from "../components/Weather/WeatherHome";
import { db } from "../libs/prisma";
import { WeatherList } from "../components/Weather/WeatherList";

const weatherApiUrl = process.env.WEATHER_API_URL!;

export const weatherModule = new Elysia({ prefix: "/weather" })
  .use(isAuthenticated)
  .get("/", async ({ user }) => {
    return (
      <BaseHtml>
        <WeatherHome {...user} />
      </BaseHtml>
    );
  })
  .get("/city", async ({ user }) => {
    const cities = user.savedLocations;
    const citiesData = await Promise.all(
      cities.map(async (city) => {
        const url = `${weatherApiUrl}/current.json?q=${city}`;
        const response = await axios.get(url, {
          params: {
            key: process.env.WEATHER_API_KEY!,
          },
        });
        if (response.status === 200) {
          return response.data;
        }
      })
    );
    return <WeatherList citiesData={citiesData} />;
  })
  .post(
    "/city",
    async ({ body, user }) => {
      const userId = user.id;
      const { city } = body;
      const url = `${weatherApiUrl}/current.json?q=${city}`;
      await db.user.update({
        where: { id: userId },
        data: { savedLocations: { push: city } },
      });
      const response = await axios.get(url, {
        params: {
          key: process.env.WEATHER_API_KEY!,
        },
      });
      if (response.status === 200) {
        return <WeatherCard {...response.data} />;
      } else {
        return <ErrorMessage />;
      }
    },
    { body: t.Object({ city: t.String() }) }
  );
