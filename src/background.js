/*
 * The data dump will be in JSON format. Below is the shape of the data, and what each field represents.
 * {
 *   "account": unique identifier for the account the dump is performed on,
 *   "timestamp": the timestamp for the completed dump,
 *   "pulledFollowingCount": the following count retrievable based on restrictions & obfiscation,
 *   "pulledFollowersCount": the following count retrievable based on restrictions & obfiscation,
 *   "followers": list of follower account handles,
 *   "following": list of following account handles
 * }
*/

chrome.runtime.onMessage.addListener(
  async function(args, sender, sendResponse) {
    switch(args.type) {
      case 'output':
        processOutput(args.output);
        break;
      case 'scrape':
        processScrape(args.scrape);
        break;
      default:
        break;
    }
});

function processScrape(scrape) {
  // Re-route the scrape to the content script
  getCurrentTab().then(({id}) => {
    chrome.tabs.sendMessage(id, {type: 'scrape', scrape});
  })
}

async function processOutput(output) {
  const blob = new Blob([output], {type: "application/json"});
    const url = await getBlobUrl(blob);
    const outputObj = JSON.parse(output);

    // Refresh the page to make re-running less weird
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.reload(tabs[0].id);
    });
  
    // Download that ish
    chrome.downloads.download({
      url,
      filename: `${outputObj.account}_${outputObj.timestamp}.json`,
      saveAs: true
    });
}

// Workaround to write to the file because service worker limits
async function getBlobUrl(blob) {
  const url = chrome.runtime.getURL('offscreen.html');
  try {
    await chrome.offscreen.createDocument({
      url,
      reasons: ['BLOBS'],
      justification: 'MV3 requirement',
    });
  } catch (err) {
    if (!err.message.startsWith('Only a single offscreen')) throw err;
  }
  const client = (await clients.matchAll({includeUncontrolled: true})).find(c => c.url === url);
  const messageChannel = new MessageChannel();
  client.postMessage(blob, [messageChannel.port2]);
  const res = await new Promise(cb => (messageChannel.port1.onmessage = cb));
  return res.data;
}

async function getCurrentTab() {
  let queryOptions = { active: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};