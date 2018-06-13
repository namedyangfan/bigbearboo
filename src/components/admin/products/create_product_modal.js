import React from 'react'
import {Modal, Button, Icon} from 'react-materialize'
import * as AdminProductsApi from 'api/admin_products'
import $ from 'jquery'; 
import Dropdown from 'react-dropdown'

export default class CreateProductModal extends React.Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      category: {value: 1, label: 'BRIDES'}
    }
  }

  updateProduct = (e) => {
    const { id, value } = e.target
    this.setState({ [id]: value })
  }

  createProduct = (e) => {
    let params = {
      name        : this.state.name,
      category_id : this.state.category.value
    }

    AdminProductsApi.post(params)
    .then((response) => {
      console.log(response.data)
      this.props.history.push(`/admin/product/${response.data.id}`)
    })
    .catch((error) => {
      console.log(error.response.data.errors)
    })
  }

  handleSelectCategory = (e) => {
    this.setState({category: e})
    console.log('state:' + this.state.category.value)
  }

  renderCategory = (e) => {
    const options = [
      { value: 1, label: 'BRIDES' },
      { value: 2, label: 'BRIDESMAIDS' },
      { value: 3, label: 'ACCESSORIES' }
    ]

    return(
      <Dropdown options={options} onChange={this.handleSelectCategory} value={this.state.category} 
        placeholder="Select an option"/>
    )
  }

  renderSaveButton = (e) => {
    return <div onClick={this.createProduct}><Button modal="close">Save</Button></div>
  }

  render(){
    return(
      <Modal header='Add Product' id='foo'
        trigger={
          <Button className="right" waves='light' onClick={this.createProduct}>
            product
            <Icon right>add</Icon><
          /Button>
        } 
        actions={this.renderSaveButton()}>

        <div className="row">
          <div className="col s12 m12">
            <div className="divider"></div>
            <div className="section teal-text">
              <span>Name</span>
              <input className='black-text' id="name" type="text" value={this.state.name} onChange={this.updateProduct}/>
            </div>
            <div className="section teal-text">
              <span>Category</span>
              {this.renderCategory()}
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}