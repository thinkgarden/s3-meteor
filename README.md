# s3-meteor
meteor start

### 学习收获
#### 安装 meteor
在终端执行下面一条命令

  curl https://install.meteor.com/ | sh

#### 创建一个新项目

来新建一个项目

    meteor create s3-meteor

这样一个简单的 meteor 项目就有了，来启动一下

    cd s3-meteor
    meteor

#### 用 meteor 装包

meteor 作为一个快速开发框架，当然需要有自己的一个很大的包仓库了，比如我们运行

    meteor add react

#### 使用npm安装package
[参考文档](http://react-in-meteor.readthedocs.org/en/latest/client-npm/)

在 Meteor 项目中使用原生的 npm 包，下面两个包是首先要装的（需要翻墙）：

    meteor add meteorhacks:npm cosmos:browserify

第一个 meteor 包 npm ，负责把原生的 npm 包添加到咱们的 meteor 应用中运行，后续的 packages.json 文件就是由这个包生成的。

第二个 browserify 在客户端代码中提供了 require 的功能，这个后面是会到处都用到的，相关功能是后面的 app.browserify.js 文件。

安装完成，运行一下

  $ meteor

就可以生成一个 packages.json 文件（对，是有 s 的 )。

们需要在里面填写要安装的原生 npm 包（由 https://www.npmjs.com 提供）：

    {
      "material-ui": "0.14.0",
      "react-tap-event-plugin": "0.2.1",
      "externalify": "0.1.0"
    }

上面的版本号，都是我在 https://www.npmjs.com 上查到的当前最新版本号。

特别注意：写好之后，不着急安装，先把后续的配置做好，然后再运行 meteor 命令安装。操作顺序不同，会有奇怪的错误出现：

    Uncaught Error: Invariant Violation: addComponentAsRefTo(...)

#### 配置 browserify

目前，Meteor 不支持使用 require 语法加载模块，所以需要通过添加 ``cosmos:browserify ``软件包支持的一个特殊文件，来实现这个功能。 在项目中创建一个目录 client/lib，进入到新建目录，创建一个文件名为 ``app.browserify.js``。

在这个新建的文件里面，你可以 ``require`` 任意已安装的 NPM 模块，这样可以把它导出成一个在本项目范围内全局使用的变量（意味着项目中的每一个 JavaScript 文件都能访问这个变量）。 例如，要使用 ``material-ui`` 模块，在 ``app.browserify.js`` 文件添加下面这几行代码：

    var injectTapEventPlugin = require("react-tap-event-plugin");
    injectTapEventPlugin();
    mui = require('material-ui');

其实最主要的就是最后一句啦。但是，为何要有 injectTapEventPlugin 相关的这两行代码呢？这个是临时的，加上就是了，不必深究，material-ui 官方的文档 有说明。

#### 配置 externalify

我们的意图是让 ``material-ui`` 使用 meteor 的 react 包，而不是 npm 提供的 react 包，但是这个行为不是默认的，需要我们手动配置一个 ``Browserify`` 的 ``transforms`` 。步骤很简单，创建 ``client/lib/app.browserify.options.json`` 里面添加

    {
      "transforms": {
        "externalify": {
          "global": true,
          "external": {
            "react": "React.require"
          }
        }
      }
    }

执行装包

上面的各个配置都写好之后，运行

    $ meteor

来安装 material-ui 和 externalify 这两个包并加载相关设置。

#### 添加 Sass 支持

需要安装 [meteor-scss](https://github.com/fourseven/meteor-scss) 这个包。

有意思的是，meteor 对于我们的各个 xxx.scss 文件叫什么名字和父文件夹的名字都没用硬性规定，只要所有内容都可以在 client/ 中找到就可以。

#### 用户管理

Meteor 下用户 account 管理，会用到 ``accounts-password`` 这个包。

#### 查看用户信息

查看已经注册过的用户，chrome 开发者 console 中运行：

    Meteor.users.find().fetch()

meteor 的数据是同时存在于客户端和服务器上的，那么服务器上如何来查看呢？切换到命令行终端，保持 meteor 命令运行的前提下，执行：

    $ meteor mongo
    MongoDB shell version: 2.6.7
    connecting to: 127.0.0.1:3001/meteor

    $ show collections
    meteor_accounts_loginServiceConfiguration
    system.indexes
    users

    查看用户
    $ db.users.find()

    删除数据
    $ db.users.remove({})

#### logout 登出

logout 的功能我们后面再介绍，但是为了调试方便，咱们可以在 chrome 开发者 console 中，运行

    Meteor.logout()


#### ajax 请求，保存数据到 mongodb ，打通实时订阅通道。

安装HTTP模块

    meteor add http

### Message form
0、material-ui style 设置（Card、TextFiled、SVG Icon、IconMenu） flex布局、justify-content：flex-end

1、定义一个state来控制input的值（参见react controlled component）

2、Meteor Data transform

    mixins:[ReactMeteorData]
    getMeteorData(){
      return MeteorData.user()
    }

3、 Publish and subscribe

    // server: publish the rooms collection, minus secret info.
    Meteor.publish("rooms", function () {
      return Rooms.find({}, {fields: {secretInfo: 0}});
    });

    Meteor.subscribe("allplayers");

4、Methods
Methods are remote functions that Meteor clients can invoke.

    Meteor.methods({
      foo: function (arg1, arg2) {
        check(arg1, String);
        check(arg2, [Number]);

        // .. do stuff ..

        if (/* you want to throw an error */) {
          throw new Meteor.Error("pants-not-found", "Can't find my pants");
        }

        return "some return value";
      },

      bar: function () {
        // .. do other stuff ..
        return "baz";
      }
    });


2、新建Collection

    Messages = new Mongo.Collection("messages");

3、Collection Insert

4、终端调试Meteor Mongo

    #打开终端
    meteor mongo

    #查看collections
    show collections

    #查看数据
    db.messages.find()

### Message list
React 文档keys

    meteor add momentjs:moment

安装user status

    meteor add mizzao:user-status

解决 `Clock discrepancy detected.` warning:

    重新安装timesync
    meteor add mizzao:timesync

    在startup.jsx中加入
    TimeSync.loggingEnabled=false;

### 遇到的问题

#### meteor如何寻找变量，因为他不用导出包？

#### tabs不能正常跳转
登录成功后路由链接明明是account但tabs显示的却是login显示的内容为account。

分析现象知道路由链接和内容是对应的，所以判断问题应该出现在tabs的配置上。仔细检查发现tabs的value设置的不正确initialSate中设置的tabsIndex但tabs的value中设置的是this.state.value.两者不是很对应，修正tabs的value为this.state.tabsIndex之后问题变解决了。
