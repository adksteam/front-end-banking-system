import React, { Component } from 'react'
import CustomerDataService from '../CustomerDataService';
import { Button, Form, FormGroup } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import '../css/CustomerDetailsCSS.css'
import Utilities from '../Utilities'
import DetailsTableBuilder from '../components/DetailsTableBuilder'

class CustomerDetails extends Component{
  constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            customer: Utilities.emptyItem
        }
    }

  componentDidMount() {
      if (this.state.id == -1) {
          return
      }

      CustomerDataService.retrieveCustomer(this.state.id).then(response => {
        this.setState({
          customer : response.data
        })
      })
  }

  render(){
    let customer = this.state.customer
    return(
      <div>
          <h3>Customer Details </h3>
          <hr />
          <div className="container tableclass">
            <table class="table">
              <thead>
                  <tr>
                      <th style={{"padding-left": "33%"}}>Field</th>
                      <th style={{"padding-left": "33%"}}>Details</th>
                  </tr>
              </thead>
              <tbody>
                  {
                    <DetailsTableBuilder customer={customer} />
                  }
              </tbody>
            </table>
          </div>
          <FormGroup>
              <Button color="warning" className="navigateBtn" tag={Link} to={"/updateCustomer/" + customer.id}>Edit Details</Button>{' '}
              <Button color="secondary" className="navigateBtn" tag={Link} to="/home">Back to Home</Button>
          </FormGroup>

      </div>
    );
  }
}
export default withRouter(CustomerDetails)
