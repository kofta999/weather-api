import '@kitajs/html/register'
import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { weatherModule } from "./modules/weather";
import { authModule } from './modules/auth';

const app = new Elysia()
  .use(html())
  .use(authModule)
  .use(weatherModule)
  .get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
