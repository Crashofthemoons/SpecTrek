import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Segment, Button, SegmentGroup, Divider, Menu, Image, Card } from 'semantic-ui-react'
import APIManager from "../APIManager"
import Order from "./Order"

export default class OrderDetails extends Component {

    back = () => {
        this.props.history.push("/")
    }

    render() {
        let submitted
        let checkedIn
        let tinting
        let blocking
        let edging
        let polishing
        let coating
        let mounting
        let verification
        let shipped

        if (this.props.order.orderStatus === "Submitted") {
            submitted = "submitted"
        } else if (this.props.order.orderStatus === "Checked-In") {
            checkedIn = "checkedIn"
        } else if (this.props.order.orderStatus === "Tinting") {
            tinting = "tinting"
        } else if (this.props.order.orderStatus === "Blocking") {
            blocking = 'blocking'
        } else if (this.props.order.orderStatus === "Edging") {
            edging = "edging"
        } else if (this.props.order.orderStatus === "Polishing") {
            polishing = "polishing"
        } else if (this.props.order.orderStatus === "Coating") {
            coating = "coating"
        } else if (this.props.order.orderStatus === "Mounting") {
            mounting = "mounting"
        } else if (this.props.order.orderStatus === "Verification") {
            verification = "verification"
        } else if (this.props.order.orderStatus === "Shipped") {
            shipped = "shipped"
        }
        return (
            <React.Fragment>
                <Menu fixed='top' inverted>
                        <Menu.Item as='a' header onClick={this.back}>
                            <Image id="logo" size='tiny' srcSet='../Images/spec-trek_circle.png' style={{ marginRight: '1.5em' }} />
                            Spec Trek
                        </Menu.Item>
            </Menu>

                <Card.Group id="details" style={{margin: '100px'}}>
                <Card fluid>
                <Card.Content>
                    <Card.Header>Patient Name: {this.props.order.patientName}</Card.Header>
                    <Card.Meta>{this.props.order.dr}</Card.Meta>
                    <Card.Meta>Optician: {this.props.order.user.username}</Card.Meta>
                    <Card.Description>Lab Status: {this.props.order.orderStatus}</Card.Description>
                    <Card.Description>{this.props.order.lensDesign} {this.props.order.lensMaterial} {this.props.order.lensCoating} {this.props.order.tint}</Card.Description>
                </Card.Content>
                <Segment.Group horizontal>
                    <Segment className={submitted}>Submitted</Segment>
                    <Segment className={checkedIn}>Checked-In</Segment>
                    <Segment className={tinting}>Tinting</Segment>
                    <Segment className={blocking}>Blocking</Segment>
                    <Segment className={edging}>Edging</Segment>
                    <Segment className={polishing}>Polishing</Segment>
                    <Segment className={coating}>Coating</Segment>
                    <Segment className={mounting}>Mounting</Segment>
                    <Segment className={verification}>Verification</Segment>
                    <Segment className={shipped}>Shipped</Segment>
                </Segment.Group>
                <Card.Content style={{display: 'inline-block'}}>
                    <Card.Description>Frame Measurements:</Card.Description>
                    <Card.Description>A: {this.props.order.a} B: {this.props.order.b} DBL: {this.props.order.dbl} ED: {this.props.order.ed} Temple: {this.props.order.temple}</Card.Description>
                    <Card.Description>OD: {this.props.order.sphereOd} {this.props.order.cylOd} {this.props.order.axisOd} {this.props.order.add} PD: {this.props.order.pdOd} OC/SEG: {this.props.order.ocsegOd}</Card.Description>
                    <Card.Description>OS: {this.props.order.sphereOs} {this.props.order.cylOs} {this.props.order.axisOs} {this.props.order.add} PD: {this.props.order.pdOs} OC/SEG: {this.props.order.ocsegOs}</Card.Description>
                </Card.Content>
                <Card.Content>
                    <Card.Meta>Order Date: {this.props.order.orderDate}</Card.Meta>
                    <Card.Meta>Estimated Ship Date: {this.props.order.shipDate}</Card.Meta>
                    <Card.Meta>Estimated Arrival Date: {this.props.order.arrivalDate}</Card.Meta>
                </Card.Content>
                </Card>
                <Button basic color='red' onClick={this.back}>
                    Back
                </Button>
                </Card.Group>
            </React.Fragment>
        )

    }

}
