import React from 'react'
import Header from '.././components/header'
import ShopItem from '.././components/home/shop_item'

export default class Home extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <ShopItem />
      </div>
      );
  }
}
