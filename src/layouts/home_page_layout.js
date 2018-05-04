import React from 'react'
import Header from '.././components/header'
import Footer from '.././components/footer'
import aux from '../aux'
export default class HomePageLayout extends React.Component {

  render() {
    return (
      <div>
        <Header />
          {this.props.children}
        <Footer />
      </div>
      );
  }
}
