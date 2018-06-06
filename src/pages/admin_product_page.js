import React from 'react'
import _ from 'lodash'
import * as AdminProductsApi from 'api/admin_products'
import EditorConvertToHTML from 'share/editor/editor'
import ProductVariance from 'components/admin/products/product_variance'
import $ from 'jquery';

export default class AdminProduct extends React.Component {
  constructor(props) {
    super();
    this.state = {
      product_id  : '',
      name        : '',
      description : '',
      detail      : '',
      catagory    : '',
      picture     : '',
      price       : null,
      attributes  : null,
      isloading   : true
    }
  }

  componentDidMount() {
    this.getProducts()
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });

  }

  getProducts = () => {
    const params = {product_id: this.props.match.params.id}
    
    AdminProductsApi.show(params)
    .then((response) => {
      console.log(response.data)
      var newState = _.assign({}, this.state, response.data)
      this.setState(response.data)
    })
    .catch((error) => {
      console.log(error.response.data.errors)
    })
  }

  updateProduct = (e) => {
    const { id, value } = e.target
    this.setState({ [id]: value })
  }

  updateDetail = (e) => {
    console.log("UPDATEDETAIL")
    this.setState({ detail: e })
  } 

  handleSubmit = (e) => {
    const stateParams = _.assign({}, this.state)
    const params = {
      product_id  : stateParams.product_id,
      name        : stateParams.name,
      price       : stateParams.price,
      description : stateParams.description,
      detail      : stateParams.detail,
      catagory    : stateParams.catagory,
      picture     : stateParams.picture
    }

    AdminProductsApi.patch(params)
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error.response.data.errors)
    })
  }

  renderTitle = () => {
    return(
      <div className="card-panel">
        <div className="row">
          <div className="col s12 m6">
            <h5  className="red-text text-lighten-2">Name</h5>
            <input id="name" type="text" value={this.state.name} onChange={this.updateProduct}/>
          </div>
          <div className="col s12 m6">
            <h5  className="red-text text-lighten-2">Price</h5>
            <input id="price" type="number" value={this.state.price} onChange={this.updateProduct}/>
          </div>
        </div>
      </div>
    )
  }

  renderPicture = () => {
    return(
      <div className="card-panel">
        <div className="row">
          <div className="col s12 m10">
            <h5  className="red-text text-lighten-2">Picture URL</h5>
            <img className="materialboxed" width="350" src={this.state.picture} />
            <input id="picture" type="text" value={this.state.picture} onChange={this.updateProduct} />
          </div>
        </div>
      </div>
    )
  }

  renderDescription = () => {
    return(
      <div className="card-panel">
        <div className="row">
          <div className="col s12 m10">
            <h5  className="red-text text-lighten-2">Description</h5>
            <input id="description" type="text" value={this.state.description} onChange={this.updateProduct}/>
          </div>
        </div>
      </div>
    )
  }  

  renderDetail = () => {
    return(
      <ul className="collapsible">
        <li className="active">
          <div class="collapsible-header">
            <h5  className="red-text text-lighten-2">Detail</h5>
          </div>
          <div class="collapsible-body">
            <EditorConvertToHTML html={this.state.detail} onChange={this.updateDetail}/>
          </div>
        </li>
      </ul>
    )
  }

  renderUpdateButton =() => {
    return(
      <div className="row">
        <button className="btn waves-effect waves-light col s12" onClick={this.handleSubmit}>Submit
          <i className="material-icons right">send</i>
        </button>
      </div>
    )
  }

  render(){
    return(
      <div className="admin-product-page row grey lighten-4">
        <div className="col s10 m10 l10 offset-s1 offset-m1 offset-l1">
          {this.renderTitle()}
          <ProductVariance attributes={this.state.attributes} getProducts={this.getProducts}
            product_id={this.state.product_id}/>
          {this.renderPicture()}
          {this.renderDescription()}
          {this.renderDetail()}
          {this.renderUpdateButton()}
        </div>
      </div>
    )
  }
}
      // <div>product items {this.state.product?(this.state.product.id):('')}</div>
