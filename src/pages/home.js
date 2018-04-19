import React from 'react'
import ShopItem from '.././components/home/shop_item'
import HomePageLayout from '.././layouts/home_page_layout'

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
        <ShopItem handleClick={this.handleAddShopItem}/>
      );
  }
}
