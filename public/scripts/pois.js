function Pois({ title }) {

  const [poi, setPoi] = React.useState([]);
  
  function recommend(id) {
    const poi = {
      poi_id: id,
  };
    fetch(`http://localhost:3000/poi/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(poi),
    }).then((response) => {
      if (response.status === 200) {
        alert("Recommendation submitted successfully!");
      }
      return response.json();
    });
  }

  function sharePoi(id) {
    alert("shared");
  }


  function deletePoi(id) {
    fetch(`http://localhost:3000/poi/pointsOfInterest/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        alert("Poi Deleted");
      }
      return response.json();
    });
  }
  fetch(`http://localhost:3000/poi/pointsOfInterest`, {
      method: "GET",
    })
      //.then((response) =>response.json())
      .then((response) => {
        if (response.status == 404) {
          alert("No Poi's to display");
        }
        return response.json();
      })
      .then((data) => {
        setPoi(data);
      });
  /////////////////////////////////////////////// (13) till here
  return (
    <div>
      <h3>{title}</h3>
      <div className="d-sm-flex align-items-center mb-4">
        <table  id="table_id" className="display table" style={{ width: `100%` }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Country</th>
              <th>Region</th>
              <th>Description</th>
              <th>Rec</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Country</th>
              <th>Region</th>
              <th>Description</th>
              <th>Rec</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
          <tbody>
            {poi.length > 0 ? (
              poi.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.country}</td>
                  <td>{item.region}</td>
                  <td>{item.description}</td>
                  <td>{item.recommendations}</td>
                  <td>
                    <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="recomendbut" onClick={() => recommend(item.id)}>
                      Recommend
                    </button>
                  </td>
                  <td>
                    <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="shareBtn" onClick={() => sharePoi(item.id)}>
                      Share
                    </button>
                  </td>
                  <td>
                    <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" id="detePoi" onClick={() => deletePoi(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) :""}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Pois title="Poi's List" />);
