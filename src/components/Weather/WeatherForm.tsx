/// <reference types="@kitajs/html/htmx.d.ts" />

export function WeatherForm() {
  return (
    <form
      hx-post="/weather/city"
      hx-swap="beforebegin"
      _="on submit target.reset()"
    >
      <div>
        <input
          style="width: 35%"
          type="text"
          name="city"
          placeholder="City name"
        />
      </div>
      <div>
        <button style="width: 35%" type="submit">
          Add City
        </button>
      </div>
    </form>
  );
}
