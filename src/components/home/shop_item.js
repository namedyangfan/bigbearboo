import React from 'react'
import axios from 'axios'
import NaonaoImage from '../.././images/naonao.jpg'
import _ from 'lodash'

export default class ShopItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentWillMount(){
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => {
      this.setState({ data: _.slice(res.data,0,5) })
      console.log(this.state.data)
    })

  }

  renderItemCards(){
    return(
     _.map(this.state.data, function(value){
      return(
        <div className="col-sm-4 test">
          <div className="card box-shadow h-5 d-inline-block text-center">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">{value.id}</h4>
            </div>
            <div className="card-body naonao">
              <h4 className="card-title">{value.title}</h4>
              <small className="text-muted">{value.body}</small>
               <img className="card-img-top mh-10" src={NaonaoImage} alt="Card image cap" />
              <button type="button" className="btn btn-lg btn-block btn-outline-primary">Sign up for free</button>
            </div>
          </div>
        </div>
      )
    })
   )
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.renderItemCards()}
        </div>
      </div>
      );
  }
}
