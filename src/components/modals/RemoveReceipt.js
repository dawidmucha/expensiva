import React from 'react'
import Modal from 'react-modal'
import store from '../../index'
import database from '../../firebase/firebase'

Modal.setAppElement('#root')

class RemoveReceipt extends React.Component {
	constructor(props) {
		super(props)

		this.closeRemoveReceiptItemModal = this.closeRemoveReceiptItemModal.bind(this)
		this.removeReceipt = this.removeReceipt.bind(this)

		this.state = {
			...this.props
		}
	}

	closeRemoveReceiptItemModal() {
		this.props.close()
	}

	removeReceipt(id) {
		console.log(`about to remove ${id} yall`)
		database.ref(`${store.getState().uid}/transactions/${id}`).remove()
		this.closeRemoveReceiptItemModal()
	}

	render() {
		return (
			<Modal {...this.props}>
				<div>Are you sure? This action is irreversible!</div>
				<div>
					<button onClick={() => this.removeReceipt(this.props.id)}>YES</button>
					<button onClick={this.closeRemoveReceiptItemModal}>NO</button>
				</div>
			</Modal>
		)
	}
}

export default RemoveReceipt