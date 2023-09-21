import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";

export const setup = new Elysia({
  cookie: {
    httpOnly: true,
    secrets: process.env.COOKIE_SECRET!,
    sign: ['access_token']
  }
})
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    })
  )