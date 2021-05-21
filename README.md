Vue多页面脚手架

开发模式

```bash
yarn dev
```

打包代码

```bash
# 打包单个模块
gulp build --path demo

# 打包代码并上传服务器
gulp build --path demo && gulp upload

# 打包代码并上传服务器和SVN
gulp build --path demo && gulp checkInUpload

# 一次性打包所有模块上传服务器并提交SVN
gulp all
```
