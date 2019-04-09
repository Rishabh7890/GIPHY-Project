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
for (var i = 0; i < btnArray.length; i++) {
  $("#gif-buttons").append(
    "<button type='button' onclick='searchGIFs(\"" +
      btnArray[i] +
      "\")' class='btn btn-outline-danger btn-sm' value=' " +
      btnArray[i] +
      "'> " +
      btnArray[i] +
      " </button>"
  );
}

function addBtn() {
  $("#gif-buttons").empty();
  for (var i = 0; i < btnArray.length; i++) {
    $("#gif-buttons").append(
      "<button type='button' onclick='searchGIFs(\"" +
        btnArray[i] +
        "\")' class='btn btn-outline-danger btn-sm' value=' " +
        btnArray[i] +
        "'> " +
        btnArray[i] +
        " </button>"
    );
  }

  
}

function searchGIFs(event) {
  event.preventDefault();

  var searchTerm = $("#gif-input")
    .val()
    .trim();

  if (searchTerm === "") {
    return false;
  }

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

      gifImage.addClass("gif");

      gifImage.attr("src", results[i].images.fixed_height_still.url);

      gifDiv.append(p);
      gifDiv.append(gifImage);

      $("#gifs-displayed").prepend(gifDiv);
    }
  });
}

$(document).ready(function() {
  $("#gif-form").on("submit", searchGIFs);

  $(".gif").on("click", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
});
