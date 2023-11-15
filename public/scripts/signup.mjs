function Signup(){
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSignUp = () => {
        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords don't match!");
            return;
        }
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Invalid email format");
            return;
        }


        if (!username || !email || !password) {
            setError("Please fill in all fields");
            return;
        }

        const data = { username, email, password };

        // Send a POST request to the server user validation
        fetch('/user/checkusername', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            if (response.ok) {
                // If the username is available, send a POST request to the server to create a new user
                fetch('/user/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
               .then((response) => {
                if (!response.ok && response.status !== 201) {
                    throw new Error(`HTTP error ${response.status}`);
                   } 
                    //console.log(response);
                    return response.json()
                })
               .then(data => {
                    if (data.verificationCode) {
                        localStorage.setItem('userEmail', email); // Store email in local storage
                        window.location.href = `http://localhost:3000/verificationcode?code=${data.verificationCode}`;
                    } else {
                        throw new Error('Verification code not recieved')
                    }
               })
                .catch((error) => {
                    setError(error.message);
                });
            }
            else {
                setError('Username is already taken!');
            }
        })
        .catch((error) => {
            setError(error.message);
        
        });
    }
    return(
        <div id="signup-container">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder="Email address " value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button onClick={handleSignUp}>Sign Up</button>
            {error && <p className="error">{error}</p>}
        </div>
        
    );

}



const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Signup />);