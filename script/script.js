
// SELECTORS/VARIABLE FOR HOMEPAGE
const url = "https://superheroapi.com/api.php/2027943727349046/search/";
var input = document.getElementById("search-bar-input");
const searchButton = document.getElementsByClassName("search-submit")[0];
const favourtiesButton = document.getElementById("fav-btn");
let HeroId=0;

// EVENT LISTENER FOR SEARCH INPUT BAR
input.addEventListener("keyup",(event)=>{
    const searchInput=event.target.value;
    fetchData(searchInput);
});

// STORING AN ARRAY LOCALLY
favStorage();

// FUNCTIONS FOR FETCH THE SEARCH INPUT FROM HITTING THE API
function fetchData(searchInput) {
  var ul_tag = document.getElementById("suggestion");
  clearLi();

  var xmlReq = new XMLHttpRequest();
  xmlReq.onload = function () {
    var jsonobj = JSON.parse(xmlReq.response);
    search_result = jsonobj.results;
  
    if (typeof(search_result) == 'undefined' || search_result == 0) {
      clearLi();
      console.log("Not Found in api");
    } else {
      for (var items of search_result) {
        let li = document.createElement("li");
        li.innerText = items.name;
        li.id = items.id;
        // HANDLING THE CLICK EVENT LISTENER FROM THE SUGGEST LIST 
        li.addEventListener('click',function(){
          HeroId=this.id;
          input.value=this.innerText;
          clearLi();
          input.focus();
          return;
        })
        document.getElementById("suggestion").appendChild(li);
      }
    }
  };

  xmlReq.onerror = function () {
    alert("Failed due to Some Error");
    console.log("error");
  };

  xmlReq.open("GET", url + searchInput);
  xmlReq.send();
}

// LOCAL STORAGE FOR ARRAY(FAVOURITES_HERO_ID)
function favStorage() {

  if (localStorage.getItem("Myfavourites") == null) {
    localStorage.setItem("Myfavourites", JSON.stringify(Array()));
  }
}

// CLEAR THE PREVIOUS SUGGESTION FROM EACH SEARCH
function clearLi(){
  let removeli= document.getElementById("suggestion");
  while (removeli.firstChild) {
    removeli.removeChild(removeli.firstChild);
  }
}

// DIRECTED TO SEARCH PAGE 
function displaySearchResult(search)
{
  
  window.open("../page/search.html?searchitems=" + search, "_self");

}

// SEARCH BUTTON IN INPUT BAR EVENT LISTENER
searchButton.addEventListener('click',function(){
  if(input.value=='')
  {
    alert('Oops!! You forget to enter the heroName');
  }
  else{ 
      displaySearchResult(input.value);
    };

});

// CLICK EVENT FAVOURITES BUTTON DIRECT TO FAV PAGE
favourtiesButton.addEventListener('click',function(){
    window.open("../page/favorites.html", "_self");
})










