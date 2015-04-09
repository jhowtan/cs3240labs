$(document).ready(function() {

  // Set smoothscroll for navbar links
  smoothScroll.init({
    speed: 700,
    easing: 'easeOutQuad',
    updateUrl: true
  });

  // Initialise variables for progress bar
  var bar = $('#bar');
  var setWidth = function(){
    $(bar).each(function(){
      bar_width = $(this).attr('aria-valuenow');
      $(this).width(bar_width + '%');
    });
  };

  // Waypoints.js for animation of progress-bar
  var waypoint = new Waypoint({
    element: document.getElementById('trigger'),
    handler: function() {
      setWidth();
    }
  });

  // Initialize tooltips
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  $('#btn-submit').show();
  $('#submitted').hide();
  $('#fname').tooltip('hide');
  $('#email').tooltip('hide');

  // Logic on event: Submit button clicked
  $('#btn-submit').click(function () {
    // Temp store of values
    var fname = $("#fname").val();
    var lname = $("#lname").val();
    var email = $("#email").val();

    // Regex for email validation
    var validateEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

    // Validation: Exception cases
    if (fname.length < 1) {
      $('#fname').tooltip('show');
    }
    else if (!validateEmail.test(email)) {
      $('#email').attr('data-original-title', 'Please fill in a valid email address');
      $('#email').tooltip('show');
    }

    // Validation: Success
    else {
      var res = "<h2>Thank you " + fname +", we'll get in touch soon.</h2>";

      $('#drop').hide();
      $('#submitted').fadeIn(800);
      $('#btn-submit').hide();
      $('#fname').hide();
      $('#lname').hide();
      $('#email').hide();

      $('#submitted').html(res);
    }
  });

});
