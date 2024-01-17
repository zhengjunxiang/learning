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
/* 匹配包含data-i18nkey属性的元素 */
[data-i18nkey] {
  position: relative;
  display: inline-block;
}
[data-i18nkey]::after {
  content: ""; /* 必须设置，否则::after不会生效 */
  width: 5px; /* 设置小点的宽度 */
  height: 5px; /* 设置小点的高度 */
  background-color: red; /* 设置小点的颜色为红色 */
  position: absolute; /* 设置定位方式为绝对定位 */
  top: 50%; /* 设置小点在元素的左上角 */
  margin-top: -3px;
  left: 5px; /* 设置小点在元素的左上角 */
  border-radius: 50%; /* 设置小点为圆形 */
}
`

let i18nkeyName = ''
// 创建style节点
const styleElement = document.createElement('style')
styleElement.type = 'text/css'
styleElement.appendChild(document.createTextNode(style))

// 创建tooltip节点
const tooltipElement = document.createElement('div')
tooltipElement.className = '_i18nKeyTooltipBox'
tooltipElement.innerHTML =
  `
  <svg id="copyIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    style="width: 12px; height: 12px;"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
  <span><span>
  `

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'insertStyles') {
    document.head.appendChild(styleElement);
    document.body.appendChild(tooltipElement);

    document.body.addEventListener('mouseover', (e) => {
      const i18nkey = e.target.getAttribute('data-i18nkey')
      if (!i18nkey) return;
      i18nkeyName = i18nkey
      // 获取children下的i18nkey
      if (tooltipElement.children[1]) {
        tooltipElement.children[1].textContent = i18nkey
        tooltipElement.children[1].onclick = () => {
          window.open(`https://i18n.mykeeta.sankuai.com/#/5/task/detail?taskId=16&key=${i18nkey}`);
        }
      }
      tooltipElement.setAttribute('style', `display: block; top: ${e.clientY + 5}px; left: ${e.clientX + 10}px`)

      // 获取copy图标元素
      const copyIcon = document.getElementById('copyIcon');
      // 给copy图标添加点击事件
      copyIcon.onclick = function() {
        if (!i18nkeyName) return
        // 创建一个textarea元素，用于存放需要复制的内容
        const textarea = document.createElement('textarea');
        // 设置需要复制的内容
        textarea.value = i18nkeyName;
        // 将textarea添加到body中，使其可以被选中
        document.body.appendChild(textarea);
        // 选中textarea中的内容
        textarea.select();
        // 执行复制命令
        document.execCommand('copy');
        // 将textarea从body中移除
        document.body.removeChild(textarea);
      };
    });
  }
})
