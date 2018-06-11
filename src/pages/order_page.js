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
      user_id: localStorage.getItem('user_id'),
      needRefresh: false,
      loading: true,
    };
  }
  componentDidMount(){
    this.getCurrentOrder()
  }

  componentDidUpdate(prevProps,prevState){
    if(this.state.needRefresh && !this.state.loading){
      console.log('REFRESH DATA &&&&')
      this.getCurrentOrder()
    }
  }

  setNeedRefresh = () =>{
    this.setState({needRefresh:true})
  }

  getCurrentOrder(){
    const params = {
      user_id : this.state.user_id,
      token   : this.state.token
    }

    this.setState({loading: true})

    CartOrdersApi.show(params)
    .then((response) => {
      console.log('CARTSHOW' + JSON.stringify(response.data))
      this.setState(response.data, ()=>{ this.setState({loading:false})})
    })
    .catch((error) => {
      console.log(JSON.stringify(error))
    })
    .then(()=> {
      this.setState({
        needRefresh : false,
      })
    })
  }

  render(){
    return(
      <div className="order-page">
        <div className="container">
          <div className="row">
            <div className="col s12 m8">
              <OrderItemsTable order_items={this.state.order_items} setNeedRefresh={this.setNeedRefresh} 
                loading={this.state.loading}/>
            </div>
            <div className="col s12 m4">
              <div className="card-panel grey lighten-4">
                <CheckOutContainer subtotal={this.state.subtotal} tax={this.state.tax} 
                  shipping={this.state.shipping} total={this.state.total} loading={this.state.loading}/>
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