import axios from 'axios'

const API = `${process.env.PUBLIC_URL}cart/orders`

export const show = (params) => { return axios.get(`${API}`, {params}) }
