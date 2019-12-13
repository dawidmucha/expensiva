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

		this.handleChange = this.handleChange.bind(this)
		this.handleSelectCategoryChange = this.handleSelectCategoryChange.bind(this)
		this.handleSelectSubcatChange = this.handleSelectSubcatChange.bind(this)
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
		this.fetchCategories = this.fetchCategories.bind(this)

		this.state = {
			name: undefined,
			amount: undefined,
			volume: undefined,
			volSfx: true,
			price: undefined,
			isDiscount: false,
			category: undefined,
			subcat: undefined,

			categories: [],
			subcats: [],

			errorMessage: '',
		}
	}

	componentDidMount() {
		this.fetchCategories()
	}

	fetchCategories(category) {
		let categories = []
		let subcats = []

		database.ref(`${store.getState().uid}/categories`).on('value', snapshot => {
			Object.keys(snapshot.val()).map(el => {
				categories.push({ value: 'category', label: el })
			})
	
			if(category) {
				snapshot.val()[category].map(el => {
					subcats.push({ value: 'subcat', label: el })
				})
			}

			return this.setState({
				categories,
				subcats
			})
		})

	}

	handleChange(e) {
		this.setState({ [e.target.id]: e.target.value })
	}

	handleSelectCategoryChange(e) {
		console.log(e)
		this.fetchCategories(e.label)
		this.setState({ [e.value]: e.label })
	}

	handleSelectSubcatChange(e) {
		this.setState({ [e.value]: e.label })
	}

	handleCheckboxChange() {
		this.setState(state => ({
			isDiscount: !state.isDiscount 
		}))
	}

	render() {
		return (
			<Modal {...this.props}>
				<p>{this.state.errorMessage}</p>

				<label htmlFor='name'>name</label>
				<input type='text' id='name' onChange={this.handleChange} value={this.state.value} /> <br />

				<label htmlFor='amount'>amount</label>
				<input type='number' id='amount' onChange={this.handleChange} value={this.state.value} /> <br />

				<label htmlFor='volume'>volume</label>
				<input type='number' id='volume' onChange={this.handleChange} value={this.state.value} /> <br />

				<label htmlFor='price'>price</label>
				<input type='number' id='price' onChange={this.handleChange} value={this.state.value} /> <br />

				<label htmlFor='isDiscount'>discount?</label>
				<input type='checkbox' id='isDiscount' onChange={this.handleCheckboxChange} value={this.state.value} /> <br />

				<label htmlFor='category'>category</label>
				<Select options={this.state.categories} onChange={this.handleSelectCategoryChange} value={this.props.value} />

				<label htmlFor='subcat'>subcat.</label>
				<Select options={this.state.subcats} onChange={this.handleSelectSubcatChange} value={this.props.value} />

				<button onClick={this.handleAddReceiptItem}>ADD</button>
			</Modal>
		)
	}
}

export default AddReceiptItem