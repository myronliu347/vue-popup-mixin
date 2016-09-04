<template>
  <button @click="show = true">Open Dialog</button>
  <dialog :show.sync="show">
    <p>这是一个对话框点击遮盖层或者按 ESC 键可以关闭</p>
  </dialog>
</template>

<script>
import Dialog from './dialog'

export default {
  name: 'app',
  components: {
    Dialog
  },
  data () {
    return {
      show: false
    }
  }
}
</script>
