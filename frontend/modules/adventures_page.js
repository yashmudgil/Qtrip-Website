import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // console.log(search)
  let s = search.substring(search.indexOf("=") + 1);
  // console.log(s)
  return s;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  let x = city;
  const url = config.backendEndpoint + "/adventures/?city=" + city;
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
  // console.log(city)
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const data = document.getElementById("data");
  adventures.forEach((keys) => {
    
    const cc = document.createElement("div");
    cc.className="col-6 col-lg-3 mb-4 position-relative"
    cc.innerHTML = `<a id=${keys.id} href="detail/?adventure=${keys.id}">
    <div class="category-banner">${keys.category}</div>
    <div class="activity-card">
      <img src=${keys.image} class="img-responsive"/>
      <div class="activity-card-text text-md-center w-100 mt-3">
        <div class="d-block d-md-flex justify-content-between flex-wrap ps-3 pe-3"> 
          <h5 class="text-left">${keys.name}</h5>
          <p>₹${keys.costPerHead}</p>   
        </div>           
        <div class="d-block d-md-flex justify-content-between flex-wrap ps-3 pe-3"> 
          <h5 class="text-left">Duration</h5>
          <p>${keys.duration} Hours</p> 
        </div>         
      </div>
    </div>
  </a>`;
    data.appendChild(cc);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = [];
  let lengt = list.length;
  for (let i = 0; i < lengt; i++) {
    if (list[i].duration <= high && list[i].duration >= low) {
      filteredList.push(list[i]);
    }
  }
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = [];
  categoryList.forEach(function (z) {
    list.forEach(function (y) {
      if (y.category == z) {
        filteredList.push(y);
      }
    });
  });
  return filteredList;
}
function filterbyboth(list, high, low, filters) {
  let filteredList = [];
  let filteredList2 = [];
  // filteredList=filterByCategory(list, filters);
  filters.category.forEach(function (z) {
    list.forEach(function (y) {
      if (y.category == z) {
        filteredList.push(y);
      }
    });
  });
  filteredList2 = filterByDuration(filteredList, low, high);
  return removewithfilter(filteredList2);
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together
function removewithfilter(arr) {
  let outputArray = arr.filter(function (v, i, self) {
    return i == self.indexOf(v);
  });

  return outputArray;
}

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList = [];
  if (filters["category"].length > 0 && filters["duration"].length > 0) {
    let arr = filters.duration.split("-");
    filteredList = filterbyboth(list, arr[1], arr[0], filters);
    return filteredList;
  } else if (filters["category"].length < 1 && filters["duration"].length > 0) {
    let arr = filters.duration.split("-");
    filteredList = filterByDuration(list, arr[0], arr[1]);
    return filteredList;
  } else if (
    filters["category"].length > 0 &&
    filters["duration"].length == 0
  ) {
    // for(let i=0;i<filters["category"].length;i++)
    filteredList = filterByCategory(list, filters.category);
    return filteredList;
  }
  // Place holder fogit pull ME_QTRIPDYNAMIC_MODULE_ADVENTURE_DETAILS_STUB master --allow-unrelated-histories --no-edit
  // r functionality to work in the Stubs

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  // Place holder for functionality to work in the Stubs
  window.localStorage.getItem("filters");

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  if (filters["category"].length > 0) {
    for (let i = 0; i < filters["category"].length; i++) {
      const data = document.getElementById("category-list");
      const cityCard = document.createElement("div");
      cityCard.setAttribute("class", "category-filter bg-black");
      const card = `
    <div class="text-black">          
        <p>${filters.category[i]}</p>     
    </div>`;
      cityCard.innerHTML = card;
      data.appendChild(cityCard);
    }
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
