
import { createApp, reactive, App } from 'vue'

import alert from '@components/alert/Alert.vue'

const msg = reactive({
  show: false,
  list: ''
})

const $alert = createApp(alert, { msg }).mount(document.createElement('div'))
const load = {
  show (text: string) { // 控制顯示loadning的方法
    msg.show = true
    msg.list = text
    document.body.appendChild($alert.$el)
  },
  hide () { // 控制隱藏loadning的方法
    msg.show = false
  }
}

export default {
  install (app: App) {
    app.config.globalProperties.$alert = load
  }
}
