// 通过ID找到按钮
const countNumDom = document.getElementById("countNum");

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, {type: 'popupType'}, (ret) => {
    console.log('调用一次')
    countNumDom.innerText = ret.length;
  })
})