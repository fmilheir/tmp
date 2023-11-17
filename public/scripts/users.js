function Region({ list }) {
    //// (4)
  
    const [user, setUsers] = React.useState([]);
  
    React.useEffect(() => {
      searchUsers()
    }, []);
  
    function deleteUser(id) {
      fetch(`http://localhost:3000/user/users/${id}`, {
        method: "DELETE",
      }).then((response) => {
        if (response.status === 200) {
          alert("User Deleted");
        }
        return response.json();
      });
    }
    
  
    function searchUsers() {
      /// search /////////////// (4)

          fetch(`http://localhost:3000/user/all`, {
              method: "GET",
            })
              //.then((response) =>response.json())
              .then((response) => {
                if (response.status == 404) {
                  alert("No users to display");
                }
                return response.json();
              })
              .then((data) => {
                setUsers(data);
                
              });
      }
  
      /////////////////////////////////////////////// (13) till here
  
    return (
      <div>
        <h3 >
            All Users
        </h3>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          {user.length > 0 ? (
            user.map((item) => (
              <div key={item.id}>
                <h3                >
                  Username: {item.username}
                </h3>
                <p>
                  Email: {item.email}, Permissions: {item.permission_level}
                </p>
                <button id="deletUser" onClick={() => deleteUser(item.id)}>
                  Delete
                </button>
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
  root.render(<Region list="Users List" />);