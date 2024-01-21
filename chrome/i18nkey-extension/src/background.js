chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type=='badge' && message.data.length) {
    chrome.action.setBadgeBackgroundColor({ color:'#f89517' })
    chrome.action.setBadgeText({
      text: String(message.data.length),
    })
  }
});