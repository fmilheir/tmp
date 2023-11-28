function Region({ title }) {
  //// (4)
//check use of this variables//
//
//
//
//
//
//

  const [poi, setPoi] = React.useState([]);
  const [map, setMap] = React.useState(null);
  
 
  React.useEffect(() => {
    /// map (8)

    const map = L.map("map2");
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        "Map data copyright OpenStreetMap contributors, Open Database Licence",
    }).addTo(map);

    map.setView([51.05, -0.72], 14); // load mapfocus

    setMap(map);

    let Longtitude = 0;
    let Latitude = 0;

    map.on("click", (e) => {
      /////////// (9)
      Latitude = e.latlng.lat;
      Longtitude = e.latlng.lng;
      const pos = [Latitude, Longtitude];
      ////////////////////////////////////////////////////////////////////   // picture upload
      const domForm = document.createElement("div"); // form for the picture
      domForm.innerHTML = `
                <form method='post' enctype='multipart/form-data' action="/photos/upload" id="uploadform">
                <h3>Would you like to add a picture?<h3> <input type='file' id='userPhoto' />
                <button id='uploadBtn' value='Upload'>upload</button>
                <button id='no' value='no'>No, Skipp -></button>
                </form>
            `;

      ////////////////////////////////////////////////////////////////////////////////// picture upload over
      const domDiv = document.createElement("div");
      domDiv.innerHTML = `
            <form id="poi-form">
                <input type="text" id="name" name="name" placeholder="Input the name of the Place" ><br>
                <input type="text" id="type" name="type" placeholder="Is it a city? or town?" ><br>
                <input type="text" id="country" name="country" placeholder="What country?" ><br>
                <input type="text" id="region" name="region" placeholder="Input the region of the Place" ><br>
                <textarea id="description" name="description" placeholder="Describe the place" ></textarea><br>
                <button id="submit" type="submit">Submit</button>
            </form> `;

      let popupp = false;

      domDiv.addEventListener("submit", (event) => {
        event.preventDefault(); /// preventing the page to reload!

        const formData = new FormData(event.target);
        const name = formData.get("name");
        const type = formData.get("type");
        const country = formData.get("country");
        const region = formData.get("region");
        const description = formData.get("description");
        const recomendations = 0;

        if (
          name.trim == "" ||
          type.trim == "" ||
          country.trim == "" ||
          region.trim == "" ||
          description.trim == ""
        ) {
          alert("Please fill in all the fields!");
          return;
        }

        const newPoi = {
          name: name,
          type: type,
          country: country,
          region: region,
          lon: Longtitude,
          lat: Latitude,
          description: description,
          recommendations: 0,
        };
        fetch(`http://localhost:3000/poi/pointsOfInterest`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPoi),
        }).then((response) => {
          if (response.status === 201) {
            response.json().then(
              (data) => {
                // this line is picture
                alert("Place added successfully!");
                console.log(response);
                //marker.bindPopup(`<h3>${name}</h3> <p> ${description}</p>`).openPopup();  // initial (8)
                popupp = true; // needed

                let poiId = data.id.lastInsertRowid; // returned id for the poi
                console.log(poiId);

                marker.bindPopup(domForm).openPopup();
                //////////// picture upload code

                const sendFiles = async () => {
                  ////////////////////////// (picture upload)
                  let filename = "picture";

                  const myfiles = document.getElementById("userPhoto").files;

                  const formData = new FormData();
                  let extension = "";

                  Object.keys(myfiles, filename).forEach((key) => {
                    //formData.append(myfiles.item(key).name,myfiles.item(key))
                    let file = myfiles.item(key);
                    extension = file.name.split(".").pop();
                    //formData.append(file.name, file, `${poiId}.jpeg`); // working
                    formData.append(
                      file.name,
                      file,
                      `${poiId}.${file.name.split(".").pop()}`
                    ); // working

                    //formData.append(filename, myfiles.item(key)); // initial
                  });
                  const response = await fetch(
                    "http://localhost:3000/photos/upload",
                    {
                      method: "POST",
                      body: formData,
                    }
                  );
                  if (response.status == 500) {
                    // check if response is not okay
                    alert("Upload failed. Please try again.");
                    return;
                  } else if (response.status == 400) {
                    alert("Please upload a file or press Skipp");
                    return;
                  } else if (response.status == 422) {
                    alert("Wrong file format");
                    return;
                  } else {
                    alert("Upload successful.");
                    marker
                      .bindPopup(
                        `<h3>${name}</h3> 
                                    <img src="/photos/${poiId}.${extension}" alt="There is no picture" width="200" height="300">
                                    <p> ${description}</p>`
                      )
                      .openPopup();
                    ////////////////////////////////////
                    // Changing the extension back to jpeg to facilitate img search in search!!!!!!!!!!!!!
                    const oldFilename = `${poiId}.${extension}`;
                    const newFilename = `${poiId}.jpeg`;
                    const fileUrl = `/photos/${oldFilename}`;
                    const newFileUrl = `/photos/upload`;
                    const file = await fetch(fileUrl).then((res) => res.blob());

                    const formData = new FormData();
                    formData.append("file", file, newFilename);
                    const options = {
                      method: "POST",
                      body: formData,
                    };
                    fetch(newFileUrl, options);
                    ///////////////////////////////////////////
                    const json = await response.json();
                  }
                };
                //////////////// need to finish the code after the click of the button
                domForm.addEventListener("submit", (e) => {
                  // event listener
                  e.preventDefault();
                  sendFiles();
                });

                addEventListener("click", (event) => {
                  // if the no button pressed it wont show any pictures!
                  if (event.target.id === "no") {
                    marker
                      .bindPopup(
                        `<h3>${name}</h3> 
                                    <p> ${description}</p>`
                      )
                      .openPopup();
                  }
                });
              } // stay inside
            );
          } else if (response.status === 401) {
            // (11)
            alert("You are not logged in!");
            map.removeLayer(marker);
          } else {
            map.removeLayer(marker);
          }
          //return response.json();
        });
      });

      const marker = L.marker(pos).addTo(map);
      marker.bindPopup(domDiv).openPopup();
      //console.log(popupp)

      marker.on("popupclose", () => {
        /// works just removes even the good one
        if (popupp === false) {
          map.removeLayer(marker);
        }
      });
    });
    /////////////////////////////////////////////////////  session
    //async function fetchData() {
    //const response = await fetch("http://localhost:3000/user/verifylogin");
    //const jsonData = await response.json();
    //setData(jsonData.username);
    //}
    //fetchData();
    /////////////////////////////////////////////////  session
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
    alert(`Shared ${id}`);
  }

  function searchByRegion() {
    /// search /////////////// (4)

    const regionName = document.getElementById("searchValue").value;
    console.log(regionName);
    if (regionName.trim == "") {
      alert("Please enter a region first");
    } else {
      fetch(`http://localhost:3000/poi/pointsOfInterestByRegion/${regionName}`, {
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
          //console.log(data)
          ///////////////////// Add each POI to the markers array and create a marker for it
          data.forEach((poi) => {
            ///////////////////////////////////////////////////(13)
            const lat = poi.lat;
            const lon = poi.lon;
            let markerLet = [lat, lon];
            const marker = L.marker(markerLet).addTo(map);
            marker.bindPopup(`
                          <h3 id="namep" >${poi.name}</h3>
                          <img src="/photos/${poi.id}.jpeg" alt="There is no picture" width="200" height="300" onError="this.style.display='none';">
                          <p id="descp"> ${poi.description}</p>
                          <p id="idp" style="display:none">${poi.id}</p> 
                          <button id="recomendbut">Recommend</button> <br>
                          `);
          });
          addEventListener("click", (event) => {
            if (event.target.id === "recomendbut") {
              recommend(document.getElementById("idp").value);
            }
          });
        });
    }

    /////////////////////////////////////////////// (13) till here
  }

  // function to click on the poi name from the list and redirect the map to it
  function takeMeThere(lon, lat) {
    /////////// (8) //// and (13)

    let pos = [lat, lon];
    map.setView(pos, 14);
    window.scrollTo({ top: 0, behavior: "smooth" }); // takes the user to the map!
  }

  const poiNameStyle = {
    // style
    cursor: "pointer",
  };

  return (
    <div className= "container-fluid">
      <div>
        <h1 className="h3 mb-0 text-gray-800">{title}</h1>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <fieldset style={{ width: `100%` }}>
            <input
              type="text"
              className="form-control bg-light border-0 small"
              placeholder="Search for a Region"
              aria-label="Search"
              aria-describedby="basic-addon2"
              id="searchValue"
            />
            <br />
            <button
              style={{ width: `100%` }}
              className="d-sm-inline-block btn btn-sm btn-primary shadow-sm"
              id="searchbtn"
              value=""
              onClick={searchByRegion}
            >
              Search
            </button>
          </fieldset>
        </div>
      </div>
      `
      <div className="d-sm-flex align-items-center mb-4">
        <div
          id="map2"
          style={{ width: `100%`, height: `50vh`, margin: `50px` }}
        ></div>
      </div>
      <div className="row">
        {poi.length > 0 ? (
          poi.map((item) => (
            <div class="col-xl-3 col-md-6">
              <div className="card bg-gradient-dark text-white shadow">
                <div className="card-body">
                  <div key={item.id}>
                    <h3
                      className="card-title"
                      id="nameh3"
                      style={poiNameStyle}
                      onClick={() => takeMeThere(item.lon, item.lat)}
                    >
                      Name: {item.name}
                    </h3>
                    <p>Type: {item.type}</p>
                    <p>Country: {item.country}</p>
                    <p>Region: {item.region}</p>
                    <p>Lon: {item.lon}</p>
                    <p>Lat: {item.lat}</p>
                    <p>Description: {item.description}</p>
                    <p>Recommendations:{item.recommendations}</p>
                    <button
                      style={{ margin: `5px` }}
                      className=" d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                      id="recomendbut"
                      onClick={() => recommend(item.id)}
                    >
                      Recommend
                    </button>
                    <button
                      className=" d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                      id="shareBtn"
                      onClick={() => sharePoi(item.id)}
                    >
                      Share
                    </button>
                  </div>
                </div>
              </div>
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
root.render(<Region title="Search by region" />);
