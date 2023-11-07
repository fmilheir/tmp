function handleLogin(username, password) {
    const loginDetails = { username, password };
    fetch('/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginDetails),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }
        // Redirect the user
        window.location.href = '/welcome';
    })
    .catch((error) => {
        console.error('Error during login:', error);
        alert(`Login error: ${error.message}`);
    });
}

function Login() {
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        handleLogin(username, password);
    };

    return (
        <div id="login-container">
            <form onSubmit={handleFormSubmit}>
                <input type="text" placeholder="Username" id="username" />
                <input type="password" placeholder="Password" id="password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Login />);