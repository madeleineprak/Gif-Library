var topics = ["Bora Bora", "Italy", "Cancun", "Thailand"];

function renderButtons() {
    $("#button-list").empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("place-button");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $("#button-list").append(button);
    }
}

$("#add-place").on("click", function(event){
    event.preventDefault();

    var place = $("#place-input").val().trim();
    topics.push(place);
    renderButtons();
});

$(document).on("click", ".place-button", function () {
    var place = $(this).attr("data-name");
    var apiKey = "feJWVZnjlY4LefnmiZ4S01tqW5mcLCtU";
    var numImages = 10;
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&limit=" + numImages + "&q=travel " + place;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        for(var i = 0; i < numImages; i++) {
            var imageURL = response.data[i].images.original_still.url;
            var gifURL = response.data[i].images.original.url;
            var placeImage = $("<img>");
            placeImage.addClass("place-image")
            placeImage.attr("src", imageURL);
            placeImage.attr("data-still", imageURL);
            placeImage.attr("data-animate", gifURL);
            placeImage.attr("data-state", "still");
            placeImage.attr("alt", "destination");
            $("#image-list").prepend(placeImage);
        }
    });
});

$(document).on("click", ".place-image", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

renderButtons();