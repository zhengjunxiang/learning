/* 代理模式（Proxy Pattern）是一种结构型设计模式，它允许在访问对象时提供一个占位符或代理，以控制对对象的访问。以下是代理模式的代码示例： */
class Subject {
  request() {
    console.log('Subject：处理请求');
  }
}

// 真实主题类
class RealSubject extends Subject {
  request() {
    console.log('RealSubject：处理请求');
  }
}

// 代理类
class Proxy extends Subject {
  constructor(realSubject) {
    super();
    this.realSubject = realSubject;
  }

  request() {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  checkAccess() {
    console.log('Proxy：检查访问权限');
    return true;
  }

  logAccess() {
    console.log('Proxy：记录访问日志');
  }
}

// 使用代理访问真实对象
const realSubject = new RealSubject();
const proxy = new Proxy(realSubject);

proxy.request();

// 在上述代码中，我们有一个主题接口 Subject 和一个真实主题类 RealSubject。我们创建了一个代理类 Proxy，它封装了一个真实主题，并在对其进行访问时提供了额外的功能，例如检查访问权限和记录访问日志。我们通过实例化 RealSubject 类并封装它在 Proxy 类中，最终通过代理访问真实的主题对象。

