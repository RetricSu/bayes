const dataFolder = './Tweets/';
const fs = require('fs');
var csv = require('csvtojson');
var stream = fs.createWriteStream("cryptoMan.txt");
var stream2 = fs.createWriteStream("normaltweet.txt");

function toPeople(){
    fs.readdir(dataFolder, (err, files) => {
        files.forEach(file => {
          //console.log(file);
          readCSV(file)
        });
      });
}

function ham(){
    var csvfile = './training.1600000.processed.noemoticon.csv';
    csv()
    .fromFile(csvfile)
    .then((jsonArray)=>{
        jsonArray.forEach(function(row){
            var tweet = row['text'].replace(/\n/g, " ");
            //console.log('spam\t'+tweet);
            var content = 'ham\t' + tweet + '\n';
            stream2.write(content);
        })
    })
}

function readCSV(filename){
    var csvFilePath = dataFolder + filename;
    //console.log(csvFilePath);
    csv()
    .fromFile(csvFilePath)
    .then((jsonArray)=>{
        jsonArray.forEach(function(row){
            var tweet = row['text'].replace(/\n/g, " ");
            //console.log('spam\t'+tweet);
            var content = 'spam\t' + tweet + '\n';
            stream.write(content);
        })
    })
}

ham();