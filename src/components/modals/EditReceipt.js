import React from 'react'
import Modal from 'react-modal'
import AddReceiptItem from './AddReceiptItem'
import database from '../../firebase/firebase'
import store from '../../index'

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
			isAddReceiptItemModalOpen: false
		}
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
				<li key={i}>
					{el[1].name} ({el[1].category}/{el[1].subcat}) <button onClick={() => this.handleRemoveItem(el[0])}>X</button><br />
					{el[1].amount}x{el[1].price}zł
				</li>
			)
		})

		return (
			<Modal {...this.props} >
				<div>
					<h1>{this.state.shop} - {this.state.sum}</h1>
					<h3>{this.state.date} @ {this.state.time}</h3>
					<ul>
						{items || "not much"}
						<li key={'add'}><button onClick={this.handleAddItem}>ADD</button></li>
					</ul>

					<AddReceiptItem isOpen={this.state.isAddReceiptItemModalOpen} onRequestClose={this.closeAddReceiptItemModal} id={this.props.id} refreshData={this.refreshData} />
				</div>
			</Modal>
		)
	}
}

export default EditReceipt