<template>
  <div class="spin-wrap" v-if="dataLoading">
    <a-spin />
  </div>
  <section id="top" v-else>
    <h3 class="fs-2" >{{ currentArtilce.title }}</h3>
    <span class="fs-5 text-gray-800">{{ dateFormmater(currentArtilce.title) }}</span>
    <hr />
    <p class="content">{{ currentArtilce.content }}</p>
    <hr />
    <slot />
    <div class="d-flex justify-content-between pt-4">
      <a href="#" class="pre text-blue-500" @click.prevent="routeToPage(list[crrentIdx - 1 ])">
        <font-awesome-icon icon="chevron-left" />
        上一篇:
        <p class="nex_text text-truncate">{{ list[crrentIdx -1 ]?.title }}</p>
      </a>
      <a href="#" class="nex text-blue-500"  @click.prevent="routeToPage(list[crrentIdx + 1 ])">
        下一篇:
        <p class="nex_text text-truncate">{{ list[crrentIdx + 1]?.title }}</p>
        <font-awesome-icon icon="chevron-right" />
      </a>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { reactive, watch, ref, toRefs } from 'vue'

import { dateFormmater } from '@/utils/Mixin'
import { Article } from '@/api/interface'
import { GetArticiles, GetArticile } from '@/api/Article'
import { GetMArticile } from '@/api/MerchantArticle'

const props = defineProps({
   ID: {
    type: String,
    require: true
  },
  requestFrom: {
    type: String,
    require: true
  }
})

const article = reactive({
  crrentIdx: 0,
  currentArtilce: {},
  list: [] as Array<Article>
})
const { crrentIdx, currentArtilce, list } = toRefs(article)
const dataLoading = ref(false)
const articleID = ref()
watch(props, (newV, oldV) => {
  dataLoading.value = true
  console.log(props.ID)
  articleID.value = props.ID
  if (props.requestFrom !== 'Merchant') getArticles(articleID.value)
  getArticle(articleID.value)
})
watch(articleID, (newV, oldV) => {
  if (props.requestFrom !== 'Merchant') getArticles(newV)
  getArticle(newV)
})
const getArticles = (id: string) => {
  const api = GetArticiles
  api().then(res => {
    if (!res) return
    const data = res.data
    const { articles }: {articles: Array<Article>} = data
    article.crrentIdx = articles.findIndex((el) => el.id === id)
    article.list = articles
  })
}
// eslint-disable-next-line no-unused-vars
const getArticle = (id: string) => {
  dataLoading.value = false
  const api = props.requestFrom === 'Merchant' ? GetMArticile : GetArticile
  api(id).then(res => {
    dataLoading.value = false
    if (!res) return
    const data = res.data
    article.currentArtilce = data.article
  })
}
const routeToPage = (item: Article) => {
  articleID.value = item.id
  document.getElementById('app')!.scrollIntoView()
}

</script>

<style lang="sass" scoped>
.content
  letter-spacing: 5px
  line-height: 2rem
.pre, .nex
  display: flex
  align-items: center
  flex-direction: row
  max-width: 120px
  white-space: nowrap
.pre_text, .nex_text
  display: inline-block
  width: 200px
</style>
