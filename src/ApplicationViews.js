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
import NewOrder from "./MainPage/NewOrder"


class ApplicationViews extends Component {
  state = {
    currentUser: "",
    orders: []
  }

  componentWillMount() {
    const _state = {}
    APIManager.getData("orders")
    .then(orders => _state.orders = orders)
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
            return <MainPage {...props} orders={this.state.orders} />
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
        <Route path="/neworder" render={(props) => {
            return <NewOrder {...props} order={props.location.state}/>
        }} />
      </React.Fragment>
    );
  }
}

export default ApplicationViews;