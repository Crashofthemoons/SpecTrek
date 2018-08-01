import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Button, Card, Select, Input, Icon, Label, Popup } from 'semantic-ui-react'
import APIManager from "../APIManager"
import OrderDetails from "./OrderDetails"

export default class Order extends Component {

    state = {
        orderStatus: '',
        order: {...this.props.order}
    }

    handleSelectChange = (e, { value }) => {
        console.log(e.target.parentNode.parentNode.parentNode.lastElementChild, value)
        this.setState({ orderStatus: value })
        let button = e.target.parentNode.parentNode.parentNode.lastElementChild
        button.setAttribute("color", "green" )
    }

    changeStatus = (event) => {
        let id = event.currentTarget.parentNode.parentNode.id
        console.log(id)
        APIManager.changeStatus(this.state.orderStatus, id)
        .then((thing)=>{
            console.log(thing)
            this.setState({
            orderStatus: "",
            order: thing
        })
        })
    }

    remakeOrder = () =>{
        console.log("remake")
    }

    render() {

        if ( this.props.role === "Optician") {
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
            { key: '1', id: "orderStatus", text: 'Checked-In', value: 'Checked-In' },
            { key: '2', id: "orderStatus", text: 'Tinting', value: 'Tinting' },
            { key: '3', id: "orderStatus", text: 'Blocking', value: 'Blocking' },
            { key: '4', id: "orderStatus", text: 'Edging', value: 'Edging' },
            { key: '5', id: "orderStatus", text: 'Polishing', value: 'Polishing' },
            { key: '6', id: "orderStatus", text: 'Coating', value: 'Coating' },
            { key: '7', id: "orderStatus", text: 'Mounting', value: 'Mounting' },
            { key: '8', id: "orderStatus", text: 'Verification', value: 'Verification' },
            { key: '9', id: "orderStatus", text: 'Shipped', value: 'Shipped' }
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
                        <Card.Header>{this.props.order.patientName}</Card.Header>
                        <Label ribbon="right" color="grey" floated="right" >{this.state.order.orderStatus}</Label>
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
                            {/* <Button size="mini" color="green" onClick={this.changeStatus} icon="check circle outline"></Button> */}
                            <Popup
                                trigger={<Button color='green' onClick={this.changeStatus} size="mini" icon='check circle outline' />}
                                content={"Submit Order Status"}
                                on="hover"
                                position='top right'
                            />
                            <Popup
                                trigger={<Button color='red' onClick={this.remakeOrder} size="mini" icon='redo' />}
                                content={"Remake"}
                                on="hover"
                                position='top right'
                            />
                    </Card.Content>
                </Card>
            </React.Fragment>
        )
        }

    }
}
