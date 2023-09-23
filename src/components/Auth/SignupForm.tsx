export function SignupForm() {
  return (
    <form
      hx-boost="true"
      hx-post="/signup"
      hx-swap="beforebegin"
      hx-replace-url="true"
      hx-select=".errorMessage"
    >
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
