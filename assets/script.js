$(document).ready(function() {

// SEARCH BUTTON EVENT LISTENER
$(".search").on("click", function() {
    var cityName = ($(".cityName").val()).toLowerCase();
    console.log("City Entered: " + cityName);
    
    makeCity(cityName);
});

// GENERATES CITY ACCORDING TO USER INPUT THEN APPENDS IT TO SIDEBAR
function makeCity(cityName) {
    cityName = cityName.toUpperCase();
    var cityBtn = $('<button>');
    cityBtn.attr("class", "list-group-item list-group-item-action");
    cityBtn.text(cityName);

    $(".sidebarBody").append(cityBtn);
}






});