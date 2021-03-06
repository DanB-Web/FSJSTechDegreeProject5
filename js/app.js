const userAPI = "https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob&nat=au,ca,gb,nz,us";

const body = document.getElementsByTagName("body");
const header = document.querySelector(".header-inner-container");
const mainHeader = document.getElementsByTagName("header");
const jsScript = document.getElementsByTagName("script");

const users = document.getElementsByClassName("card");

let currentUser = null;     //Variable to store current selected profile
let API = null;             //Variable to store returned API data

/*API FETCH REQUESTS AND ERROR HANDLING*/

/*Fetch Request - the returned request is passed to checkStatus to confirm the Promise status. If successful, the returned JSON is parsed
in a JS object. If not successful, an error is thrown back and handled by the catch method*/

function fetchData(url) {
    return fetch(url)
             .then(checkStatus)  
             .then(res => res.json())
             .catch(error => console.log('Looks like there was a problem!', error))
}

/*Error Check - if the request is successful, the Promise is resolved and returned to the fetchData function
to parse into a JS object. If the request fails for whatever reason, the Promise is rejected and a new Error object thrown
back to the fetchData function to be used by Catch*/

function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

/*Fetch Call - function to fetch API data and then pass it onto the userCards function, the APIData function to store it, and the addListener 
function to put event listeners on all the employee cards*/

fetchData(userAPI) 
    .then (data => userCards(data))
    .then (data => APIData(data))
    .then (data => addListener(data))

/*MAIN FUNCTIONS*/

/*Function to generate employee cards*/

function userCards (data) {

    for (let i = 0; i < data.results.length; i++) {

        const user = document.createElement("div");

        user.classList.add("card")
        user.classList.add("fade-in") //CSS class for fading effect
    
        user.innerHTML = `<div class="card-img-container">
                          <img class="card-img" src="${data.results[i].picture.large}" alt="profile picture">
                          </div>
                          <div class="card-info-container">
                          <h3 id="name" class="card-name cap">${data.results[i].name.first} ${data.results[i].name.last}</h3>
                          <p class="card-text">${data.results[i].email}</p>
                          <p class="card-text cap">${data.results[i].location.city}, ${data.results[i].location.state}</p>
                          </div>`;

        gallery.appendChild(user);
    }

    return data; 
} 

/*Function to store API data in a variable to access by other funtions later on*/

function APIData (data) {

    API = data;
    return data;
}

/*Function to iterate over users with search term*/

function cardSearch (searchString) {

    const names = document.getElementsByClassName("card-name cap");
    const userArray = Array.from(users);
    const namesArray = Array.from(names);
    const search = searchString.toLowerCase();   //Make search case insensitive
   
      
    for (let i = 0; i < API.results.length; i++) {

        let searchName = namesArray[i].innerHTML.toLowerCase();
      
        let fullName = searchName.split(" ");
        let firstName = fullName[0];
        let lastName = fullName[1];
        
        if (!(firstName.startsWith(search)||lastName.startsWith(search))) {
            userArray[i].style.display = "none"; 
            userArray[i].classList.add("hide");
            userArray[i].classList.remove("show");}     

        if (firstName.startsWith(search)||lastName.startsWith(search)) {
            userArray[i].style.display = "";
            userArray[i].classList.add("show");
            userArray[i].classList.remove("hide");}

    }  

        checkResults();
}

/*Function to reset page after search*/

function resetPage () {

    const userArray = Array.from(users);

    userArray.forEach(user => user.style.display = "")

    document.getElementById("search-submit").setAttribute("value","🔍")
    document.getElementById("search-input").value = "";
}

/*Function to check if any results displayed, and if not display user message*/

function checkResults () {

    const userArray = Array.from(users);
    let count = 0;
    
    for (let i = 0; i < userArray.length; i++)

    {
        if (userArray[i].classList.contains("hide")) 
        {count += 1;}
    }

    if (count === 12) {noResults();}

    if (count !== 12) {clearMessage();}

    if (count === 0) {document.getElementById("search-submit").setAttribute("value","🔍")}
    
}

function noResults () {
    userMessage.style.display = "";
}

function clearMessage () {
    userMessage.style.display = "none";
}

/*GENERATE DYNAMIC HTML*/

/*HTML Search Bar*/

const searchBar = document.createElement("div");

searchBar.classList.add("search-container");
searchBar.innerHTML = `<form action="#" method="get"> 
                       <input type="search" id="search-input" class="search-input" placeholder="Search..."> 
                       <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit"> 
                       </form>`;
header.appendChild(searchBar);

/*HTML Gallery Div*/

const gallery = document.createElement("div");

gallery.classList.add("gallery")
gallery.setAttribute("id", "gallery");
mainHeader[0].parentNode.insertBefore(gallery, jsScript[0]);

/*HTML No Results Message*/

const userMessage = document.createElement("div");

userMessage.innerHTML = "<h2>No users match that name!</h2>";
userMessage.style.display = "none";
mainHeader[0].parentNode.insertBefore(userMessage, gallery);

/*HTML Modal Pop Up Div*/

function createModal (i, data) {

currentUser = i; 

const modal = document.createElement("div")
modal.classList.add("modal-container");

const dob = data.results[i].dob;
const bday = dob.date.slice(0,10);


modal.innerHTML = `<div class="modal">
                   <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                   <div class="modal-info-container">
                   <img class="modal-img" src="${data.results[i].picture.large}" alt="profile picture">
                   <h3 id="name" class="modal-name cap">${data.results[i].name.first} ${data.results[i].name.last}</h3>
                   <p class="modal-text">${data.results[i].email}</p>
                   <p class="modal-text cap">${data.results[i].location.city}, ${data.results[i].location.state}</p>
                   <hr>
                   <p class="modal-text">${data.results[i].cell}</p>
                   <p class="modal-text">${data.results[i].location.street.number} ${data.results[i].location.street.name}, ${data.results[i].location.city}, ${data.results[i].location.postcode}</p>
                   <p class="modal-text">Birthday: ${bday}</p>
                   </div>
                   </div>

                    // IMPORTANT: Below is only for exceeds tasks 
                    <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                    </div>`;

body[0].appendChild(modal);

closeButton();
nextButton();
prevButton();

}

/*EVENT LISTENERS*/

/*Search bar button event listener*/

const searchButton = document.getElementById("search-submit");

searchButton.addEventListener("click", event => {

    const searchInput = document.getElementById("search-input").value;
    let icon = document.getElementById("search-submit").getAttribute("value"); 

    if (icon != "Reset")
    {cardSearch(searchInput);
    document.getElementById("search-submit").setAttribute("value","Reset");
    }

    else 
    {resetPage();}

});

/*Search box event listener*/

const searchBox = document.getElementById("search-input");

searchBox.addEventListener("keyup", event => {

    const searchInput = document.getElementById("search-input").value;
    let charCode = event.keyCode;

    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8)
    {   
    cardSearch(searchInput);
    }


});

/*EVENT LISTENERS INSIDE FUNCTIONS - These listeners are dynamically added to the generated HTML as required*/

/*Employee card event listeners*/

function addListener () {

    const userDivs = document.getElementsByClassName("card");    
    
    for (let i = 0; i < userDivs.length; i++) {
        
        userDivs[i].addEventListener ("click", event => {

        createModal(i, API);})
    }
}

/*Modal window close button event listener*/

function closeButton () {
    
    const closeButton = document.getElementById("modal-close-btn");

    closeButton.addEventListener("click", event => {

        const modal = document.getElementsByClassName("modal-container");
        modal[0].remove();
             
        ;})
}

/*Modal window scroll button event listeners*/

function nextButton () {

    const nextButton = document.getElementById("modal-next");

    nextButton.addEventListener("click", event => {

        if (currentUser < (API.results.length - 1)) {
        const modal = document.getElementsByClassName("modal-container");
        modal[0].remove();
        currentUser += 1;
        createModal(currentUser, API);}
             
        ;})
}

function prevButton () {

    const prevButton = document.getElementById("modal-prev");

    prevButton.addEventListener("click", event => {

        if (currentUser > 0) {
        const modal = document.getElementsByClassName("modal-container");
        modal[0].remove();
        currentUser -= 1;
        createModal(currentUser, API);}
             
        ;})
    
}
