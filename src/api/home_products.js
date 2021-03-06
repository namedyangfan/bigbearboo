import axios from 'axios'

const API = `${process.env.PUBLIC_URL}home/products`

export const index = (params) => { return axios.get(API, params) }

export const indexCategory = (params) => { return axios.get(`${API}/category/${params.category_id}`)}

export const show = (params) => { return axios.get(`${API}/${params.product_id}`) }
