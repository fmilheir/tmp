function ForgotPasswordForm() {
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [message, setMessage] = React.useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        setMessage("Passwords don't match!");
        return;
      }
      try {
        //Extract the token from the URL 
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const response = await fetch("/user/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password: password,
            confirmPassword: confirmPassword,
            token: token
          }),
        });
        if (response.ok) {
          setMessage("Password reset successful!");
          window.location.href = '/login';
        } else {
          setMessage("Password reset failed!");
        }
      } catch (error) {
        console.error(error);
        setMessage("An error occurred");
      }
    };
  
    return (
      <div>
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <button type="submit">Reset Password</button>
          <p>{message}</p>
        </form>
      </div>
    );
  }
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<ForgotPasswordForm />);
  