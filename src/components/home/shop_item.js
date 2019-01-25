import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import  Slider from "react-slick";
import _ from 'lodash'
import * as HomeProductsApi from 'api/home_products'
import LoadingState from 'share/loading_state'

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "none"}}
      onClick={onClick}
    >
      <i className="material-icons left">arrow_right</i>
    </div>
  );
}

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "none"}}
      onClick={onClick}
    >
      <i className="material-icons right">arrow_left</i>
    </div>
  );
}

class ItemCard extends React.Component {
  handleOnClick = () => {
    this.props.history.push(`/product/${this.props.product_id}`)
  }

  render(){
    return(
          <div className="card-image" onClick={this.handleOnClick}>
            <div className="product-card">
              <img src={this.props.product.picture}/>
            </div>
          </div>
    )
  }
}

export default class ShopItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products    : null,
      isLoading   : true,
    };
  }

  componentDidMount(){
    const params = {page: 1}

    HomeProductsApi.index(params)
    .then((response) => {
      this.setState({
        products : response.data,
        isLoading: false
      })
    })
    .catch((error) => {
      console.log(error.response.data.errors)
    })
  }

  renderCards = () => {
    return(
      _.map(this.state.products, (product) => 
        <ItemCard product={product} product_id={product.product_id} history={this.props.history}/>  
      )
    )
  }

  renderCarousel = () => {
    const settings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1250,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <div className='shop-item-carousel'>
        <div className='section'>
              <Slider {...settings}>
                {this.renderCards()}
              </Slider>
        </div>
      </div>    
    )
  }

  render() {
    return (
      <div className="shop-item">
        <div className="container">
          {
            this.state.isLoading?(
              <LoadingState />
            ):(
              this.renderCarousel()
            )
          }
        </div>
      </div>
      );
  }
}
