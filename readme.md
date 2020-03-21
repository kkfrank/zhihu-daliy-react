# 知乎日报React版本
## 项目结构
混合结构划分文件结构


# 技术要点
1.ajax请求，使用fetch
Fetch is a standardized JavaScript function to make asynchronous calls inspired by jQuery's AJAX
当然为了浏览器的兼容性，采用isomorphic-fetch模块
yarn add isomorphic-fetch

2.跨域
由于访问的时知乎日报的api，存在跨域问题，这里使用nginx反向代理解决

3.引入样式
样式放在单独的css文件里面，每一个组件对应一个样式表，在js文件里面使用import引入使用文件，比如：import './home.css',css-loader会识别import语法，然后style-loader把样式添加到&lt;style>标签里面。
添加浏览器前缀
分离css文件

4.redux
bindActionCreators(actionCreators,dispatch)
to automatically bind many action creators to a dispatch() function.


## 遇到的问题
1.react-router采用BrowserRouter模式，浏览器手动刷新或者输入地址访问，页面报错404找不到
原因：这是webpack-dev-server的问题，刷新页面时，向后台发送当前请求的url（比如/about），然后后台没有处理此路由的程序，所以就404报错了
解决方法：可以配置webpack中devServer中的historyApiFallback属性为true,当请求404时，服务器返回index.html页面，index页面里面引用文件的路径需要使用绝对路径，比如`<script src="/bundle.js"></script>`，否则应用报错

2.知乎图片防盗链
在页面里添加头部`<meta name="referrer" content="never">`
