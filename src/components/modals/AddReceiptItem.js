import React from 'react'
import Modal from 'react-modal'
import Select from 'react-select'
import database from '../../firebase/firebase'
import store from '../../index'
import uuidv4 from 'uuid/v4'

import '../../components-styles/modals/AddReceiptItem.scss'

Modal.setAppElement('#root')

class AddReceiptItem extends React.Component {
	constructor(props) {
		super(props)

		this.handleChange = this.handleChange.bind(this)
		this.handleSelectCategoryChange = this.handleSelectCategoryChange.bind(this)
		this.handleSelectSubcatChange = this.handleSelectSubcatChange.bind(this)
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
		this.handleAddReceiptItem = this.handleAddReceiptItem.bind(this)
		this.fetchCategories = this.fetchCategories.bind(this)

		this.state = {
			name: undefined,
			amount: undefined,
			units: undefined,
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
				return categories.push({ value: 'category', label: el })
			})
	
			if(category) {
				snapshot.val()[category].map(el => {
					return subcats.push({ value: 'subcat', label: el })
				})
			}

			return this.setState({
				categories,
				subcats
			})
		})
	}

	handleChange(e) {
		e.target.id ? this.setState({ [e.target.id]: e.target.value }) : this.setState({ [e.target.name]: e.target.value }) // for radio selectors
	}

	handleSelectCategoryChange(e) {
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

	async handleAddReceiptItem() {
		this.setState({ id: uuidv4() })
		
		if(this.state.name && this.state.price && this.state.category && this.state.subcat && this.state.amoSfx) {
			await database.ref(`${store.getState().uid}/transactions/${this.props.id}/items`).push({ 
				name: this.state.name,
				units: this.state.units || 1,
				amount: this.state.amount || 1,
				amoSfx: this.state.amoSfx,
				price: this.state.price,
				isDiscount: this.state.isDiscount || false,
				category: this.state.category,
				subcat: this.state.subcat,
			}).once('child_added', () => {
				return this.props.refreshData
			})
			this.setState({ errorMessage: '' })
		} else this.setState({ errorMessage: 'Fill all required fields!' })

		this.props.refreshData()
	}

	render() {
		return (
			<Modal {...this.props} className='addReceiptItemContainer'>
				<p className='addReceiptItemErrorMessage'>{this.state.errorMessage}</p>

					<label className='addReceiptItemNameLabel label' htmlFor='name'>name</label>
					<input className='addReceiptItemNameInput' type='text' id='name' onChange={this.handleChange} value={this.state.value} />
					
					<label className='addReceiptItemUnitsLabel label' htmlFor='units'>units</label>
					<input className='addReceiptItemUnitsInput' type='number' id='units' onChange={this.handleChange} value={this.state.value} />

					<label className='addReceiptItemAmountLabel label' htmlFor='amount'>amount</label>
					<input className='addReceiptItemAmountInput' type='number' id='amount' onChange={this.handleChange} value={this.state.value} /> 
					<div className='addReceiptItemAmountRadioLiq'><input type="radio" name="amoSfx" value="liq" onChange={this.handleChange}/>kg</div>
					<div className='addReceiptItemAmountRadioSol'><input type="radio" name="amoSfx" value="sol" onChange={this.handleChange}/>l</div>

					<label className='addReceiptItemPriceLabel label' htmlFor='price'>price</label>
					<input className='addReceiptItemPriceInput' type='number' id='price' onChange={this.handleChange} value={this.state.value} />

					<label className='addReceiptItemDiscountLabel label' htmlFor='isDiscount'>discount?</label>
					<input className='addReceiptItemDiscountCheckbox' type='checkbox' id='isDiscount' onChange={this.handleCheckboxChange} value={this.state.value} />

					<label className='addReceiptItemCategoryLabel label' htmlFor='category'>category</label>
					<Select className='addReceiptItemCategorySelect' options={this.state.categories} onChange={this.handleSelectCategoryChange} value={this.props.value} />
				
					<label className='addReceiptItemSubcarLabel label' htmlFor='subcat'>subcategory</label>
					<Select className='addReceiptItemSubcatSelect' options={this.state.subcats} onChange={this.handleSelectSubcatChange} value={this.props.value} />

				<button className='btn btnBlue addReceiptItemButton' onClick={this.handleAddReceiptItem}>ADD</button>
			</Modal>
		)
	}
}

export default AddReceiptItem