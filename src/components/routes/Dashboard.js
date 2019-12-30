import React from 'react'
import Transacions from '../Transactions'
import AddReceipt from '../modals/AddReceipt'

import '../../components-styles/routes/Dashboard.scss'

class Dashboard extends React.Component {
	constructor(props) {
		super(props)

		this.closeAddReceiptModal = this.closeAddReceiptModal.bind(this)
		this.openAddReceiptModal = this.openAddReceiptModal.bind(this)

		this.state = {
			isAddReceiptModalOpen: false
		}
	}
	
	closeAddReceiptModal() {
		this.setState({ isAddReceiptModalOpen: false })
	}

	openAddReceiptModal() {
		this.setState({ isAddReceiptModalOpen: true })
	}

	render() {
		return (
			<>
				<Transacions id='transactionsComponent' />
				<button id='addReceiptButton' onClick={this.openAddReceiptModal}>+</button>

				<AddReceipt isOpen={this.state.isAddReceiptModalOpen} onRequestClose={this.closeAddReceiptModal} />
			</>
		)
	}
}

export default Dashboard