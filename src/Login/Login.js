import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Form } from 'semantic-ui-react'
import { Button, Grid, Header, Image, Segment } from 'semantic-ui-react'
import APIManager from "../APIManager"

export default class Login extends Component {
    state = {
        username: "",
        role: "",
        id: ""
    };

    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
    };

    handleLogin = () => {
        APIManager.getData(`users?username=${this.state.username}`)
            .then(user => {
                if (user.length > 0 && this.state.password === user[0].password) {
                    this.setState({
                        id: user[0].id,
                        role: user[0].role,
                        username: user[0].username                    })
                } else {
                    alert("Invalid Username or Password Input. Please try again.")
                }
            })
            .then(user => {
                localStorage.setItem("SpecTrek", JSON.stringify({
                    username: this.state.username,
                    id: this.state.id,
                    role: this.state.role
                }))
            })
            .then(() => {
                window.location.reload()
            })
    }

    handleRegister = e => {
        e.preventDefault();

        let newUser = {
            username: this.state.username,
            password: this.state.password,
            role: this.state.role
        }

        APIManager.addData("users", newUser)
            .then(() => {
                this.handleLogin()
            })
            .then(() => {
                window.location.reload()
            })
    }

    handleSelectChange = (e, { value }) => {
        console.log(e.target.id)
        this.setState({ [e.target.id]: value })
    }

    render() {
        const { role } = this.state
        const roles = [
            { key: 'o', id: "role", text: 'Optician', value: 'Optician' },
            { key: 'l', id: "role", text: 'Lab Technician', value: 'Lab Technician' }
        ]
        return (
            <React.Fragment>

                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>

                        <Image size="massive" centered src='../Images/spec-trek_circle.png' />
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    type="text"
                                    onChange={this.handleFieldChange}
                                    id='username'
                                    placeholder='Username'
                                />
                                <Form.Input
                                    fluid
                                    type="password"
                                    onChange={this.handleFieldChange}
                                    id='password'
                                    placeholder='Password'
                                />
                                <Form.Select id="role" onChange={this.handleSelectChange} options={roles} placeholder='User' width={3} value={role} />
                                <Button.Group>
                                    <Button onClick={this.handleRegister}>Register</Button>
                                    <Button.Or />
                                    <Button positive onClick={this.handleLogin}>Log-In</Button>
                                </Button.Group>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        )
    }

}