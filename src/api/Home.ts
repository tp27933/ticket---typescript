import service from './request.js'
import { Product } from './interface'
const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
  '$1'
)
const headers = { authorization: token }
const user = import.meta.env.VITE_APP_PATH
// 獲取列表
export const GetProductData = (page:number| string , path = user): Promise<any> => service.get(`api/${path}/admin/products`, {
  headers,
  params: { page }
})
// 刪除列 /api/:api_path/admin/product/:product_id
export function DeletProduct (id: string, path = user) : Promise<any> {
  return service.request({
    method: 'delete',
    headers,
    url: `api/${path}/admin/product/${id}`
  })
}
// 新增產品  /api/:api_path/admin/product
export function AddPouduct (data: Product, path = user): Promise<any> {
  return service.request({
    method: 'post',
    headers,
    url: `api/${path}/admin/product`,
    data: { data }
  })
}
// 修改產品   /api/:api_path/admin/product/:id
export function EditPouduct (data: Product, path = user): Promise<any> {
  return service.request({
    method: 'put',
    headers,
    url: `api/${path}/admin/product/${data.id}`,
    data: { data }
  })
}
// 上傳圖片   /api/:api_path/admin/upload
export function UploadImg (data: any, path = user): Promise<any> {
  return service.request({
    method: 'post',
    headers,
    url: `/api/${path}/admin/upload`,
    data
  })
}
