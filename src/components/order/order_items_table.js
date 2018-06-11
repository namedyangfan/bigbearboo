import React from 'react'
import _ from 'lodash'
import $ from 'jquery'
import Dropdown from 'react-dropdown'
import classNames from'classnames'

export class Row extends React.Component {
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

export default class OrderItemsTable extends React.Component {
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
          <Row row={row} history={this.props.history}/>
        )
      )
    }else{
      return (<div></div>)
    }
  }

  render(){
    return(
      <div className="card-panel order-items-table">
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
    )
  }

}