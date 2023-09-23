export function LoginForm() {
  return (
    <form
      class="loginForm"
      hx-boost="true"
      hx-post="/login"
      hx-swap="beforebegin"
      hx-select=".errorMessage"
    >
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
