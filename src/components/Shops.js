import React from 'react'
import Jimp from 'jimp/es'
import database from '../firebase/firebase'
import store from '../index'

import '../components-styles/Shops.scss'

class Shops extends React.Component {
	constructor() {
		super()

		this.handleChange = this.handleChange.bind(this)
		this.handleFiles = this.handleFiles.bind(this)
		this.addShop = this.addShop.bind(this)
		this.fetchShops = this.fetchShops.bind(this)
		this.handleRemove = this.handleRemove.bind(this)

		this.textRef = React.createRef()
		this.imageRef = React.createRef()

		this.state = {
			size: 50,

			shop: undefined,
			img: undefined,
			src: undefined,

			shops: undefined,
			shopsHtml: undefined,

			x: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAYklEQVQoz2NgZmD4D8WKDEQAZgYGRZgeBiTNBA1A1gjTrIhmgAoOjSpYLcIpgcNGDAuwKFDEJ07QT8wMDO6khAk2L+ANC2wGWKJptCRWI3k2k+1nskOb7HimKIVRmrbJzlUAnDtYcy0BJa0AAAAASUVORK5CYII='
		}
	}

	componentDidMount() {
		this.fetchShops()
	}

	handleChange(e) {
		this.setState({ [e.target.id]: e.target.value })
	}

	handleFiles(e) {
		let img = e.target.files[0]
		
		let reader = new FileReader()
		reader.readAsDataURL(img)
		reader.onload = () => {
			Jimp.read(reader.result).then(image => {
				return image.cover(
					this.state.size, this.state.size
				).quality(
					90
				).getBase64(
					Jimp.MIME_JPEG, (rej, res) => {
						this.setState({
							img,
							src: res
						})
					}
				)
			}).catch(err => {
				throw new Error(err)
			})
		}
	}

	async handleRemove(shop) {
		await database.ref(`${store.getState().uid}/shops/${shop}`).remove()
		this.fetchShops()
	}

	async addShop() {
		await database.ref(`${store.getState().uid}/shops`).update({
			[this.state.shop]: this.state.src
		})
		const text = this.textRef.current
		const image = this.imageRef.current
		text.value = ''
		image.value = ''
		this.setState({ src: undefined })
		this.fetchShops()
	}

	fetchShops() {
		database.ref(`${store.getState().uid}/shops`).on('value', snapshot => {
			this.setState({ 
				shops: snapshot.val() 
			}, () => {
				let arr = []
	
				if(this.state.shops) {
					Object.keys(this.state.shops).map((shop, i) => {
						return arr = arr.concat(
							<li key={i}><img alt='logo' src={this.state.shops[shop]} />{shop}<button className='btn btnRed btnX' onClick={() => this.handleRemove(shop)}><img className='x' alt='X' src={this.state.x} /></button></li>
						)
					})
				}

				this.setState({ shopsHtml: arr })
			})
		})
	}

	render() {
		return (
			<div id='shopsContainer'>
			<h1>SHOPS</h1>
				<div id='shopsListContainer'>
					<ul>
						{ this.state.shopsHtml }	
					</ul>
				</div>
				<div id='shopsAddContainer'>
					<h2>add new shop</h2>
					<input ref={this.textRef} id='shop' type='text' value={this.state.value} onChange={this.handleChange} />
					<input ref={this.imageRef} id='image' type='file' onChange={this.handleFiles} />
					<img src={this.state.src} alt='shop logo preview' />
					<button className='btn btnBlue' onClick={this.addShop}>ADD</button>
				</div>
			</div>
		)
	}
}

export default Shops