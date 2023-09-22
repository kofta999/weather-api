import { Elysia } from "elysia";
import { setup } from "../libs/setup";
import { db } from "../libs/prisma";

export const isAuthenticated = new Elysia().use(setup).derive(
  async ({ jwt, cookie: { access_token }, set }) => {
    if (!access_token.value) {
      set.status = 401;
      throw new Error("Access token is not provided")
    }
    const data = await jwt.verify(access_token.value);
    if (!data) {
      set.status = 401;
      throw new Error("Access token is not correct")
    }

    const user = await db.user.findUnique({ where: { id: data.userId } });

    if (!user) {
      set.status = 404;
      throw new Error("User not found")
    }
    return { user };
  }
);
