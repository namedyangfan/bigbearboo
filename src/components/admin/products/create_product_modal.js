import React from 'react'
import {Modal, Button, Icon} from 'react-materialize'
import * as AdminProductsApi from 'api/admin_products'
import $ from 'jquery'; 

export default class CreateProductModal extends React.Component {
  constructor(props) {
    super();
    this.state = {
      name: ''
    }
  }

  updateProduct = (e) => {
    const { id, value } = e.target
    this.setState({ [id]: value })
  }

  createProduct = (e) => {
    let params = {name:this.state.name}
    AdminProductsApi.post(params)
    .then((response) => {
      console.log(response.data)
      this.props.getProducts()
    })
    .catch((error) => {
      console.log(error.response.data.errors)
    })
  }

  renderSaveButton = (e) => {
    return <div onClick={this.createProduct}><Button modal="close">Save</Button></div>
  }

  render(){
    return(
      <Modal header='Modal Header' id='foo'
        trigger={
          <Button className="right" waves='light' onClick={this.createProduct}>
            product
            <Icon right>add</Icon><
          /Button>
        } 
        actions={this.renderSaveButton()}>

        <div className="row">
          <div className="col s12 m6">
            <input id="name" type="text" value={this.state.name} onChange={this.updateProduct}/>
            <label htmlFor="name" className="red-text text-lighten-2">Name</label>
          </div>
        </div>
      </Modal>
    )
  }
}