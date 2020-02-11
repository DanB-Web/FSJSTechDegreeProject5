const userAPI = "https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob";








/*Fetch Request*/

function fetchData(url) {
    return fetch(url)
             .then(checkStatus)  
             .then(res => res.json())
             .catch(error => console.log('Looks like there was a problem!', error))
}

/*Functions*/
fetchData(userAPI)
    .then (data => console.log(data))



function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }