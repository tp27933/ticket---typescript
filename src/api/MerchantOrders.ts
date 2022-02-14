import service from './request.js'
const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
  '$1'
)
const headers = { authorization: token }
const user = import.meta.env.VITE_APP_PATH

// 獲取訂單列表 /api/:api_path/admin/orders?page=:page
export function GetOrders (page: string, path = user) {
  return service.request({
    method: 'get',
    headers,
    url: `api/${path}/admin/orders?`,
    params: { page }
  })
}
// api/:api_path/admin/order/:id
export function DeletOrder (ID: string, path = user) {
  return service.request({
    method: 'delete',
    headers,
    url: `api/${path}/admin/order/${ID}`
  })
}
