import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import CustomerDataService from '../CustomerDataService';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validateFullForm = (errors, values) => {
  let valid = true;

  for(let error in errors){
    if(errors[error].length > 0)
      return false;
  }
  for(let item in values){
    if(item == 'id')
      continue;
    if(values[item].length == 0)
      return false;
  }
  return valid;
};

const fields = ['name', 'email', 'address', 'accountType', 'accountNo', 'accountBalance'];
const fieldNames = ['Name', 'Email', 'Address', 'Account Type', 'Account Number', 'Account Balance']

class saveUpdateCustomer extends Component {

  emptyItem = {
    name: '',
    email: '',
    address: '',
    accountType: '',
    accountNo: '',
    accountBalance:''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: {
        id: '',
        name: '',
        email: '',
        address: '',
        accountType: '',
        accountNo: '',
        accountBalance:''
      },
      errors: this.emptyItem,
      mode: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.idElement = this.idElement.bind(this);
    this.createFormFields = this.createFormFields.bind(this);
    this.createFormFieldsUtil = this.createFormFieldsUtil.bind(this);
  }

  componentDidMount() {
    console.log("id = " + this.props.match.params.id)
    let id = this.props.match.params.id
    if(!(id == null)){
      this.setState({
        mode: 1
      })

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
          value.length < 5 ? "Full Name should be min. 5 characters !" : "";
        break;

      case "email":
        errors.email = validEmailRegex.test(value)
          ? ""
          : "Email is not valid !";
        break;

      case "address":
        errors.address =
          value.length < 6 ? "Address should be min. 6 characters !" : "";
        break;

      case "accountNo":
        errors.accountNo = value.length !== 10 ? "Account number should be of 10 characters" : "";
        break;

      case "accountType":
        errors.accountType =
          value === "None" ? "Please select an Account Type !" : "";
        break;
    }


    let item = { ...this.state.item };
    //console.log("item = " + item)
    item[name] = value;
    this.setState({ item: item, errors: errors });
    console.log("error = " + this.state.errors)
  }

  createFormFields(){
    //return
  }


  createFormFieldsUtil(fieldName){
    return <div className = "col-xs-2 labelclass">
        <FormGroup>
          <Label for="name" className="labelclass">fieldName</Label>
          <Input type="text" name="name" id="name"
                 onChange={this.handleChange} autoComplete="name" placeholder={fieldName}/>
          <span className="error"></span>
        </FormGroup>
    </div>
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
    let isNotValid = !validateFullForm(errors, item);
    let id = this.props.match.params.id
    let buttonContent = 'Save'
    if(id == null)
      buttonContent = 'Add'
    //console.log("valid = " + validateFullForm(errors, item));

    const title = <h2>{item.id ? 'Edit Customer' : 'Add Customer'}</h2>;

    return <div>
      <Container>
        {title}
        <Form className="formclass" onSubmit={this.handleSubmit}>

          {this.idElement(this.props.match.params.id)}

          <div className = "col-xs-2 labelclass">
              <FormGroup>
                <Label for="name" className="labelclass">Name</Label>
                <Input type="text" name="name" id="name" value={item.name || ''}
                       onChange={this.handleChange} autoComplete="name" placeholder="Name"/>
                <span className="error">{errors.name}</span>
              </FormGroup>
          </div>

          <div  className = "col-xs-2 labelclass">
            <FormGroup>
              <Label for="email" className="labelclass">Email</Label>
              <Input type="text" name="email" id="email" value={item.email || ''}
                     onChange={this.handleChange} placeholder="Email" />
              <span className="error">{errors.email}</span>
            </FormGroup>
          </div>

          <div  className = "col-xs-2 labelclass">
            <FormGroup>
              <Label for="address" className="labelclass">Address</Label>
              <Input type="text" name="address" id="address" value={item.address || ''}
                     onChange={this.handleChange} placeholder="Address" />
              <span className="error">{errors.address}</span>
            </FormGroup>
          </div>

          <div  className = "col-xs-2 labelclass">
            <FormGroup>
              <Label for="accountType" className="labelclass">Account Type</Label>
              <Input type="text" name="accountType" id="accountType" value={item.accountType || ''}
                     onChange={this.handleChange} placeholder="Account Type"/>
              <span className="error">{errors.accountType}</span>
            </FormGroup>
          </div>

          <div  className = "col-xs-2 labelclass">
            <FormGroup>
              <Label for="accountNo" className="labelclass">Account Number</Label>
              <Input type="text" name="accountNo" id="accountNo" value={item.accountNo || ''}
                     onChange={this.handleChange} placeholder="Account Number"/>
              <span className="error">{errors.accountNo}</span>
            </FormGroup>
          </div>
          <div  className = "col-xs-2 labelclass">
              <FormGroup>
                <Label for="accountBalance" className="labelclass">Account Balance</Label>
                <Input type="number" name="accountBalance" id="accountBalance" value={item.accountBalance || ''}
                       onChange={this.handleChange} placeholder="Account Balance"/>
                <span className="error">{errors.accountBalance}</span>
              </FormGroup>
          </div>
          <FormGroup>
            <Button color="primary" type="submit" disabled={isNotValid}>{buttonContent}</Button>{' '}
            <Button color="secondary" tag={Link} to="/home">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(saveUpdateCustomer);
