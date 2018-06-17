import React from 'react'
import _ from 'lodash'
import {Redirect, Link} from 'react-router-dom'
import * as AdminProductsApi from 'api/admin_products'
import CreateProductModal from 'components/admin/products/create_product_modal'

export class Row extends React.Component {
  constructor(props) {
    super();
    this.state = {
      status: props.row.status,
      isPublished: props.row.status == 'Published'
    }
  }

  handleClick = () => {
    console.log( this.props.match.params)
    this.props.history.push(`/admin/product/${this.props.row.product_id}`)
  }

  handleChangeStatus = () => {
    console.log(this.props.row.status)
    const param = {
      product_id : this.props.row.product_id,
      user_id    : localStorage.getItem('user_id'),
      token      : localStorage.getItem('token')
    }

    if(this.state.isPublished){
      AdminProductsApi.draft(param)
      .then( response => {
        this.setState({
          isPublished: false,
          status: response.data.status
        })
      })
    }
    else{
      AdminProductsApi.publish(param)
      .then( response => {
        this.setState({
          isPublished: true,
          status: response.data.status
        })
      })
    }
  }

  renderCells(row){
    return _.map(row, (value, key) => this.renderCell(value, key))
  }

  renderCell = (value, key) => {
    if (key == 'picture'){
      return <td><img className="materialboxed" width="50" src={value}  onClick={this.handleClick}/></td>
    }
    else if (key == 'status'){
      return <td  onClick={this.handleClick}>{this.state.status}</td>
    }
    else{
      return <td  onClick={this.handleClick}>{value}</td>
    }
  }

  renderStatus = () => {
    return(
      <div>
        {this.state.isPublished ? (
          <td>
            <a className="waves-effect waves-light btn-small red" onClick={this.handleChangeStatus}>UNPUBLISH</a>
          </td>
        ) : (
          <td>
            <a className="waves-effect waves-light btn-small" onClick={this.handleChangeStatus}>PUBLISH</a>
          </td>
        )}
      </div>
    )
  }

  render(){
    return(
        <tr className="">
          {this.renderCells(this.props.row)}
          {this.renderStatus()}
        </tr>
    )
  }
}

export default class AdminPage extends React.Component {

  constructor(props) {
    super();
    this.state = {
      products: null
    }
  }

  componentDidMount(){
    this.getProducts()
  }

  getProducts = () => {
    const params = {
      user_id: localStorage.getItem('user_id'),
      token: localStorage.getItem('token')
    }

    AdminProductsApi.index(params)
    .then((response) => {
      console.log(response.data)
      this.setState({ 
        columnNames: response.data.keys,
        products: response.data.products
      })
    })
    .catch((error) => {
      console.log(error.response.data.errors)
    })
  }

  renderColumnNames = () => {
    return(_.map(this.state.columnNames, (value, i) => <th>{value}</th>))
  }

  renderRows = () => {
    return(
      _.map(this.state.products, (row) => 
        <Row row={row} match={this.props.match} history={this.props.history}/>
      )
    )
  }

  renderProductsTable = () => {
    return(
      <div className="row">
        <div className="col s12 card-panel">
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
        </div>
      </div>
    )
  }

  render(){
    return(
      <div className = "grey lighten-4">
        <div className="container"> 
          <div className='row card-panel'>
            <CreateProductModal getProducts={this.getProducts} history={this.props.history}/>
          </div>
          {this.renderProductsTable()}
        </div>
      </div>
    )
  }
}