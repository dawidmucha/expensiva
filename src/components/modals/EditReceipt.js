import React from 'react'
import Modal from 'react-modal'
import AddReceiptItem from './AddReceiptItem'
import database from '../../firebase/firebase'
import store from '../../index'

import '../../components-styles/modals/EditReceipt.scss'

Modal.setAppElement('#root')

class EditReceipt extends React.Component {
	constructor(props) {
		super(props)

		this.handleAddItem = this.handleAddItem.bind(this)
		this.openAddReceiptItemModal = this.openAddReceiptItemModal.bind(this)
		this.closeAddReceiptItemModal = this.closeAddReceiptItemModal.bind(this)
		this.refreshData = this.refreshData.bind(this)
		this.handleRemoveItem = this.handleRemoveItem.bind(this)

		this.state = {
			...props,

			affix: undefined,
			currency: undefined,
			volume: undefined,
			weight: undefined,

			isAddReceiptItemModalOpen: false,

			x: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABCSURBVBhXdY5bCgAgCAQHqvvUd3b/Y1XSEhG1IPtQUQJ0oM46UZVjEtmNs7wtqyBCuwYXEhRvOCva+G7+b0o8vqUPzOARZSj3gE0AAAAASUVORK5CYII='
		}
	}

	componentDidMount() {
		database.ref(`${store.getState().uid}/settings`).on('value', snapshot => {
			if(snapshot.val()) {
				this.setState(() => {
					return { 
						affix: snapshot.val().affix,
						currency: snapshot.val().currency,
						volume: snapshot.val().volume,
						weight: snapshot.val().weight
					}
				})
			} else this.forceUpdate()
		})
	}
	
	openAddReceiptItemModal() {
		this.setState({ isAddReceiptItemModalOpen: true })
	}

	closeAddReceiptItemModal() {
		this.setState({ isAddReceiptItemModalOpen: false })
	}
	
	handleAddItem() {
		this.openAddReceiptItemModal()
	}

	async handleRemoveItem(id) {
		await database.ref(`${store.getState().uid}/transactions/${this.props.id}/items/${id}`).remove()
		this.refreshData()
	}

	refreshData() {
		this.props.refreshData()
	}

	render() {
		const items = Object.entries(this.state.items || []).map((el, i) => {	
			return (
				<li className='editReceiptListItem' key={i}>
					{el[1].name} - {el[1].amount}{el[1].amoSfx === 'sol' ? this.state.volume : this.state.weight} - ({el[1].category}/{el[1].subcat}) <button class='btn btnRed' onClick={() => this.handleRemoveItem(el[0])}><img alt='X' src={this.state.x} viewBox='0 0 25 25' /></button><br />
					{(this.state.affix === 'prefix' ? this.state.currency.value : '') + el[1].price + (this.state.affix === 'suffix' ? this.state.currency.value : '')
					} ({el[1].units}x{el[1].price/el[1].units})
				</li>
			)
		})

		return (
			<Modal {...this.props} >
				<div className='editReceiptContainer'>
					<div className='editReceiptHeader'>
						<div>{this.state.shop} - {(this.state.affix === 'prefix' ? this.state.currency.value : '') + this.props.sum + (this.state.affix === 'suffix' ? this.state.currency.value : '')}</div>
						<div className='editReceiptHeaderSpacer' />
						<div>{this.state.date} @ {this.state.time}</div>
					</div>

					<ul className='editReceiptList'>
						{items || "no items"}
						<li key={'add'}><button className='editReceiptAddButton btn btnBlue' onClick={this.handleAddItem}>ADD</button></li>
					</ul>

					<AddReceiptItem isOpen={this.state.isAddReceiptItemModalOpen} onRequestClose={this.closeAddReceiptItemModal} id={this.props.id} refreshData={this.refreshData} />
				</div>
			</Modal>
		)
	}
}

export default EditReceipt