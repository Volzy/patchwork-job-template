/**
 * Validate the contact form
 */
function validateAndSend() {
  var name_valid = $('#name').val();
  var project_valid = $('#project').val();
  var message_valid = $('#message').val();
  var message_length = (message_valid.length < 140) ? true : false;

  var email = $('#email').val();
  var email_regex = new RegExp("^[A-z0-9._%+-]+@[A-z0-9.-]+.[A-z]{2,4}$");
  var email_valid = email_regex.test(email);

  if(!name_valid) {
    $('#name').addClass('error');
  }

  if(!email_valid) {
    $('#email').addClass('error');
  }

  if(!project_valid) {
    $('#project').addClass('error');
  }

  if(!message_valid) {
    $('#message').addClass('error');
  }

  if(!message_length) {
    $('#message').addClass('error');
  }

  if(message_valid && message_length && name_valid && email_valid && project_valid) {
    $.post( "formSubmit.php", $("#contact-form").serialize() ).done(function(response) {
      var data = JSON.parse(response);
      console.log(data);
      if(data.status === "ok") {
          $('#contact-form').append('<div class="success-msg">'+data.message+'</div>');
          $('input[type=submit]').remove();
      } else {
          $('#contact-form').append('<div class="error-msg">'+data.message+'</div>');    
      }
    }).fail(function() {
      $('#contact-form').append('<div class="error-msg">'+data.message+'</div>');
    });
  } else {
  	return false;
  }
}


$(function() {

  /* Validate the form contact before it is submitted */
  $('#contact-form').submit(function(e) {
  	e.preventDefault();

    validateAndSend();
  });

  /* Remove error classes when fields are focused */
  $('#name, #email, #message, #project').focus(function() {
    $(this).removeClass('error');
  });

  // Scroll on button click
  $("a.button").click(function(e) {
	e.preventDefault();
	var elem = $(this).attr('href');

	$('html, body').animate({
	    scrollTop: $(elem).offset().top
	}, 2000);
  });

  // Twitter-like character count on message
  $('#message').charCount({
	allowed: 140,
	warning: 20,
	counterText: 'Tegn tilbage: '
  }); 

});