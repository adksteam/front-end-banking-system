import React from 'react';
import Utilities from '../Utilities'
import PopupComponent from './PopupComponent'

function CustomerListBuilder(props){
  return (
      props.customers.map(
        customer =>
            <tr key={customer.id}>
                <td><button className="btn btn-default" onClick={() => props.showCustomerDetails(customer.id)}>{customer.id}</button></td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.accountType}</td>
                <td><button className="btn updateBtn" onClick={() => props.updateCustomerClicked(customer.id)}>{Utilities.updateIcon()}{'  '}Update</button></td>
                <td><PopupComponent deleteCustomerClicked={props.deleteCustomerClicked} customer={customer} /></td>
            </tr>
    )
  );
}

export default CustomerListBuilder;
