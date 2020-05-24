import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import CustomerDataService from '../CustomerDataService';
import Utilities from '../Utilities'
import '../css/Modal.css'
import Popup from "reactjs-popup";
class AddUpdateCustomer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: Utilities.emptyItem,
      errors: Utilities.emptyItem,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.idElement = this.idElement.bind(this);
  }

  componentDidMount() {
    console.log("id = " + this.props.match.params.id)
    let id = this.props.match.params.id
    if(!(id == null)){
      CustomerDataService.retrieveCustomer(id).then(response => {
        this.setState({
          item : response.data
        })
      })
    }
  }

  handleChange(event) {
    console.log(event)
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "name":
        errors.name =
          value.length < 4 || !Utilities.validNameRegex.test(value) ? "Name should be atleast 4 letters and must contain only letters or spaces" : "";
        break;

      case "email":
        errors.email = Utilities.validEmailRegex.test(value)
          ? ""
          : "Email is not valid !";
        break;

      case "address":
        errors.address =
          value.length < 6 || !Utilities.validAddressRegex.test(value) ? "Address should be min. 6 characters and in correct format" : "";
        break;

      case "accountNo":
        errors.accountNo = value.length !== 10 ? "Account number should be of 10 characters" : "";
        break;

      case "accountType":
        errors.accountType =
          value === "None" ? "Please select an Account Type !" : "";
        break;

      case "accountBalance":
        errors.accountBalance = !Utilities.validAccountBalance.test(value) ? "Account balance can only be a integer or decimal value" : "";
        break;
    }

    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item: item, errors: errors });
    console.log("error = " + this.state.errors)
  }


    handleSubmit(event) {
    event.preventDefault();
    const item = this.state.item;
    console.log(item);

    let id = this.props.match.params.id
    if(id == null)
      CustomerDataService.createCustomer(item).then(() => this.props.history.push('/home'))
    else
      CustomerDataService.updateCustomer(id, item).then(() => this.props.history.push('/home'))
  }

  idElement(id){
    if(!(id == null))
      return <div className = "col-xs-2 labelclass">
          <FormGroup>
            <Label for="id" className="labelclass">Id</Label>
            <Input type="text" name="id" id="id" value={this.state.item.id || ''} disabled/>
          </FormGroup>
      </div>
  }


  render() {
    const item = this.state.item;
    let errors = this.state.errors;
    let isNotValid = !Utilities.validateFullForm(errors, item);
    let id = this.props.match.params.id
    let buttonContent = 'Update'
    let handleChange = this.handleChange
    if(id == null)
      buttonContent = 'Add'

    const title = <h2>{item.id ? 'Edit Customer' : 'Add Customer'}</h2>;

    return <div>
      <Container>
        {title}
        <Form className="formclass" onSubmit={this.handleSubmit}>

          {this.idElement(this.props.match.params.id)}

          {
            Utilities.fields.map(function(field, index){
              if(field !== "accountType"){
                return <div className = "col-xs-2 labelclass">
                    <FormGroup>
                      <Label for={field} className="labelclass">{Utilities.fieldNames[index]}</Label>
                      <Input type="text" name={field} onChange={handleChange}  value = {item[field] || ''} placeholder={Utilities.fieldNames[index]}/>
                      <span className="error">{errors[field]}</span>
                    </FormGroup>
                </div>
              }
              else {
                return <div className = "col-xs-2 labelclass">
                  <FormGroup>
                    <label className="labelclass">
                    Select Account Type
                    </label>
                    <select
                      class="form-control"
                      name="accountType"
                      value={item.accountType}
                      onChange={handleChange}
                    >
                      <option value="None">None</option>
                      <option value="Savings Account">Savings Account</option>
                      <option value="Current Account">Current Account</option>
                      <option value="Fixed Deposit">Fixed Deposit</option>
                    </select>
                    <span className="error">{errors[field]}</span>
                  </FormGroup>
                </div>
              }
            })
          }


          <FormGroup>
            <Button color="primary" type="submit" disabled={isNotValid}>{buttonContent}</Button>{' '}
            <Button color="secondary" tag={Link} to="/home">Cancel</Button>
          </FormGroup>

        </Form>
      </Container>
    </div>
  }
}

export default withRouter(AddUpdateCustomer);
