$('#proceed').on('singletap', function() {
    $.UIGoToArticle('#content');
});

$('#logout').on('singletap', function() {
    $.UIGoToArticle('#main');
});

$('#goto-movie').on('singletap', 'li', function() {
  var id = $(this).data('id');
  viewMovie(id);
  $.UIGoToArticle('#movie');
});

reviews = [];
dynamicUpdate();

$("#send").on("singletap", function() {
    var name = $("#name-box").val();
    var content = $("#comment-box").val();
    var score = $('#score').val();
    if (name.length < 1) {
        name = "Anonymous";
    }
    if (content.length < 1) {
        $.UIPopup({
            id: "note-new-warning",
            title: 'Error',
            message: 'Please fill in your review.',
            continueButton: 'OK',
            callback: function() {
                content = "";
            }
        });
    } else {
        addReview(name, content, score);
    }
    dynamicUpdate();
});

$('#rangeValue').html($('#score').val());
$('#score').on('change', function() {
    $('#rangeValue').html($(this).val());
});

$('.switch').on('singletap swipeleft swiperight', function() {
    if (this.classList.contains('on')) {
        $('#plot').css("color", '');
        $('#comment-box').css("color", '');
        $('#name-box').css("color", '');
        $('#score').css("color", '');
        $('body').css('background-color', '');
        $('#new-review').css('background-color', '');
    } else {
        $('#plot').css("color", "#F5F2E6");
        $('#comment-container').css("color", "#F5F2E6");
        $('#comment-box').css("color", "#F5F2E6");
        $('#name-box').css("color", "#F5F2E6");
        $('#score').css("color", '#F5F2E6');
        $('body').css("background-color", "#100606");
        $('#new-review').css("background-color", "#100606");
    }
});

function viewMovie(id) {
    $('#header-image').html('<img src="' + movies[id].image + '">');
    $('#movie-title').text(movies[id].title);
    $('#description').text(movies[id].description);
    $('#rating').text(movies[id].rating);
    $('#genre').text(movies[id].genre);
    $('#direct').text(movies[id].director);
    $('#written').text(movies[id].writtenBy);
    $('#showing').text(movies[id].showing);
    $('#runtime').text(movies[id].runtime);
}

function dynamicUpdate() {
  if (reviews.length !== 0) {
    $('#avgRating').html(getAvgRating() + ' out of 5.0');
  } else {
    $('#avgRating').html("This movie has not yet been reviewed.");
  }
  listComments();
}

function addReview(name, content, score) {
    review = {
      name: name,
      content: content,
      score: score
    };

    reviews.push(review);
}

function listComments() {
  if (reviews.length === 0){
    $("#reviews").append("<li>There are no reviews for this movie.</li>");
  } else {
    $('#reviews').html("");
    for (var i=0; i<reviews.length; i++) {
      $("#reviews").append("<li>" + "<h3>" + reviews[i].name + "</h3>" + "<h4>Rating: " + reviews[i].score + "</h4><h4>" + reviews[i].content+ "</h4></li>");
    }
  }
}

function getAvgRating() {
  var sum = 0.0;
  if (reviews.length !== 0) {
    for (var i = 0; i<reviews.length; i++) {
      sum += parseInt(reviews[i].score);
    }
  }
  return sum/reviews.length;
}

