import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Form, Menu, Container } from 'semantic-ui-react'
import APIManager from "../APIManager"
import Order from "./Order"
import { Button, Card, Image } from 'semantic-ui-react'
import '../App.css';
import NewOrder from "./NewOrder"

export default class MainPage extends Component {

    state = {
        currentUser: ""
    }

    componentWillMount() {
        let cUser = JSON.parse(localStorage.getItem("SpecTrek"))
        this.setState({
            currentUser: cUser.id
        })
    }

    render() {
        return (
            <React.Fragment>
                <Menu fixed='top' inverted>
                        <Menu.Item as='a' header>
                            <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
                            Spec Trek
                        </Menu.Item>
                    <Menu.Item>
                        <Link
                            to={{
                                pathname: "/neworder",
                                state: { currentUser: this.state}
                            }}>
                            New Order
                        </Link>
                    </Menu.Item>
                </Menu>
                    <Card.Group style={{ marginTop: '7em' }}>
                        {
                            this.props.orders.map(order =>
                                <Order key={order.id} order={order} currentUser={this.currentUser}>
                                    {order}
                                </Order>
                            )
                        }
                    </Card.Group>
            </React.Fragment>
                )
            }

}