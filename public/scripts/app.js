/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




$(function () {

  const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

  function renderTweets(tweets) {
    for (tweet of tweets) {
      console.log(tweet);
      let eachTweet = createTweetElement(tweet);
      $(".tweets-container").append(eachTweet);
    }
  }


  function createTweetElement(tweet) {
    let username = tweet.user.name;
    let profilepic = tweet.user.avatars.small;
    let theHandle = tweet.user.handle;
    let tweeterText = tweet.content.text;
    let postDate = "10 Days Ago"

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
    $postWhen.append(postDate);
    $footer.append($postWhen);

    let $flagIcon = $("<i>").addClass("fas fa-flag");
    let $retweetIcon = $("<i>").addClass("fas fa-retweet");
    let $heartIcon = $("<i>").addClass("fas fa-heart");

    let $icons = $("<span>").addClass("icons");
    $icons.append($flagIcon, $retweetIcon, $heartIcon);
    $footer.append($icons);
    // $("icons").append($flagIcon).append($retweetIcon).append($heartIcon);


    return $tweet;

  }
  renderTweets(data);
})





// Test / driver code (temporary)
