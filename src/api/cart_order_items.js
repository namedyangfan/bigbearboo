import axios from 'axios'

const API = `${process.env.PUBLIC_URL}cart/order_items`

export const post = (params) => { return axios.post(`${API}`, params) }
