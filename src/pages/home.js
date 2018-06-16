import React from 'react'
import HomePageLayout from 'layouts/home_page_layout'
import ShopItem from 'components/home/shop_item'
import SlickCarousel from 'components/home/slick_carousel'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numShopItem: 0
    };
  }

  handleAddShopItem = () => {
    console.log(this.state.numShopItem)
    this.setState((prevState) => {
      return {numShopItem: prevState.numShopItem + 1}
    })
  }

  render() {
    return (
      <div className='grey lighten-4'>
        <SlickCarousel />
        <ShopItem handleClick={this.handleAddShopItem} history={this.props.history}/>
      </div>
      );
  }
}
