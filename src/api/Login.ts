import service from './request.js'
// 登入請求
export const Login = (data: any): Promise<any> => service.post(`admin/signin`, data)

export const Logout = (): Promise<any> => service.post(`/logout`)
