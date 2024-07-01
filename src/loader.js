/*
 * For fun
*/

const ASCII = [
  '♬ ᕕ(●_●)ᕗ ♪',
  '♩ ～(●_●)～ ♬',
  '♪ ᕕ(●_●)ง ♪',
  '♪ ~(●_●)ว ♪',
  '♪ ┏(●_●)┛ ♪',
]

const interval = setInterval(() => {
    const ascii = document.getElementById('ascii');
    ascii.innerText = ASCII[Math.floor(Math.random() * ASCII.length)];
}, 200);

// Refresh the page on completing the scrape. Helps avoid an error that occurs when running the script twice in a row without a page reload.
chrome.runtime.onMessage.addListener(
    async function(args, sender, sendResponse) {
      if (args.type != 'output') window.close();
    }
);