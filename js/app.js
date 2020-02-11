const userAPI = "https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob&nat=au,ca,gb,nz,us";

const header = document.querySelector(".header-inner-container");
const mainHeader = document.getElementsByTagName("header");
const jsScript = document.getElementsByTagName("script");


/*API Fetch Request - the returned request is passed to checkStatus to confirm the Promise status. If successful, the returned JSON is parsed
in a JS object. If not successful, an error is thrown back and handled by the catch method*/

function fetchData(url) {
    return fetch(url)
             .then(checkStatus)  
             .then(res => res.json())
             .catch(error => console.log('Looks like there was a problem!', error))
}

/*Functions*/

fetchData(userAPI) 
    //.then (data => console.log(data))
    .then (data => userCards(data)) //Generate user cards

function userCards (data) {

    for (let i = 0; i < 12; i++) {

        const user = document.createElement("div");

        const image = data.results[i].picture.large;
        const firstName = data.results[i].name.first;
        const lastName = data.results[i].name.last;
        const email = data.results[i].email;
        const city = data.results[i].location.city;
        const state = data.results[i].location.state;

        

        user.classList.add("card")

        user.innerHTML = `<div class="card-img-container">
                          <img class="card-img" src="${image}" alt="profile picture">
                          </div>
                          <div class="card-info-container">
                          <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                          <p class="card-text">${email}</p>
                          <p class="card-text cap">${city}, ${state}</p>
                          </div>`;

        gallery.appendChild(user);
    }


} 


/*Check Fetch request status. If the request is successful, the Promise is resolved and returned to the fetchData function
to parse into a JS object. If the request fails for whatever reason, the Promise is rejected and a new Error object thrown
back to the fetchData function to be used by Catch*/

function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

/*Generate dynamic HTML*/

const searchBar = document.createElement("div");

searchBar.classList.add("search-container");
searchBar.innerHTML = `<form action="#" method="get"> 
                       <input type="search" id="search-input" class="search-input" placeholder="Search..."> 
                       <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit"> 
                       </form>`;
header.appendChild(searchBar);


const gallery = document.createElement("div");

gallery.classList.add("gallery")
gallery.setAttribute("id", "gallery");
mainHeader[0].parentNode.insertBefore(gallery, jsScript[0]);

