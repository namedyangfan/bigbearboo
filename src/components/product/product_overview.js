import React from 'react'
import _ from 'lodash'
import $ from 'jquery'
import Dropdown from 'react-dropdown'

export class VarianceTag extends React.Component {

  render(){
    return(
      <div className='chip'>
        {this.props.attribute.name}
      </div> 
    )
  }
}

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
        <h6>
          {this.props.product && this.props.product.name}
        </h6>
      </div>
    )
  }

  renderPrice = () => {
    return(
      <div className='section'>
        <h7>
          CA${this.props.product && this.props.product.price}
        </h7>
      </div>
    )
  }

  renderVariance = () => {
    return(
      _.map(this.props.product && this.props.product.attributes, (value) => 
        <VarianceTag attribute={value}/>
      )
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
          {this.renderVariance()}
          {this.renderQuantity()}
          {this.renderAddtoCartButton()}
          {this.renderDescription()}
      </div>
    )
  }
}