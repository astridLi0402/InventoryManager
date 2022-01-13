import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/navbar.component"
import ItemsList from "./components/items-list.component";
import EditItem from "./components/edit-items.component";
import CreateItem from "./components/create-item.component";
import FilterItems from "./components/filter-item.component";

function App() {
  return (
      <BrowserRouter>
          <div  className={"container"}>
              <Navbar />
              <switch>
                  <Route exact path='/' component={ItemsList} />
                  <Route path='/edit/:id' component={EditItem} />
                  <Route path='/item' component={CreateItem} />
                  <Route path='/filter' component={FilterItems} />
              </switch>
          </div>
      </BrowserRouter>
  );
}

export default App;
