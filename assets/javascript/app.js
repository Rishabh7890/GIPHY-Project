//create empty string for gifs to be added
var gifs = [""];

//function displayGifInfo re-renders HTML to display content 
function displayMovieInfo() {

  var gif = $(this).attr("data-gif");
  var apiKey = "&api_key=ATitLzqHisbzyItV8xmCrCqEKbGnqMYM";
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + apiKey + "&limit=10";

  //Create AJAX call for specific gif button being clicked 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    //store data from the AJAX request in a results variable
    var results = response.data;

    //Loop through the results and create a div with image and rating for each one 
    for (var i = 0; i < results.length; i++) {

      var gifDiv = $("<div>");

      var gifRating = $("<p>").text("Rating: " + results[i].rating);

      var gifImage = $("<img>");

      gifImage.attr("src", results[i].images.fixed_height.url);

      gifDiv.append(gifImage);
      gifDiv.append(gifRating);

      $("#gifs-view").prepend(gifDiv);
    }
  })
}

function renderButtons () {

  $("buttons-view").empty();

  for (var i = 0; i < gifs.length; i++) {

    var newBtn = $("<button>");
    newBtn.addClass("gif");
    newBtn.attr("data-gif", gifs[i]);
    newBtn.text(gifs[i]);
    $("buttons-view").append(newBtn);
  }
}

$(".add-gif").on("click",function(event) {
  event.preventDefault();

  var gif = $("#gif-input").val().trim();

  gifs.push(gif);

  renderButtons();
})

$(document).on("click", ".add-gif", displayMovieInfo);

renderButtons();


//Errors with code: 
// Same gifs print everytime no matter which button is pressed