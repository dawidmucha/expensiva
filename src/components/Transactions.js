import React from 'react'
import database from '../firebase/firebase'
import TransactionItem from './TransactionItem'
import store from '../index'

class Transactions extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			transactions: [],
			boo: 'hoo'
		}

		this.fetchTransactions = this.fetchTransactions.bind(this)
	}

	componentDidMount() {
		this.fetchTransactions()
	}

	fetchTransactions() {
		database.ref(`${store.getState().uid}/transactions`).orderByChild('date').on('value', (snapshot) => {
			this.setState({ transactions: [] })
			
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
					<TransactionItem key={i} {...el[1]} id={el[0]}  /> 
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