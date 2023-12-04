// Define a functional component for email verification
function EmailVerification(title) {
  const verifyEmail = () => {
    const email = document.getElementById("email").value;
    const data = { email };

    // Send a POST request to the server to verify the email
    fetch("/user/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to verify email");
        }
      })
      .then((result) => {
        // Handle the result from the server
        const notification = document.getElementById("notification");
        notification.textContent =
          "Email verification successful. Link has been sent to email";
      })
      .catch((error) => {
        const notification = document.getElementById("notification");
        notification.textContent = "Error " + error.message;
      });
  };

  return (
    <div className="container-fluid">
        <div
          id="itme-container"
          className="d-sm-flex align-items-center justify-content-between mb-4"
        >
          <input
            type="email"
            className="form-control form-control-user"
            placeholder="Enter Email Address "
            required
          />
          <br />
          <button
            onClick={verifyEmail}
            id="verify-button"
            className="btn btn-primary btn-user btn-block"
          >
            Verify
          </button>
        </div>
    </div>
  );
}

// Render the component

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<EmailVerification title="Please enter your email:" />);
