import '@kitajs/html/register'
import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { weatherModule } from "./modules/weather";
import { authModule } from './modules/auth';
import { ErrorMessage } from './components/ErrorMessage';
import { BaseHtml } from './components/BaseHtml';

const app = new Elysia()
  .use(html())
  .onError(({ error, html }) => {console.log(error)})
  .use(authModule)
  .use(weatherModule)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
