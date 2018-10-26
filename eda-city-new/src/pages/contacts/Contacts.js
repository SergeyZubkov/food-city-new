	import React, { Component } from 'react';
import './Contacts.css';

import { YMaps, Map, GeoObject } from 'react-yandex-maps';

import FeedbackForm from './feedbackForm/FeedbackForm';
import ButtonArrow from '../../commons/buttonArrow/ButtonArrow';
import mail from '../../imgs/mail.svg';

export default class Contacts extends Component {
	render() {
		return (
				<div className="contacts-wrapper">	
					<div className='contacts container'>
						<h1 className="contacts-title">Конакты</h1>
						<div className="contacts-feedback">
							<h3 className="contacts-feedback-title">Напишите нам</h3>
							<div className="contacts-feedback-content">
								<p className="contacts-feedback-text">
									Мы - молодая компания, стремящаяся занять лидирующие позиции на рынке доставки обедов. 
									Мы постоянно ищем возможности улучшить наш сервис. Поэтому, если у вас есть предложения или замечания, - напишите нам, 
									мы с радостью с ними ознакомимся. 
									<span className="contacts-mail">
										<img src={mail} alt="" className="contacts-mail-icon"/>
										<a href="mailto:edacity@yandex.ru" className="contacts-mail-link">edacity@yandex.ru</a>
									</span>
								</p>
								<div className="contacts-feedback-form">
									<FeedbackForm mailTo='saharock@list.ru'/>
								</div>
							</div>
						</div>

						<div className="contacts-adress">
							<h2 className="contact-adress-title">Наш адрес</h2>
							<p className="contact-adress-text">Россия, Москва, набережная Новикова-Прибоя, 6к4</p>
							<div className="contacts-map">
								<YMaps>
									<Map
										state={mapState}
										width="100%"
									>
										<GeoObject
											geometry={geometry}
											properties={properties}
			         			/>
									</Map>
								</YMaps>				
								</div>
						</div>

						<div className="contacts-button-back">	
								<ButtonArrow onClick={() => this.props.history.goBack()}>назад</ButtonArrow>
						</div>
				</div>
			</div>
		);
	}
}

const mapState = {
  "size": [360, 360],
  "center": [55.78282, 37.451366],
  "zoom": 17,
  "type": "yandex#map",
  "traffic": {
      "shown": false
  },
  "controls": []
}

const properties = {
	description: "Россия, Москва, набережная Новикова-Прибоя, 6к4",
	iconCaption: "ЕдаСити",
	"marker-color":"#56db40" 
}

const geometry = {
	type: "Point",
	coordinates: [55.78282, 37.451366]
}