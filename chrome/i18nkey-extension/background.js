const updateHandler = function (tabId, changeInfo) {
  if (changeInfo.status === 'complete') {
    // 页面加载完成时发送消息插入样式
    chrome.tabs.sendMessage(tabId, { action: 'insertStyles' });
  }
};

chrome.tabs.onUpdated.addListener(updateHandler);
