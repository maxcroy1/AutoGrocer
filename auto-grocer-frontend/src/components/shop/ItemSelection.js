import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { initOrder, addItem, removeItem } from '../../actions/order';
import ItemCard from './ItemCard';

class ItemSelection extends React.Component {

    state = {
        item: "",
        quantity: "1"
    }

    componentDidMount() {
        if (this.props.orderID === "") {
            let configObj = this.orderConfigObj();
            fetch('http://localhost:3000/orders', configObj)
                .then(resp => resp.json())
                .then(json => this.props.initOrder(json.orderID))
                .catch(error => console.log(error))
        }
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
                'Authorization': `Bearer ${this.props.user.token}`
            },
            body: JSON.stringify(formData)
        }
        return configObj
    }

    handleRemove = (item) => {
        let index = this.props.items.indexOf(item);
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
            <div>
                <h2>Enter the name and quantity of the item that you'd like to add to your order below</h2>
                <form onSubmit={this.handleAdd}>
                    <label htmlFor="item">Item:</label><br />
                    <input type="text" name="item" onChange={this.handleChange} />
                    <select name="quantity" onChange={this.handleChange}>
                        {this.quantityGenerator().map(num => <option value={num} key={num}>{num}</option>)}
                    </select>
                    <input type="submit" value="Add Item" />
                </form><br />
                <button><Link to={'/shop/delivery_preferences'}>Next: Delivery Options</Link></button>
                <h2>Cart Items:</h2>
                <ul>
                    {this.props.items.map(item => <ItemCard key={item.id} item={item} handleRemove={this.handleRemove} />)}
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
        removeItem: (index) => {
            dispatch(removeItem(index))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemSelection);