import { WeatherCard } from "./WeatherCard";

export function WeatherList({ citiesData }: any) {
  return (
    <div>
      {citiesData.map((city: any) => (
        <WeatherCard {...city} />
      ))}
    </div>
  );
}
