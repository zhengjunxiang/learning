// 通过ID找到按钮
const button = document.getElementById("changeColor");

// 从storage取背景色并设到按钮上
chrome.storage.sync.get("color", ({ color }) => {
  button.style.backgroundColor = color;
});

// 注册按钮点击回调函数
button.addEventListener("click", async () => {
  // 调用Chrome接口取出当前标签页
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  // 以当前标签页为上下文，执行setPageBackgroundColor函数
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: setPageBackgroundColor,
  });
});

// 函数将在指定标签页内执行，因此可以取得当前网页document
function setPageBackgroundColor() {
  // 从storage取出背景色，并设到当前网页上
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  var activeTab = tabs[0];

  // 使用 chrome.scripting.executeScript 执行 contentScript.js 中的代码
  chrome.scripting.executeScript({
    target: { tabId: activeTab.id },
    function: function() {
      // 这里可以在 contentScript.js 执行的上下文中执行代码
      console.log('Popup - Content Script is running in the context of the page.');
    }
  });
});