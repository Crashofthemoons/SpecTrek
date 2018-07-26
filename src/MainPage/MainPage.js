import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Form } from 'semantic-ui-react'
import APIManager from "../APIManager"
import Order from "./Order"
import { Button, Card, Image } from 'semantic-ui-react'


export default class MainPage extends Component {


    render() {
        return (
            <React.Fragment>
                <Card.Group>
                    {
                        this.props.orders.map(order =>
                            <Order key={order.id} order={order} currentUser={this.props.currentUser}>
                                {order}
                            </Order>
                        )
                    }
                </Card.Group>
            </React.Fragment>
        )
    }

}