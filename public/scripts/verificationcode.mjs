function VerifyUser(title) {
  // Extracting verification code from URL
  const urlParams = new URLSearchParams(window.location.search);
  const defaultVerificationCode = urlParams.get("code");

  const [verificationCode, setVerificationCode] = React.useState(
    defaultVerificationCode || ""
  );
  const [countdown, setCountdown] = React.useState(null); // Initially null, will be set to 5 when countdown starts

  // Event handler for verification
  const handleVerification = () => {
    const data = { verificationCode };

    // Send a POST request to the server to verify the code
    fetch("/user/verify-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to verify code");
        }
      })
      .then((result) => {
        setCountdown(5); // Start countdown
      })
      .catch((error) => {
        const notification = document.getElementById("notification");
        notification.textContent = "Error: " + error.message;
      });
  };

  React.useEffect(() => {
    let intervalId;
    if (countdown !== null) {
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    if (countdown === 0) {
      clearInterval(intervalId);
      window.location.href = "/login"; // Redirect when countdown reaches 0
    }

    return () => clearInterval(intervalId);
  }, [countdown]); // Depend on countdown

  return (
    <div className="container-fluid">
        <div
          id="item-container"
          className="d-sm-flex align-items-center justify-content-between mb-4"
        >
          <input
            type="text"
            id="verify"
            placeholder="Verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="form-control form-control-user"
          />
          <br />
          <button
            onClick={handleVerification}
            id="verify-button"
            className="btn btn-primary btn-user btn-block"
          >
            Verify
          </button>
          {countdown !== null ? (
            <div>
              Account has been verified. Redirecting to the Login page in{" "}
              {countdown} seconds...
            </div>
          ) : null}
        </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<VerifyUser title="Please enter your verification code" />);
