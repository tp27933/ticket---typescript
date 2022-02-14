<template>
  <div class="shopping container">
    <!-- filter -->
    <section class="row">
      <div class="filter col-md-3" id="filter">
        <div class="h5 text-start">
          <button
            ref="category"
            class="btn accordion-button bg-white text-gray-800 fs-4"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseType"
            aria-expanded="true"
          >
              種類:
              <span class="ms-4 d-md-none d-inline-block">{{condition.category}}</span>
           </button>
          <div id="collapseType"  class="collapse show">
            <ul class="list-unstyled text-center d-flex flex-column">
              <li
                class="btn fs-5 rounded-0"
                :class="{ active: activeBtn.category === 0 }"
                @click="clearFilter('category')"
                >全部</li>
              <li
                v-for="(item, idx) in categoryBtn"
                :key="`category_${idx}`"
                class="btn fs-5"
                :class="{ active: activeBtn.category === idx + 1 }"
                @click="setDataFilter('category', item, idx + 1)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        <div class="h5 text-start">
          <button
            ref="price"
            class="btn accordion-button bg-white text-gray-800 fs-4 collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsePrice"
          >
            價錢:
            <span class="ms-4 d-md-none d-inline-block">{{typeof(condition.price)=='string'? 'all' : condition.price[0] + '~' + condition.price[1]}}</span>
          </button>
          <div id="collapsePrice"  class="collapse">
            <ul class="list-unstyled text-center d-flex flex-column">
              <li
                class="btn fs-5 rounded-0"
                :class="{ active: activeBtn.price === 0 }"
                @click="clearFilter('price')"
                >全部</li>
              <li
                class="btn fs-5"
                v-for="(item, idx) in priceBtn"
                :key="`price_${idx}`"
                :class="{ active: activeBtn.price === idx + 1 }"
                @click="setPriceFilter(item[0], item[1], idx + 1)"
              >
                {{ item[0] }} ~ {{ item[1] }}
              </li>
            </ul>
          </div>
        </div>
        <div class="h5 text-start">
          <button
            ref="rate"
            class="btn accordion-button bg-white text-gray-800 fs-4 collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseRate"
          >
            評價:
            <span class="ms-4 d-md-none d-inline-block">{{condition.rate}} </span>
          </button>
          <div id="collapseRate"  class="collapse">
            <ul class="list-unstyled text-center d-flex flex-column">
              <li
                class="btn fs-5 rounded-0"
                :class="{ active: activeBtn.rate === 0 }"
                @click="clearFilter('rate')"
                >全部</li>
              <li
                class="btn fs-5"
                v-for="(item, idx) in rateBtn"
                :key="`rate_${idx}`"
                :class="{ active: activeBtn.rate === idx + 1 }"
                @click="setDataFilter('rate', item, idx + 1)"
                >{{ item }}星</li>
            </ul>
        </div>
        </div>
      </div>
      <div class="spin-wrap" v-if="productsInfo.productsLoading">
        <a-spin />
      </div>
      <!-- loading -->
      <a-empty
        v-if="productsInfo.displayList.length === 0 && !productsInfo.productsLoading"
        description="沒有相關條件的展出"
        class="empty"
      />
      <div class="card-deck col-md-9" v-else>
        <div class="px-5 text-end">
          <span class="pe-2">排序: </span>
          <a-button
            :type="productsInfo.sortBy === 'rate' ? 'primary' : 'default'"
            @click="sortClick('rate')"
          >
            評分
          </a-button>
          <a-button
            :type="productsInfo.sortBy === 'price' ? 'primary' : 'default'"
            @click="sortClick('price')"
          >
            價格
          </a-button>
        </div>
        <!-- cards -->
        <div class="row row-cols-1 row-cols-lg-3 row-cols-md-2">
          <div
          class="col mb-4 animate__animated animate__fadeIn d-flex-center"
          v-for="(item, idx) in productsInfo.displayList"
          :key="`list_${idx}`"
        >
          <div
            class="card mt-5 rounded-lg pointer"
            @click.stop="onMoreDetailsClick(item)"
          >
            <div
              class="card-img-top custom-cards"
              :style="{ background: `url(${item.imageUrl}) no-repeat` }"
            >
              <img
                src="@imgs/sale_tag.png"
                v-if="item.price !== item.origin_price"
                class="position-absolute"
                style="height: 4rem;top:0;left:-15px;"
                alt="優惠特價中"
              />
            </div>
            <div class="card-body">
              <h5
                class="card-title text-start text-truncate"
              >
                {{ item.title }}
              </h5>
              <div class="card-text text-end pb-2">
                  <p class="text-start text-nowrap fs-5">
                    NTD
                    <span class="fs-3" :class="{'text-warning': item.price !== item.origin_price}">{{ item.price }}</span>
                    <span v-if="item.price !== item.origin_price"> /<del>{{ item.origin_price }} </del></span>
                  </p>
                <div class="rate_container text-start">
                  <font-awesome-icon
                    icon="star"
                    class="start"
                    :class="{ active: item.rate >= i }"
                    aria-hidden="true"
                    v-for="i in 5"
                    :key="`rate_${i}`"
                  />
                </div>
                <a
                  ref="panel"
                  class="btn btn-outline-primary p-1 ms-5"
                  @click.stop.self.prevent="onAddCartClick(item, 1)"
                  href="#"
                >
                  <font-awesome-icon
                    icon="spinner"
                    spin
                    v-if="productsInfo.loadingItem === item.id"
                  />
                  加到購物車
                </a>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
    <Pagination :data="page" @clickPage="getData" />
  </div>
</template>

<script lang="ts" setup>

import { useRouter, useRoute } from 'vue-router'
import { watch, onMounted, reactive, ref, toRefs } from 'vue'

import emitter from '@/utils/Bus'
import { Toast } from '@/utils/UseSwal'
import { Product } from '@/api/interface'
import { GetAllProduct, AddCart } from '@/api/ShoppingCart'
import ResponseData from "@/types/responseData"
import Pagination from '@components/Pagination.vue'

const route = useRoute()
onMounted(() => {
  // 從首頁點擊導向此頁面
  if (route.params.category) {
    const type = route.params.category
    setDataFilter(
      'category',
      type as string,
      filterBtn.categoryBtn.indexOf(type as string) + 1
    )
  }
  getList()
})
interface productsType {
  total: Array<any>,
  listAfterFliter: Array<any>,
  displayList: Array<any>,
  loadingItem: string,
  productsLoading: boolean,
  sortBy: string,
  ascendingSort: boolean
}
const productsInfo: productsType = reactive({
  total: [],
  listAfterFliter: [],
  displayList: [],
  loadingItem: '',
  productsLoading: false,
  sortBy: 'rate',
  ascendingSort: false
})
const page = reactive({
  total_pages: 0,
  current_page: 1,
  has_pre: '',
  has_next: ''
})
const getList = (): void => {
  productsInfo.productsLoading = true
  GetAllProduct()
    .then(res => {
      productsInfo.productsLoading = false
      if (!res) return
      const { products } = res.data
      productsInfo.total.push(...products)
      //Object.assign(page, pagination)
    }).catch((error: Error) => {
      console.log(error)
    })
}
const router = useRouter()
const filterPage = (arr:Array<any>) => {
  const count = page.current_page - 1
  page.total_pages = Math.ceil(arr.length / 12)
  const s = arr.slice(count * 12, count * 12 + 12)
  productsInfo.displayList = []
  productsInfo.displayList.push(...s)
}
const filterL: {[index: string]:any} = reactive({
  select: 'all',
  condition: {
    category: 'all',
    price: 'all',
    rate: 'all'
  }
})
const { select, condition } = toRefs(filterL)
watch(
  [productsInfo.total, filterL.condition],
  () => {
    const newArr = productsInfo.total.filter((i: any) => {
      return Object.keys(filterL.condition).every(key => {
        if (filterL.condition[key] === 'all') return true
        if (key === 'price') {
          if (filterL.condition.price[1]) {
            return (
              filterL.condition.price[0] <= i.price &&
              i.price <= filterL.condition.price[1]
            )
          } else {
            return filterL.condition.price[0] <= i.price
          }
        }
        return i[key] === (filterL.condition)[key]
      })
    })
    productsInfo.listAfterFliter = newArr
    page.current_page = 1
    filterPage(newArr)
  },
  { immediate: true }
)
const getData = (pageMoves: number) => {
  page.current_page = pageMoves
  filterPage(productsInfo.listAfterFliter)
}
const SwitchLoadnigStatus = (id:string) => {
  productsInfo.loadingItem = id
}
const onAddCartClick = (item: Product, num: number) => {
  SwitchLoadnigStatus(item.id)
  AddCart({ product_id: item.id, qty: num }).then((res: ResponseData) => {
    productsInfo.loadingItem = ''
    if (!res) return
    emitter.emit('product-cart')
    Toast.fire({ icon: 'success', title: '商品已加入購物車' })
  })
}
const filterBtn = reactive({
  categoryBtn: ['藝術', '音樂', '表演', '講座'],
  priceBtn: [[0, 200], [200, 500], [500, 1000], [1000]],
  rateBtn: [2, 3, 4, 5],
  activeBtn: {
    category: 0,
    price: 0,
    rate: 0
  }
})
const { categoryBtn, priceBtn, rateBtn, activeBtn} = toRefs(filterBtn)
const setPriceFilter = (start: number, end: number, idx:number) => {
  checkExpandPenl('price')
  filterL.condition.price = []
  filterL.condition.price[0] = start
  filterL.condition.price[1] = end
  filterBtn.activeBtn.price = idx
}
const setDataFilter = (type:string, params:string| number, idx:number) => {
  checkExpandPenl(type)
  filterL.condition[type] = params
  filterBtn.activeBtn[type as keyof typeof filterBtn.activeBtn] = idx
}
// 響應式顯示的collaspe
const collapseBtn: CollapseBtn= reactive({
  category: '',
  price: '',
  rate: ''
})
interface CollapseBtn {
    [key: string]: any,
}
const checkExpandPenl = (type:string) => {
  const clientWidth = document.documentElement.clientWidth || document.body.clientHeight
  if (clientWidth <= 641) {
    collapseBtn[type].click()
  }
}
const clearFilter = (type:string) => {
  checkExpandPenl(type)
  filterL.condition[type] = 'all'
  filterBtn.activeBtn[type as keyof typeof filterBtn.activeBtn] = 0
}
const sortClick = (type: string) => {
  checkExpandPenl(type)
  if (!productsInfo.ascendingSort) {
    productsInfo.total.sort((a, b) => b[type] - a[type])
  } else {
    productsInfo.total.sort((a, b) => a[type] - b[type])
  }
  productsInfo.sortBy = type
  productsInfo.ascendingSort = !productsInfo.ascendingSort
  page.current_page = 1
}
const onMoreDetailsClick = (item: Product):void => {
  router.push({ name: 'ItemDetail', query: { id: item.id } })
}
const show = ref(false)
</script>

<style lang="sass" scoped>
.shopping .empty :deep(.ant-empty-image)
  height: 300px!important
.btn
  margin-right: 10px
.start
  width: 15px
  height: 15px
  color: $gray-500
.start.active
  color: $primary
.shopping
  width: 100%
  transition: all .2s ease-in-out
  table
    height: 100%
    padding-right: 10px
    td
      height: 50px
      img
        height: 90%

.custom-collapse:not(.visible)
  display: none

.custom-cards:before
  content: ''
.custom-cards:hover::before
  content: '查看更多'
  position: absolute
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  height: 100%
  color: #fff
  font-size: 24px
  background: rgba(0, 0, 0, 0.8)
.filter
  span
    background: #ffff
  .active
    color: #ffff
    background: $dark-yellow
</style>
