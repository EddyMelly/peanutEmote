import { EMOTES } from './SharedConstants.js';

export default class TwitchApi {
  constructor(channel) {
    this.channel = channel;
    this.statusElement = document.getElementById('status');
    this.twitchCall = new TwitchJs({
      log: {
        enabled: false,
      },
    });
  }

  disconnectTwitchChat() {
    const { chat } = this.twitchCall;
    chat.disconnect();
    this.statusElement.innerHTML = 'disconnected';
    this.statusElement.style.color = 'red';
  }

  connectTwitchChat() {
    const { chat } = this.twitchCall;
    chat
      .connect()
      .then(() => {
        chat
          .join(this.channel)
          .then(() => {
            console.log('connected boy');
            this.statusElement.innerHTML = 'connected';
            this.statusElement.style.color = 'green';
          })
          .catch(function (err) {
            console.log(err);
            this.statusElement.innerHTML = 'Edgar Fucked Up';
            this.statusElement.style.color = 'red';
          });
      })
      .catch(function (err) {
        console.log(err);
        this.statusElement.innerHTML = 'Error: Cant connect right now';
        this.statusElement.style.color = 'red';
      });

    chat.on('*', (message) => {
      var clean_message = DOMPurify.sanitize(message.message, {
        ALLOWED_TAGS: ['b'],
      });

      let result = clean_message.match(/(\bnopean\S+\b)/gi);

      if (result && result.length > 0) {
        let lastResult = result.pop();
        let foundEmote = EMOTES[lastResult];

        if (foundEmote) {
          document.getElementById('emoteImg').src = foundEmote.src;
        }
      }
    });
  }
}
