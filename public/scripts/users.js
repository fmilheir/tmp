function Region({ list }) {
  //// (4)

  const [user, setUsers] = React.useState([]);

  React.useEffect(() => {
    searchUsers();
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
  function editUser(id) {
    alert("Edited");
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
      <h3>{list}</h3>
      <div className="d-sm-flex align-items-center mb-4">
        <table id="table_id" className="display table" style={{ width: `100%` }}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Permission</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Permission</th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
          <tbody>
            {user.length > 0 ? (
              user.map((item) => (
                <tr key={item.id}>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.permission_level}</td>
                  <td>
                    <button id="editUser" onClick={() => editUser(item.id)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button id="deletUser" onClick={() => deleteUser(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <p></p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Region list="Users List" />);
