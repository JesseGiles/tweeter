/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //added stretch functionality, animated arrow in nav bar can be used to slide the new-tweet area in and out of view and auto-focus to the form
  const $navArrowButton = $(".nav-arrow-button");

  $navArrowButton.click(function() {
    $(".new-tweet").slideToggle("slow");
    $("textarea").focus();
  });
  

  // CODE FOR RETRIEVING STORED TWEET DATA /////////////////

  //function using jQuery to make an AJAX GET request to /tweets and retrieve the stored array of tweets as JSON, then call renderTweets function on it
  const loadTweets = function() {
    $.get('/tweets', (tweets) => {
      console.log(tweets);
      renderTweets(tweets);
    });
  };

  loadTweets(); //calling function to load all tweets on page load

  // CODE FOR CREATING & RENDERING TWEETS //////////////////

  //receieves individual tweets, fed to it by renderTweets function looping the tweet array, and generates a jQuery variable for each tweet so they can be appended to the tweet container in the index.html
  const createTweetElement = function(tweet) {
   
    //escape function for incoming use- provided text on tweet form to ensure it cannot be used maliciously
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    //wrapping return of tweet form passed in escape function, wrapped in <p> tag and stored in a var so it could be used in header for building individual tweets below
    const safeHTML = `<p>${escape(tweet.content.text)}</p>`;

    let header = `
  <article>
    <header class="tweet-header">
      <div class="person">
        <img src="${tweet.user.avatars}" />
        <span>${tweet.user.name}</span>
      </div>
      <span class="user-handle">${tweet.user.handle}</span>
    </header>

    ${safeHTML}

    <footer class="tweet-footer">
      <span>${timeago.format(tweet.created_at)}</span>
      <div class="logos">
        <a href=""><i class="fa-solid fa-flag"></i></a>
        <a href=""><i class="fa-solid fa-retweet"></i></a>
        <a href=""><i class="fa-solid fa-heart"></i></a>
      </div>
    </footer>
  </article>
  `;
    return header;
  };

  //loops through array of tweets, calls createTweetElement function on each, returns value as HTML via jQuery var $tweet and appends to tweets container on index
  const renderTweets = function(array) {
    $('#tweets-container').empty(); //empty container before populating so it doesnt keep adding the full tweet array to prev results in container

    for (const tweet of array) {
      const $tweet = createTweetElement(tweet);
      //prepend adds newest tweets on top of container, append would be opposite
      $('#tweets-container').prepend($tweet);
    }

  };

  // CODE FOR THE NEW TWEET FORM /////////////////////////

  //grab the new tweet form from the DOM
  const $form = $('#new-tweet-form');

  //when form submitted with a new tweet
  $form.on('submit', (event) => {

    //slide any prev error message out of view when resubmitted
    $(".error").slideUp();

    //prevent default form action (refresh page/POST)
    event.preventDefault();

    //validate data in the form before url-endcoding or posting
    const tweetContent = $('#tweet-text').val().trim();
    if (!tweetContent) {
      $(".error").slideUp();
      window.setTimeout(
        function() {
          $(".error-message").text("Please enter in a message before Tweet™ing!");
          $(".error").slideDown();
        },
        250
      );
      
      
    } else if (tweetContent.length > 140) {
      $(".error").slideUp();
      window.setTimeout(
        function() {
          $(".error-message").text("This Tweet™ is over the 140 char limit, please shorten your tweet!");
          $(".error").slideDown();
        },
        250
      );
      
    } else if (tweetContent && tweetContent.length < 140) {

      //get the data entered in the form as url-encoded (server requirement)
      const data = $form.serialize();

      //use serialized data to make POST req to /tweets to update database
      $.post('/tweets', data, () => {
        loadTweets(); //once tweet DB is updated, reload it in container
        $("textarea").val("");
        $("#counter").val("140");
      });
    }
  });

});

