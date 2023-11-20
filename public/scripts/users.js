function Users({ title }) {
  //// (4)

  const [user, setUsers] = React.useState([]);

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
  return (
    <div>
      <h3>{title}</h3>
      <div className="d-sm-flex align-items-center mb-4">
        <table
          id="table_id"
          className="display table"
          style={{ width: `100%` }}
        >
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
            {user.length > 0
              ? user.map((item) => (
                  <tr key={item.id}>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.permission_level}</td>
                    <td>
                      <button
                        className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                        id="editUser"
                        onClick={() => editUser(item.id)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                        id="deletUser"
                        onClick={() => deleteUser(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Users title="Users List" />);
