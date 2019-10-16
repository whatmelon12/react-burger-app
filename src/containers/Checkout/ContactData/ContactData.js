import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import * as orderActions from "../../../store/actions";
import classes from "./ContactData.css";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../../axios-orders";

export class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        validation: {
          required: true
        },
        touched: false,
        valid: false,
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        validation: {
          required: true
        },
        touched: false,
        valid: false,
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street"
        },
        validation: {
          required: true
        },
        touched: false,
        valid: false,
        value: ""
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Zip Code"
        },
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        touched: false,
        valid: false,
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country"
        },
        validation: {
          required: true
        },
        touched: false,
        valid: false,
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "fastest" },
            { value: "cheapest", displayValue: "cheapest" }
          ]
        },
        validation: {
          required: true
        },
        touched: false,
        valid: false,
        value: "fastest"
      }
    },
    formIsValid: false,
    loading: false
  };

  sendOrderHandler = event => {
    event.preventDefault();

    const formData = {};
    for (let identifier in this.state.orderForm) {
      formData[identifier] = this.state.orderForm[identifier].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      order: formData
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  checkValidity = (value, rules = {}) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updateForm = { ...this.state.orderForm };
    const updateFormElement = { ...updateForm[inputIdentifier] };

    updateFormElement.value = event.target.value;
    updateFormElement.valid = this.checkValidity(
      updateFormElement.value,
      updateFormElement.validation
    );
    updateFormElement.touched = true;
    updateForm[inputIdentifier] = updateFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updateForm) {
      formIsValid = updateForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updateForm, formIsValid });
  };

  render() {
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        setup: this.state.orderForm[key]
      });
    }

    let form = (
      <Fragment>
        <h4>Enter you Contact Data</h4>
        <form onSubmit={this.sendOrderHandler}>
          {formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.setup.elementType}
              elementConfig={formElement.setup.elementConfig}
              value={formElement.setup.value}
              shouldValidate={!!formElement.setup.validation}
              invalid={!formElement.setup.valid}
              touched={formElement.setup.touched}
              changed={event => {
                this.inputChangedHandler(event, formElement.id);
              }}
            />
          ))}
          <Button buttonType="Success" disabled={!this.state.formIsValid}>
            ORDER
          </Button>
        </form>
      </Fragment>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return <div className={classes.ContactData}>{form}</div>;
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(orderActions.purchaseBurger(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
