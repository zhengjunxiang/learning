chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type=='badge') {
    chrome.action.setBadgeBackgroundColor({color:'#f00'})
    chrome.action.setBadgeText({
      text: message.data.length+''
    })
  }
});