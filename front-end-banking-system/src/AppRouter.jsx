import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginComponent from './screens/LoginComponent'
import ListCustomersComponent from './screens/ListCustomersComponent'
import CustomerDetails from './screens/CustomerDetails'
import AddUpdateCustomer from './screens/AddUpdateCustomer.jsx'


class AppRouter extends Component{
  render(){
    return(
        <>
            <Router>
             <Switch>
               <Route path="/addCustomer" component={AddUpdateCustomer} />
               <Route path="/login" component={LoginComponent} />
               <Route path="/home" component={ListCustomersComponent} />
               <Route path="/updateCustomer/:id" component={AddUpdateCustomer} />
               <Route path="/showCustomer/:id" component={CustomerDetails} />
             </Switch>
           </Router>
        </>
    );
  }
}

export default AppRouter
