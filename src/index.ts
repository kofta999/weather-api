import "@kitajs/html/register";
import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { weatherModule } from "./modules/weather";
import { authModule } from "./modules/auth";
import { ErrorMessage } from "./components/ErrorMessage";

const app = new Elysia()
  .use(html())
  .onError(({ error, set }) => {
    const errormsg = "<!doctype html>" + ErrorMessage(error.message);
    set.headers["content-type"] = "text/html; charset=utf8";
    return new Response(errormsg);
  })
  .use(authModule)
  .use(weatherModule)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
