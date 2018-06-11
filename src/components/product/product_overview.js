import React from 'react'
import _ from 'lodash'
import $ from 'jquery'
import Dropdown from 'react-dropdown'
import classNames from'classnames'
import {connect} from 'react-redux';
import {addItem} from 'actions/cart'

class VarianceTag extends React.Component {
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

class ProductOverview extends React.Component {
  constructor(props) {
    super();
    this.state = {
      quantity: '1',
    }
  }

  handleAddItem = () => {
    const itemParams = {
      product_id: this.props.product.product_id,
      quantity: this.state.quantity,
      product_attribute_id: this.props.selectedVarianceId
    }

    this.props.addItem(itemParams)
  }

  handleSelectQuantity = (quantity) =>{
    this.setState({quantity: quantity.value})
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

    return(
      <div className="row">
        <div className="col s5 m5 l3">
          Quantity
          <Dropdown options={options} onChange={this.handleSelectQuantity} value={this.state.quantity} 
            placeholder="Select an option"/>
        </div>
      </div>
    )
  }  

  renderAddtoCartButton = () => {
    return(
      <div>
        <a className="waves-effect waves-light btn col s12" onClick={this.handleAddItem}>
          Add to cart
        </a>
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

const mapStateToProps = (state) => {
  return {
      numberItems: state.numberItems,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addItem: (itemParams) => { dispatch(addItem(itemParams)) }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductOverview)