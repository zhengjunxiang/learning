// 什么是 ajax？
var xhr = new XMLHttpRequest();
xhr.open("GET", "/bar/foo.txt", true);  // 请求方法，地址，是否异步
xhr.onload = function (e) {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.error(xhr.statusText);
    }
  }
};
xhr.onerror = function (e) {
  console.error(xhr.statusText);
};
xhr.send(null);
