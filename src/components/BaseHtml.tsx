import Html from "@kitajs/html";
import { compile } from "@kitajs/html";

export const BaseHtml = compile(({ children }: Html.PropsWithChildren) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://unpkg.com/htmx.org@1.9.5"></script>
      {/* <script src="https://cdn.tailwindcss.com"></script> */}
      {/* <script src="https://unpkg.com/hyperscript.org@0.9.11"></script> */}
      <title>Weather</title>
    </head>
    {children}
  </html>
));
