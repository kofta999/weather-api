import { WeatherForm } from "./WeatherForm";

export function WeatherHome(user: any) {
  return (
    <div class="home">
      <h3>Welcome {user.name} </h3>
      <p>Here's your weather cards for your saved locations:</p>
      <div
        hx-get="/weather/city"
        hx-trigger="load"
        hx-target="closest div"
        hx-swap="outerHTML"
      ></div>
      <p>
        Want to add more cities? <br /> use this form here
      </p>
      <WeatherForm />
    </div>
  );
}
