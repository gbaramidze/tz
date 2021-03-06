import withRedux from 'next-redux-wrapper'
import { withRouter } from 'next/router'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import createStore from '../src/store/createStore'
import Navigation from "../src/components/Navigation";
import "../static/css/bootstrap.css";
import React from 'react'

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
    }
  }
  render () {

    const { Component, pageProps, store, router } = this.props
    return (
      <Container>
          <Provider store={store}>
              <Navigation />
              <Component router={router} {...pageProps} />
          </Provider>
      </Container>
    )
  }
}

export default withRedux(createStore)(withRouter(MyApp))
