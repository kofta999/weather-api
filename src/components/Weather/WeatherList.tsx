import { WeatherCard } from "./WeatherCard";

export function WeatherList({ citiesData }: any) {
  return (
    <div class="grid">
      {citiesData.map((city: any) => (
        <WeatherCard {...city} />
      ))}
    </div>
  );
}
