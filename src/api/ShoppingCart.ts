import service from './request.js'

const user = import.meta.env.VITE_APP_PATH

// api/:api_path/products/all
export const GetAllProduct = (path = user): Promise<any> => service.get(`api/${path}/products/all`)
// 獲取列表 /api/:api_path/products?page=:page
export const GetProductData = (page:number | string, path = user): Promise<any> => service.get(`api/${path}/products`, {
  params: { page }
})

// 獲取單一品項 /api/:api_path/product/:id
export const GetSingleProduct = (ID: string, path = user): Promise<any> => service.get(`api/${path}/product/${ID}`)

// 加入購物車 /api/:api_path/cart
export const AddCart = (data: any, path = user): Promise<any> => service.post(`api/${path}/cart`, {
  data,
  self_loading: true
})

// 更新購物車 /api/:api_path/cart/:id
export const UpdateCart = (data: any, path = user): Promise<any> => service.put(`api/${path}/cart/${data.product_id}`, data)

// 獲取購物車列表 /api/:api_path/cart
export const GetCartData = (path = user): Promise<any> => service.get(`api/${path}/cart`)

// 刪除某一筆購物車資料 /api/:api_path/cart/:id
export const DelSingleProduct = (ID:string, path = user): Promise<any> => service.delete(`api/${path}/cart/${ID}`)

// 刪除全部購物車 /api/:api_path/carts
export const DelProducts = (path = user): Promise<any> => service.delete(`api/${path}/carts`)

export const Order = (data: any, path = user): Promise<any> => service.post(`api/${path}/order`, data)

// 結帳付款 /api/:api_path/order/:order_id
export const ConfirmOrder = (ID:string, path = user): Promise<any> => service.get(`api/${path}/order/${ID}`)

// `/api/:api_path/pay/${this.order.id}`;
export const Checkout = (ID: string, path = user): Promise<any> => service.post(`api/${path}/pay/${ID}`)

// /api/:api_path/coupon
export const CheckoCoupon = (data:any, path = user): Promise<any> => service.post(`api/${path}/coupon`, data)
