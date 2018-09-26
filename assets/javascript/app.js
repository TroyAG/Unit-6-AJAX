$(document).ready(function() {
  //Array for searched topics to be added
  var topics = [];
  
    //Function with AJAX call to GIPHY; Q parameterc for API link set to search term, limit 10 results
    //Create div with respective image sources and attributes
     function displaymovieGif() {
  
    var x = $(this).data("search");
    console.log(x);
  
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=UQwYmm5uVfelncQAmmdkNOqJr2JgOrk2&limit=15";
  
    console.log(queryURL);
  
    $.ajax({
            url: queryURL,
            method: "GET"
          }).done(function(response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
            
            var movieDiv = $("<div class='col-md-4'>");
  
            var rating = results[i].rating;
            var defaultSrc = results[i].images.fixed_height.url;
            var movieImage = $("<img>");
            var p = $("<p>").text("Rating: " + rating);
  
            movieImage.attr("src", defaultSrc);
            movieImage.addClass("movieGiphy");
            movieDiv.append(p);
            movieDiv.append(movieImage);
            $("#gifArea").prepend(movieDiv);
  
          }
    });
  }
    //Submit button click event takes search term from form input, trims and pushes to topics array, displays button
    $("#addmovie").on("click", function(event) {
          event.preventDefault();
          var newMovie = $("#movieInput").val().trim();
          topics.push(newMovie);
          console.log(topics);
          $("#movieInput").val('');
          displayButtons();
        });
    //Function iterates through topics array to display button with array values in "myButtons" section of HTML
    function displayButtons() {
      $("#myButtons").empty();
      for (var i = 0; i < topics.length; i++) {
        var a = $('<button class="btn btn-primary">');
        a.attr("id", "movie");
        a.attr("data-search", topics[i]);
        a.text(topics[i]);
        $("#myButtons").append(a);
      }
    }
    displayButtons();
    //Click event on button with id of "movie" executes displayMovieGif function
    $(document).on("click", "#movie", displaymovieGif);  
  });