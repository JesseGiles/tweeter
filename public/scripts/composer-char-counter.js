//only executes this code once document fully loads
$(document).ready(function () {

  //event listener tracking input changes to tweet form
  // $('#tweet-text').bind('input propertychange', function() {
  $('#tweet-text').on('keydown', function () {

    //track sum of each input entered
    let typedChars = $(this).val().length;

    //set tweet character limit
    charsRemaining = 140 - typedChars;

    //create variable that references counter location
    const $theCounter = $(this).closest('form').find('.counter');

    //continually update counter value as text is added/removed from form
    $theCounter.text(charsRemaining);

    //change counter css class if char limit exceeded
    if (charsRemaining < 0) {
      $theCounter.addClass('overlimit');
    } else {
      $theCounter.removeClass('overlimit');
    }

    console.log(`typed chars: `, typedChars)
    console.log('remaining chars: ', charsRemaining);

  })

});