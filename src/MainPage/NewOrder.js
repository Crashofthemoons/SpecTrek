import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Button, Form, Label } from 'semantic-ui-react'
import APIManager from "../APIManager"
import OrderDetails from "./OrderDetails"

export default class NewOrder extends Component {

    state = {
        userId: this.props.currentUser,
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

    handleSelectChange = (e, {value}) => {
        console.log(e.target.id)
        this.setState({ [e.target.id]: value})
    }

    handleFieldChange = event => {
        console.log(event.target.child)
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
      };

    back = () => {
        this.props.history.push("/")
    }

    addNewOrder = () => {
        console.log()
    }

    render() {


        const {lensMaterial} = this.state
        const {lensCoating} = this.state
        const {tint} = this.state
        const {lensDesign} = this.state
        const {frameMaterial} = this.state

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
                <Form>
                    <Form.Group>
                        <Form.Input id="patientName" onChange={this.handleFieldChange} label='Patient name' placeholder='Patient Name' width={6} />
                        <Form.Input id="dr" onChange={this.handleFieldChange} label='Doctor' placeholder='Doctor' width={6} />
                    </Form.Group>
                    <Form.Group>
                        <Label>Lens:</Label>
                        <Form.Select id="lensMaterial" onChange={this.handleSelectChange} options={materials} placeholder='Material' width={4} value={lensMaterial} />
                        <Form.Select id="lensCoating" onChange={this.handleSelectChange} options={coatings} placeholder='Coatings' width={4} value={lensCoating} />
                        <Form.Select id="tint" onChange={this.handleSelectChange} options={tints} placeholder='Tint' width={4} value={tint} />
                        <Form.Select id="lensDesign" onChange={this.handleSelectChange} options={design} placeholder='Lens Design' width={4} value={lensDesign} />
                    </Form.Group>
                    <Form.Group>
                        <Label>OD:</Label>
                        <Form.Input id="sphereOd" onChange={this.handleFieldChange} placeholder='OD Sphere' width={2} />
                        <Form.Input id="cylOd" onChange={this.handleFieldChange} placeholder='OD Cylinder' width={2} />
                        <Form.Input id="axisOd" onChange={this.handleFieldChange} placeholder='OD Axis' width={2} />
                        <Form.Input id="add" onChange={this.handleFieldChange} placeholder='OD Add' width={2} />
                        <Form.Input id="ocsegOd" onChange={this.handleFieldChange} placeholder='OD OC/SEG' width={2} /><Form.Input placeholder='OD PD' width={2} />
                    </Form.Group>
                    <Form.Group>
                        <Label>OS:</Label>
                        <Form.Input id="sphereOs" onChange={this.handleFieldChange} placeholder='OS Sphere' width={2} />
                        <Form.Input id="cylOs" onChange={this.handleFieldChange} placeholder='OS Cylinder' width={2} />
                        <Form.Input id="axisOs" onChange={this.handleFieldChange} placeholder='OS Axis' width={2} />
                        <Form.Input placeholder='OS Add' width={2} />
                        <Form.Input id="ocsegOs" onChange={this.handleFieldChange} placeholder='OS OC/SEG' width={2} /><Form.Input placeholder='OS PD' width={2} />
                    </Form.Group>
                    <Form.Group>
                        <Label>Frame:</Label>
                        <Form.Input id="frameName" onChange={this.handleFieldChange} placeholder='Frame Name' width={4} />
                        <Form.Input id="frameManufacturer" onChange={this.handleFieldChange} placeholder='Frame Manufacturer' width={6} />
                        <Form.Select id="frameMaterial" onChange={this.handleSelectChange} options={frame} placeholder='Frame Material' width={3} value={frameMaterial} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input id="a" onChange={this.handleFieldChange} placeholder='A' width={3} />
                        <Form.Input id="b" onChange={this.handleFieldChange} placeholder='B' width={3} />
                        <Form.Input id="dbl" onChange={this.handleFieldChange} placeholder='DBL' width={3} />
                        <Form.Input id="ed" onChange={this.handleFieldChange} placeholder='ED' width={3} /><Form.Input id="temple" placeholder='Temple' width={3} />
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