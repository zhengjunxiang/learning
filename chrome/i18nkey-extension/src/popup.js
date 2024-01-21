// 通过ID找到按钮
const countNumDom = document.getElementById("countNum");
const unTranslateBox = document.getElementById("unTranslateBox");

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, {type: 'popupType'}, (ret) => {
    const length = ret.length;
    countNumDom.innerText = length;
    if (length) {
      unTranslateBox.innerHTML = ret.map(item => `<div>${item}</div>`).join('')
    }
  })
})