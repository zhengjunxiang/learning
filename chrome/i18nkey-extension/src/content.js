// tooltipBox 样式
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

  // copy i18nkey
const copy = function(value) {
  if (!value) return
  // 创建一个textarea元素，用于存放需要复制的内容
  const textarea = document.createElement('textarea');
  // 设置需要复制的内容
  textarea.value = value;
  // 将textarea添加到body中，使其可以被选中
  document.body.appendChild(textarea);
  // 选中textarea中的内容
  textarea.select();
  // 执行复制命令
  document.execCommand('copy');
  // 将textarea从body中移除
  document.body.removeChild(textarea);
};

window.addEventListener('load', async () => {
  document.head.appendChild(styleElement);
  document.body.appendChild(tooltipElement);
  const _I18NTEMPTRANSLATIONS = document.querySelector('#_I18NTEMPTRANSLATIONS').textContent;

  // 获取有多少个未翻译文案
  if (_I18NTEMPTRANSLATIONS) {
    const arrStr = _I18NTEMPTRANSLATIONS.split('=')[1]
    const unTranslateArray = JSON.parse(arrStr);

    // 接收来自popup的消息
    chrome.runtime.onMessage.addListener((event, sender, callable) => {
        if (event.type === 'popupType') {
          callable(unTranslateArray)
        }
    })

    // 给 background 发送消息，用于设置 badge
    await chrome.runtime.sendMessage({ type:'badge', data: unTranslateArray });
  }

  document.body.addEventListener('mouseover', (e) => {
    const i18nkey = e.target.getAttribute('data-i18nkey')
    if (!i18nkey) return;
    // 获取children下的i18nkey
    if (tooltipElement.children[1]) {
      tooltipElement.children[1].textContent = i18nkey
      tooltipElement.children[1].onclick = () => {
        window.open(`https://i18n.mykeeta.sankuai.com/#/5/task/detail?taskId=16&key=${i18nkey}`);
      }
    }

    // 展示当前hover的i18nkey
    tooltipElement.setAttribute('style', `display: block; top: ${e.clientY + 5}px; left: ${e.clientX + 10}px`)

    // 获取copy图标元素
    const copyIcon = document.getElementById('copyIcon');
    // 给copy图标添加点击事件
    copyIcon.onclick = () => copy(i18nkey)
  });
})
