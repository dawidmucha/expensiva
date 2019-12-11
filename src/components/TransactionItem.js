import React from 'react'
import EditReceipt from './modals/EditReceipt'
import RemoveReceipt from './modals/RemoveReceipt'

class TransactionItem extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			...props,
			transactionSum: 0,
			summary: [],
			isEditReceiptModalOpen: false,
			isRemoveReceiptModalOpen: false
		}

		this.calculateTransactionSum = this.calculateTransactionSum.bind(this)

		this.openEditReceiptModal = this.openEditReceiptModal.bind(this)
		this.closeEditReceiptModal = this.closeEditReceiptModal.bind(this)

		this.openRemoveReceiptModal = this.openRemoveReceiptModal.bind(this)
		this.closeRemoveReceiptModal = this.closeRemoveReceiptModal.bind(this)
	}
	
	componentDidMount() {
		this.calculateTransactionSum()
	}

	openEditReceiptModal() {
		this.setState({ isEditReceiptModalOpen: true })
	}

	closeEditReceiptModal() {
		this.setState({ isEditReceiptModalOpen: false })
	}

	openRemoveReceiptModal() {
		this.setState({ isRemoveReceiptModalOpen: true })
	}

	closeRemoveReceiptModal() {
		this.setState({ isRemoveReceiptModalOpen: false })
	}

	calculateTransactionSum() {
		for(let [, value] of Object.entries(this.state.items || [])) {
			this.setState(state => {
				state.summary.push(value.name)

				return {
					transactionSum: parseInt(state.transactionSum, 10) + parseInt(value.price, 10),
					summary: state.summary
				}
			})
		}
	}

	render() {
		return (
			<div>
				{ this.state.shop + ' | ' + this.state.date + ' @ ' + this.state.time + ' ' + this.state.transactionSum } 
				<button onClick={this.openEditReceiptModal}>EDIT</button>
				<button onClick={this.openRemoveReceiptModal}>REMOVE</button><br />
				{ this.state.summary.join(', ') }

				<EditReceipt isOpen={this.state.isEditReceiptModalOpen} onRequestClose={this.closeEditReceiptModal} {...this.props} sum={this.state.transactionSum} />
				<RemoveReceipt isOpen={this.state.isRemoveReceiptModalOpen} onRequestClose={this.closeRemoveReceiptModal} id={this.state.id} close={this.closeRemoveReceiptModal} />
			</div>
		)
	}
}

export default TransactionItem