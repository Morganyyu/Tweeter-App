/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function () {

  function renderTweets(tweets) {
    tweets.forEach(tweet => {
      console.log('TIME:', moment(tweet.created_at).fromNow());
      console.log('tweet.created_at: ', moment(tweet.created_at).format('dddd, MMMM Do YYYY, h:mm:ss a'));
      const eachTweet = createTweetElement(tweet);
      $(".tweets-container").prepend(eachTweet);
    });
  }

  function createTweetElement(tweet) {
    let username = tweet.user.name;
    let profilepic = tweet.user.avatars.small;
    let theHandle = tweet.user.handle;
    let tweeterText = tweet.content.text;
    let posttime = moment(tweet.created_at).fromNow(); // Number

    let $tweet = $("<article>").addClass("tweet");

    let $header = $("<header>").addClass("user-info");
    ($tweet).append($header);

    let $profilePic = $("<img>").addClass("profile");
    $profilePic.attr("src", profilepic);
    $header.append($profilePic);

    let $userName = $("<h2>").addClass("user-name");
    $userName.append(username);
    $header.append($userName);

    let $handle = $("<p>").addClass("handle");
    $handle.append(theHandle);
    $header.append($handle);

    let $tweetedText = $("<p>").addClass("tweetedtext");
    $tweetedText.append(tweeterText);
    $tweet.append($tweetedText);

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

  $('#createTweet').on('submit', e => {
    e.preventDefault();
    if (validate($('#tweet-text').val())) {
      let data = $('#createTweet').serialize();
      $($('#tweet-text').val(''))
      $.post('/tweets', data).done(data => loadTweets(data));
    } else {
      alert('Your tweet is invalid...')
    }
  })

  loadTweets();
})

