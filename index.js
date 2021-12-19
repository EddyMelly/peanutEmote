import TwitchApi from './TwitchApi.js';

let twitchApi;

window.onload = function () {
  startFirst();
};

function startFirst() {
  twitchApi = new TwitchApi('nopeanutsplease0');
  twitchApi.connectTwitchChat();
}
