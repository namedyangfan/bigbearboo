import React from 'react'
import _ from 'lodash'
import * as AdminProductsApi from 'api/admin_products'
import EditorConvertToHTML from 'share/editor/editor'

export default class AdminProduct extends React.Component {
  constructor(props) {
    super();
    this.state = {
      id          : '',
      name        : '',
      description : '',
      detail      : '',
      catagory    : '',
      picture     : '',
    }
  }

  componentDidMount() {
    const params = {id: this.props.match.params.id}

    AdminProductsApi.show(params)
    .then((response) => {
      console.log(response.data)
      var newState = _.assign({}, this.state, response.data)
      this.setState(newState)
    })
    .catch((error) => {
      console.log(error.response.data.errors)
    })
  }

  updateProduct = (e) => {
    const { id, value } = e.target
    this.setState({ [id]: value })
  }

  updateDetail = _.debounce((e) => {
    console.log("UPDATEDETAIL")
    this.setState({ detail: e })
  }, 500) 

  handleSubmit = (e) => {
    const stateParams = _.assign({}, this.state)
    const params = {
      id          : stateParams.id,
      name        : stateParams.name,
      description : stateParams.description,
      detail      : stateParams.detail,
      name        : stateParams.name,
      catagory    : stateParams.catagory,
      picture     : stateParams.picture
    }

    AdminProductsApi.patch(params)
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error.response.data.errors)
    })
  }

  renderPicture = () => {
    return(
      <div className="card-panel">
        <div className="row">
          <div className="col s12 m10">
            <img className="materialboxed" width="350" src={this.state.picture} />
            <input id="picture" type="text" value={this.state.picture} onChange={this.updateProduct} />
            <label htmlFor="picture">Picture URL</label>
          </div>
        </div>
      </div>
    )
  }

  renderTitle = () => {
    return(
      <div className="card-panel">
        <div className="row">
          <div className="col s12 m6">
            <input id="name" type="text" value={this.state.name} onChange={this.updateProduct}/>
            <label htmlFor="name" className="red-text text-lighten-2">Name</label>
          </div>
        </div>
      </div>
    )
  }

  renderDescription = () => {
    return(
      <div className="card-panel">
        <div className="row">
          <div className="col s12 m10">
            <input id="description" type="text" value={this.state.description} onChange={this.updateProduct}/>
            <label htmlFor="description">Description</label>
          </div>
        </div>
      </div>
    )
  }  

  renderUpdateButton =() => {
    return(
      <div className="row">
        <div className="col">
          <button className="btn waves-effect waves-light offset-s1" onClick={this.handleSubmit}>Submit
            <i className="material-icons right">send</i>
          </button>
        </div>
      </div>
    )
  }

  render(){
    return(
      <div className="row">
        <div className="col s10 m10 l10 card-panel offset-s1 offset-m1 offset-l1">
          {this.renderTitle()}
          {this.renderPicture()}
          {this.renderDescription()}
          <div className="card-panel">
            <EditorConvertToHTML html={this.state.detail} onChange={this.updateDetail}/>
          </div>
          {this.renderUpdateButton()}
        </div>
      </div>
    )
  }
}
      // <div>product items {this.state.product?(this.state.product.id):('')}</div>
