// File: contentScript.js

// 使用 chrome.scripting.executeScript 在页面上下文中执行代码
chrome.scripting.executeScript({
  function: function() {
    // 在页面的上下文中访问 _I18NTEMPTRANSLATIONS
    console.log('Content Script - _I18NTEMPTRANSLATIONS:', window._I18NTEMPTRANSLATIONS);
  }
});
