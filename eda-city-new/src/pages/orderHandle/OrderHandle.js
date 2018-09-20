import React, { Component } from 'react';
import './OrderHandle.css';

import checkMark from '../../imgs/check-mark.svg';

import {withRouter} from 'react-router-dom';
import Button from '../../commons/button/Button';

export default class OrderHandle extends Component {
	render() {
		const OKBtn = withRouter(({ history }) => (
		  <Button 
		  	className='button-green' 
		  	onClick={() => history.push('/menu')}
		  > 
		  	ок 
		  </Button>
		))
		return (
			<div className='order-handle'>
				<div className="order-handle-img-container">
					<img src={checkMark} alt="" className="order-handle-img"/>
				</div>
				<div className="order-handle-text">
					Ваш заказ обрабатывается, наш оператор скоро свяжется с вами.
				</div>
				<div className="order-handle-button">
					<OKBtn />
				</div>
			</div>
		);
	}
}
