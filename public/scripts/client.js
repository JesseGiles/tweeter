/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  $.ajax({
    method: 'GET',
    url: '/tweets',
    success: (response) => {
      console.log(response);
    },
    error: (err) => {
      console.log(err);
    }
  });

  const tweetDB = [
    {
      "user": {
        "name": "Andre the Giant",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@Fezzik_PrincessBride"
      },
      "content": {
        "text": "Anybody want a peanut?"
      },
      "created_at": 1461116232227
    },

    {
      "user": {
        "name": "Sia",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@BigWig"
      },
      "content": {
        "text": "I'm gonna swing from the chandeliers"
      },
      "created_at": 1461113959088
    }
  ]

  //receieves individual tweets, fed to it by renderTweets function looping the tweet array, and generates a jQuery variable for each tweet so they can be appended to the tweet container in the index.html
  const createTweetElement = function (tweet) {
    // const dateMade = tweet.created_at;
    // const currentDate = new Date(0);
    // //currentDate.setUTCSeconds(dateMade);
    // const tweetDate = new Date(dateMade);

  let $tweet = `
  <article>
    <header class="tweet-header">
      <div class="person">
        <img src="${tweet.user.avatars}" />
        <span>${tweet.user.name}</span>
      </div>
      <span class="user-handle">${tweet.user.handle}</span>
    </header>

    <p>${tweet.content.text}</p>

    <footer class="tweet-footer">
      <span>${tweet.created_at}</span>
      <div class="logos">
        <a href=""><i class="fa-solid fa-flag"></i></a>
        <a href=""><i class="fa-solid fa-retweet"></i></a>
        <a href=""><i class="fa-solid fa-heart"></i></a>
      </div>
    </footer>
  </article>
  `
    console.log($tweet); // to see what it looks like
    return $tweet;
  }

  //loops through array of tweets, calls createTweetElement function on each, returns value as HTML via jQuery var $tweet and appends to tweets container on index
  const renderTweets = function (array) {

    for (tweets of array) {
    let formattedTweet = createTweetElement(tweets);
    $('#tweets-container').append(formattedTweet);
    }

  }

  // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  renderTweets(tweetDB);

});

