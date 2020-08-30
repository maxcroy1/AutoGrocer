import React from 'react';
import { connect } from 'react-redux';
import { initOrder, addItem, selectionComplete } from '../actions/order';

class ItemSelection extends React.Component {

    state = {
        item: "",
        quantity: "1"
    }

    quantityGenerator() {
        let nums = []
        for (let i = 1; i <= 9; i++) {
            nums.push(i)
        }
        return nums
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
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
                    name: this.state.item,
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
                'Authorization': `Bearer ${this.props.user}`
            },
            body: JSON.stringify(formData)
        }
        return configObj
    }

    handleComplete = () => {
        if (this.props.items.length > 0) {
            this.props.selectionComplete();
        }
    }

    componentDidMount() {
        let configObj = this.orderConfigObj();
        fetch('http://localhost:3000/orders', configObj)
            .then(resp => resp.json())
            .then(json => this.props.initOrder(json.orderID))
            .catch(error => console.log(error))
    }

    orderConfigObj = () => {
        let configObj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.props.user}`
            }
        }
        return configObj
    }

    render() {
        return (
            <div>
                <h3>Enter the name and quantity of the item that you'd like to add to your order below</h3>
                <form onSubmit={this.handleAdd}>
                    <label htmlFor="item">Item:</label><br />
                    <input type="text" name="item" onChange={this.handleChange} />
                    <select name="quantity" onChange={this.handleChange}>
                        {this.quantityGenerator().map(num => <option value={num} key={num} defaultValue={num === 1 ? true : false}>{num}</option>)}
                    </select>
                    <input type="submit" value="Add Item" />
                </form><br />
                <button onClick={this.handleComplete}>Next: Delivery Options</button>
                <h3>Cart Items:</h3>
                <ul>
                    {this.props.items.map(item => <li><strong>{item.name}</strong> {item.quantity}x <button>Remove</button></li>)}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        user: state.user,
        orderID: state.order.id,
        items: state.order.items
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
        selectionComplete: () => {
            dispatch(selectionComplete())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemSelection);