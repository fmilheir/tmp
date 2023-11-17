function Region({ list }) {
    //// (4)
  
    const [poi, setPoi] = React.useState([]);
  
    React.useEffect(() => {
      searchpois()
    }, []);
  
    function recommend(id) {
      fetch(`http://localhost:3000/poi/recommend/${id}`, {
        method: "POST",
      }).then((response) => {
        if (response.status === 200) {
          alert("Recommendation submitted successfully!");
        }
        return response.json();
      });
    }
  
    function sharePoi(id) {
      alert("shared")
    }
    
  
    function searchpois() {
      /// search /////////////// (4)

          fetch(`http://localhost:3000/poi/pointsOfInterest`, {
              method: "GET",
            })
              //.then((response) =>response.json())
              .then((response) => {
                if (response.status == 404) {
                  alert("Please enter a region first");
                }
                return response.json();
              })
              .then((data) => {
                setPoi(data);
                
              });
      }
  
      /////////////////////////////////////////////// (13) till here
  
    return (
      <div>
        <h3 >
            All Poi's
        </h3>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          {poi.length > 0 ? (
            poi.map((item) => (
              <div key={item.id}>
                <h3                >
                  Name: {item.name}
                </h3>
                <p>
                  Type: {item.type}, Country: {item.country}, Region:{" "}
                  {item.region}, Lon: {item.lon}, Lat: {item.lat}, Description:{" "}
                  {item.description}, Recommendations: {item.recommendations}
                </p>
                <button id="recomendbut" onClick={() => recommend(item.id)}>
                  Recommend
                </button>
                <button id="shareBtn" onClick={() => sharePoi(item.id)}>
                  Share
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
  root.render(<Region list="Search by region" />);