import { Elysia, t } from "elysia";
import { db } from "../libs/prisma";
import { setup } from "../libs/setup";
import { authModel } from "../models/auth.model";
import { BaseHtml } from "../components/BaseHtml";
import { SignupForm } from "../components/Auth/SignupForm";
import { LoginForm } from "../components/Auth/LoginForm";
import { html } from "@elysiajs/html";
import { isAuthenticated } from "../middlewares/auth.middleware";
// import sgMail from "@sendgrid/mail";

// sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export const authModule = new Elysia()
  .use(html())
  .use(authModel)
  .use(setup)
  .get("signup", () => (
    <BaseHtml>
      <SignupForm />
    </BaseHtml>
  ))
  .get("login", () => (
    <BaseHtml>
      <LoginForm />
    </BaseHtml>
  ))
  .post(
    "signup",
    async ({ body, set }) => {
      const { name, email, password } = body;
      const existingUser = await db.user.findUnique({
        where: { email },
        select: { id: true },
      });
      if (existingUser) {
        set.status = 400;
        set.headers["HX-Redirect"] = "/login";
        throw new Error("User already exists, please log in");
      }
      const hashedPassword = await Bun.password.hash(password);
      const newUser = await db.user.create({
        data: {
          name,
          email,
          hashedPassword,
        },
      });
      set.headers["HX-Redirect"] = "/login";
      // return <h1>created user successfully</h1>;
    },
    {
      body: "signup",
    }
  )
  .post(
    "/login",
    async ({ jwt, cookie: { access_token }, body, set }) => {
      const { email, password } = body;
      const existingUser = await db.user.findUnique({
        where: {
          email,
        },
      });
      if (!existingUser) {
        set.status = 404;
        throw new Error("User not found");
      }
      const checkPassword = await Bun.password.verify(
        password,
        existingUser.hashedPassword
      );
      if (!checkPassword) {
        set.status = 401;
        throw new Error("Password incorrect");
      }

      const accessToken = await jwt.sign({ userId: existingUser.id });
      access_token.set({
        maxAge: 7 * 86400,
        value: accessToken,
      });

      set.headers["HX-Redirect"] = "/weather";
      // return <h1>Logged In</h1>;
    },
    {
      body: "login",
    }
  )
  .use(isAuthenticated)
  .post("/logout", ({ set, cookie: { access_token } }) => {
    access_token.remove();
    // set.headers["HX-Redirect"] = "/login";
    set.headers["HX-Redirect"] = "/login"
  });
