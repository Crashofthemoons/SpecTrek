import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Button, Card, Image } from 'semantic-ui-react'
import APIManager from "../APIManager"

const Order = ({ order, currentUser, }) => {
    // render() {
    return (
        <React.Fragment>
            <Card id={order.id}>
                <Card.Content>
                    {/* <Image floated='right' size='mini' src='/images/avatar/large/steve.jpg' /> */}
                    <Card.Header>
                        Order Status: {order.orderStatus}</Card.Header>
                    <Card.Header>{order.patientName}</Card.Header>
                    <Card.Meta>Order Date: {order.orderDate}</Card.Meta>
                    <Card.Meta>Estimated Ship Date: {order.shipDate}</Card.Meta>
                    <Card.Meta>Estimated Arrival Date: {order.arrivalDate}</Card.Meta>
                    <Card.Description>
                        Frame Name: {order.frameName}</Card.Description>
                    <Card.Description>{order.lensDesign} {order.lensMaterial} {order.lensCoating}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color='green'>
                            <Link className="card-link"
                                to={{
                                    pathname: "/order/${order.id}",
                                    state: { order, currentUser}
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
    // }
}

export default Order