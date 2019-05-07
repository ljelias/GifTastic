$(document).ready(function () {
    // Initial array of button topics
    var gifTopics = ["Kittens", "Puppies", "Bunnies"];
  
    renderButtons();
  
    function renderButtons() {
      // Delete content inside show-buttons div 
      // before adding new topics to avoid repeated buttons
      $('#show-buttons').html("");
  
        for (let i = 0; i < gifTopics.length; i++) {
          let newButton = $('<button>');
          newButton.text(gifTopics[i]);
          newButton.attr("gif-name", gifTopics[i]);
          $('#show-buttons').append(newButton);
          }
    }
  
    // this handles when the add-topic button is clicked
    $("#add-topic").on("click", function (event) {
      // prevents submit button from trying to send a form.
      // submit button also allows "Enter" key
      event.preventDefault();
      //grabs input from the textbox
      var newGifTopic = $("#topic-input").val().trim();
      //adds text from textbox to the gifTopics array
      if (newGifTopic !== "") {
        gifTopics.push(newGifTopic);
        $("#topic-input").val("");
      }

    renderButtons();
  
    var gifDiv = "";
  
    $("button").on("click", function () {
        var animal = $(this).attr("gif-name");
        console.log(animal);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
              animal + "&api_key=1pCeS1dgTrVhUOLQsA3XUYeGUU15rIzV&limit=10";
  
        $("#show-gifs").empty(); //clear previous set of gifs when new topic is chosen
  
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function (response) {
            var results = response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {
              gifDiv = $("<div>");
  
              var rating = results[i].rating;
              var p = $("<p>").text("Rating: " + rating);
  
              var animalImage = $("<img>");
              animalImage.attr(
                { "src": results[i].images.fixed_height_still.url,
                  "data-still": results[i].images.fixed_height_still.url,
                  "data-animate": results[i].images.fixed_height.url,
                  "data-state": "still",
                  "class": "gif"
                });
  
              gifDiv.prepend(p);
              gifDiv.prepend(animalImage);
  
              $("#show-gifs").prepend(gifDiv);
  
              animalImage.on("click", startGif);
  
              function startGif() {
                var state = $(this).attr("data-state");
  
                if (state === "still") {
                  $(this).attr("src", $(this).data("animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).data("still"));
                  $(this).attr("data-state", "still");
                }
              };
            };
          });
        });
    });
})
  
  