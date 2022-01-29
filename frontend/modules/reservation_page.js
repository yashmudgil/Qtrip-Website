import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
try{
  let url=config.backendEndpoint+"/reservations/"
  let data=await fetch(url)
  const a = await data.json();
    return a;
  } catch (err) {
    return null;
  }
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
if(reservations.length<1)
{
  document.getElementById("no-reservation-banner").style.display="block"
  document.getElementById("reservation-table-parent").style.display="none"
}
else{
  document.getElementById("no-reservation-banner").style.display="none"
  document.getElementById("reservation-table-parent").style.display="block"
}
  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
 let t=document.getElementById("reservation-table")
 console.log(reservations)
  reservations.map((key,i)=>{
  let r1=document.createElement("tr")
  r1.innerHTML=`
  <th scope="row">${key.id}</th>
  <td>${key.name}</td>
  <td>${key.adventureName}</td>
  <td>${key.person}</td>
  <td>${new Date(key.date).toLocaleDateString("en-IN")}</td>
  <td>${key.price}</td>
  <td>${new Date(key.time).toLocaleDateString("en-IN",{
    year:"numeric",
    day:"numeric",
    month:"long",
    hour:"numeric",
    minute:"numeric",
    second:"numeric",
    hour12:true
  })}</td>
  <td><div class="reservation-visit-button" id="${key.id}"><a href="../detail/?adventure=${key.adventure}">Visit Adventure</a></div></td>
  `
  t.appendChild(r1)
  })

  
}

export { fetchReservations, addReservationToTable };
