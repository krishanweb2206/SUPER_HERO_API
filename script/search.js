// SELECTOR/VARIABLE FOR SCRIPT
var xhrRequest = new XMLHttpRequest();
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var word = urlParams.get("searchitems");
var main_container = document.getElementsByClassName('search')[0];
var heading = document.getElementById("heading-search");
var searchbtn = document.getElementById("fav-btn-s");
const AddMessage ="ADDED TO FAVOURITES";
const AlreadyMessage ="ALREADY ADDED";

// SETTING A TITLE 
 document.title = "Search for: "+word;
// CLIENT-SERVER COMMUNICATIONS THROUGH XHR
xhrRequest.onload = function () {
  var result = JSON.parse(xhrRequest.response);
  heading.innerHTML = 'Search result for : '+word.toUpperCase();
  var data = result.results;
   data.forEach((item) => {
     var container=GetCard(item);
     main_container.appendChild(container);
   });
};
xhrRequest.open("get","https://superheroapi.com/api.php/2027943727349046/search/" + word);
xhrRequest.send();

// CREATE A CARD WHICH CONTAINS IMG,NAME,FAV BUTTON AND INFO BUTTONS
function GetCard(data){

    var cardContainer = document.createElement('div');
    cardContainer.className='card-ctn';
    cardContainer.id=data.id;
    cardContainer.innerHTML =
      '<div class="img-ctn"><img src=' +
      data.image.url +
      '></div><div class="name-ctn">' +
      data.name +
      '</div><div class="btn-ctn"><button type="button" class="btn btn-success" id="card-info-bt">More Info</button><button type="button" class="btn btn-danger" id="card-fav-btn">Add fav</button> </div>';


    return cardContainer
}

// ON PAGE LOAD CLEAR THE PREVIOUS CARDS
function clearCards() {
  main_container.remove();
}
// CLICK EVENT LISTENER ON SEARCH BUTTON
searchbtn.addEventListener("click", function () {
  clearCards();
  window.open("../page/index.html", "_self");
});

// CLICK EVENT LISTENER ON ADD FAV BUTTON AND INFO BUTTONS
document.addEventListener('click', (event) => {
    
    if (event.target.id == "card-info-bt") {
      var id = event.target.parentNode.parentNode.id;
      window.open("./info.html" + "?id=" + id);
    } else if (event.target.id == "card-fav-btn") {
      var favId = event.target.parentNode.parentNode.id;
      var myfav = JSON.parse(localStorage.getItem("Myfavourites"));

      if (myfav.indexOf(favId) != -1) {
        alertMessage(AlreadyMessage);
      } else {
        alertMessage(AddMessage);
        myfav.push(favId);
        localStorage.setItem("Myfavourites", JSON.stringify(myfav));
      }
    } else if (event.target.id == "fav-btn-f") {
      window.open("../page/favorites.html", "_self");
    }
    
});
// NOTIFICATION ALERT
function alertMessage(msg){
   var alertbox = document.getElementById("fav-alert");
   alertbox.innerHTML=msg;
   alertbox.className = "show";
   setTimeout(function () {
     alertbox.className = alertbox.className.replace("show", "");
   }, 2500);
}
