let map;
let markerGroup;

function AppWidget({ title }) {
	const [region, setRegion] = React.useState("");
	const [searchResult, setSearchResult] = React.useState([]);

	function updateRegion(region) {
		setRegion(region);
	}

	function updateMap(lat, lon) {
		map.setView([lat, lon], 14);
	}

	async function ajaxSearchPOI() {
		const data = await fetch(`http://localhost:3000/poi/search/${region}`);
		const results = await data.json();
		if (results.length > 0) {
			let resultPoi = [];
			markerGroup.clearLayers();
			results.forEach((poi) => {
				const newPoi = {
					id: poi.id,
					name: poi.name,
					type: poi.type,
					country: poi.country,
					region: poi.region,
					lon: poi.lon,
					lat: poi.lat,
					desc: poi.description,
					rec: poi.recommendations,
				};
				resultPoi.push(newPoi);
				const domDiv = document.createElement(`div`);
				const br = document.createElement(`br`);
				const form = document.createElement(`form`);
				const name = document.createTextNode(poi.name);
				domDiv.appendChild(name);
				domDiv.appendChild(br);
				const desc = document.createTextNode(poi.description);
				domDiv.appendChild(desc);

				const description = document.createElement(`textarea`);
				description.setAttribute("rows", "3");
				description.setAttribute(
					"class",
					"form-control bg-light border-0 small"
				);
				description.setAttribute("placeholder", "Description");
				description.setAttribute("spellcheck", "true");
				description.setAttribute("style", "font-size: small");
				description.setAttribute("id", `textArea${poi.id}`);
				form.appendChild(description);

				const reviewBtn = document.createElement(`input`);
				reviewBtn.setAttribute("style", "margin: 5px");
				reviewBtn.setAttribute("type", "button");
				reviewBtn.setAttribute("value", "submit");
				reviewBtn.setAttribute(
					"class",
					"d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
				);
				reviewBtn.addEventListener("click", addReview.bind(this, poi.id));
				form.appendChild(reviewBtn);

				const recommendBtn = document.createElement(`input`);
				recommendBtn.setAttribute("type", "button");
				recommendBtn.setAttribute("value", "Recommend");
				recommendBtn.setAttribute(
					"class",
					"d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
				);
				recommendBtn.addEventListener("click", recommend.bind(this, poi.id));
				form.appendChild(recommendBtn);

				domDiv.appendChild(form);

				L.marker([poi.lat, poi.lon]).addTo(markerGroup).bindPopup(domDiv);
				map.setView([poi.lat, poi.lon], 14);
			});
			setSearchResult(resultPoi);
		} else {
			alert("No region found please enter another one!");
		}
	}

	async function addNewPoi(POI) {
		const response = await fetch(`http://localhost:3000/poi/pointsOfInterest`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(POI),
		});
		if (response.status == 200) {
			const pos = [POI.lat, POI.lon];
			const marker = L.marker(pos).addTo(map);
			marker.bindPopup(POI.name, POI.desc);
		} else if (response.status == 400) {
			alert("ERROR!! Invalid details please try again");
		} else if (response.status == 401) {
			alert(`You're not logged in! Please Login in order do do that!`);
		} else {
			alert(`Undifined error: ${response.status}`);
		}
	}

	async function recommend(poiId) {
		const poi = {
			poi_id: poiId,
		};
		const response = await fetch(`http://localhost:3000/poi/recommend`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(poi),
		});
		if (response.status == 200) {
			alert("Recommended :D");
		} else {
			alert(`Undifined error: ${response.status}`);
		}
	}

	async function addReview(id) {
		const rev = document.getElementById(`textArea${id}`).value;
		const review = {
			poi_id: id,
			review: rev,
		};
		if (rev.trim() == "") {
			alert("Invalid review please try again!");
		} else {
			const response = await fetch(`http://localhost:3000/review/add`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(review),
			});
			if (response.status == 200) {
				alert(`Review Added !`);
			} else if (response.status == 400) {
				alert("Invalid ID! Please try again");
			} else if (response.status == 401) {
				alert(`You're not logged in! Please Login in order do do that!`);
			} else {
				alert(`Undifined error: ${response.status}`);
			}
		}
	}

	return (
		<div>
			<InputWidget
				title={title}
				updateRegionName={updateRegion}
				updateResults={ajaxSearchPOI}
				updateMap={updateMap}
			/>
			<GenerateMap addNewPoi={addNewPoi} />
			<ResultWidget poi={searchResult} />
		</div>
	);
}

function InputWidget({ title, updateRegionName, updateResults }) {
	function updateRegionf() {
		updateRegionName(document.getElementById("searchValue").value);
	}

	function updateResults() {
		updateResults();
	}

	return (
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
						onChange={updateRegionf}
					/>
					<br />
					<input
						type="button"
						style={{ width: `100%` }}
						className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
						id="searchbtn"
						value="Search"
						onClick={updateResults}
					/>
				</fieldset>
			</div>
		</div>
	);
}

function GenerateMap(addNewPoi) {
	React.useEffect(() => {
		map = L.map("map1");
		markerGroup = L.layerGroup().addTo(map);
		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				"Map data copyright OpenStreetMap contributors, Open Database Licence",
		}).addTo(map);
		map.setView([50.909698, -1.404351], 14);
		map.on("click", (e) => {
			const POI = {
				name: prompt("Please enter the POI name"),
				lat: e.latlng.lat,
				lon: e.latlng.lng,
				type: prompt("Please enter the POI type"),
				country: prompt("Please enter the POI country"),
				region: prompt("Please enter the POI region"),
				desc: prompt("Please enter the POI desc"),
				img: promt,
			};
			if (
				POI.name.trim() == "" ||
				POI.type.trim() == "" ||
				POI.country.trim() == "" ||
				POI.region.trim() == "" ||
				POI.desc.trim() == ""
			) {
				alert("Invaid data please try again!");
			} else {
				addNewPoi(POI);
			}
		});
	}, []);
	return (
		<div className="d-sm-flex align-items-center justify-content-between mb-4">
			<div
				id="map1"
				style={{ width: `100%`, height: `50vh`, margin: `50px` }}
			></div>
		</div>
	);
}

function ResultWidget({ poi }) {
	const searchHtml = poi.map((item) => (
		<tr key={item.id}>
			<td>{item.name}</td>
			<td>{item.type}</td>
			<td>{item.country} </td>
			<td>{item.region}</td>
			<td>{item.lon}</td>
			<td>{item.lat}</td>
			<td>{item.desc}</td>
			<td>{item.rec}</td>
		</tr>
	));

	return (
		<table style={{ width: `100%` }}>
			<thead>
				<tr>
					<th>Name</th>
					<th>Type</th>
					<th>Country</th>
					<th>Region</th>
					<th>Lon</th>
					<th>Lat</th>
					<th>Description</th>
					<th>Rec</th>
				</tr>
			</thead>
			<tbody>{searchHtml}</tbody>
		</table>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppWidget title="Search a POI's in a certain region" />);
