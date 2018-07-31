import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Button, Form, Label, Divider, Menu, Image } from 'semantic-ui-react'
import APIManager from "../APIManager"

export default class NewOrder extends Component {

    state = {
        userId: this.props.location.currentUser,
        patientName: "",
        orderDate: "",
        shipDate: "",
        arrivalDate: "",
        orderStatus: "Submitted",
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

    handleSelectChange = (e, { value }) => {
        console.log(e.target.id)
        this.setState({ [e.target.id]: value })
    }

    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
    };

    back = () => {
        this.props.history.push("/")
    }

    componentDidMount = () => {
        let dateObj = new Date();
        let weekOut = new Date()
        let arrival = new Date()
        weekOut.setDate(weekOut.getDate() +7)
        arrival.setDate(arrival.getDate() + 9)

        let month = dateObj.getMonth() + 1;
        let day = dateObj.getDate();
        let year = dateObj.getFullYear();
        let newDate = month + "/" + day + "/" + year

        let shipMonth = weekOut.getMonth() +1
        let shipDay = weekOut.getDate()
        let shipYear = weekOut.getFullYear()
        let shippingDate = shipMonth + "/" + shipDay + "/" + shipYear

        let arrivalMonth = arrival.getMonth() + 1
        let arrivalDay = arrival.getDate()
        let arrivalYear = arrival.getFullYear()
        let arrivalDate = arrivalMonth + "/" + arrivalDay + "/" + arrivalYear

        this.setState({
            orderDate: newDate,
            shipDate: shippingDate,
            arrivalDate: arrivalDate
         })
    }

    addNewOrder = () => {
        let order= this.state
        console.log(this.state)
        APIManager.addData("orders", order)
        .then(this.props.history.push("/"))
    }



render() {


    const { lensMaterial } = this.state
    const { lensCoating } = this.state
    const { tint } = this.state
    const { lensDesign } = this.state
    const { frameMaterial } = this.state

    const materials = [
        { key: 'a', id: "lensMaterial", text: 'Plastic CR-39', value: 'CR-39' },
        { key: 'b', id: "lensMaterial", text: 'Polycarbonate', value: 'Polycarbonate' },
        { key: 'c', id: "lensMaterial", text: 'Trivex', value: 'Trivex' },
        { key: 'd', id: "lensMaterial", text: 'High Index 1.67', value: '1.67' },
        { key: 'e', id: "lensMaterial", text: 'High Index 1.70', value: '1.70' },
        { key: 'f', id: "lensMaterial", text: 'High Index 1.74', value: '1.74' }
    ]

    const coatings = [
        { key: 'g', id: "lensCoating", text: 'EX3', value: 'EX3' },
        { key: 'h', id: "lensCoating", text: 'Recharge', value: 'Recharge' },
        { key: 'i', id: "lensCoating", text: 'Blue Zero', value: 'Blue Zero' },
        { key: 'j', id: "lensCoating", text: 'Transitions', value: 'Transitions' }
    ]

    const tints = [
        { key: 'k', id: "tint", text: 'Brown', value: 'Brown' },
        { key: 'l', id: "tint", text: 'Grey', value: 'Grey' },
        { key: 'm', id: "tint", text: 'Green', value: 'Green' }
    ]

    const design = [
        { key: 'v', id: "lensDesign", text: 'SV', value: 'SV' },
        { key: 'i', id: "lensDesign", text: 'Progressive I', value: 'Progressive I' },
        { key: 'ii', id: "lensDesign", text: 'Progressive II', value: 'Progressive II' },
        { key: 'iii', id: "lensDesign", text: 'Progressive III', value: 'Progressive III' }
    ]

    const frame = [
        { key: 'z', id: "frameMaterial", text: 'Zyl', value: 'Zyl' },
        { key: 't', id: "frameMaterial", text: 'Metal', value: 'Metal' },
        { key: 'dm', id: "frameMaterial", text: 'Drill Mount', value: 'Drill Mount' },
        { key: 's', id: "frameMaterial", text: 'Semi-Rimless', value: 'Semi-Rimless' }
    ]

    return (
        <React.Fragment>
            <Menu fixed='top' inverted>
                        <Menu.Item as='a' header onClick={this.back}>
                            <Image id="logo" size='tiny' srcSet='../Images/spec-trek_circle.png' style={{ marginRight: '1.5em' }} />
                            Spec Trek
                        </Menu.Item>
            </Menu>
            <Form style={{ marginTop: '7em' }}>
                <Form.Group>
                    <Form.Input id="patientName" onChange={this.handleFieldChange} label='Patient name' placeholder='Patient Name' width={6} />
                    <Form.Input id="dr" onChange={this.handleFieldChange} label='Doctor' placeholder='Doctor' width={6} />
                </Form.Group>
                <Form.Group>
                    <Form.Select id="lensMaterial" onChange={this.handleSelectChange} options={materials} placeholder='Material' width={5} value={lensMaterial} />
                    <Form.Select id="lensCoating" onChange={this.handleSelectChange} options={coatings} placeholder='Coatings' width={5} value={lensCoating} />
                </Form.Group>
                <Form.Group>
                    <Form.Select id="tint" onChange={this.handleSelectChange} options={tints} placeholder='Tint' width={5} value={tint} />
                    <Form.Select id="lensDesign" onChange={this.handleSelectChange} options={design} placeholder='Lens Design' width={5} value={lensDesign} />
                </Form.Group>
                <Form.Group>
                {/* <Label horizontal>OD:</Label> */}
                    <Form.Input id="sphereOd" onChange={this.handleFieldChange} placeholder='OD Sphere' width={2} />
                    <Form.Input id="cylOd" onChange={this.handleFieldChange} placeholder='OD Cylinder' width={2} />
                    <Form.Input id="axisOd" onChange={this.handleFieldChange} placeholder='OD Axis' width={2} />
                    <Form.Input id="add" onChange={this.handleFieldChange} placeholder='OD Add' width={2} />
                    <Form.Input id="ocsegOd" onChange={this.handleFieldChange} placeholder='OD OC/SEG' width={2} />
                    <Form.Input id="pdOd" onChange={this.handleFieldChange} placeholder='OD PD' width={2} />
                </Form.Group>
                <Form.Group>
                {/* <Label horizontal>OS:</Label> */}
                    <Form.Input id="sphereOs" onChange={this.handleFieldChange} placeholder='OS Sphere' width={2} />
                    <Form.Input id="cylOs" onChange={this.handleFieldChange} placeholder='OS Cylinder' width={2} />
                    <Form.Input id="axisOs" onChange={this.handleFieldChange} placeholder='OS Axis' width={2} />
                    <Form.Input placeholder='OS Add' width={2} />
                    <Form.Input id="ocsegOs" onChange={this.handleFieldChange} placeholder='OS OC/SEG' width={2} />
                    <Form.Input id="pdOs" onChange={this.handleFieldChange} placeholder='OS PD' width={2} />
                </Form.Group>
                <Form.Group>
                {/* <Label horizontal>Frame:</Label> */}
                    <Form.Input id="frameName" onChange={this.handleFieldChange} placeholder='Frame Name' width={4} />
                    <Form.Input id="frameManufacturer" onChange={this.handleFieldChange} placeholder='Frame Manufacturer' width={6} />
                    <Form.Select id="frameMaterial" onChange={this.handleSelectChange} options={frame} placeholder='Frame Material' width={3} value={frameMaterial} />
                </Form.Group>
                <Form.Group>
                    <Form.Input id="a" onChange={this.handleFieldChange} placeholder='A' width={3} />
                    <Form.Input id="b" onChange={this.handleFieldChange} placeholder='B' width={3} />
                    <Form.Input id="dbl" onChange={this.handleFieldChange} placeholder='DBL' width={3} />
                    <Form.Input id="ed" onChange={this.handleFieldChange} placeholder='ED' width={3} />
                    <Form.Input id="temple" onChange={this.handleFieldChange} placeholder='Temple' width={3} />
                </Form.Group>
            </Form>
            <Button basic color='red' onClick={this.back}>
                Back
                </Button>
            <Button basic color='teal' onClick={this.addNewOrder}>
                Submit
                </Button>
        </React.Fragment>
    )
}
}