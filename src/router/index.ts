import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import { userAuthGuard } from './cookiePerimt.js'
const Login = () => import('@pages/Login-2.vue')

const Layout = () => import('@/layout/Fontend.vue')
import Home from '@pages/Fontend/Home/index.vue'
// const Home = () => import('@pages/Fontend/Home/index.vue')
const Article = () => import('@pages/Fontend/Article/Content.vue')
const ArticleList = () => import('@pages/Fontend/Article/List.vue')
const Shopping = () => import('@pages/Fontend/Shopping.vue')
const CheckoutOrder = () => import('@pages/Fontend/ShoppingCart/CheckoutOrder.vue')
const BuyerInfo = () => import('@pages/Fontend/ShoppingCart/index.vue')
const PaymentComplete = () => import('@pages/Fontend/PaymentComplete.vue')
const ItemDetail = () => import('@pages/Fontend/ItemDetail.vue')
const CommonQuestions = () => import('@pages/Fontend/CommonQuestions.vue')
const MerchantLayout = () => import('@/layout/Backend/index.vue')
const MerchantHome = () => import('@pages/Backend/Home.vue')
const MerchantArticleList = () => import('@pages/Backend/Article/List.vue')
const MerchantAddArticle = () => import('@pages/Backend/Article/NewArticle.vue')
const MerchantArticle = () => import('@pages/Backend/Article/Content.vue')
const MerchantOrders = () => import('@pages/Backend/Orders.vue')
const MerchantProducts = () => import('@pages/Backend/Products.vue')
const MerchantVoucher = () => import('@pages/Backend/Voucher.vue')

type RouteConfig = RouteRecordRaw & { hidden?: boolean }
const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/merchant',
    name: 'Merchant',
    redirect: '/merchant/home',
    component: MerchantLayout,
    beforeEnter: (to, from, next) => {
      userAuthGuard(to, from, next)
    },
    children: [
      {
        path: 'home',
        name: 'MerchantHome',
        component: MerchantHome
      },
      {
        path: 'products',
        name: 'MerchantProducts',
        component: MerchantProducts
      },
      {
        path: 'article/add/:id?',
        name: 'MerchantAddArticle',
        component: MerchantAddArticle
      },
      {
        path: 'orders',
        name: 'MerchantOrders',
        component: MerchantOrders
      },
      {
        path: 'article/:id?',
        name: 'MerchantArticle',
        component: MerchantArticle
      },
      {
        path: 'article/list',
        name: 'MerchantArticleList',
        component: MerchantArticleList
      },
      {
        path: 'voucher',
        name: 'MerchantVoucher',
        component: MerchantVoucher
      }
    ]
  },
  {
    path: '/shopping',
    name: 'Shopping',
    redirect: '/shopping/home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'Q&A',
        name: 'CommonQuestions',
        component: CommonQuestions
      },
      {
        path: 'order',
        name: 'Order',
        component: Shopping
      },
      {
        path: 'cart',
        name: 'Cart',
        component: BuyerInfo
      },
      {
        path: 'paymentComplete',
        name: 'PaymentComplete',
        component: PaymentComplete
      },
      {
        path: 'article/:id',
        name: 'Article',
        component: Article
      },
      {
        path: 'article/list',
        name: 'ArticleList',
        component: ArticleList
      }
    ]
  },
  {
    path: '/item',
    name: 'ItemDetail',
    redirect: '/item/detail',
    component: Layout,
    children: [
      {
        path: 'detail',
        name: 'ItemDetail',
        component: ItemDetail
      }
    ]
  },
  {
    path: '/buyerInfo',
    name: 'BuyerInfo',
    component: BuyerInfo
  },
  {
    path: '/checkout',
    name: 'CheckoutOrder',
    redirect: '/checkout/order',
    component: Layout,
    children: [
      {
        path: 'order',
        name: 'oredr',
        component: CheckoutOrder
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    hidden: true,
    component: () => import('@pages/404.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  scrollBehavior() {
    // 使用非null断言运算符!强制转换
    document.getElementById('app')!.scrollIntoView({ behavior: "smooth"})
    return undefined
  }
})
export default router
