import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Button, Form } from 'semantic-ui-react'
import APIManager from "../APIManager"
import OrderDetails from "./OrderDetails"

export default class NewOrder extends Component {

    sate = {
        userId: this.props.currentUser,
        patientName: "",
        orderDate: "",
        shipDate: "",
        arrivalDate: "",
        orderStatus: "",
        remake: false,
        frameName: "",
        frameManufacturer: "",
        frameMaterial: "",
        a: "",
        b: "",
        dbl: "",
        ed: "",
        temple: "",
        dr: "",
        lensMaterial: "",
        lensCoating: "",
        tint: "",
        lensDesign: "",
        sphereOd: "",
        sphereOs: "",
        cylOd: "",
        cylOs: "",
        axisOd: "",
        axisOs: "",
        add: "",
        pdOd: "",
        pdOs: "",
        ocsegOd: "",
        ocsegOs: ""
    }

    render() {
        return (
            <React.Fragment>
                <Form>
                    <Form.Group>
                        <Form.Input label='First name' placeholder='First Name' width={6} />
                        <Form.Input label='Middle Name' placeholder='Middle Name' width={4} />
                        <Form.Input label='Last Name' placeholder='Last Name' width={6} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input placeholder='2 Wide' width={2} />
                        <Form.Input placeholder='12 Wide' width={12} />
                        <Form.Input placeholder='2 Wide' width={2} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input placeholder='8 Wide' width={8} />
                        <Form.Input placeholder='6 Wide' width={6} />
                        <Form.Input placeholder='2 Wide' width={2} />
                    </Form.Group>
                </Form>
            </React.Fragment>
        )
    }
}