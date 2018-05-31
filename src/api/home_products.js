import axios from 'axios'

const API = `${process.env.PUBLIC_URL}home/products`

export const index = () => { return axios.get(API) }

export const show = (params) => { return axios.get(`${API}/${params.product_id}`) }
