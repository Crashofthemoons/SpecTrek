import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from "./MainPage/MainPage"
import Login from "./Login/Login"
import { Route, Redirect } from "react-router-dom"
import APIManager from "./APIManager"
import Order from "./MainPage/Order"
import OrderDetails from "./MainPage/OrderDetails"
import { Button, Card, Image } from 'semantic-ui-react'

class ApplicationViews extends Component {
  state = {
    currentUser: "",
    orders: []
  }

  componentDidMount() {
    const _state = {}
    let cUser = JSON.parse(localStorage.getItem("SpecTrek"))
    APIManager.getData("orders?_expand=user")
    .then(orders => _state.orders = orders)
    .then(_state.currentUser = cUser.id)
    .then(() =>{
      this.setState(_state)
    })
  }

  isAuthenticated = () =>
    localStorage.getItem("SpecTrek") !== null ||
    sessionStorage.getItem("SpecTrek") !== null;


  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          if (this.isAuthenticated()) {
            return <MainPage {...props} orders={this.state.orders} currentUser={this.state.currentUser} />
          } else {
            return <Login />
          }
        }} />
        <Route exact path="/order" render={(props) => {
          return <Order {...props} order={props.location.state}/>
        }} />
        <Route path="/order/orderdetails" render={(props) => {
            return <OrderDetails {...props} order={props.location.state}/>
        }} />
      </React.Fragment>
    );
  }
}

export default ApplicationViews;