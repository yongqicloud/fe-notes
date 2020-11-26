### service worker注册

Service 的注册非常简单

```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then((reg) => {
    console.log(reg.scope)
  })
}
```

说到注册，就不得不说一下service worker的作用域。

#### 作用域

service worker是有自己的作用域的，且它的作用域是一个URL path地址，指的是service worker能够控制的页面范围。在它的控制范围之内：service worker可以处理这些页面里面的资源请求和网络请求，然后通过service worker的自身调度机制构建离线缓存策略，如果不在service worker的作用域范围之内，则无法处理页面相关的资源和网络请求。

**Service Worker 默认的作用域就是注册时候的 path,**

**Service worker 的作用域可以自己指定**

例如：可以在`navigator.serviceWorker.register()`方法中传入 ``{scope: '/some/scope/'}`。scope的值就是指定作用域的范围，

**但是**

这个作用域不是随意指定的！

**要求：**`在最大作用域的基础上才能通过 scope 配置在注册 Service Worker 的时候指定自定义的作用域`。

举个栗子：假如你的`sw.js`文件所在的目录是`/a/b/`,那么你的最大作用域就是`http:127.0.0.1:8000/a/b`,如果你指定的scope的path是`http:127.0.0.1:8000/a/`，则会报错，而`http:127.0.0.1:8000/a/b/则可以`。

#### 作用域污染

了解了作用域之后再想一下，假如我们注册了一个作用域为`/a/`的service worker，又在根目录下注册了一个作用域为`/`的service worker，显然`/a/`是在`/`的控制范围之内的。那作用域为`/a/`的页面不就被`/`所对应的service worker控制了吗，

**我们怎么解决呢？**

一种办法是通过chrome的devtools里面来手动`"unregister"`来清除掉污染的service worker，但是这种情况一旦上线了就不能指望用户去手动清除了吧。显然不可能！

另一种方法：借助`navigator.serviceWorker.getRegistrations()`方法可以先将污染的service worker清除掉。然后在注册自己需要的service worker。

```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
      .then(regs => {
      for (let reg of regs) {
        // 注销掉不是当前作用域的所有的 Service Worker
        if (reg.scope !== 'https://127.0.0.1:8000/a/') {
          reg.unregister()
        }
      }
      // 注销掉污染 Service Worker 之后再重新注册自己作用域的 Service Worker
      navigator.serviceWorker.register('./a-sw.js')
    })
  }
</script>
```

#### Service worker 如何更新？

当在页面中通过 `sw.js` 注册了一个 Service Worker 之后，如果 `sw.js` 内容发生了变更，Service Worker 该如何更新呢？

通常在每次进行 Web App 升级的时候，都必须伴随着 Service Worker 文件 `sw.js` 的升级，当浏览器检测到 `sw.js` 的升级之后，就会重新触发注册、安装、激活、控制页面的流程，并在这个过程中就会更新当前 Web App 的离线缓存为最新的上线内容。

什么条件才能被浏览器检测到`sw.js`更新了呢？

- Service Worker 文件 URL 的更新

  在实际项目中，在 Web App 新上线的时候，通常是在注册 Service Worker 的时候，通过修改 Service Worker 文件的 URL 来进行 Service Worker 的更新，一般采用以下代码所示的方式处理：

  ```js
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js?v=20190401235959')
  }
  
  ```

  

- Service Worker 文件内容的更新

  可以维护一个唯一的构建版本号，在每次上线时更新。

  ```js
  // sw.js
  self.version = '20190401235959'
  ```

  

