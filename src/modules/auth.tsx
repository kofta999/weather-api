import { Elysia, t } from "elysia";
import { db } from "../libs/prisma";
import { setup } from "../libs/setup";
import { authModel } from "../models/auth.model";
import { ErrorMessage } from "../components/ErrorMessage";
import { BaseHtml } from "../components/BaseHtml";
import { SignupForm } from "../components/Auth/SignupForm";
import { LoginForm } from "../components/Auth/LoginForm";
// import sgMail from "@sendgrid/mail";

// sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export const authModule = new Elysia()
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
      console.log("here");
      const { name, email, password } = body;
      const existingUser = await db.user.findUnique({
        where: { email },
        select: { id: true },
      });
      if (existingUser) {
        set.status = 400;
        set.redirect = "/login";
        return <ErrorMessage />;
      }
      const hashedPassword = await Bun.password.hash(password);
      const newUser = await db.user.create({
        data: {
          name,
          email,
          hashedPassword,
        },
      });
      set.redirect = "/login";
      return <h1>created user successfully</h1>;
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
        return <ErrorMessage />;
      }
      const checkPassword = await Bun.password.verify(
        password,
        existingUser.hashedPassword
      );
      if (!checkPassword) {
        set.status = 401;
        return <ErrorMessage />;
      }

      const accessToken = await jwt.sign({ userId: existingUser.id });
      access_token.set({
        maxAge: 7 * 86400,
        value: accessToken,
      });

      set.redirect = "/weather/home"
      return <h1>Logged In</h1>;
    },
    {
      body: "login",
    }
  );
