import React, {Component} from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditItem extends Component{
    constructor(props) {
        super(props);

        this.onChangeItemName = this.onChangeItemName.bind(this);
        this.onChangeItemPrice = this.onChangeItemPrice.bind(this);
        this.onChangeItemField = this.onChangeItemField.bind(this);
        this.onChangeItemCount = this.onChangeItemCount.bind(this);
        this.onChangeItemDate = this.onChangeItemDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            field: '',
            price:0,
            count: 0,
            date:new Date(),
        }
    }

    componentDidMount(){
        // eslint-disable-next-line react/prop-types
        axios.get('http://localhost:9000/items/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    field: response.data.field,
                    price: response.data.price,
                    count: response.data.count,
                    date: new Date(response.data.date)
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeItemName(e){
        this.setState({
            name: e.target.value
        });
    }
    onChangeItemPrice(e){
        this.setState({
            price: e.target.value
        });
    }

    onChangeItemField(e){
        this.setState({
            field: e.target.value
            // e.target.value
        });
    }

    onChangeItemCount(e){
        this.setState({
            count: e.target.value
            // e.target.value
        });
    }

    onChangeItemDate(date){
        this.setState({
            date: date
        });
    }

    onSubmit(e){
        e.preventDefault();

        const item = {
            name: this.state.name,
            field: this.state.field,
            price:this.state.price,
            count:this.state.count,
            date: this.state.date
        }
        console.log(item);

        // eslint-disable-next-line no-undef
        window.location = '/'
        // eslint-disable-next-line react/prop-types
        axios.post('http://localhost:9000/items/update/'+this.props.match.params.id, item)
            .then(res => {
                console.log(res.data);
            })
    }

    render() {
        return (
            <div>
                <h3>Edit New Item Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Item Name: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeItemName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Field: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.field}
                                onChange={this.onChangeItemField}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.price}
                            onChange={this.onChangeItemPrice}
                        />
                    </div>
                    <div className="form-group">
                        <label>Count: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.count}
                            onChange={this.onChangeItemCount}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Item Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

