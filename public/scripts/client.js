$(document).ready(function () {
  $("#tweet").on("submit", function (event) {
    event.preventDefault();

    const inputLength = $("#tweet-text").val().length;

    //VALIDATE IF MESSAGE LENGTH IS EMPTY
    if (inputLength === 0) {
      $(".empty").slideDown("slow");
      // style for the message
      $(".empty").css({
        "font-weight": "600",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
        border: "3px solid red",
      });

      $(".long").hide();
      return;
    }

    //VALIDATE IF MESSAGE LENGTH IS MORE THAN 140
    if (inputLength > 140) {
      $(".long").slideDown("slow");
      // STYLE FOR THE MESSAGE VALIDATION
      $(".long").css({
        "font-weight": "600",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
        border: "3px solid red",
      });

      $(".empty").hide();
      return;
    }

    // IF MESSAGE IS TOO LONG CREATE NEW LINE
    const text = $("#tweet-text").val();
    let newText = "";
    for (let i = 0; i < text.length; i += 35) {
      newText += text.substring(i, i + 35) + "\n";
    }

    $("#tweet-text").val(newText.trim());

    //AJAX CREATE TWEET FROM THE FORM
    const actionUrl = $(this).attr("action");
    const formData = $(this).serialize();

    $.ajax({
      url: actionUrl,
      type: "POST",
      data: formData,
      success: function (data) {
        loadTweets();

        $("#tweet-text").val("");
        $(".counter").val(140);
        $(".message").addClass("hidden");
        $(".long, .empty").hide();
      },
      error: function (xhr, status, error) {
        if (error === "Bad Request") {
          return;
        }
      },
    });
  });

  //FORM TOGGLE
  $(document).ready(function () {
    $(".red-icon").on("click", function () {
      $("#tweet").slideToggle();
    });
  });
});

//LOAD ALL TWEETS
const loadTweets = () => {
  $.ajax("http://localhost:8080/tweets", {
    type: "GET",
  }).then(function (data) {
    renderTweets(data);
  });
};

loadTweets();

//CREATE TWEET
const createTweetElement = (data) => {
  const { name, avatars, handle } = data.user;
  const { text } = data.content;
  const { created_at } = data;
  const { format } = timeago;
  const container = $("<div/>");

  const tweetName = container.text(name).html();
  const tweetHandle = container.text(handle).html();
  const tweetText = container.text(text).html();

  const html = `
  <article>
        <div class="user">
          <div class="user-name">
            <img src=${avatars} alt="woman" />
            <span>${tweetName}</span>
          </div>
          <span>${tweetHandle}</span>
        </div>

        <p>
          ${tweetText}
        </p>

        <div class="bottom-details">
          <p>${format(created_at)}</p>
          <div class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"><sup>1</sup></i>
          </div>
        </div>
      </article>
  
  `;
  return html;
};

// RENDER TWEETS
const renderTweets = (tweets) => {
  const container = $(".container");
  const children = container.children();
  children.not(":first-child").remove();

  tweets.forEach((user) => {
    container.children(":first-child").after(createTweetElement(user));
  });
};
