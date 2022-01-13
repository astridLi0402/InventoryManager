import React, {Component} from "react";
// import {Link} from "react-router-dom"
const Link = require("react-router-dom").Link;
export default class Navbar extends Component{

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">InventoryManager</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">Items</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/item" className="nav-link">Create Item Record</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/filter" className="nav-link">Filter Items</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

// <nav className="navbar navbar-dark gb-dark navbar-expand-lg">
//     <Link to="/" className="Navbar-brand"> ItemsTracker </Link>
//     <div className={"collapse navbar-collapse"}>
//         <ul className={"navbar-nav mr-auto"}>
//             <li className={"navbar-item"}>
//                 <Link to="/" className="nav-link">Create Inventory Item Record</Link>
//             </li>
//             <li className={"navbar-item"}>
//                 <Link to="/user" className="nav-link">Create User</Link>
//             </li>
//         </ul>
//     </div>
// </nav>