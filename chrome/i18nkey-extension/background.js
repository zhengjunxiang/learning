const updateHandler = function (tabId, changeInfo) {
  if (changeInfo.status === 'complete') {
    // 页面加载完成时发送消息插入样式
    chrome.tabs.sendMessage(tabId, { action: 'insertStyles' });
  }
};

chrome.tabs.onUpdated.addListener(updateHandler);


const color = "#3aa757";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log(`[Coloring] default background color is set to: ${color}`);
});