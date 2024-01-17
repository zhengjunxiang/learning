// content.js
const style = `
._i18nKeyTooltipBox {
  display: none;
  border-radius: 4px;
  border: 1px solid #eee;
  background-color: #fff;
  padding: 6px;
  color: orange;
  font-size: 12px;
  z-index: 9999;
  cursor: pointer;
  position: fixed;
}
`
// 创建style节点
const styleElement = document.createElement('style')
styleElement.type = 'text/css'
styleElement.appendChild(document.createTextNode(style))

// 创建tooltip节点
const tooltipElement = document.createElement('div')
tooltipElement.className = '_i18nKeyTooltipBox'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'insertStyles') {
    document.head.appendChild(styleElement);
    document.body.appendChild(tooltipElement);

    document.body.addEventListener('mouseover', (e) => {
      const i18nkey = e.target.getAttribute('data-i18nkey')
      if (!i18nkey) return;
      // 获取children下的i18nkey
      tooltipElement.textContent = i18nkey
      tooltipElement.setAttribute('style', `display: block; top: ${e.clientY + 5}px; left: ${e.clientX + 10}px`)
      tooltipElement.onclick = () => {
        window.open(`https://i18n.mykeeta.sankuai.com/#/5/task/detail?taskId=16&key=${i18nkey}`);
      }
    });
  }
})
