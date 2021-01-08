var cities = [];

$(document).ready(function() {

// CHECKS IF ANY CITIES ARE IN LOCAL STORAGE THEN DISPLAYS THEM
var localCities = JSON.parse(localStorage.getItem("city"));
if (localCities) {
    cities = pullCity(localCities);
}

// PULLS FROM LOCAL STORAGE AND GENERATES BUTTONS
function pullCity(cities) {

    for (var i=0;i<cities.length;i++) {
        cityBtn(cities[i]);
    }

    return localCities;
}


// GENERATES CITY ACCORDING TO USER INPUT THEN APPENDS IT TO SIDEBAR
function makeCity() {
    // RETRIEVE DATA FROM INPUTFIELD THEN UPPERCASE IT
    var cityName = ($(".cityName").val()).toUpperCase();
    console.log("City Entered: " + cityName);

    
    cities.push(cityName);
    console.log("City Array: " + cities);

    // SAVE CITY ARRAY TO LOCAL STORAGE
    saveCity(cities);
    // GENERATE CITY BUTTON AND APPEND IT
    cityBtn(cityName);
}

// GENERATES BUTTON
function cityBtn(cityName){

    var cityBtn = $('<button>');
    cityBtn.attr("class", "list-group-item list-group-item-action");
    cityBtn.text(cityName);

    // APPEND TO SIDEBAR BODY
    $(".sidebarBody").prepend(cityBtn);
}

// SAVES TO LOCAL STORAGE
function saveCity(cities) {
    localStorage.setItem("city", JSON.stringify(cities));
}

// SEARCH BUTTON EVENT LISTENER
$(".search").on("click", function() {
    // CHECKS ARRAY LENGTH TO MAKE SURE ITS LESS THAN 10
    if (cities.length > 9){
        if($(".cityName").val() !== ""){
            cities.shift();
            makeCity();
        }
    }
    else {
        if($(".cityName").val() !== ""){
            makeCity();
        }
    }

    // CLEARS INPUT FIELD
    $(".cityName").val("");
});

// CLEAR BUTTON REMOVES ALL ELEMENTS FROM SIDEBAR AND CLEARS LOCAL STORAGE
$(".close").on("click", function() {
    $(".sidebarBody").empty();
    localStorage.clear();
});
});