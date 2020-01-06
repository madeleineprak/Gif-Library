// Initial destinations
var topics = ['Washington', 'Times Square', 'Hawaii', 'Rome', 'Bangkok', 'Paris', 'Northern Lights'];

// Renders the location buttons
function renderButtons() {
    $("#button-list").empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("place-button btn btn-outline-secondary btn-block custom-button");
        button.attr("data-name", topics[i].toUpperCase());
        button.attr("type", "button");
        button.text(topics[i].toUpperCase());
        $("#button-list").append(button);
    }
}

// Adds user location input to button list
$("#add-place").on("click", function (event) {
    event.preventDefault();
    var place = $("#place-input").val().trim();
    // Prevemts blank location buttons
    if (place === "") {
        alert("Please enter a valid place.");
    } else {
        topics.push(place);
        renderButtons();
    }
});

// Fetches the giphy API to display locations' respective images/gifs
$(document).on("click", ".place-button", function (event) {
    event.preventDefault();
    var place = $(this).attr("data-name");
    var apiKey = "feJWVZnjlY4LefnmiZ4S01tqW5mcLCtU";
    var numImages = 10; // Num images to return
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&limit=" + numImages + "&q=" + place;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        console.log(response);
        for (var i = 0; i < numImages; i++) {
            var imageURL = response.data[i].images.original_still.url;
            var gifURL = response.data[i].images.original.url;
            var placeImage = $("<img>");
            var rating = $("<p>");
            var imageDiv = $("<div>");
            imageDiv.addClass("image-info");
            rating.addClass("rating").text("Rating: " + response.data[i].rating);
            placeImage.addClass("place-image img-fluid img-thumbnail");
            placeImage.attr("src", imageURL);
            placeImage.attr("data-still", imageURL);
            placeImage.attr("data-animate", gifURL);
            placeImage.attr("data-state", "still");
            placeImage.attr("rating", response.data[i].rating);
            placeImage.attr("alt", "destination");
            imageDiv.prepend(placeImage).prepend(rating);
            $("#image-list").prepend(imageDiv);
        }
    });
});

// Allows user to toggle still/animated image
$(document).on("click", ".place-image", function (event) {
    event.preventDefault();
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// Initial button render
renderButtons();