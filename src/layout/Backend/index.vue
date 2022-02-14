<template>
  <div class="layout-wrap">
    <LayoutNav :class="[collapse ? 'collapseNav' : 'expandNav']" />
    <div class="w-0 col">
      <LayoutHeader />
      <LayoutMain />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import emitter from '@/utils/Bus'

import LayoutHeader from './Components/Header.vue'
import LayoutMain from './Components/Main.vue'
import LayoutNav from './Components/Nav.vue'

const collapse = ref(true)
emitter.on('ChangeCollapsed', () => {
  collapse.value = !collapse.value
})
</script>

<style lang="sass" scoped>
.layout-wrap
  display: flex
  height: 100vh
</style>
