import React, { Component } from 'react';
import './MenuOrderSection.css';

import Button from '../../../commons/button/Button';
import AccountList from './accountList/AccountList';
import {withRouter} from 'react-router-dom';
import dataService from '../../../data/dataService';

export default class MenuOrderSection extends Component {
	constructor(props) {
		super(props);

		this.state = {
			noSelectedValues: []
		}
	}

	componentDidMount() {
		this.getNoSelectedValues();
		dataService.on('changeOrder', this.getNoSelectedValues);
	}

	componentWillUnmount() {
		dataService.off('changeOrder', this.getNoSelectedValues);
	}

	getNoSelectedValues = () => {
		this.setState({noSelectedValues: dataService.getNoSelectedValues()});
	}

	render() {
		let {noSelectedValues} = this.state;
		const {
			isValidate
		} = this.props;

		let disabledBtn = isValidate&&!!noSelectedValues.length;
		let showMessage = disabledBtn;
		let showTotalPrice = !showMessage;

		const ButtonWithRouter = withRouter(({ history }) => (
		  <Button 
		  	className='button-green' 
		  	disabled={disabledBtn} 
		  	onClick={() => history.push('/order')}
		  > 
		  	заказать 
		  </Button>
		))

		return (
			<div className='menu-order-section'>

				<div className="menu-order-section-message"
					style={{
						display: showMessage ? '' : 'none'
					}}
				>
					<div className="menu-order-section-message-sign">!</div>
					<div className='menu-order-section-message-text'>{`Вы не выбрали: ${noSelectedValues.join(', ')}`}</div>
				</div>

				<div className="menu-order-section-total"
					style={{
						display: showTotalPrice ? '' : 'none'
					}}
				>
					<h4 className="menu-order-section-total-title">Ваш заказ:</h4>
					<AccountList />
				</div>

				<div className="menu-order-section-button">
					<ButtonWithRouter />
				</div>
			</div>
		);
	}
}


