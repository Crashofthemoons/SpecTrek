import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Button, Card, Select, Input, Icon, Label, Popup } from 'semantic-ui-react'
import TechOrder from "./TechOrder"
import OpticianOrder from "./OpticianOrder"

export default class Order extends Component {



    render() {

        if ( this.props.role === "Optician") { // shows optician actions on each order card

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
