import axios from 'axios'

const API = `${process.env.PUBLIC_URL}admin/products`

export const index = () => { return axios.get(API) }

export const show = (params) => { return axios.get(`${API}/${params.product_id}`) }

export const patch = (params) => { return axios.patch(`${API}/${params.product_id}`, params)}

export const post = (params) => { return axios.post(`${API}`, params)}

