# lazyload-loader
## 按照路由分割的方式实现懒加载
## 用法： 
 webpack配置
```
const lazyLoader = require('lazyload-loader')

 module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader',
          'lazyLoader',
        ]
      },
    ···
  },

```


Router 的配置
```
// 使用lazy! 作为前缀
import Shop from 'lazy!./view/Shop';

```


# License

[The MIT License](http://opensource.org/licenses/MIT)