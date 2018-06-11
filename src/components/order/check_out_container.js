import React from 'react'
import _ from 'lodash'
import $ from 'jquery'
import Dropdown from 'react-dropdown'
import classNames from'classnames'

export default class CheckOutContainer extends React.Component {

  renderPurchaseSummary = () => {
    return(
      <div>
        <p>PURCHASE SUMMARY</p>
        <div className="divider"></div>
        <p>
          SUBTOTAL
          <div className='right'>
            {this.props.subtotal}
          </div>
        </p>
        <p>
          Shipping estiamte
          <div className='right'>
            {this.props.shipping}
          </div>
        </p>
        <p>
          Taxes estiamte
          <div className='right'>
            {this.props.tax}
          </div>
        </p>
        <div className="divider"></div>
        <h6>
          ESTIMATED TOTAL
          <div className='right'>
            {this.props.total}
          </div>
        </h6>
      </div>
    )
  }

  render(){
    return(
      <div className='container'>
        {this.renderPurchaseSummary()}
      </div>
    )
  }
}