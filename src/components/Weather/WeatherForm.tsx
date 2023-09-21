/// <reference types="@kitajs/html/htmx.d.ts" />

export function WeatherForm() {
  return (
    <form
      hx-post="/weather/city"
      hx-swap="beforebegin"
      _="on submit target.reset()"
    >
      <input type="text" name="city" />
      <button type="submit">Add City</button>
    </form>
  );
}