import React, { Component } from 'react';
import './FeatureList.css';

import FeatureItem from './featureItem/FeatureItem';

// import addContact from '../../../imgs/features/add-contact.svg';
import bioMassEcoEnergy from '../../../imgs/features/bio-mass-eco-energy.svg';
// import giveMoney from '../../../imgs/features/give-money.svg';
import microwave from '../../../imgs/features/microwave-oven.svg';
import restaurantIcon from '../../../imgs/features/restaurant-icon.svg';


export default class FeatureList extends Component {
	state = {
		features: [
			// {
			// 	icon: addContact,
			// 	text: 'Пригласи друга и обедай бесплатно'
			// },
			{
				icon: bioMassEcoEnergy,
				text: 'Мы используем только натуральные продукты'
			},
			// {
			// 	icon: giveMoney,
			// 	text: 'Бесплатная дегустация до 5 обедов'
			// },
			{
				icon: microwave,
				text: 'Обед привозится в посуде, пригодной для разогревания еды в СВЧ'
			},
			{
				icon: restaurantIcon,
				text: 'Новое меню каждый день'
			}
		]
	}
	render() {
		const {
			features
		} = this.state;

		const {
			className
		} = this.props
		return (
			<div className={`feature-list ${className}`}>
				{features.map(i => <FeatureItem key={i.text} {...i} />)}
			</div>
		);
	}
}
