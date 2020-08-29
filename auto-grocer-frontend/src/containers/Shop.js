import React from 'react';
import Navbar from '../components/Navbar'

class Shop extends React.Component {
    state = {
        item: "",
        quantity: "1",
        items: []
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
        let newItem = {
            item: this.state.item,
            quantity: this.state.quantity
        };
        this.setState( previousState => ({
            items: [...previousState.items, newItem]
        }));
    }

    render() {
        return (
            <div>
                <Navbar />
                <h1>Let's shop!</h1>
                <h3>Enter the name and quantity of the item that you'd like to add to your order below</h3>
                <form onSubmit={this.handleAdd}>
                    <label htmlFor="item">Item:</label><br />
                    <input type="text" name="item" onChange={this.handleChange} />
                    <select name="quantity" onChange={this.handleChange}>
                        {this.quantityGenerator().map(num => <option value={num} selected={num === 1 ? true : false}>{num}</option>)}
                    </select>
                    <input type="submit" value="Add Item" />
                </form>
                <h3>Cart Items:</h3>
                <ul>
                    {this.state.items.map(item => <li><strong>{item.item}</strong> {item.quantity}x <button>Remove</button></li>)}
                </ul>
            </div>
        );
    }
}

export default Shop;