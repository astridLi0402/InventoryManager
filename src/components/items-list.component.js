import React, {Component} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Item = props => (
    <tr>
        {/* eslint-disable-next-line react/prop-types */}
        <td>{props.item.name}</td>
        {/* eslint-disable-next-line react/prop-types */}
        <td>{props.item.field}</td>
        {/* eslint-disable-next-line react/prop-types */}
        <td>{props.item.price}</td>
        {/* eslint-disable-next-line react/prop-types */}
        <td>{props.item.count}</td>
        {/* eslint-disable-next-line react/prop-types */}
        <td>{props.item.date.substring(0,10)}</td>
        <td>
            {/* eslint-disable-next-line react/prop-types */}
            <Link to={"/edit/"+props.item._id}>edit</Link> | <a href="#" onClick={() => { props.deleteItem(props.item._id) }}>delete</a>
        </td>
    </tr>
)

export default class ItemsList extends Component{
    constructor(props) {
        super(props);

        this.deleteItem = this.deleteItem.bind(this)

        this.state = {items: []};
    }

    componentDidMount() {
        axios.get('http://localhost:9000/items/')
            .then(response => {
                this.setState({ items: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteItem(id) {
        axios.delete('http://localhost:9000/items/'+id)
            .then(response => { console.log(response.data)});

        this.setState({
            items: this.state.items.filter(il => il._id !== id)
        })
    }

    itemList() {
        return this.state.items.map(curItem => {
            return <Item item={curItem} deleteItem={this.deleteItem} key={curItem._id}/>;
        })
    }
    render() {
        return (
            <div>
                <h3>Inventory Items</h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Name</th>
                        <th>Field</th>
                        <th>Price</th>
                        <th>Count</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.itemList() }
                    </tbody>
                </table>
            </div>
        );
    }
}
