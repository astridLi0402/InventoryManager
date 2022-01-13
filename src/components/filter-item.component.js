import React, {Component} from "react";
import { Link } from 'react-router-dom';
import {MenuItem, FormControl, InputLabel, Select, Button} from "@material-ui/core";
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

export default class FilterItems extends Component{
    constructor(props) {
        super(props);

        this.deleteItem = this.deleteItem.bind(this)
        this.filterByField = this.filterByField.bind(this)
        this.filterByCount = this.filterByCount.bind(this)
        this.filterByPrice = this.filterByPrice.bind(this)
        this.resetFilter = this.resetFilter.bind(this)

        this.state = {
            items: [],
            allItems:[],
            types:[],
            fieldFilter: 'Field',
            priceFilter:'Price Lower Than',
            countFilter:'Count Greater Than',
            fieldFilterOn: false,
            priceFilterOn:false,
            countFilterOn: false,
            fieldFilterAt: '',
            priceFilterAt: Number.MAX_VALUE,
            countFilterAt: Number.MIN_VALUE

        };
    }

    componentDidMount() {
        axios.get('http://localhost:9000/items/')
            .then(response => {
                this.setState({ items: response.data });
                this.setState({ allItems: response.data });
                console.log(response.data);
                let tempTypes = [];
                for(let i = 0; i<response.data.length; i++){
                    if(tempTypes.indexOf(response.data[i].field) <= -1){
                        tempTypes.push(response.data[i].field);
                    }
                }
                this.setState({ types: tempTypes });
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

    displayedItemList() {
        return this.state.items.map(curItem => {
            return <Item item={curItem} deleteItem={this.deleteItem} key={curItem._id}/>;
        })
    }

    filterList(){
        let i = 10;

        return this.state.types.map(curType => {
            console.log(curType);
            return <MenuItem value={i+=10} data-my-value={curType} onClick={this.filterByField} key={curType}>{curType}</MenuItem>;
        })
    }

    filterByField (event){
        const { myValue } = event.currentTarget.dataset;
        // console.log(myValue) // --> 123
        let itemsToDisplay = this.state.items;
        if(this.state.fieldFilter !== 'Field'){
            itemsToDisplay = this.state.allItems;
            if(this.state.priceFilterOn ){
                itemsToDisplay = itemsToDisplay.filter(il => il.count <= this.state.priceFilterAt);
            }
            if(this.state.countFilterOn){
                itemsToDisplay = itemsToDisplay.filter(il => il.count > this.state.countFilterAt);
            }
        }
        this.setState({
            items: itemsToDisplay.filter(il => il.field === myValue),
            fieldFilter: "In Field: " + myValue,
            fieldFilterOn: true,
            fieldFilterAt: myValue
        })
    }

    filterByCount (event){
        const { myValue } = event.currentTarget.dataset;
        // console.log(myValue)
        let itemsToDisplay = this.state.items;
        if(this.state.countFilter !== 'Count Greater Than'){
            itemsToDisplay = this.state.allItems;
            if(this.state.priceFilterOn){
                itemsToDisplay = itemsToDisplay.filter(il => il.count <= this.state.priceFilterAt);
            }
            if(!this.state.fieldFilterOn){
                itemsToDisplay = itemsToDisplay.filter(il => il.field === this.state.fieldFilterAt);
            }
        }
        this.setState({
            items: itemsToDisplay.filter(il => il.count > myValue),
            countFilter: "Count Greater Than " + myValue.toString(),
            countFilterOn: true,
            countFilterAt: myValue
        })
    }

    filterByPrice (event){
        const { myValue } = event.currentTarget.dataset;
        // console.log(myValue)
        let itemsToDisplay = this.state.items;
        if(this.state.priceFilter !== 'Price Lower Than'){
            itemsToDisplay = this.state.allItems;
            if(this.state.fieldFilterOn){
                itemsToDisplay = itemsToDisplay.filter(il => il.field === this.state.fieldFilterAt);
            }
            if(this.state.countFilterOn){
                itemsToDisplay = itemsToDisplay.filter(il => il.count > this.state.countFilterAt);
            }
        }
        this.setState({
            items: itemsToDisplay.filter(il => il.price <= myValue),
            priceFilter: "Price Lower than " + myValue.toString(),
            priceFilterOn: true,
            priceFilterAt: myValue
        })
    }


    resetFilter(){
        this.setState({
            items: this.state.allItems,
            priceFilter: "Price Lower Than",
            countFilter: "Count Greater Than",
            fieldFilter: 'Field',
            fieldFilterOn: false,
            priceFilterOn:false,
            countFilterOn: false
        })
    }

    render() {
        return (
            <div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{this.state.fieldFilter}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Field"
                    >
                        <tbody>
                        {this.filterList()}
                        </tbody>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{this.state.priceFilter}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Field"
                    >
                        <tbody>
                        <MenuItem value={10} data-my-value={100} onClick={this.filterByPrice} key={100}>{100}</MenuItem>
                        <MenuItem value={20} data-my-value={200} onClick={this.filterByPrice} key={200}>{200}</MenuItem>
                        <MenuItem value={30} data-my-value={300} onClick={this.filterByPrice} key={300}>{300}</MenuItem>
                        <MenuItem value={40} data-my-value={500} onClick={this.filterByPrice} key={500}>{500}</MenuItem>
                        </tbody>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{this.state.countFilter}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Field"
                    >
                        <tbody>
                        <MenuItem value={10} data-my-value={1000} onClick={this.filterByCount} key={1000}>{1000}</MenuItem>
                        <MenuItem value={20} data-my-value={3000} onClick={this.filterByCount} key={3000}>{3000}</MenuItem>
                        <MenuItem value={30} data-my-value={5000} onClick={this.filterByCount} key={5000}>{5000}</MenuItem>
                        <MenuItem value={40} data-my-value={10000} onClick={this.filterByCount} key={10000}>{10000}</MenuItem>
                        </tbody>
                    </Select>
                </FormControl>
                <Button variant="contained" color="success" onClick={this.resetFilter}>
                    Reset Filter
                </Button>
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
                    { this.displayedItemList() }
                    </tbody>
                </table>
            </div>
        );
    }
}
