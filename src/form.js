/*
 * Handles your preferences like query delay
 */

async function getCurrentTab() {
  let queryOptions = { active: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

let currentId;

chrome.storage.sync.get(["showFollowers", "showFollowings", "delay"], (items) => {
  const {showFollowers, showFollowings, delay} = items
  if (!showFollowers) document.getElementById('followers').click();
  if (!showFollowings) document.getElementById('followings').click();
  if (delay) document.getElementById('delay').value = delay;
});

document.getElementById('followers').addEventListener('change', (event) => {
  chrome.storage.sync.set({ "showFollowers": event.target.checked });
})
document.getElementById('followings').addEventListener('change', (event) => {
  chrome.storage.sync.set({ "showFollowings": event.target.checked });
})
document.getElementById('delay').addEventListener('change', (event) => {
  chrome.storage.sync.set({ "delay": event.target.value });
})
document.getElementById('ig_id').addEventListener('change', (event) => {
  currentId = event.target.value;
})

document.getElementById('form-submit').addEventListener('click', function () {
  getCurrentTab().then((tab) => {
    chrome.storage.sync.get(["showFollowers", "showFollowings", "delay"], (items) => {
      const {showFollowers, showFollowings, delay} = items
      const scrape = {
          showFollowers,
          showFollowings,
          delay,
          currentId,
      };
      chrome.runtime.sendMessage({action: 'scrape', scrape});
  });
  }
);});

