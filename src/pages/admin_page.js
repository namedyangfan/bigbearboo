import React from 'react'
import _ from 'lodash'
import {Redirect, Link} from 'react-router-dom'
import * as AdminProductsApi from 'api/admin_products'
import CreateProductModal from 'components/admin/products/create_product_modal'

export class Row extends React.Component {

  handleClick = () => {
    console.log( this.props.match.params)
    this.props.history.push(`/admin/product/${this.props.row.id}`)
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
        <div className="col s10 m10 l10 card-panel offset-s1 offset-m1 offset-l1">
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
      <div>
        <div className="container"> 
          <CreateProductModal getProducts={this.getProducts}/>
          {this.renderProductsTable()}
        </div>
      </div>
    )
  }
}