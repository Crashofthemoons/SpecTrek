import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Form, Menu, Container, Segment } from 'semantic-ui-react'
import APIManager from "../APIManager"
import Order from "./Order"
import { Button, Card, Image, Input, Label, Grid } from 'semantic-ui-react'
import '../App.css';
import NewOrder from "./NewOrder"

export default class MainPage extends Component {

    state = {
        currentUser: ""
    }

    componentWillMount() {
        let cUser = JSON.parse(localStorage.getItem("SpecTrek"))
        this.setState({
            currentUser: cUser.id,
            roll: cUser.roll
        })
    }

    render() {
        return (
            <React.Fragment>
                <Menu fixed='top' inverted>
                    <Menu.Item as='a' header>
                        <Image id="logo" size='tiny' srcSet='../Images/spec-trek_circle.png' style={{ marginRight: '1.5em' }} />
                        Spec Trek
                        </Menu.Item>
                    <Menu.Item>
                        <Link
                            to={{
                                pathname: "/neworder",
                            }}>
                            New Order
                        </Link>
                    </Menu.Item>
                    <Input style={{ marginLeft: '3em' }} transparent inverted placeholder='Search...' />
                    <Menu.Item position="right">
                        {this.state.roll}
                    </Menu.Item>
                </Menu>
                <Grid>
                    <Grid.Column style={{ paddingRight: '0' }} width={14}>
                        <Card.Group style={{ marginTop: '7em' }}>
                            {
                                this.props.orders.map(order =>
                                    <Order key={order.id} order={order} currentUser={this.currentUser} deleteOrder={this.props.deleteOrder}>
                                        {order}
                                    </Order>
                                )
                            }
                        </Card.Group>
                    </Grid.Column>
                    <Grid.Column width={2} style={{ marginTop: '7em' }}>
                        <Label size='large' color='black'><Image className='key' circular avatar spaced='right' src='https://www.colorhexa.com/62b5c2.png' />On Schedule</Label>
                        <Label size='large' color='black'><Image className='key' circular avatar spaced='right' src='https://www.colorhexa.com/89a817.png' />Shipped</Label>
                        <Label size='large' color='black'><Image className='key' circular avatar spaced='right' src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw4HBgYHCgcHDQgGBxYPBggHBhAICRAKFRUWFiASHx8YKCggIholHhoTITIoJSkrLi4uGh8zOD8sNygtQjIBCgoKDQ0NDg0NDi8ZFR43Li0tKys3MSsrNys3Ky0rKzctLSsrKystKy4rNy0rKy03Ky0rKy0rNzcrLSsrNzcrK//AABEIAKgBLAMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAABAAIFBv/EABsQAQABBQEAAAAAAAAAAAAAAACBESFRYbEC/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAEDAgYF/8QAFxEBAQEBAAAAAAAAAAAAAAAAAGEBEf/aAAwDAQACEQMRAD8A9+Cngn0QGgigNAAiACIAIoGUUgAUABQANAAGggA0AAaAANAAiEAigZDSBkNAAiEHSRTVGUUDKKQAKFAaAANAAiACKBlFIMooGUUABQANBABoAA0AAaABEIBEAA0gdENBogRABEAEUDKKQZRQoBQANAAGgARABEIBFAyigZRQAFIAFAymgABQANBB0gU1QAoAGggA0ACIAIgAikGUUKyigAKAAoAGgARCARABFAyigZRSDKKBlFA6KIaIEUDKKAAoACkAGgADQABoAEQgEUKyigZRQAFAA0EAGgADQAIgAigZRSDohoNUAaCADQAIgAigZRSDKKAAoACgAaAANBFCIAIoGUUDKKAApAAoAGgARAOkGg0QBoAA0AAKQAaABEAEQARSDKKBlFAAUABQANBFAaABEAEQARQMopAAoHRRTVyAUigFAymgDKKBlFIAFAA0ACIAIhAIoGUUDKKBlFIAFCgNAAGgARABFA6KKaOWUQARQrKKQAKBlFAyigZRSDKKAAoAGgADQQCIAIgAigZRSDKKFAKABoA6SIaOQiAAaAANAAiEUIoGUUDKKBlEAEUgyigAKAAoAGggA0ACIAIgAikGUUK6QSaOUEgQSBBIECgAKAJJAJIUBIEEgQSQSCBJIAkgQSQQSBM+tcqkooF8JHYKEkm7B//Z' />Late</Label>
                        <Label size='large' color='black'><Image className='key' circular avatar spaced='right' src='https://www.colorhexa.com/f9803f.png' />Remake</Label>
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        )
    }

}