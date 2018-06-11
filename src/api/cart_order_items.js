import axios from 'axios'

const API = `${process.env.PUBLIC_URL}cart/order_items`

export const post = (params) => { return axios.post(`${API}`, params) }

export const destroy = (params) => { return axios.delete(`${API}/${params.order_item_id}`, {params}) }
