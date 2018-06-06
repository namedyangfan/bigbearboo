import React from 'react'
import _ from 'lodash'
import $ from 'jquery'
import Dropdown from 'react-dropdown'
import classNames from'classnames'

export class VarianceTag extends React.Component {
  handleClick = () => {
    this.props.handleSelectVariance(this.props.attribute)
  }

  render(){
    const className = classNames({
        'chip': true,
        'teal lighten-2': this.props.selectedVarianceId == this.props.attribute.product_attribute_id
    })

    return(
      <div className={className} onClick={this.handleClick}>
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
        <h5>
          {this.props.product && this.props.product.name}
        </h5>
      </div>
    )
  }

  renderPrice = () => {
    return(
      <div className='section'>
        <h6>
          CA${this.props.product && this.props.product.price}
        </h6>
      </div>
    )
  }

  renderVariance = () => {
    return(
      _.map(this.props.product && this.props.product.attributes, (value) => 
        <VarianceTag attribute={value} handleSelectVariance={this.props.handleSelectVariance}
        selectedVarianceId={this.props.selectedVarianceId}/>
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