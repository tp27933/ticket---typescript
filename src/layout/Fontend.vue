<template>
  <div id="fb-root" page_id="106869698357930" />
  <div
    id="fb-customer-chat"
    class="fb-customerchat"
    page_id="106869698357930"
  />
  <nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
    <div class="container-fluid">
      <router-link to="/shopping/home" class="navbar-brand text-primary fs-3">
        千喜年售票
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        ref="trigger"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <div
        class="navbar-collapse justify-content-end collapse"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li
            class="nav-item fs-6 p-2"
            v-for="(item, idx) in routes"
            :key="`page_${idx}`"
            @click="hideNav"
          >
            <a
              v-if="item.name === 'Cart'"
              href="#"
              class="text-white"
              :class="{ activeRoute: route.name === item.name }"
              @click.prevent="visible=true"
            >
              {{ item.text }}
              <span class="badge bg-secondary">{{ carts.list.length }}</span>
            </a>
            <router-link
              v-else
              :to="item.link"
              class="text-white"
              :class="{ activeRoute: route.name === item.name }"
            >
              <font-awesome-icon :icon="item.icon" />
              {{ item.text }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <SideBar v-model="visible" :carts="carts" @hiddePopover="hiddePopover"/>
  <MainBanner
    :slides="slides"
    class="bg-white carousel pb-5"
    v-if="!excludedSwiperRoutes.includes(route.name as string)"
  />
  <div class="view pb-4 min-100">
    <router-view />
  </div>
  <footer class="text-white bg-dark px-5" style="height: 4rem">
    <hr class="bg-white" />
    <p class="text-center">
      ⓒ 2021 All Right Reserved . ｜僅個人作品練習，無商業用途
    </p>
  </footer>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import '@/utils/FbChatBot'
import emitter from '@/utils/Bus'

import SideBar from '@components/SideBar.vue'
import MainBanner from '@components/MainBanner.vue'

import { GetCartData } from '@/api/ShoppingCart'

const router = useRouter()
const route = useRoute()
const excludedSwiperRoutes = reactive(['ItemDetail', 'Home', 'BuyerInfo', 'Article'])
const imgs = '../assets/imgs'
const slides = reactive({
  Order: { name: '購票處', path: new URL(`${imgs}/banner1.jpg`, import.meta.url).href},
  Cart: { name: '結帳/付款', path: new URL(`${imgs}/banner2.jpg`, import.meta.url).href },
  CommonQuestions: { name: '常見問題 Q&A', path: new URL(`${imgs}/banner3.jpg`, import.meta.url).href },
  ArticleList: { name: '文章列表', path: new URL(`${imgs}/banner3.jpg'`, import.meta.url).href}
})
const routes = reactive([
    {
      link: '/shopping/home',
      icon: 'home',
      text: '首頁',
      name: 'Home'
    },
    {
      link: '/shopping/order',
      icon: 'ticket-alt',
      text: '訂票去',
      name: 'Order'
    },
    {
      link: '/shopping/cart',
      icon: 'shopping-cart',
      text: '購物車',
      name: 'Cart'
    },
    {
      link: '/shopping/Q&A',
      icon: 'shopping-cart',
      text: '常見問題',
      name: 'Q&A'
    },
    {
      link: '/login',
      icon: 'ticket-alt',
      text: '登入後台',
      name: 'Merchant'
    }
])
onMounted(() => {
  getCartData()
  emitter.on('product-cart', () => getCartData())
})
const carts = reactive({
  list: [],
  total: 0
})
const getCartData = () => {
  GetCartData().then(res => {
    if (!res) return
    const data = res.data
    carts.list = data.data.carts
    carts.total = data.data.final_total
  })
}
const visible = ref(false)

const trigger = ref<HTMLElement | null>(null)
const hiddePopover = (name: string) => {
  visible.value = false
  trigger.value?.click()
  router.push({ name: name })
}
const hideNav = () => {
  trigger.value?.click()
}
</script>

<style lang="sass" scoped>
header
  width: 100%
  height: 50px
  background: black
.view
  background: #fff
  min-height: calc(100vh - 75px)
.activeRoute
  color: $primary!important
</style>
