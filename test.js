const Bayes = require('./bayesFormula')
const Bus = require('./bus');
const bus =  new Bus();

var test_sms = ['Rofl. Its true to its name',
                "i just had the worst dream ever and im super freaked out because its liked burned into my brain  how come we only remember the bad ones",
                "I smashed my finger", 
                "@misterwallace Monkeyboy (pic)! Planning any good promo deals for the Yes Man DVD?  I am looking to pur-chase, but always gift miss deals",
                "Laughing my ass off at the Miss USA controversy. Raining and no one to play with ",
                "Another day of school",
                'Bitcoin will be the Sapiens story of the 21st century Its understood by millions across languages & cultures The shared belief in the ability to: - Securely store wealth through time- Transfer wealth w/o 3rd party Everyone needs it, most people just havent realized it yet',
                'Enterprise blockchain is mostly a cargo cult for people who cant accept the reality of bitcoin as digital hard money',
                "The single biggest influence I’ve had...@saifedean’s “The Bitcoin Standard”, read it once, read it again and again. If you’re still a shitcoiner, you need to check yourself into a mental institution.",
                'Free Msg: Ringtone!From: http://tms. widelive.com/index. wml?id=1b6a5ecef91ff9*37819&first=true18:0430-JUL-05',
                '龚细军', 
                'speak haha', 
                'helo,there is a ads']

var test2 = [
    "O(1) labs is using recursive SNARKs to build a constant size/ constant time to download and check blockchain. One of the coolest projects out there! They raised some money to do this but more importantly you can now build on Coda and help contribute in many new ways:",//crypto
    "Kinda disappointed @Deconomy_forum  is again giving airtime to BSV shills, this time a panel of them. At least there's some hilarious quotes... my favorite was that Segwit is bad because separating signatures from transactions 'has legal ramifications'",//crypto
    "*deep sigh* Women in crypto: If you've been sexually harassed/assaulted at a blockchain event/at work & want to share the story (anonymously works too), my DMs are open. (I honestly don't know if I'll be able to write about it. But I've heard too much to do nothing. Let's talk.)",//crypto
    "$USD might get out of the death spiral in the fiat history, here is how, hypothetically",//crypto
    "WeChat Pay is a fast, cheap, and reliable payment system that puts clunky cards and bank transfers to shame. But a great and ubiquitous payment experience doesn't make Chinese CNY much more desirable for me to hold. The demand for money to hold vs money to spend is very different",//crypto
    "The only thing standing between me and the White House is popularity.",//noraml tweet
    "When Paul and I founded @Microsoft together, we were confident that computers would change the world. But we never could have imagined how much fun we would have along the way.",//normal tweet
    "DeMarcus Cousins has back-to-back 20-point/10-rebound games, giving him four such games this season.",//normal tweet
    "Was a pleasure meeting Peter, genuinely enjoyed our conversation. Fun to shoot the shit with the people behind the nodes. Always appreciative of the friendships Bitcoin brings my way. We talked my intro to Bitcoin, Lightning, UX, Zap and more. Give it a listen",//crypto
    "With 16,269 career points (so far), @StephenCurry30 moves up to No. 3 on the Warriors all-time scoring list 👏",//noraml tweet
    "Just getting through this comprehensive book and am engrossed. IBM is easily one of the most important companies in history. It has reinvented itself every generation and seen incredible near death experiences. Author is 38 year IBMer.",//noraml tweet
    "Warning ⚠️ Non crypto post ⚠️ The new “will you spot me bro” at the gym is Hey bro - “will you record my set for the gram?” Please don’t ask me to do this if you see me at the gym.  Thanks.",//noraml tweet
    "Going to be in Sydney next week for Edcon?Interested in 0x or building on 0x? imToken and Bamboo Relay will be hosting a 0x meetup! https://sydneyblockchainweek.io/event/0x-relayer-get-together/ … #0x @imTokenOfficial @0xProject @Linktimetech",//crypto
    "Alright folks, we're live. For LND node owners only, prove you own your node and grab a limited print of RUN LND shirts!",//crypto
    "that's how you end a half y'all 💦",//normal
    "The people have to force the government to change the law. If the government won't, strike. If they break the strike with police, start a revolution.",//normal tweet
    "You should be more willing to believe strategies are good if they can be explained briefly."//normal tweet
]

var badfile = "./train.txt"
var bayes = new Bayes({
    bus : bus,
    cryptoIndex : 0.999999999
});
bayes.train(badfile)

bus.on('train-finished',function(){
    var count = 25;
    test2.forEach(function(w){
        /*
        var pct = bayes.predict(w);
        if(pct > 0.999999999){
            console.log(count + ': '+pct+' => crypto! ');
        }
        else{
            console.log(count + ': '+pct+' => normal tweet! ');
        } 
        count = count + 1;
        */
        if(bayes.predict(w)){
            console.log('this tweet is about crypto!');
        }
        else{
            console.log('this tweet is NOT about crypto');
        }
    })
})

/*
setTimeout(function(){
    var count = 3;
    test_sms.forEach(function(w){
        var pct = bayes.predict(w); 
        console.log(count + '>>>>' + pct);
        count = count + 1;
    })
},3000)
*/