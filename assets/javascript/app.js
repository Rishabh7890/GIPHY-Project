//create vars for starter recommended GIFs 
var gifs = ["Funny", "Dogs", "Cats", "Sports", "Movies", "Anime", "Music","Art","gaming","Cities","Holiday","Politics"];

//function displayGifInfo re-renders HTML to display content 
$("button").on("click", function(){
  var gif = $(this).attr("data-gif");
  var apiKey ="&api_key=ATitLzqHisbzyItV8xmCrCqEKbGnqMYM";
  var queryURL = "http://api.giphy.com/v1/gifs/search?q" + gif + apiKey + "&limit=10";

  //Create AJAX call for specific gif button being clicked 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    console.log(response);

    //store data from the AJAX request in a results variable
    var results = response.data;

    //Loop through the results and create a div with image and rating for each one 
    for (var i = 0; i < results.length; i++) {

      var gifDiv = $("<div>");

      var gifRating = $("<p>").text("Rating: " + results[i].rated);

      var gifImage = $("<img>");

      gifImage.attr("src", results[i].images.fixed_height.url);

      gifDiv.append(gifRating);
      gifDiv.append(gifImage)

      $("#gifs-view").prepend(gifDiv);
    }
})
})


