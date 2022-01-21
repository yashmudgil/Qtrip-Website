import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

  const url = config.backendEndpoint + "/cities";
  // const data = await fetch("http://65.0.188.241:8082/cities")
  const data = await fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch(function (err) {
      return null;
    });
  return data;
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const data = document.getElementById("data");
  const cityCard = document.createElement("div");
  cityCard.setAttribute("class", "col-12 col-sm-6 col-lg-3 mb-4");
  const card = `<a id="${id}" href="pages/adventures/?city=${id}">
    <div class="tile">
      <img src="${image}" alt="${city}" class="img-fluid">
      <div class="tile-text text-center text-white">
        <h2>${city}</h2>
        <p>${description}</p>
      </div>
    </div>
  </a>`;
  cityCard.innerHTML = card;
  data.appendChild(cityCard);
}

export { init, fetchCities, addCityToDOM };
