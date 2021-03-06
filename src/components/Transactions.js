import React from 'react'
import database from '../firebase/firebase'
import TransactionItem from './TransactionItem'
import store from '../index'

import '../components-styles/Transactions.scss'

class Transactions extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			transactions: []
		}

		this.fetchTransactions = this.fetchTransactions.bind(this)
		this.refreshData = this.refreshData.bind(this)
	}

	componentDidMount() {
		this.fetchTransactions()
	}

	refreshData() {
		this.fetchTransactions()
	}

	fetchTransactions() {
		database.ref(`${store.getState().uid}/transactions`).orderByChild('date').on('value', (snapshot) => {
			this.setState({ 
				transactions: [],
				itemCounter: 0
			})
			
			Object.keys(snapshot.val() || {}).map(el => { // el = id
					const transaction = [el, snapshot.val()[el]]
	
					return this.setState(state => {
						return {
							transactions: [...state.transactions, transaction]
						}
					})
			})
		})
	}	

	render() {
		const noRecords = (
				<li className='liNoRecords'>
					<h1 id='noRecordsTitle'>Currently no records</h1>
					<h2 id='noRecordsSubtitle'>Start by clicking on the red circle in the bottom right!</h2>
				</li>
		)
		
		const transactionEls = this.state.transactions.map((el, i) => {
			return (
				<li className='liTransactions' key={i}>
					<TransactionItem key={i} {...el[1]} id={el[0]} refreshData={this.refreshData} /> 
					
				</li>
			)
		})

		return (
			<ul id='ulTransactions'>
				{ transactionEls.length > 0 ? transactionEls : noRecords}
			</ul>
		)
	}
}

export default Transactions