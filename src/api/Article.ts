import service from './request.js'

const user = import.meta.env.VITE_APP_PATH

// /api/:api_path/articles?page=:page

export const GetArticiles = (path = user): Promise<any> => service.get(`api/${path}/articles`)

// api/:api_path/article/:id
export const GetArticile = (ID: string, path = user): Promise<any> => service.get(`api/${path}/article/${ID}`)
