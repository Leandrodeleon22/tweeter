$(document).ready(function () {
  // --- our code goes here ---
  $("#tweet-text").on("input", function () {
    const textLength = $(this).val().length;

    $(".counter").text(140 - textLength);

    if (textLength > 140) {
      $(".counter").css("color", "red");
    }
    if (textLength <= 140) {
      $(".counter").css("color", "black");
    }
  });
});
