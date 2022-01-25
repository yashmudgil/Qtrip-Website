import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  // Place holder for functionality to work in the Stubs
  return search.substring(search.indexOf("=") + 1);
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const data = await fetch(
      config.backendEndpoint + "/adventures/detail/?adventure=" + adventureId
    );
    const a = await data.json();
    return a;
  } catch (err) {
    return null;
  }
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  
  document.getElementById("adventure-name").innerHTML = `${adventure.name}`;

  document.getElementById(
    "adventure-subtitle"
  ).innerHTML = `${adventure.subtitle}`;

  document.getElementById(
    "adventure-content"
  ).innerHTML = `${adventure.content}`;

  // let m=document.getElementsByClassName("activity-card-image")
  for (let i = 0; i < adventure.images.length; i++) {
    const a = document.getElementById("photo-gallery");
    const cityCard = document.createElement("div");
    // cityCard.setAttribute("class","activity-card-image");
    const p = `<img src="${adventure.images[i]}" alt="${adventure.images[i]}" class="activity-card-image">`;
    cityCard.innerHTML = p;
    a.appendChild(cityCard);
  }
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML=`
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-inner">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
  images.map((img,i)=>{
      let e=document.createElement("div");
      e.className= `carousel-item ${i==0?"active":""}`;
      e.innerHTML=`<img src=${img} class="d-block w-100 activity-card-image pb-3 pb-md-0" />`;
      document.getElementById("carousel-inner").appendChild(e);
  });
  
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  
  if(adventure.available==true)
  {
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    let e=document.createElement("span");
    e.className=`d-inline`
    e.innerHTML=`<p>${adventure.costPerHead}</p>`;
    document.getElementById("reservation-person-cost").innerHTML=`${adventure.costPerHead}`;
  }
  else
  {
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let x=persons*adventure.costPerHead;
  document.getElementById("reservation-cost").innerHTML=`${x}`;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form=document.getElementById("myForm")
  form.addEventListener('submit',async(e)=>{
    e.preventDefault()
    let fe=form.elements;
    let url=config.backendEndpoint + "/reservations/new";
    let bs=JSON.stringify({
      name:fe["name"].value,
      date:fe["date"].value,
      person:fe["person"].value,
      adventure:adventure.id
    });
    console.log(name)
    try{
    let res= await fetch(url,{
      method:'POST',
      body:bs,
      headers:{
        "Content-Type":"application/json",
      },
    });
    debugger;
    if(res.ok){
      alert("Successful")
      window.location.reload()
    }
    else{
      let data=res.json()
      alert(`Failed - ${data.message}`)
    }
  }catch(err){
      console.log(err)
      alert("Failed to fetch")
    }
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved!=true)
  {
    document.getElementById("reserved-banner").style.display="none" 
  }
  else
  document.getElementById("reserved-banner").style.display="block" 
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
