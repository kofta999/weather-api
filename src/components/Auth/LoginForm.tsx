export function LoginForm() {
  return (
    <form hx-post="/login" hx-swap="outerHTML" hx-replace-url="true">
      <br />
      <label>
        Email:
        <input type="email" name="email" />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
}
