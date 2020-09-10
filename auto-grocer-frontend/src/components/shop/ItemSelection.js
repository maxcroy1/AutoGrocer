import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import { initOrder, addItem, removeItem } from '../../actions/order';
import ItemCard from './ItemCard';

class ItemSelection extends React.Component {

    state = {
        selected_items: [], 
        inputValue: '',
        searched_item: '', 
        quantity: '1'
    }

    getItemsAPI = (input) => {
        if (!input) {
            return Promise.resolve({options: []});
        }

        return fetch(`http://localhost:3000/items/search?query="${input}`)
            .then(resp => resp.json())
            .then(json => {
                const formatted_items = json.map(item => new Object({value: item.id, label: <div><img src={item.img_url} height="70px" />{item.name} - {item.price}</div>}))
                return formatted_items
            })
    }

    componentDidMount() {
        if (this.props.orderID === "") {
            let configObj = this.orderConfigObj();
            fetch('http://localhost:3000/orders', configObj)
                .then(resp => resp.json())
                .then(json => this.props.initOrder(json.orderID))
                .catch(error => console.log(error))
        }
        console.log(this.getItemsAPI())
    }

    orderConfigObj = () => {
        let configObj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.props.user.token}`
            }
        }
        return configObj
    }

    quantityGenerator() {
        let nums = []
        for (let i = 1; i <= 9; i++) {
            nums.push(i)
        }
        return nums
    }

    handleChange = (event) => {
        console.log(event.value)
        if (typeof event.value === "undefined") {
            this.setState({
                quantity: event.target.value
            })
        }
        else {
            this.setState({
                searched_item: event.value
            })
        }
        console.log(this.state)
    }

    handleAdd = (event) => {
        event.preventDefault();
        event.target.reset();
        let configObj = this.itemConfigObj();
        fetch('http://localhost:3000/order_items', configObj)
            .then(resp => resp.json())
            .then(json => this.props.addItem(json.item))
            .catch(error => console.log(error))
    }

    itemConfigObj = () => {
        let formData = {
            order_item: {
                item: {
                    id: this.state.searched_item,
                    quantity: this.state.quantity
                },
                order: {
                    id: this.props.orderID
                }
            }
        }
        let configObj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.props.user.token}`
            },
            body: JSON.stringify(formData)
        }
        return configObj
    }

    handleRemove = (item) => {
        let index = this.props.order_items.indexOf(item);
        this.props.removeItem(index);
        let configObj = this.deleteConfig()
        fetch(`http://localhost:3000/order_items/${item.id}`, configObj)
            .catch(error => console.log(error))
    }

    deleteConfig() {
        let configObj = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.props.user.token}`
            }
        }
        return configObj
    }

    render() {


        return (
            <div className="py-2">
                <h2>Item Selection</h2>
                <p>Enter the name and quantity of the items that you'd like to add to your order below.</p>
                <Form onSubmit={this.handleAdd}>
                    <Form.Label htmlFor="item">Item:</Form.Label><br />
                    <div className="form-inline">
                        <AsyncSelect value={this.state.value} loadOptions={this.getItemsAPI} placeholder="Search for..." onChange={this.handleChange} /><br />
                        <Form.Label className="pl-2">Qty: </Form.Label>
                        <Form.Control as="select" onChange={this.handleChange} className="dropdown">
                            {this.quantityGenerator().map(num => <option key={num}>{num}</option>)}
                        </Form.Control>
                    </div>
                    <Button type="submit" variant="success" className="my-3">Add Item</Button>
                </Form><br />
                <h3>Cart Items:</h3>
                <br />
                <ul>
                    {this.props.order_items.map(item => <ItemCard key={item.id} item={item} handleRemove={() => this.handleRemove(item)} />)}
                </ul>
                {this.props.order_items.length > 0 ? <Button variant="success"><Link to={'/shop/delivery_preferences'}  className="button-link">Next: Delivery Options</Link></Button> : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        user: state.user,
        orderID: state.order.id,
        order_items: state.order.items,
        items: state.items
     }
}

const mapDispatchToProps = dispatch => {
    return {
        initOrder: (orderID) => {
            dispatch(initOrder(orderID))
        },
        addItem: (newItem) => {
            dispatch(addItem(newItem))
        },
        removeItem: (index) => {
            dispatch(removeItem(index))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemSelection);