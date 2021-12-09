const AddMessage = "REMOVE FROM FAVOURITES";
showCards();

// FUNCTIONS FOR GETTING HERO ID FROM LOCALLY ARRAY PASS TO API FOR FETCH THE DETAILS
function showCards() {
  var favlist = JSON.parse(localStorage.getItem("Myfavourites"));
 
  if (favlist.length == 0) {
    console.log("No items");
  } else {
    favlist.forEach((id) => {
      fetchData(id);
    });
  }
}

// FETCH DETAILS OF HEROID PASS FOR CREATE AN CARD FOR OWN
function fetchData(searchInput) {
  var xmlReq = new XMLHttpRequest();
  xmlReq.onload = function () {
    var result = JSON.parse(xmlReq.response);
    var container = GetCard(result);
    document.getElementsByClassName("favourites")[0].appendChild(container);
  };

  xmlReq.onerror = function () {
    alert("Failed due to Some Error");
    console.log("error");
  };

  xmlReq.open(
    "GET",
    "https://superheroapi.com/api.php/2027943727349046/" + searchInput
  );
  xmlReq.send();
}

// CREATION OF CARD CONTAINS HERONAME AND TWO BUTTONS I.E INFO BUTTON AND REMOVE FROM FAVOURITES
function GetCard(data) {
  var cardContainer = document.createElement("div");
  cardContainer.className = "card-ctn";
  cardContainer.id = data.id;
  cardContainer.innerHTML =
    '<div class="img-ctn"><img src=' +
    data.image.url +
    '></div><div class="name-ctn">' +
    data.name +
    '</div><div class="btn-ctn"><button type="button" class="btn btn-success" id="card-info-bt">More Info</button><button type="button" class="btn btn-danger" id="card-rem-btn">Remove</button> </div>';

  return cardContainer;
}

//CLICK EVENT ON INFO BUTTON WHICH LEAD TO INFO PAGE AND REMOVE FAVOURTE WHICH DELETE THE ID FROM LOCALLY STORING ARRAY AND DISAPPEAR FROM PAGE
document.addEventListener("click", (event) => {
  if (event.target.id == "card-info-bt") {
    var id = event.target.parentNode.parentNode.id;
    window.open("../page/info.html" + "?id=" + id);
  } else if (event.target.id == "card-rem-btn") {
    var favId = event.target.parentNode.parentNode.id;
    var myfav = JSON.parse(localStorage.getItem("Myfavourites"));
    var index = myfav.indexOf(favId);
    myfav.splice(index, 1);
    localStorage.setItem("Myfavourites", JSON.stringify(myfav));
    alertMessage(AddMessage);
    document.getElementById(favId).remove();
  } else if (event.target.id == "fav-btn-f") {
    window.open("../page/index.html", "_self");
  }
});

// ALERT MESSAGE
function alertMessage(msg) {
  var alertbox = document.getElementById("fav-alert");
  alertbox.innerHTML = msg;
  alertbox.className = "show";
  setTimeout(function () {
    alertbox.className = alertbox.className.replace("show", "");
  }, 2500);
}