<template>
  <div class="cart_container rounded-2 text-white shadow p-3">
    <div class="header d-flex justify-content-between align-items-center">
      <h2 class="text-start text-gray-300">購物車</h2>
      <a
        href="#"
        type="button"
        class="btn rounded-2 btn-outline-danger p-2 h-50 "
        @click.prevent="onDelAllClick"
      >
        清空購物車
      </a>
    </div>
    <section class="cart">
      <table
        class="item_list table d-none d-md-table"
        style="border-collapse:separate;border-spacing:0px 20px;"
      >
        <thead>
          <tr>
            <th class="text-center text-gray fs-6">
              商品
            </th>
            <th class="text-center text-gray fs-6">
              單一價
            </th>
            <th class="text-center text-gray fs-6">
              數量
            </th>
            <th class="text-center text-gray fs-6">
              小計
            </th>
            <th class="text-center text-gray fs-6">
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(i, idx) in item.list"
            :key="`list_${idx}`"
            class="border-transparent"
          >
            <td>
              <h3 class="text-center text-white fs-6">
                {{ i.product.title }}
              </h3>
            </td>
            <td>
              <p class="text-center text-white fs-6">
                {{ i.product.price }}
              </p>
            </td>
            <td nowrap="nowrap">
              <span
                class="btn text-white border-1 fs-4"
                @click="changeQty(i, +1)"
                >+</span>
              <input
                type="number"
                v-model="i.qty"
                class="text-center fs-6"
                style="width:60px;"
              />
              <span
                class="btn text-white border-1 fs-4"
                @click="changeQty(i, -1)"
                >-</span>
            </td>
            <td nowrap="nowrap">
              <span class="text-white fs-6 flex-none">$ {{ i.final_total }}</span>
            </td>
            <td class="fs-4 text-gray-300">
              <font-awesome-icon class="pointer"  icon="trash-alt" @click="onDelProductlClick(i)"/>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-block d-md-none order-first border-top mt-4">
        <div
          v-for="(i, idx) in item.list"
          :key="`list_${idx}`"
          class="row py-3 border-bottom"
        >
          <img
            :src="i.product.imageUrl"
            class="col-4 mx-auto"
          />
          <div class="col-6">
            <h3 class="text-start text-white fs-6">
               {{ i.product.title }}
            </h3>
            <div class="d-flex my-3">
              <a
                class="px-2 bg-dark text-white fs-4"
                @click.prevent="changeQty(i, +1)"
              >+</a>
              <input
                type="number"
                v-model="i.qty"
                class="text-center fs-7 input"
              />
              <button
                :class="{ disabled: i.qty <= 1 }"
                class="px-2 bg-dark text-white fs-4"
                type="button"
                @click="changeQty(i, -1)"
              >-</button>
            </div>
            <p class="text-white fs-6 flex-none">小計: {{ i.final_total }}</p>
          </div>
          <div class="col-2 fs-5"><font-awesome-icon class="pointer align-top"  icon="trash-alt" @click="onDelProductlClick(i)"/></div>
        </div>
      </div>
    </section>
    <div class="h4 p-3 text-end text-gray">
      總計: <span class="fs-1 text-white"> {{ item.total }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, defineExpose } from 'vue'
import { useStore } from 'vuex'

import { Cart } from '@/api/interface'

import emitter from '@/utils/Bus'

import {
  GetCartData,
  DelProducts,
  DelSingleProduct,
  UpdateCart
} from '@/api/ShoppingCart'
import { Toast } from '@/utils/UseSwal'


const store = useStore()
interface Item {
  list: Array<Cart>,
  total: number
}
const item: Item = reactive({
  list: [],
  total: 0
})
onMounted(() => {
  getCartData()
})
const getCartData = () => {
  GetCartData().then(res => {
    if (!res) return
    const data = res.data
    emitter.emit('product-cart')
    item.list = data.data.carts
    item.total = data.data.final_total
  })
}
defineExpose({
  getCartData,
  item
})
const onDelAllClick = () => {
  DelProducts().then(res => {
    if (!res) return
    item.list = []
    item.total = 0
  })
}
const onDelProductlClick = (item: Cart) => {
  DelSingleProduct(item.id).then(res => {
    getCartData()
  })
}
const changeQty = (item: Cart, operation: number) => {
  store.commit('SET_LOADING', true)
  item.qty = item.qty + operation
  const data = {
    product_id: item.id,
    qty: item.qty
  }
  UpdateCart(data).then(res => {
    store.commit('SET_LOADING', false)
    if (!res) return
    getCartData()
    Toast.fire({ icon: 'success', title: '商品已更改數量' })
  })
}

</script>

<style lang="sass" scoped>
.btn-es
  margin-right: 10px
  padding: 5px
  line-height: 0px
  height: 20px
.cart_container
  background: #3B3C44

.cart_title
  width: 100%
  height: 3rem
  background: #ffbd5a
.item_list
  li
    display: flex
    align-items: center
    position: relative
    margin-bottom: 2rem
    img
      height: 4rem
    .details
      flex: 1
.input
  color: #505050
  flex: 1 1 auto
  width: 1%
  min-width: 0
.details
  .unit:after
    content: attr(item-unit)
    padding-left: 5px
  input
    width: 50%
.main_pic
  object-fit: fill
  width: 6rem
  border: none
</style>
