/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  // CODE FOR RETRIEVING STORED TWEET DATA /////////////////

  //function using jQuery to make an AJAX GET request to /tweets and retrieve the stored array of tweets as JSON, then call renderTweets function on it
  const loadTweets = function () {
    $.get('/tweets', (tweets) => {
      console.log(tweets);
      renderTweets(tweets);
    });
  }

  loadTweets(); //calling function to load all tweets on page load

  // CODE FOR CREATING & RENDERING TWEETS //////////////////

  //receieves individual tweets, fed to it by renderTweets function looping the tweet array, and generates a jQuery variable for each tweet so they can be appended to the tweet container in the index.html
  const createTweetElement = function (tweet) {
    // const dateMade = tweet.created_at;
    // const currentDate = new Date(0);
    // //currentDate.setUTCSeconds(dateMade);
    // const tweetDate = new Date(dateMade);

    let header = `
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
      <span>${timeago.format(tweet.created_at)}</span>
      <div class="logos">
        <a href=""><i class="fa-solid fa-flag"></i></a>
        <a href=""><i class="fa-solid fa-retweet"></i></a>
        <a href=""><i class="fa-solid fa-heart"></i></a>
      </div>
    </footer>
  </article>
  `
    return header;
  }

  //loops through array of tweets, calls createTweetElement function on each, returns value as HTML via jQuery var $tweet and appends to tweets container on index
  const renderTweets = function (array) {
    $('#tweets-container').empty(); //empty container before populating so it doesnt keep adding the full tweet array to prev results in container

    for (tweet of array) {
      const $tweet = createTweetElement(tweet);
      //prepend adds newest tweets on top of container, append would be opposite
      $('#tweets-container').prepend($tweet);
    }

  }

  // CODE FOR THE NEW TWEET FORM /////////////////////////

  //grab the new tweet form from the DOM
  const $form = $('#new-tweet-form');

  //when form submitted with a new tweet
  $form.on('submit', (event) => {
    //prevent default form action (refresh page/POST)
    event.preventDefault();

    //validate data in the form before url-endcoding or posting
    const tweetContent = $('#tweet-text').val().trim();
    if (!tweetContent) {
      alert("Please enter in a message before Tweet™ing!")
    } else if (tweetContent.length > 140) {
      alert("This Tweet™ is over the 140 char limit, please shorten your tweet!")
    } else if (tweetContent && tweetContent.length < 140) {

      //get the data entered in the form as url-encoded (server requirement)
      const data = $form.serialize();

      //use serialized data to make POST req to /tweets to update database
      $.post('/tweets', data, (response) => {
        loadTweets(); //once tweet DB is updated, reload it in container
        
      })
    }
  });

});

