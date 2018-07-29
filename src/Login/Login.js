import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Form } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import APIManager from "../APIManager"

export default class Login extends Component {
    state = {
        username: "",
        roll: "",
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
                    this.setState({id: user[0].id})
                } else {
                    alert("Invalid Username or Password Input. Please try again.")
                }
            })
            .then(()=>{
                localStorage.setItem("SpecTrek", JSON.stringify({
                    username: this.state.username,
                    id: this.state.id,
                    roll: "Optician"
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
                roll: "Optician"
            }

            APIManager.addData("users", newUser)
                .then(() =>{
                    this.handleLogin()
                })
                .then(() => {
                    window.location.reload()
                })
        }

    render() {
        return (
            <React.Fragment>
                <Form>
                    <Form.Group widths='equal'>
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
                        <Button.Group>
                            <Button onClick={this.handleRegister}>Register</Button>
                            <Button.Or />
                            <Button positive onClick={this.handleLogin}>Log-In</Button>
                        </Button.Group>
                    </Form.Group>
                </Form>
            </React.Fragment>
        )
    }

}