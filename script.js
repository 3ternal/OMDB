$(document).ready(function() {

  var IMDBids = [
    "tt3332064", "tt3488710", "tt3254796", "tt2080374", "tt2118624",
    "tt4226388", "tt1051904", "tt2554274", "tt3682448", "tt3859076",
    "tt3170832", "tt3272570", "tt1870548", "tt4183692", "tt2473510",
    "tt0111161", "tt0068646", "tt0071562", "tt0468569", "tt0050083",
    "tt0108052", "tt0060196", "tt0137523", "tt0120737", "tt0080684",
    "tt0109830", "tt1375666", "tt0073486", "tt0167261", "tt0114369"
  ];

  var i = 0;

  function addMovie(i) {

    if (i < 10) {
      var randomNumber = Math.floor( (Math.random() * 30) );
      var randomMovie = IMDBids[randomNumber];
      while ($("#" + randomMovie).length) {
        var randomNumber = Math.floor( (Math.random() * 30) );
        var randomMovie = IMDBids[randomNumber];
      }
      ajaxCall(randomMovie, i);
    }

    else {
      i = 0;
    }

  }

  function ajaxCall(randomMovie, i) {
    $.ajax({
      url: 'http://www.omdbapi.com/?y=&plot=short&r=json&i='+randomMovie,
      type: 'GET',
      dataType: 'json',
      data: {format: 'json'},
      error: function() {
        $(".movie").text("error");
      },
      success: function(data) {
        $(".container").append("<div class='movie' id='"+randomMovie+"'></div>");
        var title = data.Title;
        var year = data.Year;
        var runtime = data.Runtime;
        var genre = data.Genre;
        var plot = data.Plot;
        var poster = data.Poster;

        $("#" + randomMovie).append("<div class='title'>"+title+"</div>");
        $("#" + randomMovie).append("<div class='row2'>"+
          "<span class='year'><b>Year</b>: "+year+"</span>"+
          "<span class='runtime'><b>Runtime</b>: "+runtime+"</span>"+
          "<span class='genre'><b>Genre</b>: "+genre+"</span>"+
          "</div>"
        );
        $("#" + randomMovie).append("<div class='poster-container'>"+
          "<div class='poster'><img src='"+poster+"'></div>"+
          "<div class='plot'>"+plot+"</div></div>"
        );

        i++;
        addMovie(i);
      }
    });
  }

  addMovie(0);

  $(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() > $(document).height() - 10 && i == 0) {
     if ($(".movie").length < 30) {
       console.log("scroll call");
       addMovie(0);
     }
   }
  });

});
