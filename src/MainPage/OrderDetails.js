import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Segment, Button, SegmentGroup, Divider, Menu, Image } from 'semantic-ui-react'
import APIManager from "../APIManager"
import Order from "./Order"

export default class OrderDetails extends Component {

    back = () => {
        this.props.history.push("/")
    }

    render() {
        return (
            <React.Fragment>
                <Menu fixed='top' inverted>
                        <Menu.Item as='a' header onClick={this.back}>
                            <Image id="logo" size='tiny' srcSet='../Images/spec-trek_circle.png' style={{ marginRight: '1.5em' }} />
                            Spec Trek
                        </Menu.Item>
            </Menu>
                <Segment.Group style={{ marginTop: '7em' }}>
                    <Segment.Group horizontal>
                    <Segment inverted color='#fff'>Patient Name: {this.props.order.patientName}</Segment>
                    </Segment.Group>
                    <Divider inverted />
                    <Segment.Group horizontal>
                        <Segment inverted color='#fff'>{this.props.order.dr}</Segment>
                        <Segment inverted color='#fff'>Optician: {this.props.order.user.username}</Segment>
                    </Segment.Group>
                    <Divider inverted />
                    <Segment.Group>
                    <Segment.Group horizontal>
                        <Segment inverted color='#fff'>Lab Status: {this.props.order.orderStatus}</Segment>
                    </Segment.Group>
                    <Segment.Group horizontal>
                        <Segment inverted color='#fff'>{this.props.order.lensDesign} {this.props.order.lensMaterial} {this.props.order.lensCoating} {this.props.order.tint}</Segment>
                    </Segment.Group>
                    <Segment.Group horizontal>
                        <Segment inverted color='#fff'>Frame: {this.props.order.frameName}, {this.props.order.frameManufacturer}, {this.props.order.frameMaterial}</Segment>
                    </Segment.Group>
                    <Divider inverted />
                        <Segment.Group horizontal>
                            <Segment inverted color='#fff'>Frame Measurements:</Segment>
                            <Segment inverted color='#fff'>A: {this.props.order.a}</Segment>
                            <Segment inverted color='#fff'>B: {this.props.order.b}</Segment>
                            <Segment inverted color='#fff'>DBL: {this.props.order.dbl}</Segment>
                            <Segment inverted color='#fff'>ED: {this.props.order.ed}</Segment>
                            <Segment inverted color='#fff'>Temple: {this.props.order.temple}</Segment>
                        </Segment.Group>
                    </Segment.Group>
                    <Divider inverted />
                    <Segment.Group horizontal>
                        <Segment inverted color='#fff'>OD:</Segment>
                        <Segment inverted color='#fff'>{this.props.order.sphereOd}</Segment>
                        <Segment inverted color='#fff'>{this.props.order.cylOd}</Segment>
                        <Segment inverted color='#fff'>{this.props.order.axisOd}</Segment>
                        <Segment inverted color='#fff'>{this.props.order.add}</Segment>
                        <Segment inverted color='#fff'>{this.props.order.pdOd}</Segment>
                        <Segment inverted color='#fff'>{this.props.order.ocsegOd}</Segment>
                    </Segment.Group>
                    <Divider inverted />
                    <Segment.Group horizontal>
                        <Segment inverted color='#fff'>OS:</Segment>
                        <Segment inverted color='#fff'>{this.props.order.sphereOs}</Segment>
                        <Segment inverted color='#fff'>{this.props.order.cylOs}</Segment>
                        <Segment inverted color='#fff'>{this.props.order.axisOs}</Segment>
                        <Segment inverted color='#fff'>{this.props.order.add}</Segment>
                        <Segment inverted color='#fff'>{this.props.order.pdOs}</Segment>
                        <Segment inverted color='#fff'>{this.props.order.ocsegOs}</Segment>
                    </Segment.Group>
                    <Divider inverted />
                    <Segment.Group horizontal>
                        <Segment inverted color='#fff'>Order Date: {this.props.order.orderDate}</Segment>
                    </Segment.Group>
                    <Segment.Group horizontal>
                        <Segment inverted color='#fff'>Estimated Ship Date: {this.props.order.shipDate}</Segment>
                    </Segment.Group>
                    <Segment.Group horizontal>
                        <Segment inverted color='#fff'>Estimated Arrival Date: {this.props.order.arrivalDate}</Segment>
                    </Segment.Group>
                </Segment.Group>
                <Button basic color='red' onClick={this.back}>
                    Back
                </Button>
            </React.Fragment>
        )

    }

}
