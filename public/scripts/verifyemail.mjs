// Define a functional component for email verification
function EmailVerification() {
  const verifyEmail = () => {
    const email = document.getElementById('email').value;
    const data = { email };

    // Send a POST request to the server to verify the email
    fetch('/user/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to verify email');
        }
    })
    .then((result) => {
        // Handle the result from the server
        const notification = document.getElementById('notification');
        notification.textContent = 'Email verification successful. Link has been sent to email';
    })
    .catch((error) => {
        const notification = document.getElementById('notification');
        notification.textContent = 'Error ' + error.message;
    });
};

    return (
        <div id="itme-container">
            <input  type="text"
                  className="form-control form-control-user"
                  placeholder="Enter Email Address "/>
            <button onClick={verifyEmail} id="verify-button">Verify</button>
        </div>
     );
}

// Render the component

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<EmailVerification />);
