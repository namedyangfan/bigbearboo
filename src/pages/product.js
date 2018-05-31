import React from 'react'
import * as HomeProductsApi from 'api/home_products'
import _ from 'lodash'

export default class ProductPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      product_id: 1,
    }
  }

  componentDidMount(){
    const params = {product_id: this.props.match.params.id}
    console.log('DIDMOUNT' + JSON.stringify(params))
    HomeProductsApi.show(params)
    .then((response) => {
      console.log(response.data)
      this.setState({
        product: response.data
      })
    })
    .catch((error) => {
      console.log(error.response.data.errors)
    })
  }

  renderProductOverview = () => {
    return(
      <div className="col s12 m7 l6">
        <div className="section">
        asdasd
        </div>
      </div>
    )
  }

   renderProductPicture= () => {
      const picture = this.state.product
        ? (this.state.product.picture)
        : ("")

    return(
      <div className="col s12 m7 l6">
        <div className="section">
          <div className="card-image">
            <img className="fit-card" src={picture} />
          </div>
        </div>
      </div>
    )
  }

  render(){
    return(
      <div className="container product-page">
        <div className="row">
          {this.renderProductPicture()}
          {this.renderProductOverview()}
        </div>
      </div>
    )
  }
}