import React from 'react';
import Navbar from '../components/Navbar'

class Shop extends React.Component {
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

    handleSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Navbar />
                <h1>Let's shop!</h1>
                <h3>Enter the name and quantity of the item that you'd like to add to your order below</h3>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="item">Item:</label><br />
                    <input type="text" name="item" onChange={this.handleChange} />
                    <select name="quantity" onChange={this.handleChange}>
                        {this.quantityGenerator().map(num => <option value={num} selected={num === 1 ? true : false}>{num}</option>)}
                    </select>
                    <input type="submit" value="Add Item" />
                </form>
            </div>
        );
    }
}

export default Shop;