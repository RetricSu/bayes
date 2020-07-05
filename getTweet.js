var request = require("request");
var url = 'https://tweetproxy.herokuapp.com/home'

function fetchTweets(bus){
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var testArray = []
            var tweets = body//JSON.parse(body);
            tweets.forEach(tweet => {
                testArray.push(processTweet(tweet));
                //check if push finished...
                if(testArray.length == tweets.length){
                    bus.emit('tweetArray-read', testArray);
                }
            });
        }
    });
}

function processTweet(tweet){
    if(tweet.lang == 'en'){
        if(tweet.is_quote_status){// retweet tweet
            if(tweet.quoted_status){
                return tweet.text + '\n RT: ' + tweet.quoted_status.text
            }
            else{
                return tweet.text + '\n RT: ' //+ tweet.quoted_status.text
            }
        }
        else{//origin tweet
            return tweet.text
        }
    }
    else{
        return tweet.text
    }
}

module.exports =  {fetchTweets}