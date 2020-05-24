import React, { Component } from 'react'
import CustomerDataService from '../CustomerDataService';
import '../css/Modal.css'
import '../css/Form.css'
import Utilities from '../Utilities'
import PopupComponent from '../components/PopupComponent'
import CustomerListBuilder from '../components/CustomerListBuilder'

class ListCustomersComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customers: [],
            message: null
        }
        this.deleteCustomerClicked = this.deleteCustomerClicked.bind(this)
        this.updateCustomerClicked = this.updateCustomerClicked.bind(this)
        this.addCustomerClicked = this.addCustomerClicked.bind(this)
        this.refreshCustomer = this.refreshCustomer.bind(this)
        this.showCustomerDetails = this.showCustomerDetails.bind(this)
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        this.refreshCustomer();
    }

    refreshCustomer() {
        CustomerDataService.retrieveAllCustomers()
            .then(
                response => {
                    console.log(response);
                    this.setState({ customers: response.data })
                }
            )
    }

    deleteCustomerClicked(id) {
        CustomerDataService.deleteCustomer(id)
            .then(
                response => {
                    this.setState({ message: `Delete of customer ${id} Successful` })
                    this.refreshCustomer()
                }
            )
    }

    addCustomerClicked() {
        this.props.history.push(`/addCustomer`)
    }

    updateCustomerClicked(id) {
        this.props.history.push(`/updateCustomer/${id}`)
    }

    showCustomerDetails(id){
      this.props.history.push(`/showCustomer/${id}`)
    }

    logOut(){
      this.props.history.push('/login')
    }

    render() {
        console.log('render')
        console.log(this.state.customers)
        return (
            <div className="container">
                <h3>All Customers</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                  <div className="row" id = "addBtnRow">
                      <button className="btn btn-primary" onClick={this.logOut}>{Utilities.logoutIcon()}{'  '}Logout</button>
                      <button className="btn btn-success" onClick={this.addCustomerClicked}>{Utilities.addIcon()}{'  '}Add</button>
                  </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Customer ID</th>
                                <th>Customer Name</th>
                                <th>Email ID</th>
                                <th>Account Type</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                <CustomerListBuilder customers={this.state.customers}
                                showCustomerDetails={this.showCustomerDetails}
                                updateCustomerClicked={this.updateCustomerClicked}
                                deleteCustomerClicked={this.deleteCustomerClicked}
                                />
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListCustomersComponent
