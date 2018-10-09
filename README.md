# lazyload-loader
## 按照路由分割的方式实现懒加载
## 用法： 

```
 npm install --save-dev lazyload-loader
```
 webpack配置
```

 module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader',
          'lazyload-loader',
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

// Route 正常使用
 <Route path="/shop" component={Shop} />

```

# License

[The MIT License](http://opensource.org/licenses/MIT)