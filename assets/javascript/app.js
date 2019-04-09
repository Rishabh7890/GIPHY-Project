var btnArray = [
  "Funny",
  "Dogs",
  "Cats",
  "Sports",
  "Gaming",
  "Movies",
  "TV",
  "Anime",
  "Politics",
  "Random"
];

var btn;
var searchTerm = "";

function addBtn() {
  $("#gif-buttons").empty();
  for (var i = 0; i < btnArray.length; i++) {
    $("#gif-buttons").append(
      "<button type='button' class='btn btn-outline-danger btn-sm' value=' " +
        btnArray[i] +
        "'> " +
        btnArray[i] +
        " </button>"
    );
  }
}

$("#gif-buttons").on("click", ".btn", function() {
  var btnData = $(this).val();
  var apiKey = "&api_key=ATitLzqHisbzyItV8xmCrCqEKbGnqMYM";
  var queryURL =
    "http://api.giphy.com/v1/gifs/search?q=" + btnData + apiKey + "&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div>");

      var p = $("<p>").text("Rating: " + results[i].rating);

      var gifImage = $("<img>");

      gifImage.attr("src", results[i].images.fixed_height_still.url);
      gifImage.attr("data-still", results[i].images.fixed_height_still.url);
      gifImage.attr("data-animate", results[i].images.fixed_height.url);
      gifImage.attr("data-state", "still");
      gifImage.addClass("gif");

      gifDiv.append(p);
      gifDiv.append(gifImage);

      $("#gifs-displayed").prepend(gifDiv);
    }
  });
});

function searchGIFs(event) {
    event.preventDefault();
  

  searchTerm = $("#gif-input")
    .val()
    .trim();

  if (searchTerm === "") {
    return false;
  }

  btnArray.push(searchTerm);
  console.log(btnArray);
  var apiKey = "&api_key=ATitLzqHisbzyItV8xmCrCqEKbGnqMYM";
  var queryURL =
    "http://api.giphy.com/v1/gifs/search?q=" +
    searchTerm +
    apiKey +
    "&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div>");

      var p = $("<p>").text("Rating: " + results[i].rating);

      var gifImage = $("<img>");

      gifImage.attr("src", results[i].images.fixed_height_still.url);
      gifImage.attr("data-still", results[i].images.fixed_height_still.url);
      gifImage.attr("data-animate", results[i].images.fixed_height.url);
      gifImage.attr("data-state", "still");
      gifImage.addClass("gif");

      gifDiv.append(p);
      gifDiv.append(gifImage);

      $("#gifs-displayed").prepend(gifDiv);

      addBtn();
    }
  });
}
  
$("#gifs-displayed").on("click", ".gif", function(event){
  event.preventDefault();

  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");

  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
})


$(document).ready(function() {
  $("#gif-form").on("submit", searchGIFs);
  addBtn();

});


