import React, { Component } from 'react';
import './FeedbackForm.css';

import Button from '../../../commons/button/Button';

import {RadioGroup, Radio} from 'react-radio-group';
import nanoajax from 'nanoajax';

export default class feedbackForm extends Component {
	state = {
		subject: 'предложение',
		message: ''
	}
	render() {
		let {
			subject,
			message
		} = this.state;

		return (
			<form className='feedback-form'>		
				<div className="feedback-form-subject">
					<RadioGroup 
						name="subject" 
						selectedValue={subject} 
						onChange={this.handleChange}
						className='feedback-form-radio-group'
					>
					  {['предложение', 'замечание', 'вопрос'].map(sub => (
							<label className='feedback-form-container' key={sub}>
								<Radio className='feedback-form-input' value={sub} /> 
								{sub}
								<span className="feedback-form-checkmark"></span>
							</label>
					  ))}
					</RadioGroup>
				</div>
				<textarea  
					name='message' 
					className="feedback-form-message"
					value={message}
					onChange={this.handleChangeTextarea}
					placeholder='Ваш текст'
					rows="10"
				/>
				<Button
					className="feedback-form-button button-blue"
					onClick={this.handleSubmit}
					disabled={this.isEmptyForm()}
				>
					Отправить
				</Button>
			</form>
		)
	}
	handleChange = (newValue) => {

		this.setState({subject: newValue});
	}
	handleChangeTextarea = (e) => {
		let newMsg = e.target.value;

		this.setState({message: newMsg});
	}
	handleSubmit = () => {
		const {
			subject,
			message
		} = this.state;

		function serialize (obj) {
			var str = [];
			for(var p in obj) {
				if (obj.hasOwnProperty(p)) {
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				}
			}
			return str.join("&");
		}
		serialize({subject, message})
		debugger
		nanoajax.ajax({
			url: 'feedback.php', 
			method: 'POST',
			body: serialize({subject, message})
		},
			() => {}
		);
	}
	isEmptyForm = () => {
		return this.state.message.length === 0
	}
}
