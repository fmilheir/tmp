function Profile({ title }) {
    //// (4)
  
    const [user, setUser] = React.useState([]);
  
    React.useEffect(() => {
      searchpois();
    }, []);
  
    function getUser(username) {
      fetch(`http://localhost:3000/user/users/username/${username}`, {
        method: "GET",
    })
      //.then((response) =>response.json())
      .then((response) => {
        if (response.status == 404) {
          alert("No User information to display");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      });
    }
  
    function editUser(id) {
      alert("shared");
    }
  

  
  
    return (
      <div>
        <h3>{title}</h3>
        <div className="d-sm-flex align-items-center mb-4">
              {user.length > 0 ? (
                user.map((item) => (
                  <div key={item.id}>
                    <p>Username: {item.username}</p>
                    <p>Email: {item.email}</p>
                    <p>Password: {item.password}</p>
                    <p>Level: {item.permission_level}</p>
                    <p>
                      <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="recomendbut" onClick={() => editUser(item.id)}>
                        Edit
                      </button>
                    </p>
                    </div>
                ))
              ) : (
                <p></p>
              )}
        </div>
      </div>
    );
  }
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Profile title="Personal Information" />);
  