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
        let dateObj = new Date()
        let month = dateObj.getMonth() + 1;
        let day = dateObj.getDate();
        let year = dateObj.getFullYear();
        let newDate = month + "/" + day + "/" + year

        let weekOut = new Date()
        let shipMonth = weekOut.getMonth() +1
        let shipDay = weekOut.getDate() +1
        let shipYear = weekOut.getFullYear()
        let shippingDate = shipMonth + "/" + shipDay + "/" + shipYear
        console.log(shippingDate)


        if (this.props.order.orderStatus === "Checked-In" && this.props.order.remake === true) {
            checkedIn = "checkedIn-remake"
        } else if (this.props.order.orderStatus === "Tinting" && this.props.order.remake === true) {
            tinting = "tinting-remake"
        } else if (this.props.order.orderStatus === "Blocking" && this.props.order.remake === true) {
            blocking = 'blocking-remake'
        } else if (this.props.order.orderStatus === "Edging" && this.props.order.remake === true) {
            edging = "edging-remake"
        } else if (this.props.order.orderStatus === "Polishing" && this.props.order.remake === true) {
            polishing = "polishing-remake"
        } else if (this.props.order.orderStatus === "Coating" && this.props.order.remake === true) {
            coating = "coating-remake"
        } else if (this.props.order.orderStatus === "Mounting" && this.props.order.remake === true) {
            mounting = "mounting-remake"
        } else if (this.props.order.orderStatus === "Verification" && this.props.order.remake === true) {
            verification = "verification-remake"
        } else if (this.props.order.orderStatus === "Submitted" && parseInt(this.props.order.shipDate) >= parseInt(newDate)) {
            submitted = "submitted"
        } else if (this.props.order.orderStatus === "Checked-In" && parseInt(this.props.order.shipDate) >= parseInt(newDate)) {
            checkedIn = "checkedIn"
        } else if (this.props.order.orderStatus === "Tinting" && parseInt(this.props.order.shipDate) >= parseInt(newDate)) {
            tinting = "tinting"
        } else if (this.props.order.orderStatus === "Blocking" && parseInt(this.props.order.shipDate) >= parseInt(newDate)) {
            blocking = 'blocking'
        } else if (this.props.order.orderStatus === "Edging" && parseInt(this.props.order.shipDate) >= parseInt(newDate)) {
            edging = "edging"
        } else if (this.props.order.orderStatus === "Polishing" && parseInt(this.props.order.shipDate) >= parseInt(newDate)) {
            polishing = "polishing"
        } else if (this.props.order.orderStatus === "Coating" && parseInt(this.props.order.shipDate) >= parseInt(newDate)) {
            coating = "coating"
        } else if (this.props.order.orderStatus === "Mounting" && parseInt(this.props.order.shipDate) >= parseInt(newDate)) {
            mounting = "mounting"
        } else if (this.props.order.orderStatus === "Verification" && parseInt(this.props.order.shipDate) >= parseInt(newDate)) {
            verification = "verification"
        } else if (this.props.order.orderStatus === "Shipped") {
            shipped = "shipped"
        } else if (this.props.order.orderStatus === "Checked-In") {
            checkedIn = "checkedIn-late"
        } else if (this.props.order.orderStatus === "Tinting") {
            tinting = "tinting-late"
        } else if (this.props.order.orderStatus === "Blocking") {
            blocking = 'blocking-late'
        } else if (this.props.order.orderStatus === "Edging") {
            edging = "edging-late"
        } else if (this.props.order.orderStatus === "Polishing") {
            polishing = "polishing-late"
        } else if (this.props.order.orderStatus === "Coating") {
            coating = "coating-late"
        } else if (this.props.order.orderStatus === "Mounting") {
            mounting = "mounting-late"
        } else if (this.props.order.orderStatus === "Verification") {
            verification = "verification-late"
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
                    <Card.Meta>Optician: {this.props.order.user}</Card.Meta>
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
