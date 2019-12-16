import React from 'react'
import database from '../firebase/firebase'
import TransactionItem from './TransactionItem'
import store from '../index'

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
			
			Object.keys(snapshot.val()).map(el => { // el = id
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
		const transactionEls = this.state.transactions.map((el, i) => {
			return (
				<li key={i}>
					<TransactionItem key={i} {...el[1]} id={el[0]} refreshData={this.refreshData}  /> 
				</li>
			)
		})

		return (
			<ul>
				{ transactionEls }
			</ul>
		)
	}
}

export default Transactions