/* When the document is ready all necessary function calls are made */
$('document').ready(function() {
  drawIntroSpace();

  /* Making the scrolling animation when a scrollable btn is clicked */
  $('.scrollable').on('click', function() {
    console.log("hej");
    var section = $(this).attr('href');
    console.log(section);

    if(section.localeCompare('#top') === 0) {
      $('html, body').stop().animate({ scrollTop: 0}, 500);
      return;
    }
    $('html, body').stop().animate({ scrollTop: $(section).offset().top }, 500);
  });
  /* ------------ */

  /* Makes the menu collapse when clicked on a phone*/
  $('.navigation-btn').on('click', function() {
    $('#navbar').collapse('hide');
  });
  /* --------- */

  /* contact-label-appearance */
  $("#name").keyup(function() {
    if($("#name").val() && !($("#name-label").hasClass("addable-label-anim")))
      $("#name-label").addClass("addable-label-anim");
  });
  $("#email").keyup(function() {
    if($("#email").val() && !($("#email-label").hasClass("addable-label-anim")))
      $("#email-label").addClass("addable-label-anim");
  });
  $("#tel-number").keyup(function() {
    if($("#tel-number").val() && !($("#tel-label").hasClass("addable-label-anim")))
      $("#tel-label").addClass("addable-label-anim");
  });
  $("#message").keyup(function() {
    if($("#message").val() && !($("#message-label").hasClass("addable-label-anim")))
      $("#message-label").addClass("addable-label-anim");
  });
  /* ----------------- */

  /* Since one cannot hover on a mobile I have to make the description show beneath the carousel */
  $('.carousel-control').on('click', waitFunction);
  showDescription(); // Have to run this once in order for the first description to appear

  /* The wait is necessary because of the slide animation on the carousel */
  function waitFunction() {
    setTimeout(showDescription, 700);
  }

  function showDescription() {
    $('#mobile-description').html($('.item.active').find('.hover-caption').prop('innerText'));
  }
  /* ------- */
});
/* ------- */

/* If the window is resized some changes must be made */
$(window).resize(function() {
  createCanvas();
});
/* -------- */

/* Drawing the intro space */
var canvas;
var ctx;

function createCanvas() {
  /*I begin by setting the position of the text*/
  var screenW = $(window).width();
  var screenH = $(window).height();

  var text = document.getElementById("intro-text");
  text.style.left = (screenW/2 - text.scrollWidth/2) + "px";
  text.style.top = (screenH/2 - text.scrollHeight/2) + "px";

  canvas = document.getElementById("intro");
  ctx = canvas.getContext('2d');

  canvas.width = screenW;
  canvas.height = screenH;
}

function drawIntroSpace() {
  //Has to be a separate function because of resizing
  createCanvas();

  var stars = [];
  var numOfStars = canvas.width; // Found this to be a good reference point

  // Push stars to array
  for (var i = 0; i < numOfStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random(),

      velocityX: Math.round(Math.random() * 10 - 5),
      velocityY: Math.round(Math.random() * 10 - 5),

      redness: Math.round(255 - Math.random() * 100),
      greenness: Math.round(255 - Math.random() * 100),
      blueness: Math.round(255 - Math.random() * 100)
    });
  }
  // Draw the scene
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    for (var i = 0; i < numOfStars; i++) {
      var s = stars[i];

      ctx.fillStyle = "rgb( " + s.redness + ", " + s.greenness + ", " + s.blueness + ")";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  function update() {
    for (var i = 0; i < numOfStars; i++) {
      var s = stars[i];

      s.x += s.velocityX / 60; // 60 is the fps
      s.y += s.velocityY / 60;

      if (s.x <= 0 || s.x >= canvas.width) s.velocityX = -s.velocityX;
      if (s.y <= 0 || s.y >= canvas.height) s.velocityY = -s.velocityY;
    }
  }

  // Update and draw
  function animateStars() {
    draw();
    update();
    requestAnimationFrame(animateStars);
  }

  animateStars();
}
/*----- Drawing intro space*/

/* checking which section the window is currently in */
$(window).scroll(function() {
  var scrollTop = $('body').scrollTop();

  if((scrollTop >= $('#contact').offset().top - 10) || ($(window).scrollTop() + $(window).height() == $(document).height())) { /*Has to be -10 since the html,body scrollTop value below does not match the value given by $('body').scrollTop() $('html, body').stop().animate({ scrollTop: $(section).offset().top}, 500); */
    if(!$('#contact-link').hasClass('navigation-active'))
      $('.navigation-active').removeClass('navigation-active');

    $('#contact-link').addClass('navigation-active');
  }
  else if(scrollTop >= $('#portfolio').offset().top) {
    if(!$('#portfolio-link').hasClass('navigation-active'))
      $('.navigation-active').removeClass('navigation-active');

    $('#portfolio-link').addClass('navigation-active');
  }
  else if(scrollTop >= $('#about').offset().top) {
    if(!$('#about-link').hasClass('navigation-active'))
      $('.navigation-active').removeClass('navigation-active');

    $('#about-link').addClass('navigation-active');
  }
  else {
    $('.navigation-active').removeClass('navigation-active');
  }
});
/* ------- */
