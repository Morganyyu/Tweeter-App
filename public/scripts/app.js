/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function () {

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function renderTweets(tweets) {
    tweets.forEach(tweet => {
      const eachTweet = createTweetElement(tweet);
      $(".tweets-container").prepend(eachTweet);
    });
  }

  function createTweetElement(tweet) {
    let username = escape(tweet.user.name);
    let profilepic = tweet.user.avatars.small;
    let theHandle = tweet.user.handle;
    let tweeterText = escape(tweet.content.text);
    let posttime = moment(tweet.created_at).fromNow();

    let $tweet = $("<article>").addClass("tweet");

    let $header = $("<header>").addClass("user-info");
    $tweet.append($header);

    let $profilePic = $("<img>").addClass("profile");
    $profilePic.attr("src", profilepic);
    $header.append($profilePic);

    let $userName = $("<h2>").addClass("user-name");
    $userName.append(username);
    $header.append($userName);

    let $handle = $("<p>").addClass("handle");
    $handle.append(theHandle);
    $header.append($handle);

    let $textBox = $("<div>");
    $tweet.append($textBox);

    let $tweetedText = $("<p>").addClass("tweetedtext");
    $tweetedText.append(tweeterText);
    $textBox.append($tweetedText);
    // $tweet.append($tweetedText);

    let $footer = $("<footer>").addClass("tweet-footer");
    $tweet.append($footer);

    let $postWhen = $("<p>").addClass("postTime");
    $postWhen.append(posttime);
    $footer.append($postWhen);

    let $flagIcon = $("<i>").addClass("fas fa-flag");
    let $retweetIcon = $("<i>").addClass("fas fa-retweet");
    let $heartIcon = $("<i>").addClass("fas fa-heart");

    let $icons = $("<span>").addClass("icons");
    $icons.append($flagIcon, $retweetIcon, $heartIcon);
    $footer.append($icons);

    return $tweet;
  }

  function validate(text) {
    return (text === '' || text === null || text === undefined || text.length > 140 || text.length === 0) ? false : true;
  }

  function loadTweets() {
    $.get('/tweets').then(data => renderTweets(data));
  }

  $(".compose").on("click", () => {
    $(".new-tweet").slideToggle();
    $(".new-tweet textarea").focus();
  })

  $('#createTweet').on('submit', e => {
    e.preventDefault();
    if (validate(escape($('#tweet-text').val()))) {
      let data = $('#createTweet').serialize();
      $($('#tweet-text').val(''))
      $.post('/tweets', data).done(data => loadTweets(data));
    } else {
      alert('Your tweet is invalid...')
    }
  })

  loadTweets();
})

