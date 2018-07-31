import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Button, Card, Select, Input, Icon } from 'semantic-ui-react'
import APIManager from "../APIManager"
import OrderDetails from "./OrderDetails"

export default class Order extends Component {

    state = {
        orderStatus: ''
    }

    handleSelectChange = (e, { value }) => {
        console.log(e.target.id)
        this.setState({ orderStatus: value })
    }

    changeStatus = (event) => {
        let id = event.target.parentNode.parentNode.parentNode.id
        console.log(id)
        APIManager.changeStatus(this.state.orderStatus, id)
        .then(this.setState({
            orderStatus: ""
        }))
        .then(window.location.reload())
    }

    render() {

        if (this.props.roll === "Optician") {
            // console.log("optician")
            let thisOrder
            let dateObj = new Date()
            let month = dateObj.getMonth() + 1;
            let day = dateObj.getDate();
            let year = dateObj.getFullYear();
            let newDate = month + "/" + day + "/" + year

            let weekOut = new Date()
            let shipMonth = weekOut.getMonth() +1
            let shipDay = weekOut.getDate()
            let shipYear = weekOut.getFullYear()
            let shippingDate = shipMonth + "/" + shipDay + "/" + shipYear
            console.log(shippingDate)

            if (this.props.order.remake === true ) {
                thisOrder = "remake"
            } else if (this.props.order.orderStatus === "Shipped") {
                thisOrder = "shipped"
            } else if (parseInt(this.props.order.shipDate) <= parseInt(newDate) && this.props.order.orderStatus !== "Shipped") {
                thisOrder = "late"
            } else {
                thisOrder = "onTime"
            }
        return (
            <React.Fragment>
                <Card id={this.props.order.id} className={thisOrder}>
                    <Card.Content>
                        {/* <Image floated='right' size='mini' src='/images/avatar/large/steve.jpg' /> */}
                        <Card.Header>{this.props.order.patientName} - {this.props.order.orderStatus}</Card.Header>
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
                            <Button onClick={()=> this.props.deleteOrder(this.props.order.id)} basic color='red'>
                                Delete
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            </React.Fragment>
        )


        } else {
            // console.log("tech")

         const { orderStatus } = this.state

        const status = [
            { key: 'a', id: "orderStatus", text: 'Checked-In', value: 'Checked-In' },
            { key: 'b', id: "orderStatus", text: 'Tinting', value: 'Tinting' },
            { key: 'c', id: "orderStatus", text: 'Blocking', value: 'Blocking' },
            { key: 'd', id: "orderStatus", text: 'Edging', value: 'Edging' },
            { key: 'e', id: "orderStatus", text: 'Polishing', value: 'Polishing' },
            { key: 'f', id: "orderStatus", text: 'Coating', value: 'Coating' },
            { key: 'g', id: "orderStatus", text: 'Mounting', value: 'Mounting' },
            { key: 'h', id: "orderStatus", text: 'Verification', value: 'Verification' },
            { key: 'i', id: "orderStatus", text: 'Shipped', value: 'Shipped' }
        ]

            let thisOrder
            let dateObj = new Date()
            let month = dateObj.getMonth() + 1;
            let day = dateObj.getDate();
            let year = dateObj.getFullYear();
            let newDate = month + "/" + day + "/" + year

            let weekOut = new Date()
            let shipMonth = weekOut.getMonth() +1
            let shipDay = weekOut.getDate()
            let shipYear = weekOut.getFullYear()
            let shippingDate = shipMonth + "/" + shipDay + "/" + shipYear
            console.log(shippingDate)

            if (this.props.order.remake === true ) {
                thisOrder = "remake"
            } else if (this.props.order.orderStatus === "Shipped") {
                thisOrder = "shipped"
            } else if (parseInt(this.props.order.shipDate) <= parseInt(newDate) && this.props.order.orderStatus !== "Shipped") {
                thisOrder = "late"
            } else {
                thisOrder = "onTime"
            }
        return (
            <React.Fragment>
                <Card id={this.props.order.id} className={thisOrder}>
                    <Card.Content>
                        {/* <Image floated='right' size='mini' src='/images/avatar/large/steve.jpg' /> */}
                        <Card.Header>{this.props.order.patientName} - {this.props.order.orderStatus}</Card.Header>
                        <Card.Meta>Order Date: {this.props.order.orderDate}</Card.Meta>
                        <Card.Meta>Estimated Ship Date: {this.props.order.shipDate}</Card.Meta>
                        <Card.Meta>Estimated Arrival Date: {this.props.order.arrivalDate}</Card.Meta>
                        <Card.Description>
                            Frame Name: {this.props.order.frameName}</Card.Description>
                        <Card.Description>{this.props.order.lensDesign} {this.props.order.lensMaterial} {this.props.order.lensCoating}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                            <Button size="small" basic color='teal'>
                                <Link
                                    to={{
                                        pathname: "/order/orderdetails",
                                        state: this.props.order
                                    }}>
                                    Details
                                </Link>
                            </Button>
                            <Select compact id="orderStatus" onChange={this.handleSelectChange} options={status} placeholder='Status' width={2} value={orderStatus} />
                            <Button size="mini" onClick={this.changeStatus}><Icon name='check circle outline'/></Button>
                    </Card.Content>
                </Card>
            </React.Fragment>
        )
        }

    }
}
