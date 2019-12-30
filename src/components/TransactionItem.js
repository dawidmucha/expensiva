import React from 'react'
import EditReceipt from './modals/EditReceipt'
import RemoveReceipt from './modals/RemoveReceipt'
import database from '../firebase/firebase'
import store from '../index'

class TransactionItem extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			...props,
			transactionSum: 0,
			summary: [],
			shopPic: undefined,

			isEditReceiptModalOpen: false,
			isRemoveReceiptModalOpen: false,

			affix: undefined,
			currency: undefined
		}

		this.calculateTransactionSum = this.calculateTransactionSum.bind(this)
		this.refreshData = this.refreshData.bind(this)
		this.fetchAffix = this.fetchAffix.bind(this)

		this.openEditReceiptModal = this.openEditReceiptModal.bind(this)
		this.closeEditReceiptModal = this.closeEditReceiptModal.bind(this)

		this.openRemoveReceiptModal = this.openRemoveReceiptModal.bind(this)
		this.closeRemoveReceiptModal = this.closeRemoveReceiptModal.bind(this)
	}
	
	componentDidMount() {
		this.calculateTransactionSum()
		this.fetchAffix()

		database.ref(`${store.getState().uid}/shops/${this.state.shop}`).on('value', async (snapshot) => {
			this.setState(() => ({
				shopPic: snapshot.val()
			}))
		})
	}

	fetchAffix() {
		database.ref(`${store.getState().uid}/settings`).on('value', snapshot => {
			this.setState(() => {
				return { 
					affix: snapshot.val().affix,
					currency: snapshot.val().currency
				}
			})
		})
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

	async refreshData() {
		this.props.refreshData()
	}

	calculateTransactionSum() {
		this.setState({  
			transactionSum: 0,
			summary: []
		})
		
		for(let [, value] of Object.entries(this.state.items || [])) {
			this.setState(state => {
				state.summary.push(value.name)

				return {
					transactionSum: parseFloat(state.transactionSum, 10) + parseFloat(value.price, 10),
					summary: state.summary
				}
			})
		}
	}

	render() {
		return (
			<div>
				<img src={this.state.shopPic} alt='shop picture' />
				{ this.state.shop + ' | ' + this.state.date + ' @ ' + this.state.time + ' ' + 
					(this.state.affix === 'prefix' ? this.state.currency.value : '') + this.state.transactionSum + (this.state.affix === 'suffix' ? this.state.currency.value : '')
				} 
				<button onClick={this.openEditReceiptModal}>EDIT</button>
				<button onClick={this.openRemoveReceiptModal}>REMOVE</button><br />
				{ this.state.summary.join(', ') }

				<EditReceipt isOpen={this.state.isEditReceiptModalOpen} onRequestClose={this.closeEditReceiptModal} {...this.props} sum={this.state.transactionSum} refreshData={this.refreshData} />
				<RemoveReceipt isOpen={this.state.isRemoveReceiptModalOpen} onRequestClose={this.closeRemoveReceiptModal} id={this.state.id} close={this.closeRemoveReceiptModal} />
			</div>
		)
	}
}

export default TransactionItem