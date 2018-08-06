import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Button, Card, Select, Input, Icon, Label, Popup } from 'semantic-ui-react'
import TechOrder from "./TechOrder"
import OpticianOrder from "./OpticianOrder"

export default class Order extends Component {



    render() {

        if ( this.props.role === "Optician") { // shows optician actions on each order card
            // console.log("optician")
            // let thisOrder
            // let dateObj = new Date()
            // let month = dateObj.getMonth() + 1;
            // let day = dateObj.getDate();
            // let year = dateObj.getFullYear();
            // let newDate = month + "/" + day + "/" + year

            // let weekOut = new Date()
            // let shipMonth = weekOut.getMonth() +1
            // let shipDay = weekOut.getDate() +1
            // let shipYear = weekOut.getFullYear()
            // let shippingDate = shipMonth + "/" + shipDay + "/" + shipYear
            // console.log(shippingDate)

            // if (this.props.order.remake === true) {
            //     thisOrder = "remake"
            // } else if (this.props.order.orderStatus === "Shipped") {
            //     thisOrder = "shipped"
            // } else if (parseInt(this.props.order.shipDate) >= parseInt(newDate) && this.props.order.orderStatus !== "Shipped") {
            //     thisOrder = "onTime"
            // } else {
            //     thisOrder = "late"
            // }
        return (
            <React.Fragment>
                <OpticianOrder key={this.props.order.id} order={this.props.order} role={this.props.role} currentUser={this.props.currentUser} deleteOrder={this.props.deleteOrder}/>
            </React.Fragment>
        )


        } else {
            // console.log("tech")
        return(
            <React.Fragment>
                <TechOrder key={this.props.order.id} order={this.props.order} remakeOrder={this.props.remakeOrder} orderStatus={this.props.orderStatus} handleSelectChange={this.props.handleSelectChange} role={this.props.role} currentUser={this.props.currentUser} deleteOrder={this.props.deleteOrder} />
            </React.Fragment>

        )

        }
    }
}
