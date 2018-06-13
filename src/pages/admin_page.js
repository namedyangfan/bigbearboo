import React from 'react'
import _ from 'lodash'
import {Redirect, Link} from 'react-router-dom'
import * as AdminProductsApi from 'api/admin_products'
import CreateProductModal from 'components/admin/products/create_product_modal'

export class Row extends React.Component {

  handleClick = () => {
    console.log( this.props.match.params)
    this.props.history.push(`/admin/product/${this.props.row.product_id}`)
  }

  renderCells(row){
    return _.map(row, (value, key) => this.renderCell(value, key))
  }

  renderCell = (value, key) => {
    if (key == 'picture'){
      return <td><img className="materialboxed" width="150" src={value} /></td>
    }
    else{
      return <td>{value}</td>
    }
  }

  render(){
    return(
      <tr className="" onClick={this.handleClick}>
        {this.renderCells(this.props.row)}
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
    AdminProductsApi.index()
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