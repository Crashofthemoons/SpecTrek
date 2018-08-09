import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Form, Menu, Container, Segment, SearchResult, Loader } from 'semantic-ui-react'
import APIManager from "../APIManager"
import Order from "./Order"
import { Button, Card, Image, Input, Label, Grid } from 'semantic-ui-react'
import '../App.css';
import Search from "./Search"


export default class MainPage extends Component {

    state = {
        currentUser: "",
        search: [],
        role: "",
        orders: []
    }

    componentDidMount() {
        let cUser = JSON.parse(localStorage.getItem("SpecTrek")) //obtain current user info and all orders and print to the dom
        APIManager.getData("orders?_sort=orderDate&_order=asc&_expand=user") //orders?_expand=user&sort=orderDate&_order=asc
        .then(orders =>{
            console.log(orders)
          this.setState({
              orders: orders,
              currentUser: cUser.id,
              role: cUser.role
            })
        })
      }

      changeView = () =>{
        // console.log('change view')
        this.setState({
            orders: this.state.orders.reverse()
        })
      }

      handleSelectChange = (event, { value }) => { //targeted event and drop-down value
        let id = event.currentTarget.parentNode.parentNode.parentNode.parentNode.id //the id of the order being targeted
        APIManager.changeStatus(value, id) //change order status in database
        .then(() => {
            {(this.state.search < 1)?
                APIManager.getData("orders?_sort=orderDate&_order=asc&_expand=user") //if this is on main page, then re-render main page orders
                .then(orders =>{
                    this.setState({orders: orders})
                })
                :
                APIManager.getData(`orders?q=${this.refs.search.inputRef.value}`) // if this is on search results, re-render search results
                .then(search =>{
                    this.setState({search: search})
                })

            }
          })
          APIManager.getData(`orders/${id}`) // get current order we are working with in searched results
          .then(order=>{
                console.log("searched id", order.orderStatus)
              if (order.orderStatus === "Shipped" && order.remake === true){ //if the orders status is "shipped" and it is remade,
                  APIManager.remakeOrder(!order.remake, id) //then change remake boolean to false, to allow green border
              }
          })

          APIManager.getData(`orders/${id}`) //get current order we are working with on main page
          .then(order=>{

              if (value === "Shipped" && order.remake === true){ //if the orders status is "shipped" and it is remade,
                  APIManager.remakeOrder(!order.remake, id) //then change remake boolean to false, to allow green border
              }
          })

    }


    remakeOrder = (event) =>{
        let id = event.currentTarget.parentNode.parentNode.id //current order id
            // console.log("remake", id)
            APIManager.getData(`orders/${id}`)
            .then(order=>{
                console.log(order.remake)
                APIManager.remakeOrder(!order.remake, id) //toggle order remake boolean in database
                .then(()=> {
                    APIManager.changeStatus("Blocking", id)
                })
                .then(() => {
                    {(this.state.search < 1)? //checks if we are looking at main page or search results and resets state accordingly
                        APIManager.getData("orders?_sort=orderDate&_order=asc&_expand=user")
                        .then(orders =>{
                            this.setState({orders: orders})
                        })
                        :
                        APIManager.getData(`orders?q=${this.refs.search.inputRef.value}`)
                        .then(search =>{
                            this.setState({search: search})
                        })

                    }
                  })
            })
    }

      deleteOrder = (id) => {
        APIManager.deleteData("orders", id) //deletes an order from the database
        .then(() => {
            {(this.state.search < 1)? //checks if we are looking at main page or search results and resets state accordingly
                APIManager.getData("orders?_sort=orderDate&_order=asc&_expand=user")
                .then(orders =>{
                    this.setState({orders: orders})
                })
                :
                APIManager.getData(`orders?q=${this.refs.search.inputRef.value}`)
                .then(search =>{
                    this.setState({search: search})
                })

            }
          })
      }

    searchBar = (event) => {
        if (event.key === "Enter") { //displays search results after enter key is pressed

            APIManager.getData(`orders?q=${event.target.value}`) //special api call that allows search
            .then(SearchResults => { // reset state search: with results
                this.setState({
                    search: SearchResults
                })
            })
            // console.log(this.refs.search.inputRef.value) //if you want the search bar to clear when you press enter
            // this.refs.search.inputRef.value= ""
        }
    }

    resetSearch = () => { //when you click on the spec Trek logo, it resets main page
        // console.log("reset")
        this.setState({
            search: []
        })
    }

    logOut = () => {
        localStorage.removeItem("SpecTrek")
        this.setState({
            currentUser: "",
            role: ""
        })
        this.props.history.push("/")
    }


    render() {

        const { orderStatus } = this.state //needed for the drop-down


        if (this.state.role === "Optician") { //this will display the optician mainpage view

            return (
                <React.Fragment>
                    <Menu fixed='top' inverted>
                        <Menu.Item as='a' header onClick={this.resetSearch}>
                            <Image id="logo" size='tiny' srcSet='../Images/spec-trek_circle.png' style={{ marginRight: '1.5em' }} />
                            Spec Trek
                            </Menu.Item>
                        <Menu.Item>
                            <Link
                                to={{
                                    pathname: "/neworder",
                                    currentUser: this.state.currentUser
                                }}>
                                New Order
                            </Link>
                        </Menu.Item>
                        <Menu.Item onClick={this.changeView}>
                            Change Order Display
                        </Menu.Item>
                        <Input ref="search" id="search" style={{ marginLeft: '3em' }} onKeyPress={this.searchBar} transparent inverted placeholder='Search...'/>
                        <Menu.Menu position="right">
                            <Menu.Item>
                                {this.state.role}
                            </Menu.Item>
                            <Menu.Item onClick={this.logOut}>
                                    Log Out
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>

                    <Grid>
                        <Grid.Column style={{ paddingRight: '0' }} width={14}>
                            <Card.Group style={{ marginTop: '7em' }}>
                                {(this.state.search < 1)? //this will display search results if something has been typed in the search bar
                                    this.state.orders.map(order =>
                                        <Order key={order.id} order={order} role={this.state.role} currentUser={this.currentUser} deleteOrder={this.deleteOrder}>
                                            {order}
                                        </Order>
                                    ) :
                                    this.state.search.map(order =>
                                        <Order key={order.id} order={order} role={this.state.role} currentUser={this.currentUser} deleteOrder={this.deleteOrder}>
                                            {order}
                                        </Order>
                                    )
                                }
                            </Card.Group>
                        </Grid.Column>
                        <Grid.Column width={2} style={{ marginTop: '7em' }}>
                            <Label size='large' color='black'><Image className='key' circular avatar spaced='right' src='https://www.colorhexa.com/62b5c2.png' />On Time</Label>
                            <Label size='large' color='black'><Image className='key' circular avatar spaced='right' src='https://www.colorhexa.com/89a817.png' />Shipped</Label>
                            <Label size='large' color='black'><Image className='key' circular avatar spaced='right' src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw4HBgYHCgcHDQgGBxYPBggHBhAICRAKFRUWFiASHx8YKCggIholHhoTITIoJSkrLi4uGh8zOD8sNygtQjIBCgoKDQ0NDg0NDi8ZFR43Li0tKys3MSsrNys3Ky0rKzctLSsrKystKy4rNy0rKy03Ky0rKy0rNzcrLSsrNzcrK//AABEIAKgBLAMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAABAAIFBv/EABsQAQABBQEAAAAAAAAAAAAAAACBESFRYbEC/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAEDAgYF/8QAFxEBAQEBAAAAAAAAAAAAAAAAAGEBEf/aAAwDAQACEQMRAD8A9+Cngn0QGgigNAAiACIAIoGUUgAUABQANAAGggA0AAaAANAAiEAigZDSBkNAAiEHSRTVGUUDKKQAKFAaAANAAiACKBlFIMooGUUABQANBABoAA0AAaABEIBEAA0gdENBogRABEAEUDKKQZRQoBQANAAGgARABEIBFAyigZRQAFIAFAymgABQANBB0gU1QAoAGggA0ACIAIgAikGUUKyigAKAAoAGgARCARABFAyigZRSDKKBlFA6KIaIEUDKKAAoACkAGgADQABoAEQgEUKyigZRQAFAA0EAGgADQAIgAigZRSDohoNUAaCADQAIgAigZRSDKKAAoACgAaAANBFCIAIoGUUDKKAApAAoAGgARAOkGg0QBoAA0AAKQAaABEAEQARSDKKBlFAAUABQANBFAaABEAEQARQMopAAoHRRTVyAUigFAymgDKKBlFIAFAA0ACIAIhAIoGUUDKKBlFIAFCgNAAGgARABFA6KKaOWUQARQrKKQAKBlFAyigZRSDKKAAoAGgADQQCIAIgAigZRSDKKFAKABoA6SIaOQiAAaAANAAiEUIoGUUDKKBlEAEUgyigAKAAoAGggA0ACIAIgAikGUUK6QSaOUEgQSBBIECgAKAJJAJIUBIEEgQSQSCBJIAkgQSQQSBM+tcqkooF8JHYKEkm7B//Z' />Late</Label>
                            <Label size='large' color='black'><Image className='key' circular avatar spaced='right' src='https://www.colorhexa.com/f9803f.png' />Remade</Label>
                        </Grid.Column>
                    </Grid>
                </React.Fragment>
            )
        } else { //displays the Tech's main page

        return (
            <React.Fragment>
                <Menu fixed='top' inverted>
                    <Menu.Item as='a' header onClick={this.resetSearch}>
                        <Image id="logo" size='tiny' srcSet='../Images/spec-trek_circle.png' style={{ marginRight: '1.5em' }} />
                        Spec Trek
                        </Menu.Item>
                    {/* <Menu.Item>
                        <Link
                            to={{
                                pathname: "/neworder",
                                currentUser: this.state.currentUser
                            }}>
                            New Order
                        </Link>
                    </Menu.Item> */}
                    <Menu.Item onClick={this.changeView}>
                        Change Order Display
                    </Menu.Item>
                    <Input ref="search" id="search" style={{ marginLeft: '3em' }} onKeyPress={this.searchBar} transparent inverted placeholder='Search...'/>
                    <Menu.Menu position="right">
                        <Menu.Item>
                            {this.state.role}
                        </Menu.Item>
                        <Menu.Item onClick={this.logOut}>
                                Log Out
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                <Grid>
                    <Grid.Column style={{ paddingRight: '0' }} width={14}>
                        <Card.Group style={{ marginTop: '7em' }}>
                            {(this.state.search < 1)? //displays search results if any
                                this.state.orders.map(order =>
                                    <Order key={order.id} order={order} orderStatus={orderStatus} handleSelectChange={this.handleSelectChange} remakeOrder={this.remakeOrder} currentUser={this.currentUser} deleteOrder={this.deleteOrder}>
                                        {order}
                                    </Order>
                                ) :
                                this.state.search.map(order =>
                                    <Order key={order.id} order={order} orderStatus={orderStatus} handleSelectChange={this.handleSelectChange} remakeOrder={this.remakeOrder} currentUser={this.currentUser} deleteOrder={this.deleteOrder}>
                                        {order}
                                    </Order>
                                )
                            }
                        </Card.Group>
                    </Grid.Column>
                    <Grid.Column width={2} style={{ marginTop: '7em' }}>
                        <Label size='large' color='black'><Image className='key' circular avatar spaced='right' src='https://www.colorhexa.com/62b5c2.png' />On Time</Label>
                        <Label size='large' color='black'><Image className='key' circular avatar spaced='right' src='https://www.colorhexa.com/89a817.png' />Shipped</Label>
                        <Label size='large' color='black'><Image className='key' circular avatar spaced='right' src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw4HBgYHCgcHDQgGBxYPBggHBhAICRAKFRUWFiASHx8YKCggIholHhoTITIoJSkrLi4uGh8zOD8sNygtQjIBCgoKDQ0NDg0NDi8ZFR43Li0tKys3MSsrNys3Ky0rKzctLSsrKystKy4rNy0rKy03Ky0rKy0rNzcrLSsrNzcrK//AABEIAKgBLAMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAABAAIFBv/EABsQAQABBQEAAAAAAAAAAAAAAACBESFRYbEC/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAEDAgYF/8QAFxEBAQEBAAAAAAAAAAAAAAAAAGEBEf/aAAwDAQACEQMRAD8A9+Cngn0QGgigNAAiACIAIoGUUgAUABQANAAGggA0AAaAANAAiEAigZDSBkNAAiEHSRTVGUUDKKQAKFAaAANAAiACKBlFIMooGUUABQANBABoAA0AAaABEIBEAA0gdENBogRABEAEUDKKQZRQoBQANAAGgARABEIBFAyigZRQAFIAFAymgABQANBB0gU1QAoAGggA0ACIAIgAikGUUKyigAKAAoAGgARCARABFAyigZRSDKKBlFA6KIaIEUDKKAAoACkAGgADQABoAEQgEUKyigZRQAFAA0EAGgADQAIgAigZRSDohoNUAaCADQAIgAigZRSDKKAAoACgAaAANBFCIAIoGUUDKKAApAAoAGgARAOkGg0QBoAA0AAKQAaABEAEQARSDKKBlFAAUABQANBFAaABEAEQARQMopAAoHRRTVyAUigFAymgDKKBlFIAFAA0ACIAIhAIoGUUDKKBlFIAFCgNAAGgARABFA6KKaOWUQARQrKKQAKBlFAyigZRSDKKAAoAGgADQQCIAIgAigZRSDKKFAKABoA6SIaOQiAAaAANAAiEUIoGUUDKKBlEAEUgyigAKAAoAGggA0ACIAIgAikGUUK6QSaOUEgQSBBIECgAKAJJAJIUBIEEgQSQSCBJIAkgQSQQSBM+tcqkooF8JHYKEkm7B//Z' />Late</Label>
                        <Label size='large' color='black'><Image className='key' circular avatar spaced='right' src='https://www.colorhexa.com/f9803f.png' />Remade</Label>
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        )
    }
    }

}