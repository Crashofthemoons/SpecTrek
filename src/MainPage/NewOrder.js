import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Button, Form, Label } from 'semantic-ui-react'
import APIManager from "../APIManager"
import OrderDetails from "./OrderDetails"

export default class NewOrder extends Component {

    sate = {
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

    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
      };

    back = () => {
        this.props.history.push("/")
    }

    render() {

        const materials = [
            { key: 'lensMaterial', text: 'Plastic CR-39', value: 'CR-39' },
            { key: 'lensMaterial', text: 'Polycarbonate', value: 'Polycarbonate' },
            { key: 'lensMaterial', text: 'Trivex', value: 'Trivex' },
            { key: 'lensMaterial', text: 'High Index 1.67', value: '1.67' },
            { key: 'lensMaterial', text: 'High Index 1.70', value: '1.70' },
            { key: 'lensMaterial', text: 'High Index 1.74', value: '1.74' }
          ]

        const coatings = [
            { key: '3', text: 'EX3', value: 'EX3' },
            { key: 'r', text: 'Recharge', value: 'Recharge' },
            { key: 'z', text: 'Blue Zero', value: 'Blue Zero' },
            { key: 'tr', text: 'Transitions', value: 'Transitions' }
          ]

        const tints = [
            { key: 'b', text: 'Brown', value: 'Brown' },
            { key: 'g', text: 'Grey', value: 'Grey' },
            { key: 'gr', text: 'Green', value: 'Green' }
          ]

        const design = [
            { key: 'v', text: 'SV', value: 'SV' },
            { key: 'i', text: 'Progressive I', value: 'Progressive I' },
            { key: 'ii', text: 'Progressive II', value: 'Progressive II' },
            { key: 'iii', text: 'Progressive III', value: 'Progressive III' }
          ]

        const frame = [
            { key: 'frameMaterial', text: 'Zyl', value: 'Zyl' },
            { key: 'frameMaterial', text: 'Metal', value: 'Metal' },
            { key: 'frameMaterial', text: 'Drill Mount', value: 'Drill Mount' },
            { key: 'frameMaterial', text: 'Semi-Rimless', value: 'Semi-Rimless' }
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
                        <Form.Select id="lensMaterial" onChange={this.onChange} options={materials} placeholder='Material' width={4} />
                        <Form.Select id="lensCoating" onChange={this.handleFieldChange} options={coatings} placeholder='Coatings' width={4} />
                        <Form.Select id="tint" onChange={this.handleFieldChange} options={tints} placeholder='Tint' width={4} />
                        <Form.Select id="lensDesign" onChange={this.handleFieldChange} options={design} placeholder='Lens Design' width={4} />
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
                        <Form.Input id="frameMaterial" onChange={this.handleFieldChange}   options={frame} placeholder='Frame Material' width={3} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input id="a" onChange={this.handleFieldChange} placeholder='A' width={3} />
                        <Form.Input id="b" onChange={this.handleFieldChange} placeholder='B' width={3} />
                        <Form.Input id="dbl" onChange={this.handleFieldChange} placeholder='DBL' width={3} />
                        <Form.Input id="ed" onChange={this.handleFieldChange} placeholder='ED' width={3} /><Form.Input id="temple" placeholder='Temple' width={3} />
                    </Form.Group>
                </Form>
                <Button onClick={this.back}>
                    Back
                </Button>
            </React.Fragment>
        )
    }
}