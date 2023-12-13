// import { format, render, cancel, register } from "timeago.js";
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const data = require("../../data-files/initial-tweets.json");

// const data = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// }

// const data = [
//   {
//     user: {
//       name: "Newton",
//       avatars: "https://i.imgur.com/73hZDYK.png",
//       handle: "@SirIsaac",
//     },
//     content: {
//       text: "If I have seen further it is by standing on the shoulders of giants",
//     },
//     created_at: 1461116232227,
//   },
//   {
//     user: {
//       name: "Descartes",
//       avatars: "https://i.imgur.com/nlhLi3I.png",
//       handle: "@rd",
//     },
//     content: {
//       text: "Je pense , donc je suis",
//     },
//     created_at: 1461113959088,
//   },
// ];

$(document).ready(function () {
  $("#tweet").on("submit", function (event) {
    event.preventDefault();
    //validate if message length is more than 140
    const inputLength = $("#tweet-text").val().length;
    if (inputLength === 0) {
      $(".empty").slideDown("slow");
      $(".empty").css({
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
        " border": "2px solid red",
      });

      $(".long").hide();
      return;
    }
    if (inputLength > 140) {
      // $(".message").removeClass("hidden");
      $(".long").slideDown("slow");
      $(".long").css({
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
        " border": "2px solid red",
      });

      $(".empty").hide();
      return;
      // throw Error("Message is too long");
    }

    const text = $("#tweet-text").val();

    let newText = "";
    for (let i = 0; i < text.length; i += 35) {
      newText += text.substring(i, i + 35) + "\n";
    }

    $("#tweet-text").val(newText.trim());

    const actionUrl = $(this).attr("action");
    const formData = $(this).serialize();
    // console.log(formData);
    $.ajax({
      url: actionUrl,
      type: "POST",
      data: formData,
      success: function (data) {
        loadTweets();
        console.log(data);
        $("#tweet-text").val("");
        $(".counter").val(140);
        $(".message").addClass("hidden");
        $(".long, .empty").hide();
      },
      error: function (xhr, status, error) {
        console.log(error, xhr, status);
        if (error === "Bad Request") {
          return;
        }
      },
    });
  });
  // loadTweets();
});

const loadTweets = () => {
  $.ajax("http://localhost:8080/tweets", {
    type: "GET",
  }).then(function (data) {
    // console.log(data);
    renderTweets(data);
  });
};

loadTweets();
// loadTweets();

const createTweetElement = (data) => {
  const { name, avatars, handle } = data.user;
  const { text } = data.content;
  const { created_at } = data;
  const { format } = timeago;

  const html = `
  <article>
        <div class="user">
          <div class="user-name">
            <img src=${avatars} alt="woman" />
            <span>${name}</span>
          </div>
          <span>${handle}</span>
        </div>

        <p>
          ${text}
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

const renderTweets = (tweets) => {
  // console.log(tweets);
  const container = $(".container");
  const children = container.children();
  children.not(":first-child").remove();

  // container.empty();

  tweets.forEach((user) => {
    // createTweetElement(user);
    container.children(":first-child").after(createTweetElement(user));
  });
};
