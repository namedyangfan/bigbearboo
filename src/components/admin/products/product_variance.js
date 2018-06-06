import React from 'react'
import _ from 'lodash'
import $ from 'jquery'
import classNames from'classnames'
import * as AdminProductAttributesApi from 'api/admin_product_attributes'

export class Row extends React.Component {
  constructor(props) {
    super(props)
    const params = props.row
    this.state = { 
      name: params.name,
      picture: params.picture,
      quantity_owned: params.quantity_owned,
      product_attribute_id: params.product_attribute_id,
      isSaved:null,
      diplayRow:true
    }

    $(document).ready(function(){
      $('.materialboxed').materialbox();
    });
  }

  saveVariance = _.debounce(() => {
    const params = {
      product_attribute_id: this.state.product_attribute_id,
      name: this.state.name,
      picture: this.state.picture,
      quantity_owned: this.state.quantity_owned,
    }

    AdminProductAttributesApi.patch(params)
    .then((response) => {
      console.log(response.data)
      this.setState({isSaved:true})
    })
    .catch((error) => {
      console.log(error.response.data.errors)
    })
    console.log ('saveVariance:' + params)

  }, 1000)

  handleDelete = () => {
    const params = {product_attribute_id: this.state.product_attribute_id}
    AdminProductAttributesApi.destroy(params)
    .then((response) => {
      console.log(response.data)
      this.props.getProducts()
    })
    .catch((error) => {
      console.log(error.response.data.errors)
    })
  }

  handleOnChange = (e) => {
    const { id, value } = e.target
    this.setState({ 
      [id]: value,
       isSaved: false
    }, ()=>{this.saveVariance()})
  }

  renderName = () => {
    return(
      <div className='col s3'>
        <input id="name" type="text" value={this.state.name} placeholder="variance name"
          onChange={this.handleOnChange}/>
      </div>
    )
  }  

  renderPictureUrl = () => {
    return(
      <div className='col s3'>
        <input id="picture" type="text" value={this.state.picture} placeholder="picture"
          onChange={this.handleOnChange}/>
      </div>
    )
  }

  renderInventory = () => {
    return(
      <div className='col s2'>
        <input id="quantity_owned" type="text" value={this.state.quantity_owned} 
          placeholder="inventory" onChange={this.handleOnChange}/>
      </div>
    )
  }

  renderPicture = () => {
    return(
      <div className='col s2'>
        <img className="materialboxed" width="50" src={this.state.picture} />
      </div>
    )
  }

  renderDeleteButton = () => {
    return(
      <div className='col s2'>
        <button class="waves-effect waves-light btn" onClick={this.handleDelete}>remove</button>
      </div>
    )
  }

  renderStatus = () => {
    const className = classNames ({
      'material-icons': true,
      'saved': this.state.isSaved,
    })

    return(
      this.state.isSaved
      ?(<i className={className}>check_circle</i>)
      :(<div/>)
    )
  }

  render(){
    if(this.state.diplayRow){
      return(
        <div className='row white'>
          {this.renderName()}
          {this.renderPictureUrl()}
          {this.renderInventory()}
          {this.renderPicture()}
          {this.renderDeleteButton()}
          {this.renderStatus()}
        </div>
      )
    } 
    else {
      return(<div />)
    }
  }
}

export default class ProductVariance extends React.Component {
  constructor(props) {
    super();
    this.state = {
      columnNames: ['Name', 'Picture', 'Inventory'],
    }
  }

  handleAddVariance = _.debounce(() => {
    const params = {
      product_id: this.props.product_id,
      quantity_owned: 0
    }

    AdminProductAttributesApi.post(params)    
    .then((response) => {
      console.log(response.data)
      this.props.getProducts()
    })
    .catch((error) => {
      console.log(error.response.data.errors)
    })

  },500)

  renderColumnNames = () => {
    return(
      _.map(this.state.columnNames, (value) => <th>{value}</th>)
    )
  }

  renderRows = () => {
    return(
      _.map(this.props.attributes, (row) => 
        <Row row={row} history={this.props.history} getProducts={this.props.getProducts}/>
      )
    )
  }

  renderAttributeTable = () => {
    if(this.props.attributes){
      return(
        <div className="section grey lighten-4 variance-table">
          {this.renderRows()}
        </div>
      )
    }
  }

  render(){
    return(
      <div className="card-panel product-variance">
        <div className="row">
          <h5  className="red-text text-lighten-2 col s12">
            <span>Variance</span>
            <button className="btn waves-effect waves-light right" onClick={this.handleAddVariance}>add Variance
              <i className="material-icons right">add</i>
            </button>
          </h5>
        </div>
        {this.renderAttributeTable()}
      </div>
    )
  }
}