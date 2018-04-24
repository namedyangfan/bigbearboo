import React from 'react'
import axios from 'axios'
import NaonaoImage from '../.././images/naonao.jpg'
import { NavLink, Link } from 'react-router-dom'
import {connect} from 'react-redux';
import _ from 'lodash'
import {addItemNumber} from '../.././actions/current_user_item_numbers_actions'

class ShopItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      numShopItem: 0
    };
  }
  componentWillMount(){
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => {
      this.setState({ data: _.slice(res.data,0,20) })
    })
  }

  handleOnClick = () => {
    console.log(this.props)
    this.props.addItemNumber(1)
    }

  renderItemCards(){
    var a= this.state.data.map((value) =>
      <li className="col s3 clearfix::before">
        <div className="card">
          <div className="card-image">
            <img src={NaonaoImage} alt="Card image cap" />
            <span className="card-title">Naonao</span>
          </div>
          <div className="card-content">
            <span>Naonnao</span>
          </div>
          <div className="card-action">
            <span className="btn waves-effect waves-light" onClick={this.handleOnClick}>
              <i className="material-icons">add_shopping_cart</i>
            </span>
          </div>
        </div>
      </li>
    );
    return(
      <ul className="row">
        {a}
      </ul>
      )
  }

  render() {
    return (
      <div className="container">
          {this.renderItemCards()}
      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
      numberItems: state.numberItems,
      testtest: state.testtest
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addItemNumber: (number) => {
            dispatch(addItemNumber(number));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopItem)
