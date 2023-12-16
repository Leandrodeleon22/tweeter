$(window).scroll(function () {
  const isVisble = $(this).scrollTop() >= 400;

  console.log($(this).scrollTop());
  if (!isVisble) {
    return $(".go-up").fadeOut();
  }
  $(".go-up").fadeIn();
});

$(document).ready(function () {
  $(window).scroll(function () {
    let isVisble = $(this).scrollTop() >= 400;

    console.log($(this).scrollTop());
    if (!isVisble) {
      return $(".go-up").fadeOut();
    }
    $(".go-up").fadeIn();
  });

  $(".go-up").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });
});
