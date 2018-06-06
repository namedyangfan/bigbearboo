import axios from 'axios'

const API = `${process.env.PUBLIC_URL}admin/product_attributes`

export const patch = (params) => { return axios.patch(`${API}/${params.product_attribute_id}`, params)}

export const post = (params) => { return axios.post(`${API}/${params.product_id}`, params)}

export const destroy = (params) => { return axios.delete(`${API}/${params.product_attribute_id}`)}

