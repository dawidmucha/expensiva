import React from 'react'
import Shops from '../Shops'
import Categories from '../Categories'

class Management extends React.Component {
  render() {
		return (
			<div>
				<Categories />
				<br />
				<Shops />
			</div>
		)
	}
}

export default Management