const chalk = require('chalk');
var {fetchTweets} = require('./getTweet');
const Bayes = require('./bayesFormula');
const Bus = require('./bus');
const bus =  new Bus();

var badfile = "./train.txt"
var bayes = new Bayes({
    bus : bus,
    cryptoIndex : 0.999999999
});

bayes.train(badfile)
fetchTweets(bus);

var tweets;
var isReady = false;

bus.on('tweetArray-read', function(data){
    console.log('initial tweets finished...');
    tweets = data;
    start();
});

bus.on('train-finished', function(){
    console.log('start predict...');
    start();
})

function start(){
    if(isReady){
        tweets.forEach(function(w){
            if(bayes.predict(w)){
                console.log(chalk.red('TRUE: '+w));
            }
            else{
                console.log(chalk.green('FALSE: ') +w);
            }
        })
    }
    else{
        isReady = true;
    }
    checkMemoryUsage();
}

function checkMemoryUsage(){
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
}