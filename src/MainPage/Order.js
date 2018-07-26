import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Button, Card, Image } from 'semantic-ui-react'
import APIManager from "../APIManager"
import OrderDetails from "./OrderDetails"

export default class Order extends Component {
    render() {
    return (
        <React.Fragment>
            <Card id={this.props.order.id}>
                <Card.Content>
                    {/* <Image floated='right' size='mini' src='/images/avatar/large/steve.jpg' /> */}
                    <Card.Header>
                        Order Status: {this.props.order.orderStatus}</Card.Header>
                    <Card.Header>{this.props.order.patientName}</Card.Header>
                    <Card.Meta>Order Date: {this.props.order.orderDate}</Card.Meta>
                    <Card.Meta>Estimated Ship Date: {this.props.order.shipDate}</Card.Meta>
                    <Card.Meta>Estimated Arrival Date: {this.props.order.arrivalDate}</Card.Meta>
                    <Card.Description>
                        Frame Name: {this.props.order.frameName}</Card.Description>
                    <Card.Description>{this.props.order.lensDesign} {this.props.order.lensMaterial} {this.props.order.lensCoating}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color='teal'>
                            <Link
                                to={{
                                    pathname: "/order/orderdetails",
                                    state: this.props.order
                                }}>
                                Details
                            </Link>
                        </Button>
                        <Button basic color='red'>
                            Delete
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        </React.Fragment>
    )
    }
}

