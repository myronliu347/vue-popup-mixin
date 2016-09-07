# vue-popup-mixin

> 基于vue开发的popup 的mixins 用于管理弹出框的遮盖层

## 安装

```shell
npm install vue-popup-mixin --save
```

## 使用

```html
<template>
  <div class="dialog"
    v-show="show"
    transition="dialog-fade">
    <div class="dialog-content">
      <slot></slot>
    </div>
  </div>
</template>

<style>
  .dialog {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    width: 90%;
  }

  .dialog-content {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
  }

  .dialog-fade-transition {
    transition: opacity .3s linear;
  }

  .dialog-fade-enter,
  .dialog-fade-leave {
    opacity: 0;
  }
</style>

<script>
import 'vue-popup-mixin/dist/VuePopupMixin.css';
import Popup from 'vue-popup-mixin'

export default {
  mixins: [Popup],
  methods: {
    // 响应 overlay事件
    overlayClick () {
      this.show = false
    },
    // 响应 esc 按键事件
    escPress () {
      this.show = false
    }
  }
}
</script>
```

默认使用 `show` 控制弹出层是否显示， 这里我使用了 `v-show` 也可以使用 `v-if` , 当遮盖层点击之后会调用实例中的 `overlayClick` 方法，如果不实现这个方法，则不做响应， `escPress` 方法是当敲下 esc 键响应事件

## API

| 参数 | 描述 | 参数类型 | 默认值 |
| :------------- | :------------- | :------------- | :------------- |
| show       |  是否显示      | Boolean      | false      |
| overlay       | 是否创建一个遮盖层       | Boolean      | true      |
| overlayOpacity  | 遮盖层的透明度      | Number      | 0.4      |
| overlayColor   | 遮盖层的颜色    | String    | #000      |

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016 myron
