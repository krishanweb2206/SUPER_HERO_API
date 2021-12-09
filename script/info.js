// SELECTOR/VARIABLE FOR INFO PAGE
var xhrRequest = new XMLHttpRequest();
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchid = urlParams.get("id");
var heading = document.getElementsByClassName("display-2")[0];
const AddMessage = "ADDED TO FAVOURITES";
const AlreadyMessage = "ALREADY ADDED";

// ON LOAD FUNCTION OF PAGE FETCHING THE DETAILS OF HERO
xhrRequest.onload = function () {
    
    var data = JSON.parse(xhrRequest.response);
    document.getElementsByClassName("right-box")[0].id=searchid;
    heading.innerHTML=data.name;
    document.title = data.name;
    document.getElementById("img_id").src = data.image.url;
    document.getElementsByClassName("stats-details")[0].innerHTML = readJson(data.powerstats);
    document.getElementById("biography").innerHTML = readJson(data.biography);
    document.getElementById("work").innerHTML = readJson(data.work);
    document.getElementById("Connection").innerHTML=readJson(data.connections);
};

xhrRequest.open("get","https://superheroapi.com/api.php/2027943727349046/" + searchid);
xhrRequest.send();

//FUNCTION FOR READING A JSON
function readJson(json_data)
{
    var inhtml = '';
    for (var key in json_data) {
      inhtml += "<p>" + key + " : " + json_data[key] + "</p>";
    }
    return inhtml;
}


// CLICK EVENT ON ADD TO FAV AND MY FAV BUTTONS
document.addEventListener("click", (event) => {
 if (event.target.id == "info-add-fav") {
   var favId = event.target.parentNode.parentNode.id;
   var myfav = JSON.parse(localStorage.getItem("Myfavourites"));

   if (myfav.indexOf(favId) != -1) {
     alertMessage(AlreadyMessage);
   } else {
     alertMessage(AddMessage);
     myfav.push(favId);
     localStorage.setItem("Myfavourites", JSON.stringify(myfav));
   }
 } else if (event.target.id == "info-my-fav") {
   window.open("../page/favorites.html", "_self");
 }
});

// NOTIFICATIONS ALERT
function alertMessage(msg) {
  var alertbox = document.getElementById("fav-alert");
  alertbox.innerHTML = msg;
  alertbox.className = "show";
  setTimeout(function () {
    alertbox.className = alertbox.className.replace("show", "");
  }, 2500);
}
