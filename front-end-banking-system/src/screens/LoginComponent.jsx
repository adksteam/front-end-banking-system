import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import CustomerDataService from '../CustomerDataService';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import '../css/Form.css'
import Utilities from '../Utilities'

class LoginComponent extends Component{

  constructor(props){
    super(props);

    this.state = {
      formValues: {
        username : "",
        password: ""
      },
      errors: {
        username: "",
        password: "",
      }
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event){
    //console.log(event)
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    if(name == "username"){
      errors.username = value.length<4 ? "Username should be greater than 3 characters" : "";
    }
    if (name == "password") {
      errors.password = value.length<4 ? "Password must be greater than 3 characters" : "";
    }

    let formValues = { ...this.state.formValues };
    formValues[name] = value;
    this.setState(
      {
        formValues: formValues,
        errors: errors
      },
    )
  }

  handleSubmit(event){
    event.preventDefault();
    //CustomerDataService.loginCustomer(values).then(() => this.props.history.push('/'))
    this.props.history.push('/home')
  }

  render(){

    let errors = this.state.errors;
    let item = this.state.formValues;
    console.log(item);
    let isNotValid = !Utilities.validateFullForm(errors, item);
    console.log(isNotValid)

    return(
      <div>
        <h3>Login Admin</h3>
        <Container>
          <Form className="formclass" >
            <div className = "col-xs-2 labelclass">
                <FormGroup>
                  <Label for="username" className="labelclass">Username</Label>
                  <Input type="text" name="username" id="username"  onChange={this.handleChange} placeholder="Userame"/>
                  <span className="error">{errors.username}</span>
                </FormGroup>
            </div>

            <div  className = "col-xs-2 labelclass">
              <FormGroup>
                <Label for="password" className="labelclass">Password</Label>
                <Input type="password" name="password" id="password"  onChange={this.handleChange} placeholder=" Password" />
                <span className="error">{errors.password}</span>
              </FormGroup>

              <FormGroup id="loginbutton">
                <Button color="primary" tag={Link} to="/home" disabled={isNotValid} >Login{'  '}{Utilities.loginIcon()}</Button>
              </FormGroup>

            </div>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(LoginComponent);
