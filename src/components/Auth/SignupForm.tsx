export function SignupForm() {
  return (
    <form hx-post="/signup" hx-swap="outerHTML" hx-replace-url="true" hx-select=".loginForm">
      <label>
        Name:
        <input type="text" name="name" />
      </label>
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
      <button type="submit">Sign Up</button>
    </form>
  );
}
