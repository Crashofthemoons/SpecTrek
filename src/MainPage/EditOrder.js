import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Button, Form, Label, Card, Menu, Image } from 'semantic-ui-react'
import APIManager from "../APIManager"

export default class EditOrder extends Component {

    state = {
        order: this.props.location.state
    }

    handleSelectChange = (e, { value }) => { //handles field change for the drop-downs
        const stateToChange = Object.assign({}, this.state.order)
        stateToChange[e.target.id] = value
        // console.log(e.target.id)
        this.setState({ order: stateToChange })
    }


    handleFieldChange = (evt) => {
        const stateToChange = Object.assign({}, this.state.order)

        stateToChange[evt.target.id] = evt.target.value
        this.setState({order: stateToChange})
        // console.log(stateToChange)
    }

    back = () => { //back button
        this.props.history.push("/")
    }


    editOrder = () => {
        let order= this.state.order
        // console.log("editOrder", this.state.order )
        APIManager.editOrder(order, this.state.order.id) //takes state and edits order in database, then sends you back to main page
        .then(() => this.props.history.push("/"))
    }



render() {


    const { lensMaterial } = this.state //these are needed for drop down selections
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
        { key: 'o', id: "lensDesign", text: 'SV', value: 'SV' },
        { key: 'p', id: "lensDesign", text: 'Progressive I', value: 'Progressive I' },
        { key: 'q', id: "lensDesign", text: 'Progressive II', value: 'Progressive II' },
        { key: 'r', id: "lensDesign", text: 'Progressive III', value: 'Progressive III' }
    ]

    const frame = [
        { key: 's', id: "frameMaterial", text: 'Zyl', value: 'Zyl' },
        { key: 't', id: "frameMaterial", text: 'Metal', value: 'Metal' },
        { key: 'u', id: "frameMaterial", text: 'Drill Mount', value: 'Drill Mount' },
        { key: 'v', id: "frameMaterial", text: 'Semi-Rimless', value: 'Semi-Rimless' }
    ]

    return (
        <React.Fragment>
            <Menu fixed='top' inverted>
                        <Menu.Item as='a' header onClick={this.back}>
                            <Image id="logo" size='tiny' srcSet='../Images/spec-trek_circle.png' style={{ marginRight: '1.5em' }} />
                            Spec Trek
                        </Menu.Item>
            </Menu>
            <Card.Group id="details" style={{margin: '100px'}}>
            <Card style={{padding: '5px'}} fluid>
            <Form>
                <Form.Group>
                    <Form.Input value={this.state.order.patientName} id="patientName" onChange={this.handleFieldChange} label='Patient name' placeholder='Patient Name' width={6} />
                    <Form.Input value={this.state.order.dr} id="dr" onChange={this.handleFieldChange} label='Doctor' placeholder='Doctor' width={6} />
                </Form.Group>
                <Form.Group>
                    <Form.Select id="lensMaterial" onChange={this.handleSelectChange} options={materials} placeholder='Material' width={5} value={this.state.order.lensMaterial} />
                    <Form.Select id="lensCoating" onChange={this.handleSelectChange} options={coatings} placeholder='Coatings' width={5} value={this.state.order.lensCoating} />
                </Form.Group>
                <Form.Group>
                    <Form.Select id="tint" onChange={this.handleSelectChange} options={tints} placeholder='Tint' width={5} value={this.state.order.tint} />
                    <Form.Select id="lensDesign" onChange={this.handleSelectChange} options={design} placeholder='Lens Design' width={5} value={this.state.order.lensDesign} />
                </Form.Group>
                <Form.Group>
                {/* <Label horizontal>OD:</Label> */}
                    <Form.Input id="sphereOd" value={this.state.order.sphereOd} onChange={this.handleFieldChange} placeholder='OD Sphere' width={2} />
                    <Form.Input id="cylOd" value={this.state.order.cylOd} onChange={this.handleFieldChange} placeholder='OD Cylinder' width={2} />
                    <Form.Input id="axisOd" value={this.state.order.axisOd} onChange={this.handleFieldChange} placeholder='OD Axis' width={2} />
                    <Form.Input id="add" value={this.state.order.add} onChange={this.handleFieldChange} placeholder='OD Add' width={2} />
                    <Form.Input id="ocsegOd" value={this.state.order.ocsegOd} onChange={this.handleFieldChange} placeholder='OD OC/SEG' width={2} />
                    <Form.Input id="pdOd" value={this.state.order.pdOd} onChange={this.handleFieldChange} placeholder='OD PD' width={2} />
                </Form.Group>
                <Form.Group>
                {/* <Label horizontal>OS:</Label> */}
                    <Form.Input id="sphereOs" value={this.state.order.sphereOs} onChange={this.handleFieldChange} placeholder='OS Sphere' width={2} />
                    <Form.Input id="cylOs" value={this.state.order.cylOs} onChange={this.handleFieldChange} placeholder='OS Cylinder' width={2} />
                    <Form.Input id="axisOs" value={this.state.order.axisOs} onChange={this.handleFieldChange} placeholder='OS Axis' width={2} />
                    <Form.Input value={this.state.order.add} placeholder='OS Add' width={2} />
                    <Form.Input id="ocsegOs" value={this.state.order.ocsegOs} onChange={this.handleFieldChange} placeholder='OS OC/SEG' width={2} />
                    <Form.Input id="pdOs" value={this.state.order.pdOs} onChange={this.handleFieldChange} placeholder='OS PD' width={2} />
                </Form.Group>
                <Form.Group>
                {/* <Label horizontal>Frame:</Label> */}
                    <Form.Input id="frameName" value={this.state.order.frameName} onChange={this.handleFieldChange} placeholder='Frame Name' width={4} />
                    <Form.Input id="frameManufacturer" value={this.state.order.frameManufacturer} onChange={this.handleFieldChange} placeholder='Frame Manufacturer' width={6} />
                    <Form.Select id="frameMaterial" onChange={this.handleSelectChange} options={frame} placeholder='Frame Material' width={3} value={this.state.order.frameMaterial} />
                </Form.Group>
                <Form.Group>
                    <Form.Input id="a" value={this.state.order.a} onChange={this.handleFieldChange} placeholder='A' width={3} />
                    <Form.Input id="b" value={this.state.order.b} onChange={this.handleFieldChange} placeholder='B' width={3} />
                    <Form.Input id="dbl" value={this.state.order.dbl} onChange={this.handleFieldChange} placeholder='DBL' width={3} />
                    <Form.Input id="ed" value={this.state.order.ed} onChange={this.handleFieldChange} placeholder='ED' width={3} />
                    <Form.Input id="temple" value={this.state.order.temple} onChange={this.handleFieldChange} placeholder='Temple' width={3} />
                </Form.Group>
            </Form>
            </Card>
            <Button basic color='red' onClick={this.back}>
                Back
                </Button>
            <Button basic color='teal' onClick={this.editOrder}>
                Submit
                </Button>
            </Card.Group>
        </React.Fragment>
    )
}
}