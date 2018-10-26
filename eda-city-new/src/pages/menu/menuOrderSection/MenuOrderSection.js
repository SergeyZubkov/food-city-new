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

	handlePlusLunch = () => {
		
		if (!dataService.selectedDayIsToday()) {
			window.scrollTo({top: 0})
		}
		dataService.addOrderItem()
	}

	handleRemoveLunch = () => {
		dataService.removeOrderItem();
	}

	render() {
		let {noSelectedValues} = this.state;

		let currentOrderUncomplete = noSelectedValues.length;
		let showTotalPrice = !currentOrderUncomplete;



		const ButtonLeft = 
			dataService.orderHaveMoreOneItem()&&currentOrderUncomplete
			? <Button 
					className='button-red'
					onClick={this.handleRemoveLunch}
				>
					Отменить 
				</Button>
			:
				<Button 
					className='button-default'
					onClick={this.handlePlusLunch}
					disabled={!!noSelectedValues.length}
				>
					+ обед
				</Button>
		

		const ButtonWithRouter = withRouter(({ history }) => (
		  <Button 
		  	className='button-green' 
		  	disabled={currentOrderUncomplete} 
		  	onClick={() => history.push('/order')}
		  > 
		  	заказать 
		  </Button>
		))

		return (
			<div className='menu-order-section'>
				<h4 className="menu-order-section-total-title">Ваш заказ:</h4>

{/*				<div className="menu-order-section-message"
					style={{
						display: showMessage ? '' : 'none'
					}}
				>
					<div className="menu-order-section-message-sign">!</div>
					<div className='menu-order-section-message-text'>{`Вы не выбрали: ${noSelectedValues.join(', ')}`}</div>
				</div>*/}

				<div className="menu-order-section-total"
				>
					<AccountList />
				</div>

				<div className="menu-order-section-button">
					{ButtonLeft}
					<ButtonWithRouter />
				</div>
			</div>
		);
	}
}


