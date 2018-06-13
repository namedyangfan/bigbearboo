import React from 'react'
import _ from 'lodash'
import $ from 'jquery'
import Dropdown from 'react-dropdown'
import {withRouter} from 'react-router-dom'
import classNames from'classnames'
import {connect} from 'react-redux';
import CartOrderItemsApi from 'api/cart_order_items'
import {removeItem} from 'actions/cart'
import LoadingState from 'share/loading_state'

class Row extends React.Component {
  componentDidMount(){
    $(document).ready(function(){
      $('.materialboxed').materialbox();
    });
  }
  handleRemoveItem = () => {
    const itemParams = {
      order_item_id: this.props.row.order_item_id
    }
    this.props.removeItem(itemParams)
    this.props.setNeedRefresh()
  }
  
  renderPicture = () => {
    const pictureURL = this.props.row.product_attributes.picture ||this.props.row.product_picture

    return(
      <td className='row'>
        <div className='col'>
          <img className="materialboxed" width="100" src={pictureURL} />
        </div>
        <div className='col s5'>
            <div className='item-name'> {this.props.row.product_name} </div>
            <div className='item-name'> {this.props.row.product_attributes.name} </div>
            <div className='section item-details'>
              Item Price: ${this.props.row.unit_price}
            </div>
            <div className='remove-action' onClick={this.handleRemoveItem}>
              <span className='item-details'>REMOVE</span>
            </div>
        </div>
      </td>
    )
  }

  render(){
    return(
      <tr>
        {this.renderPicture()}
        <td>{this.props.row.quantity}</td>
        <td>{this.props.row.total_price}</td>
      </tr>
    )
  }
}

class OrderItemsTable extends React.Component {
  constructor(props) {
    super();
    this.state = {
      columnNames: ['ITEM', 'QUANTITY', 'ITEM TOTAL']
    }
  }

  renderColumnNames = () => {
    return(_.map(this.state.columnNames, (value, i) => <th>{value}</th>))
  }

  renderRows = () => {
    if(this.props.order_items){
      return(
        _.map(this.props.order_items, (row) => 
          <Row row={row} history={this.props.history} removeItem={this.props.removeItem}
            setNeedRefresh={this.props.setNeedRefresh}/>
        )
      )
    }else{
      return (<div></div>)
    }
  }

  render(){
    return(
      <div className="card-panel order-items-table">
        { this.props.loading? (
          <LoadingState />
          ):(
          <table className="highlight">
            <thead>
              <tr>
                {this.renderColumnNames()}
              </tr>
            </thead>
              <tbody>
                {this.renderRows()}
              </tbody>
          </table>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      user_name       : state.auth.user_name,
      user_id         : state.auth.user_id,
  }
}

const mapDispatchToProps = dispatch => {
    return {
        removeItem: (itemParams) => dispatch(removeItem(itemParams)),
    }
}

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( OrderItemsTable ));