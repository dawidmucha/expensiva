import React from 'react'
import database from '../firebase/firebase'
import store from '../index'

import '../components-styles/Categories.scss'

class Categories extends React.Component {
	constructor() {
		super()

		this.fetchCategories = this.fetchCategories.bind(this)
		this.populateCategories = this.populateCategories.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.removeCategoriesElement = this.removeCategoriesElement.bind(this)

		this.state = {
			categories: [],
			categoriesHtml: [],

			subcat: '',
			category: '',

			x: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAYklEQVQoz2NgZmD4D8WKDEQAZgYGRZgeBiTNBA1A1gjTrIhmgAoOjSpYLcIpgcNGDAuwKFDEJ07QT8wMDO6khAk2L+ANC2wGWKJptCRWI3k2k+1nskOb7HimKIVRmrbJzlUAnDtYcy0BJa0AAAAASUVORK5CYII='
		}
	}

	componentDidMount() {
		this.fetchCategories()
	}

	handleChange(e) {
		this.setState({ [e.target.id]: e.target.value })
	}
	
	removeCategoriesElement(name, cat) {
		if(cat) { // remove subcategory
			if(this.state.categories[cat].length === 1) { // replace with control item (deleting the only subcat)
				database.ref(`${store.getState().uid}/categories/`).update({
					[cat]: [0]
				})
			} else { //delete
				database.ref(`${store.getState().uid}/categories/`).update({
					[cat]: [...this.state.categories[cat].filter((el) => el !== name)]
				})
			}
		} else { // remove category
			database.ref(`${store.getState().uid}/categories/${name}`).remove()
		}

		this.fetchCategories()
	}

	async addCategoriesElement(name, cat) {
		if(cat) { // add new subcategory
			await database.ref(`${store.getState().uid}/categories/`).set({ 
				...this.state.categories,
				[cat]: [...this.state.categories[cat], name]
			})
			if(this.state.categories[cat][0] === 0) { // remove control item
				this.state.categories[cat].shift()
				await database.ref(`${store.getState().uid}/categories/`).set({
					...this.state.categories, 
					[cat]: [...this.state.categories[cat]]
				})
			}
		} else { // add new category
			await database.ref(`${store.getState().uid}/categories`).set({ 
				...this.state.categories,
				[name]: [0]
			})
		}

		this.fetchCategories()
	}
	
	fetchCategories() {
		database.ref(`${store.getState().uid}/categories`).on('value', async (snapshot) => {
			if(JSON.stringify(this.state.categories) !== JSON.stringify(snapshot.val())) {
				await this.setState({ categories: snapshot.val() })
				this.populateCategories()
			}
		})
	}

	populateCategories() {
		this.setState({ categoriesHtml: [] })
		let arr = []
		
		if(this.state.categories) {
			Object.keys(this.state.categories).map((category, i) => { 
				arr = arr.concat( //list of categories
					<div>
						{category}
						<button className='btn btnRed btnX' onClick={() => this.removeCategoriesElement(category)}><img alt='X' src={this.state.x} /></button>
					</div>
				)
	
				this.state.categories[category].map((subcategory, j) => { //sub-lists of subcategories
					return subcategory !== 0 ? arr = arr.concat(
						<li key={`ul${i}${j}`}>{subcategory}
							<button className='btn btnRed btnX'  onClick={() => this.removeCategoriesElement(subcategory, category)}><img alt='X' src={this.state.x} /></button>
						</li>
					) : undefined
				})
	
				arr = arr.concat( // addSubcat field
					<li key={`li_sub_${i}`} className='addSubcat'>
						<input className='input' type='text' value={this.state.value} onChange={this.handleChange} />
						<button className='btn btnBlue'  onClick={() => this.addCategoriesElement(this.state.subcat, category)}>ADD</button>
					</li>
				) 

				return arr
			})
		}

		arr = arr.concat(
			<div className='addCategoryText'>add new category</div>
		)

		arr = arr.concat( // addCategory field
			<li key={`li_cat`} className='addCategory'>
				<input className='input' id='category' type='text' value={this.state.value} onChange={this.handleChange} />
				<button className='btn btnBlue' onClick={() => this.addCategoriesElement(this.state.category)}>ADD</button>
			</li>
		)

		this.setState({ categoriesHtml: arr })
	}
	
	render() {
		return (
			<div id='categoriesContainer'>
				<h1>CATEGORIES</h1>
				<ul>
					{ this.state.categoriesHtml }
				</ul>
			</div>
		)
	}
}

export default Categories