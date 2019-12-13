import React from 'react'
import Modal from 'react-modal'
import AddReceiptItem from './AddReceiptItem'

Modal.setAppElement('#root')

class EditReceipt extends React.Component {
	constructor(props) {
		super(props)

		this.handleAddItem = this.handleAddItem.bind(this)
		this.openAddReceiptItemModal = this.openAddReceiptItemModal.bind(this)
		this.closeAddReceiptItemModal = this.closeAddReceiptItemModal.bind(this)

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

	render() {
		const items = Object.values(this.state.items || []).map((el, i) => {	
			return (
				<li key={i}>
					{el.name} ({el.category}/{el.subcat}) <button>X</button><br />
					{el.amount}x{el.price}zł
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

					<AddReceiptItem isOpen={this.state.isAddReceiptItemModalOpen} onRequestClose={this.closeAddReceiptItemModal} />
				</div>
			</Modal>
		)
	}
}

export default EditReceipt