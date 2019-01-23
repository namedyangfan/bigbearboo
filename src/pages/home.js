import React from 'react'
import HomePageLayout from 'layouts/home_page_layout'
import ShopItem from 'components/home/shop_item'
import SlickCarousel from 'components/home/slick_carousel'

export default class Home extends React.Component {

  render() {
    return (
      <div className='grey lighten-4'>
        <SlickCarousel />
        <div className='section'>
          <ShopItem history={this.props.history}/>
        </div>
      </div>
      );
  }
}
