import React from 'react'
import $ from 'jquery'
import Dropdown from 'react-dropdown'

export default class ProductOverview extends React.Component {
  constructor(props) {
    super();
    this.state = {
      id: '',
    }
  }

  renderName = () => {
    return(
      <div>
        <h5>
          {this.props.product && this.props.product.name}
        </h5>
      </div>
    )
  }

  renderPrice = () => {
    return(
      <div>
        <h4>
          CA$ 999
        </h4>
      </div>
    )
  }

  renderQuantity = () => {
    const options = [ '1', '2', '3', '4','5']

    const defaultOption = options[0]
    return(
      <div className="row">
        <div className="col s5 m5 l3">
          Quantity
          <Dropdown options={options} onChange={this._onSelect} value={defaultOption} 
            placeholder="Select an option"/>
        </div>
      </div>
    )
  }  

  renderAddtoCartButton = () => {
    return(
      <div>
        <a className="waves-effect waves-light btn col s12">Add to cart</a>
      </div>
    )
  }

  renderDescription = () => {
    return(
      <div className="row">
        <div className="col s12">
          <div className="section">
            <hr className="greystyle"/>
          </div>
        </div>
      </div>
    )
  }

  render(){
    return(
      <div className="col s12 m5 l4">
          {this.renderName()}
          {this.renderPrice()}
          {this.renderQuantity()}
          {this.renderAddtoCartButton()}
          {this.renderDescription()}
      </div>
    )
  }
}