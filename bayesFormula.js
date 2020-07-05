/*
 * @Description: 
 * @Author: Retric
 * @Github: https://github.com/RetricSu
 * @LastEditors: Retric
 * @Date: 2019-04-01 23:23:46
 * @LastEditTime: 2019-04-06 12:54:05
 */



var bayes = function(options){
    this.options = options || {}
    this.sms_count = [0, 0]; //[spam.ham]
    this.sms_value = {};
    this.bus = options.bus || null;
    this.cryptoIndex = options.cryptoIndex;
    this.stopword = require('stopword');
    this.splitToWords = require('split-to-words');
}

/*
 * Public API
 */

/**
 * @description: train
 * @param {String} filepath 
 * @return: 
 */
bayes.prototype.train = function(filepath){
    var that = this;
    //var rl = readline(filepath); // provide correct file path
    var fs = require('fs');
    var readline = require('readline');
    var stream = require('stream');

    var instream = fs.createReadStream(filepath);
    var outstream = new stream;
    var count = 0;
    var rl = readline.createInterface(instream, outstream);
        
        rl.on('line', function (line) {
            count = count + 1;
            var arr = line.split("\t");
            if(arr.length < 2){//wrong data..just skip...
                console.log(count)
            }
            else{
                var sms_type;
                if(arr[0] == "spam"){
                    sms_type = true;
                }
                else{
                    sms_type = false;
                }
                var text_sms = arr[1]
                //console.log(sms_type)
                that.input_raw(text_sms, sms_type);   
            }
        })
        .on('close', function() {
            console.log('file close') 
            
            const fs = require('fs');
            const stream = fs.createWriteStream("trained.txt");
            stream.write( JSON.stringify(that.sms_count) + '\n');
            stream.write( JSON.stringify(that.sms_value) );
            
            that.bus.emit('train-finished');
        })
        .on('error', function (e) {
            // something went wrong
            console.log("error", e);
        });
}

bayes.prototype.predict = function(tweet){
    var that = this;
    function is_zero(value){
        if(value > 0){
            return value;
        }
        else{
            return 0.00000001;
        }
    }
    var wordlist = that.cutTweet(tweet);
    var sms_prob_ham = sms_prob_spam = 1;
    wordlist.forEach(function(word){
        word_prob_spam = word_prob_ham = 0;
        if(word in that.sms_value){
            var value = that.sms_value[word]
            word_prob_spam = parseFloat(value[0]) / that.sms_count[0]  // 这个词为spam的概率
            word_prob_ham = parseFloat(value[1]) / that.sms_count[1]  // 这个词为healthy的概率
        }
        word_prob_spam = is_zero(word_prob_spam);
        word_prob_ham = is_zero(word_prob_ham);
        //计算
        prob_is_spam = word_prob_spam / (word_prob_spam + word_prob_ham)  // 其中word_prob_ham为补集
        sms_prob_spam *= prob_is_spam
        sms_prob_ham *=  (1 - prob_is_spam)
        //console.log(word,word_prob_spam);
    });
    return sms_prob_spam / (sms_prob_spam + sms_prob_ham) > that.cryptoIndex
}

bayes.prototype.input_raw = function(tweet, is_spam){
    var that = this;
    var wordlist = that.cutTweet(tweet);
    var offset;
    wordlist.forEach(function(word){
        if(is_spam){
            offset = 0;
        }
        else{
            offset = 1;
        }
        if(!(word in that.sms_value)){
            that.sms_value[word] = [1 - offset, offset]
        }else{
            that.sms_value[word][offset] += 1; 
        }
        that.sms_count[offset] += 1;
    });
}

bayes.prototype.filter = function(){

}

bayes.prototype.united = function(){

}

bayes.prototype.cutTweet = function(tweet){
    var that = this;
    var wordlist = tweet.toLowerCase().split(' ');
    //wordlist = that.splitToWords(wordlist);
    wordlist = that.stopword.removeStopwords(wordlist);
    //console.log(wordlist.length)
    return wordlist
}

module.exports = bayes;