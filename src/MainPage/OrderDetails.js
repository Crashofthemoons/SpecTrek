import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Segment, Button } from 'semantic-ui-react'
import APIManager from "../APIManager"
import Order from "./Order"

export default class OrderDetails extends Component {

    back = () => {
        this.props.history.push("/")
    }

    componentDidMount =() => {
        APIManager.getData("orders?_expand=user")
        .then(users => {
            console.log(users)
        })
    }

    render() {
        return (
            <React.Fragment>
                <Segment.Group>
                    <Segment color='teal'>Patient Name: {this.props.order.patientName}</Segment>
                    <Segment.Group horizontal>
                        <Segment>{this.props.order.dr}</Segment>
                        <Segment>Optician: {this.props.order.user}</Segment>
                    </Segment.Group>
                    <Segment.Group>
                        <Segment>Lab Status: {this.props.order.orderStatus}</Segment>
                        <Segment>{this.props.order.lensDesign} {this.props.order.lensMaterial} {this.props.order.lensCoating} {this.props.order.tint}</Segment>
                        <Segment>Frame: {this.props.order.frameName}, {this.props.order.frameManufacturer}, {this.props.order.frameMaterial}</Segment>
                        <Segment.Group horizontal>
                            <Segment>Frame Measurements:</Segment>
                            <Segment>A: {this.props.order.a}</Segment>
                            <Segment>B: {this.props.order.b}</Segment>
                            <Segment>DBL: {this.props.order.dbl}</Segment>
                            <Segment>ED: {this.props.order.ed}</Segment>
                            <Segment>Temple: {this.props.order.temple}</Segment>
                        </Segment.Group>
                    </Segment.Group>
                    <Segment.Group horizontal>
                        <Segment>OD:</Segment>
                        <Segment>{this.props.order.sphereOd}</Segment>
                        <Segment>{this.props.order.cylOd}</Segment>
                        <Segment>{this.props.order.axisOd}</Segment>
                        <Segment>{this.props.order.add}</Segment>
                        <Segment>{this.props.order.pdOd}</Segment>
                        <Segment>{this.props.order.ocsegOd}</Segment>
                    </Segment.Group>
                    <Segment.Group horizontal>
                        <Segment>OS:</Segment>
                        <Segment>{this.props.order.sphereOs}</Segment>
                        <Segment>{this.props.order.cylOs}</Segment>
                        <Segment>{this.props.order.axisOs}</Segment>
                        <Segment>{this.props.order.add}</Segment>
                        <Segment>{this.props.order.pdOs}</Segment>
                        <Segment>{this.props.order.ocsegOs}</Segment>
                    </Segment.Group>
                    <Segment>Order Date: {this.props.order.orderDate}</Segment>
                    <Segment>Estimated Ship Date: {this.props.order.shipDate}</Segment>
                    <Segment>Estimated Arrival Date: {this.props.order.arrivalDate}</Segment>
                </Segment.Group>
                <Button onClick={this.back}>
                    Back
                </Button>
            </React.Fragment>
        )

    }

}
