import { Elysia } from "elysia";
import { setup } from "../libs/setup";
import { db } from "../libs/prisma";

export const isAuthenticated = new Elysia().derive(
  async ({ jwt, cookie: { access_token }, set }: any) => {
    if (!access_token) {
      set.status = 401;
      return {
        response: {
          success: false,
          status_message: "No token provided",
          data: null,
        },
      };
    }
    if (!access_token) {
      set.status = 401;
      return {
        response: {
          success: false,
          status_message: "Unauthorized user",
          data: null,
        },
      };
    }
    const data = await jwt.verify(access_token.value);
    if (!data) {
      set.status = 401;
      return {
        response: {
          success: false,
          status_message: "Invalid token",
          data: null,
        },
      };
    }

    const user = await db.user.findUnique({ where: { id: data.userId } });

    if (!user) {
      set.status = 404;
      return {
        response: {
          success: false,
          status_message: "User not found",
          data: null,
        },
      };
    }
    return {
      response: {
        success: true,
        status_message: "Successfully authenticated",
        data: user,
      },
    };
  }
);
