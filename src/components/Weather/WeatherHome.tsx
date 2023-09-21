import { WeatherForm } from "./WeatherForm";

export function WeatherHome(user: any) {
  return (
    <div>
      <h3>Welcome {user.name} </h3>
      <p>Here's your weather cards for your saved locations:</p>
      {/* add cards here */}
      <p>
        Want to add more cities? <br /> use this form here
      </p>
      <WeatherForm />
    </div>
  );
}
