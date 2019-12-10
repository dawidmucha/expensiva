import React from 'react'
import Modal from 'react-modal'
import Select from 'react-select'
import database from '../../firebase/firebase'
import store from '../../index'
import uuidv4 from 'uuid/v4'
import moment from 'moment'

Modal.setAppElement('#root')

class AddReceiptItem extends React.Component {
	constructor(props) {
		super(props)

		this.handleShopChange = this.handleShopChange.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleAddReceiptItem = this.handleAddReceiptItem.bind(this)
		this.handleNow = this.handleNow.bind(this)

		this.refDate = React.createRef()
		this.refTime = React.createRef()

		this.state = {
			shop: undefined,
			date: undefined,
			time: undefined,
			id: undefined,
			shops: [],
			errorMessage: ''
		}
	}

	componentDidMount() {
		database.ref(`${store.getState().uid}/shops`).on('value', (snapshot) => {
			if(snapshot.val()) {
				this.setState(state => {
					Object.keys(snapshot.val()).map(item => {
						return state.shops = state.shops.concat({ value: item, label: item })
					})
				})
			}
		})
	}

	handleShopChange(e) {
		this.setState({ shop: e.value })
	}

	handleChange(e) {
		this.setState({ [e.target.id]: e.target.value })
	}

	handleNow() {
		const date = moment(moment()).format('YYYY-MM-DD')
		const time = moment(moment()).format('HH:mm')

		this.setState({ 
			date,
			time
		})

		this.refDate.current.value = date
		this.refTime.current.value = time
	}

	async handleAddReceiptItem() {
		await this.setState({ id: uuidv4() })
		if(this.state.shop && this.state.date && this.state.time) {
			database.ref(`${store.getState().uid}/transactions/${this.state.id}`).set({
				shop: this.state.shop,
				date: this.state.date,
				time: this.state.time,
				items: {}
			})
			this.setState(() => ({ 
				errorMessage: '',
				shop: undefined
			}))
		} else {
			this.setState({ errorMessage: 'please fill in all required fields!'})
		}
	}

	render() {
		return (
			<Modal {...this.props} >
				<p>{this.state.errorMessage}</p>
					
				<label htmlFor='shop'>shop</label>
				<Select onChange={this.handleShopChange} options={this.state.shops} /><br />

				<label htmlFor='date'>date</label>
				<input ref={this.refDate} type='date' id='date' onChange={this.handleChange} value={this.state.value} /><br />

				<label htmlFor='time'>time</label>
				<input ref={this.refTime} type='time' id='time' onChange={this.handleChange} value={this.state.value} /><button onClick={this.handleNow}>NOW</button><br />

				<button onClick={this.handleAddReceiptItem}>ADD</button>
			</Modal>
		)
	}
}

export default AddReceiptItem