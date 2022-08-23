const LoginForm = ({
  handleLogin, setUsername, username, setPassword, password,
}) => (
  <form>
    <p>Username</p>
    <input
      type="text"
      value={username}
      name="Username"
      onChange={(e) => setUsername(e.target.value)}
    />
    <br />
    <br />
    <p>Password</p>
    <input
      type="password"
      value={password}
      name="Password"
      onChange={(e) => setPassword(e.target.value)}
    />
    <br />
    <br />
    <button type="submit" onClick={(e) => handleLogin(e)}>Login</button>
  </form>
);

export default LoginForm;
