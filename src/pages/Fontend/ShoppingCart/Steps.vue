<template>
  <a-steps v-model:current="current" type="navigation" :style="stepStyle">
    <a-step title="填寫訂購人資訊" disabled />
    <a-step title="確認訂單" disabled />
    <a-step title="完成訂購" disabled />
  </a-steps>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'

const current = ref(0)
const stepStyle = reactive({
  marginBottom: '60px',
  boxShadow: '0px -1px 0 0 #e8e8e8 inset'
})
const props = defineProps({
  step: {
     type: Number,
     require: true
  }
})
onMounted(() => {
  current.value = props.step!
})

</script>
