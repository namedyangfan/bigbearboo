import React from 'react'
import Header from '.././components/header'
import Footer from '.././components/footer'
import aux from '../aux'
export default class HomePageLayout extends React.Component {

  render() {
    return (
      <div>
        <Header />
          <main>
            {this.props.children}
          </main>
        <Footer />
      </div>
      );
  }
}
