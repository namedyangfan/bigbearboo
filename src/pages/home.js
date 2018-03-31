import React from 'react'
import Header from '.././components/header'
import ShopItem from '.././components/home/shop_item'

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
      <div>
        <Header numShopItem={this.state.numShopItem}/>
        <ShopItem handleClick={this.handleAddShopItem}/>
      </div>
      );
  }
}
