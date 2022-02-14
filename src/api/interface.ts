export interface Product  {
  category: string,
  content: string,
  description: string,
  id: string,
  imageUrl: string,
  imagesUrl: Array<string>,
  is_enabled: number,
  num?: number,
  origin_price: number,
  price: number,
  title: string,
  unit: string,
  [propName: string]: any
}

export interface Article {
  id: string,
  title: string,
  description: string,
  image: string,
  tag: Array<string>,
  create_at: number,
  author: string,
  isPublic: boolean,
  content: string,
  num: number,
  [propName: string]: any
}


export interface Pagination {
  total_pages: number,
  current_page: number,
  has_pre: boolean,
  has_next: boolean,
  category: null | string
}

export interface Coupon {
  due_date: number,
  id: string,
  is_enabled: number,
  percent: number,
  title: string,
  [propName: string]: any
}
export interface Order {
  create_at: number,
  id: string,
  is_paid: true,
  message: string,
  paid_date: number,
  payment_method: string,
  products: {
    [propName: string]: {
      id: string,
      product_id: string,
      qty: string
    }
  },
  total: number,
  user: {
    address: string,
    email:string,
    name: string,
    tel: string,
  },
  num: number
}

export interface Cart {
  product_id: string,
  qty: number,
  coupon_code: string,
  id: string,
  total: number,
  final_total: number,
  product: Product
}
export interface CommonRes {
  sucess: boolean,
  message: string,
  [propName: string]: any
}