import React from 'react'
import EditReceipt from './modals/EditReceipt'

class TransactionItem extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			...props,
			transactionSum: 0,
			summary: [],
			isEditReceiptModalOpen: false
		}

		this.calculateTransactionSum = this.calculateTransactionSum.bind(this)
		this.openEditReceiptModal = this.openEditReceiptModal.bind(this)
		this.closeEditReceiptModal = this.closeEditReceiptModal.bind(this)
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
				{ this.state.shop + ' | ' + this.state.date + ' @ ' + this.state.time + ' ' + this.state.transactionSum } <button onClick={this.openEditReceiptModal}>EDIT</button> <br />
				{ this.state.summary.join(', ') }
				<EditReceipt isOpen={this.state.isEditReceiptModalOpen} onRequestClose={this.closeEditReceiptModal} {...this.props} sum={this.state.transactionSum} />
			</div>
		)
	}
}

export default TransactionItem