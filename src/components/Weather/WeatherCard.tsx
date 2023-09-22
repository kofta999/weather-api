// {"location":{"name":"Suez","region":"As Suways","country":"Egypt","lat":29.97,"lon":32.55,"tz_id":"Africa/Cairo","localtime_epoch":1695247998,"localtime":"2023-09-21 1:13"},"current":{"last_updated":"2023-09-21 01:00","temp_c":21.9,"is_day":0,"condition":{"text":"Clear","code":1000},"wind_kph":14,"wind_degree":345,"wind_dir":"NNW","pressure_mb":1013,"pressure_in":29.9,"humidity":84,"cloud":3,"feelslike_c":21.9,"vis_km":10,"uv":1,"gust_kph":24.3}}

export function WeatherCard(props: any) {
  return (
    <article>
      <header>
        {props.location.name} ({props.location.region}),{" "}
        {props.location.country}
      </header>
      <p>
        {props.current.temp_c}°C , {props.current.condition.text} at{" "}
        {props.current.is_day === 1 ? "Day" : "Night"}
      </p>
      <small>Last Updated: {props.current.last_updated}</small>
      <footer>
        <button
          hx-delete={`/weather/city/${props.location.name}`}
          hx-swap="outerHTML"
          hx-target="closest article"
          class="secondary"
        >
          Remove City
        </button>
      </footer>
    </article>
  );
}
