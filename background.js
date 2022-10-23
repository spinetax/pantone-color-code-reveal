// Regex-pattern to check URLs against.
// It matches URLs like: http[s]://[...]pantone.com[...]
let urlRegex = /^https?:\/\/(?:[^./?#]+\.)?pantone\.com/;

// A function to use as callback
function getColor(backgroundColor) {
  console.log("RGB: " + backgroundColor);
}

// When the browser-action button is clicked...
chrome.action.onClicked.addListener(function (tab) {
  // ...check the URL of the active tab against our pattern and...
  if (urlRegex.test(tab.url)) {
    // ...if it matches, send a message specifying a callback too
    chrome.tabs.sendMessage(tab.id, { text: "report_back" }, getColor);
  }
});
