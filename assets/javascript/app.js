//Create topics array
var topics = [
    "SNL",
    "Game of Thrones",
    "Stranger Things",
    "The Walking Dead",
    "Mr. Robot",
    "Westworld",
    "Sneaky Pete",
    "Billions",
    "Silicon Valley",
    "Better Call Saul"
];
//==============================

$(document).on("click", ".topic-button", generateGif);
generateButton();

//gnerate buttons based on topics array
function generateButton() {
    $("#buttonsDiv").empty();
    for (var i = 0; i < topics.length; i++) {
        var buttonsDiv = $("<button>")
        buttonsDiv.addClass("topic-button btn waves-effect waves-light");
        buttonsDiv.attr("data-type", topics[i]);
        buttonsDiv.html(topics[i]);
        $("#buttonsDiv").append(buttonsDiv);
    };
};
//==============================

// Add gif search to the topics array
$("#addGif").on("click", function() {
    var addGif = $("#search-input").val().trim();
    // push input to the topics array and generate button
    topics.push(addGif);
    generateButton();
    return false;
});
//==============================

// function to display gifs & ajax call
function generateGif() {
    $("#results").empty();
    var type = $(this).attr("data-type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&limit=10&api_key=dc6zaTOxFJmzC";

    $.ajax({ url: queryURL, method: "GET" }).done(function(response) {
        console.log(response.data);
        for (var i = 0; i < response.data.length; i++) {
            var gifDiv = $("<div>");
            var rating = response.data[i].rating;
            var p = $("<p>").html("Rating: " + rating);
            var image = $("<img>");
            image.attr("src", response.data[i].images.fixed_height_still.url);
            image.attr("title", "Rating: " + response.data[i].rating);
            image.attr("data-still", response.data[i].images.fixed_height_still.url);
            image.attr("data-state", "still");
            image.attr("data-animate", response.data[i].images.fixed_height.url);
            image.addClass("giphy card"); //class card for Materialize
            gifDiv.append(image)
            gifDiv.append(p)
            $("#results").append(gifDiv);
        };
    });
};
//==============================

// function to animate gifs
$(document).on("click", ".giphy", function() {
    var state = $(this).attr("data-state");
    if (state == "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    };
});
//==============================