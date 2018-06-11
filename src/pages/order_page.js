import React from 'react'
import _ from 'lodash'
import $ from 'jquery'
import Dropdown from 'react-dropdown'
import {connect} from 'react-redux'
import classNames from'classnames'
import {withRouter} from 'react-router-dom'
import * as actions from 'actions/auth'
import * as CartOrdersApi from 'api/cart_orders'
import CheckOutContainer from 'components/order/check_out_container'
import OrderItemsTable from 'components/order/order_items_table'

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
      user_id: localStorage.getItem('user_id')
    };
  }
  componentDidMount(){
    const params = {
      user_id: this.state.user_id,
      token: this.state.token
    }
    CartOrdersApi.show(params)
    .then((response) => {
      this.setState(response.data)
    })
    .catch((error) => {
      console.log(error.response.data.errors)
    })
  }

  render(){
    const stateParams = _.assign({}, this.state)
    return(
      <div className="order-page">
        <div className="container">
          <div className="row">
            <div className="col s12 m8">
              <OrderItemsTable order_items={stateParams.order_items}/>
            </div>
            <div className="col s12 m4">
              <div className="card-panel grey lighten-4">
                <CheckOutContainer subtotal={stateParams.subtotal} tax={stateParams.tax} 
                  shipping={stateParams.shipping} total={stateParams.total}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      user_name       : state.auth.user_name,
      user_id         : state.auth.user_id,
      isAuthenticated : state.auth.isAuthenticated,
      numberItems     : state.numberItems
  }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch( actions.authLogOut())
    }
}

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Order ));