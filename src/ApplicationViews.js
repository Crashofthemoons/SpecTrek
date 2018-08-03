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
import Search from "./MainPage/Search"
import EditOrder from "./MainPage/EditOrder"


class ApplicationViews extends Component {
  state = {
    currentUser: ""
  }



  // updateOrders() {
  //   APIManager.getData("orders?_sort=orderDate&_order=asc")
  //   .then(orders =>{
  //     console.log(orders)
  //     // this.setState({orders: orders})
  //   })
  // }

  isAuthenticated = () =>
    localStorage.getItem("SpecTrek") !== null ||
    sessionStorage.getItem("SpecTrek") !== null;


  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          if (this.isAuthenticated()) {
            return <MainPage {...props} />
          } else {
            return <Login />
          }
        }} />
        <Route exact path="/order" render={(props) => {
          return <Order {...props} role={props.location.state} order={props.location.state}/>
        }} />
        <Route exact path="/order/orderdetails" render={(props) => {
            return <OrderDetails {...props} order={props.location.state}/>
        }} />
        <Route path="/neworder" render={(props) => {
            return <NewOrder {...props} order={this.props.orders}/>
        }} />
        <Route exact path="/order/editorder" render={(props) => {
            return <EditOrder {...props} order={this.props.orders}/>
        }} />
        <Route path="/search" render={(props) => {
            return <Search {...props} search={this.props.search}/>
        }} />
      </React.Fragment>
    );
  }
}

export default ApplicationViews;