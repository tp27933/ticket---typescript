import service from './request.js'
import { Coupon } from './interface'
const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
  '$1'
)
const headers = { authorization: token }
const user = import.meta.env.VITE_APP_PATH
// api/:api_path/admin/coupon
export function AddCoupon (data: Coupon, path = user) {
  return service.request({
    method: 'post',
    headers,
    url: `api/${path}/admin/coupon`,
    data: { data }
  })
}
// api/:api_path/admin/coupon/:id
export function EditCoupon (data: Coupon, path = user) {
  return service.request({
    method: 'put',
    headers,
    url: `api/${path}/admin/coupon/${data.id}`,
    data: { data }
  })
}
// api/:api_path/admin/coupons?page=:page
export function GetAllCoupon (page: number | string, path = user) {
  return service.request({
    method: 'get',
    headers,
    url: `api/${path}/admin/coupons`,
    params: { page }
  })
}
// api/:api_path/admin/coupon/:coupon_id
export function DeletCoupon (id: string, path = user) {
  return service.request({
    method: 'delete',
    headers,
    url: `api/${path}/admin/coupon/${id}`
  })
}
