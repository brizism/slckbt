const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
  token: 'xoxb-375058847089-375380001508-c5ewrfzpAd2kZy6EpW6XNOMj',
  name: 'duckbot'
})


// Start Handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:'
  }

  bot.postMessageToChannel('general', 'Im birding baby @brizism', params);
})

// Error Handler
bot.on('error', (err) => console.log(err));

// Message Handler
bot.on('message', (data) => {
  if(data.type !== 'message'){
    return;
  }

  handleMessage(data.text);
})

// Responds to Data
function handleMessage(message){
  if(message.includes(' chucknorris')){
    chuckJoke();
  }
}

// Tell a Chuck Norris Joke
function chuckJoke(){
  axios.get('http://api.icndb.com/jokes/random/')
    .then(res => {
      const joke = res.data.value.joke;

      const params = {
        icon_emoji: ':laughing:'
      }
    
      bot.postMessageToChannel(
        'general',
        `Chuck Norris: ${joke}`, 
        params
      );
    })
}