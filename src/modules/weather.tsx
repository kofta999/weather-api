import { Elysia, t } from "elysia";
import axios from "axios";
import { WeatherCard } from "../components/Weather/WeatherCard";
import { ErrorMessage } from "../components/ErrorMessage";
import { WeatherForm } from "../components/Weather/WeatherForm";
import { BaseHtml } from "../components/BaseHtml";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { WeatherHome } from "../components/Weather/WeatherHome";
import { db } from "../libs/prisma";

const weatherApiUrl = process.env.WEATHER_API_URL!;

export const weatherModule = new Elysia({ prefix: "/weather" })
  .get("/", async () => {
    return (
      <BaseHtml>
        <WeatherForm />
      </BaseHtml>
    );
  })
  .use(isAuthenticated)
  .post(
    "/city",
    async ({ body, response }) => {
      const userId = response.data?.id;
      const { city } = body;
      const url = `${weatherApiUrl}/current.json?q=${city}`;
      try {
        console.log(
          await db.user.update({
            where: { id: userId },
            data: { savedLocations: { push: city } },
          })
        );
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
      } catch (err) {
        console.log(err);
      }
    },
    { body: t.Object({ city: t.String() }) }
  )
  .get("/home", ({ response }) => (
    <BaseHtml>
      <WeatherHome {...response.data} />
    </BaseHtml>
  ));
