var cities = [];

$(document).ready(function() {

// CHECKS IF ANY CITIES ARE IN LOCAL STORAGE THEN DISPLAYS THEM
var localCities = JSON.parse(localStorage.getItem("city"));
if (localCities) {
    cities = setLocalCities(localCities);
};

// PULLS FROM LOCAL STORAGE AND GENERATES BUTTONS
function setLocalCities(cities) {

    for (var i=0;i<cities.length;i++) {
        cityBtn(cities[i]);
    }

    return cities;
};


// GENERATES CITY ACCORDING TO USER INPUT THEN APPENDS IT TO SIDEBAR
function makeCity() {
    // RETRIEVE DATA FROM INPUTFIELD THEN UPPERCASE IT
    var cityName = ($(".cityName").val()).toUpperCase();
    console.log("City Entered: " + cityName);

    // PUSH INTO CITIES ARRAY FOR SAVING
    cities.push(cityName);
    console.log("City Array: " + cities);

    // SAVE CITY ARRAY TO LOCAL STORAGE
    saveCity(cities);
    // GENERATE CITY BUTTON AND APPEND IT
    cityBtn(cityName);
};

// GENERATES BUTTON
function cityBtn(cityName){

    // REMOVES LAST CHILD IF AMOUNT OF CHILDREN GROWS ABOVE 7
    if ($(".sidebarBody").children().length > 6) {
        $(".sidebarBody :last-child").remove();
    }

    var cityBtn = $('<button>');
    cityBtn.attr("class", "list-group-item list-group-item-action cityBtn");
    cityBtn.text(cityName);

    // APPEND TO SIDEBAR BODY
    $(".sidebarBody").prepend(cityBtn);
};

// SAVES TO LOCAL STORAGE
function saveCity(cities) {
    localStorage.setItem("city", JSON.stringify(cities));
};

// FUNCTION SETS INFO IN CARD BASED ON CITY NAME FROM API
function setCityInfo(response) {
    var cityName = $("#cityName");
    var weatherIcon = $("<img>");
    var temp = $("#temp");
    var humidity = $("#humidity");
    var windSpeed = $("#windSpeed");
    var uv = $("#uv");

    // var lat = response.city.coord.lat;
    // var lon = response.city.coord.lon;
    // var UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=de496400dd500d58250dee54250a157f";
    // $.ajax({
    //     url: UVQueryURL,
    //     method: "GET"
    //   }).then(function(uvQuality) {
    //     console.log("THIS ONE: " + uvQuality);
    //   });

    var iconcode = response.list[0].weather[0].icon;
    var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";

    cityName.text(response.city.name);
    weatherIcon.attr("src", iconurl);
    weatherIcon.attr("class", "weatherIcon");
    cityName.append(weatherIcon);

    temp.text(response.list[0].main.temp + " °F");
    humidity.text(response.list[0].main.humidity + " %");
    windSpeed.text(response.list[0].wind.speed + " MPH");
    // uv.val()

};

// FUNCTION SETS FORECAST BASED ON INFO FROM API
function setForecast(response) {
    // STORE 5 DAYS INFO IN ARRAY
    var day = [];
    for (var k=0; k<5; k++){
        day[k] = response.list[k];
        console.log(day);

        // GENERATING CARDS
        generateCards(day, k);
    }
};

// FUNCTION GENERATES CARDS AND POPULATES THEM WITH INFORMATION REGARDING THE DAY
function generateCards(day, k) {
    var forecastCards = $("#forecastCards");

    var dayCard = $("<div>");
    dayCard.attr("class", "dayCard");

    var cardHeader = $("<h2>");
    cardHeader.attr("class", "cardHeader");

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');

    cardHeader.text(mm + " / " + (parseInt(dd)+k));

    var br = $("<br>");

    var weatherIcon = $("<img>");
    var iconcode = day[k].weather[0].icon;
    var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
    weatherIcon.attr("src", iconurl);

    var cardInfo = $("<div>");
    cardInfo.attr("class", "cardInfo");

    var p1 = $("<p>");
    p1.text("Temp: ");
    var p2 = $("<p>");
    p2.text("Humidity: ");

    var span1 = $("<span>");
    span1.attr("class", "dayTemp");
    span1.text(day[k].main.temp + " °F");
    var span2 = $("<span>");
    span2.attr("class", "dayHumid");
    span2.text(day[k].main.humidity + " %");

    p1.append(span1);
    p2.append(span2);

    cardInfo.append(p1);
    cardInfo.append(p2);

    dayCard.append(cardHeader);
    dayCard.append(weatherIcon);
    dayCard.append(br);
    dayCard.append(cardInfo);

    forecastCards.append(dayCard);
};

function retrieveInfo(selectCity) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + selectCity + "&units=imperial&appid=de496400dd500d58250dee54250a157f";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        $('#forecastCards').empty();
        setCityInfo(response);
        setForecast(response);
      });
};

// SEARCH BUTTON EVENT LISTENER
$(".search").on("click", function() {
    // CHECKS ARRAY LENGTH TO MAKE SURE ITS LESS THAN 7
    if (cities.length > 6){
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

    var selectCity = $(".cityName").val();
    retrieveInfo(selectCity);

    // CLEARS INPUT FIELD
    $(".cityName").val("");
});

// CLEAR BUTTON REMOVES ALL ELEMENTS FROM SIDEBAR AND CLEARS LOCAL STORAGE
$(".close").on("click", function() {
    $(".sidebarBody").empty();
    localStorage.clear();
});

// POPULATES MAIN CONTENT WITH INFORMATION OF CITY
$(".sidebarBody").on("click", ".cityBtn", function() {
    var selectCity = $(this).text();
    console.log(selectCity);
    retrieveInfo(selectCity);
});


});