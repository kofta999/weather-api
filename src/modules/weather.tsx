import { Elysia, t } from "elysia";
import { db } from "../libs/prisma";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { BaseHtml } from "../components/BaseHtml";
import { WeatherCard } from "../components/Weather/WeatherCard";
import { WeatherHome } from "../components/Weather/WeatherHome";
import { WeatherList } from "../components/Weather/WeatherList";
import { fetchWeather } from "../libs/fetchWeather";

export const weatherModule = new Elysia({ prefix: "/weather" })
  .use(isAuthenticated)
  .get("/", ({ user }) => {
    return (
      <BaseHtml>
        <WeatherHome {...user} />
      </BaseHtml>
    );
  })
  .get("/city", async ({ user }) => {
    const cities = user.savedLocations;
    const citiesData = await Promise.all(cities.map(fetchWeather));
    return <WeatherList citiesData={citiesData} />;
  })
  .post(
    "/city",
    async ({ body, user }) => {
      const userId = user.id;
      const { city } = body;
      const data = await fetchWeather(city);
      await db.user.update({
        where: { id: userId },
        data: { savedLocations: { push: data.location.name } },
      });
      return <WeatherCard {...data} />;
    },
    { body: t.Object({ city: t.String() }) }
  )
  .delete("/city/:cityName", async ({ params, user }) => {
    const { cityName } = params;
    const newCities = user.savedLocations.filter((city) => city !== cityName);
    await db.user.update({
      where: { id: user.id },
      data: { savedLocations: { set: newCities } },
    });
  });
