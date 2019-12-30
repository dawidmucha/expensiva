import React from 'react'
import Modal from 'react-modal'
import store from '../../index'
import database from '../../firebase/firebase'

import '../../components-styles/modals/RemoveReceipt.scss'

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
		database.ref(`${store.getState().uid}/transactions/${id}`).remove()
		this.closeRemoveReceiptItemModal()
	}

	render() {
		return (
			<Modal {...this.props}>
				<div id='removeReceiptText' >Are you sure? This action is irreversible!</div>
				<div id='removeReceiptButtons' >
					<button className='btn btnBlue' onClick={() => this.removeReceipt(this.props.id)}>YES</button>
					<button className='btn btnRed' onClick={this.closeRemoveReceiptItemModal}>NO</button>
				</div>
			</Modal>
		)
	}
}

export default RemoveReceipt