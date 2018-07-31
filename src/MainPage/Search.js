import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Form, Menu, Container, Segment, SearchResult } from 'semantic-ui-react'
import APIManager from "../APIManager"
import Order from "./Order"
import { Button, Card, Image, Input, Label, Grid } from 'semantic-ui-react'
import '../App.css';


export default class Search extends Component {

    render() {
        return(
            <React.Fragment>
                {/* {
                    this.props.location.search.map(order =>
                        <Order key={order.id} order={order} currentUser={this.currentUser} deleteOrder={this.props.deleteOrder}>
                            {order}
                        </Order>
                    )
                } */}
            </React.Fragment>
        )
    }
}