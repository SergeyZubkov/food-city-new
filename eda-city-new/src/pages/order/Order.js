import React, { Component } from 'react';
import "./Order.css";

import nanoajax from "nanoajax";

import dataService from '../../data/dataService';
import Button from '../../commons/button/Button';
import {withRouter} from 'react-router-dom';

export default class Order extends Component {
	constructor(props) {
    super(props);

    this.state = {
    	name: '',
    	phone: '',
    	amount: '',
    	addressDeliver: '',
    	error: false,
    	submit: false,
    };
  }

	handleChangeName = (event) => {
    this.setState({name: event.target.value});
  }

  handleChangePhone = (event) => {
    let digits = event.target.value;
    let digitsWithoutSpace = digits.replace(/\s/g,'');

    const isNumeric = (str) => !isNaN(str)&&isFinite(str)

    if (!isNumeric(digitsWithoutSpace.slice(-1))) return
    if (digitsWithoutSpace.length > 11) return

    if ([2,5,8,10].includes(digitsWithoutSpace.length)) {
      digits = digits.slice(0, -1) +  " " + digits.slice(-1)
    }

    this.setState({phone: digits});
  }

  handleChangeAmount = (event) => {
    this.setState({amount: event.target.value});
  }

  handleChangeAddress = (event) => {
    this.setState({addressDeliver: event.target.value});
  }

  createHandlerSubmit = (history) => {
  	return () => {
      const {
        name,
        phone,
        amount,
        addressDeliver
      } = this.state;

      nanoajax.ajax({
        url: 'mail.php', 
        method: 'POST', 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          phone,
          amount,
          addressDeliver,
          order: dataService.getOrder()
        })
      }, () => {
        dataService.clearOrder();
        history.push('/orderHandle');
      });
    }
  }
  isEmptyForm = () => {
    let {
      name,
      amount,
      phone,
      addressDeliver
    } = this.state;

    return !name||!amount||!phone||!addressDeliver
  }
	render() {

		const OrderBtn = withRouter(({ history }) => (
		  <Button 
		  	className='button-green' 
		  	onClick={this.createHandlerSubmit(history)}
        disabled={this.isEmptyForm()}
		  > 
		  	заказать
		  </Button>
		 ))

		const BackBtn = withRouter(({ history }) => (
		  <Button 
		  	className='button-default' 
		  	onClick={() => history.push('/menu')}
		  > 
		  	&larr; назад  
		  </Button>
		 ))

		return (
			<div className="order">
				<div className="order-title">Оформить заказ</div>

				<form className="order-form">
					<input 
						name='name'
          	type="text" 
          	value={this.state.name} 
          	onChange={this.handleChangeName}
          	placeholder="Имя"
          />

					<input 
						name='phone'
          	type="text" 
          	value={this.state.phone} 
          	onChange={this.handleChangePhone}
          	placeholder="Телефон"
          />

          <input 
						name='amount'
          	type="number" 
          	min='1'
          	value={this.state.amount} 
          	onChange={this.handleChangeAmount}
          	placeholder="Кол. обедов"
	         />

	        <input 
						name='address'
          	type="text" 
          	value={this.state.address} 
          	onChange={this.handleChangeAddress}
          	placeholder="Адрес"
	         />
					
					<div className="order-form-buttons">
            <BackBtn />
            <OrderBtn />
          </div>
				</form>
			</div>

		);
	}
}
