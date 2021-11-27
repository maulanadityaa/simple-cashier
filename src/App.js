import React, { Component } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { NavbarComponent } from './components'
import NotFound from './components/NotFound';
import { Home, Success } from './pages'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <NavbarComponent />
          <main>
            <Switch>
              <Route  path="/" component={Home} exact/>
              <Route  path="/success" component={Success} exact/>
              <Route  path="/pesanan" component={NotFound} exact/>
            </Switch>
          </main>
      </BrowserRouter>
    )
  }
}