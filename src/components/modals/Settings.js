import React from 'react'
import Modal from 'react-modal'
import Select from 'react-select'
import database from '../../firebase/firebase'
import store from '../../index'
import { firebase } from '../../firebase/firebase'
import Jimp from 'jimp/es'
import _ from 'lodash'
import { saveAs } from 'file-saver';

import '../../components-styles/modals/Settings.scss'

Modal.setAppElement('#root')

class Settings extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			currency: undefined, 
			currencyList: [], //label: PLN value: zł
			dateFormat: undefined,
			dateFormatList: [
				{ label: 'MM/DD/YY', value: 'MM/DD/YY'},
				{ label: 'DD/MM/YY', value: 'DD/MM/YY'},
				{ label: 'YY/MM/DD', value: 'YY/MM/DD'}
			],
			weight: undefined, 
			volume: undefined, 
			timeSystem: undefined,
			avatar: undefined,
			affix: undefined,
			isSettingsFetched: false,
			size: 50,

			status: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleCurrencyChange = this.handleCurrencyChange.bind(this)
		this.handleDateFormatChange = this.handleDateFormatChange.bind(this)
		this.handleFiles = this.handleFiles.bind(this)
		this.fetchSettings = this.fetchSettings.bind(this)
		this.saveChanges = this.saveChanges.bind(this)
		this.handleDataExport = this.handleDataExport.bind(this)

		this.refDateFormat = React.createRef()
		this.refCurrency = React.createRef()
	
		this.refAffixPre = React.createRef()
		this.refAffixSuf = React.createRef()
		this.refTimeFormat12 = React.createRef()
		this.refTimeFormat24 = React.createRef()
		this.refWeightKg = React.createRef()
		this.refWeightLbs = React.createRef()
		this.refVolumeL = React.createRef()
		this.refVolumeOz = React.createRef()
		
		this.refUsername = React.createRef()
		this.refEmail = React.createRef()
		this.refPassword = React.createRef()
	}
	
	componentDidMount() {
		this.populateCurrencyList()
	}

	componentDidUpdate() {
		if(this.props.isOpen && !this.state.isSettingsFetched) {
			this.fetchSettings()
			this.setState((state) => {
				return { isSettingsFetched: true }
			})
		} else if(!this.props.isOpen && this.state.isSettingsFetched) {
			this.setState((state) => {
				return { 
					isSettingsFetched: false,
					status: ''
				}
			})
		}
	}
	
	async fetchSettings() {
		const ref = database.ref(`${store.getState().uid}/settings`)
		const snapshot = await ref.once('value') 
		if(snapshot.val()) {
			this.refCurrency.current.state.value = this.state.currencyList.filter(item => _.isEqual(item, snapshot.val().currency))[0]
			this.refDateFormat.current.state.value = this.state.dateFormatList.filter(item => _.isEqual(item, snapshot.val().dateFormat))[0]
			
			if(snapshot.val().timeSystem === '12h') {
				this.refTimeFormat12.current.checked = true
				this.refTimeFormat24.current.checked = false
			} else if(snapshot.val().timeSystem === '24h') {
				this.refTimeFormat12.current.checked = false
				this.refTimeFormat24.current.checked = true
			} else {
				this.refTimeFormat12.current.checked = false
				this.refTimeFormat24.current.checked = false
			}
			
			if(snapshot.val().volume === 'l') {
				this.refVolumeL.current.checked = true
				this.refVolumeOz.current.checked = false
			} else if(snapshot.val().volume === 'oz') {
				this.refVolumeL.current.checked = false
				this.refVolumeOz.current.checked = true
			} else {
				this.refVolumeL.current.checked = false
				this.refVolumeOz.current.checked = false
			}
			
			if(snapshot.val().weight === 'kg') {
				this.refWeightKg.current.checked = true
				this.refWeightLbs.current.checked = false
			} else if(snapshot.val().weight === 'lbs') {
				this.refWeightKg.current.checked = false
				this.refWeightLbs.current.checked = true
			} else {
				this.refWeightKg.current.checked = false
				this.refWeightLbs.current.checked = false
			} 
			
			if(snapshot.val().affix === 'prefix') {
				this.refAffixPre.current.checked = true
				this.refAffixSuf.current.checked = false
			} else if(snapshot.val().affix === 'suffix') {
				this.refAffixPre.current.checked = false
				this.refAffixSuf.current.checked = true
			} else {
				this.refAffixPre.current.checked = false
				this.refAffixSuf.current.checked = false
			} 
			
			this.setState({ 
				dateFormat: this.refDateFormat.current.state.inputValue !== undefined ? this.refDateFormat.current.state : this.refDateFormat.current.state.value,
				currency: this.refCurrency.current.state.inputValue !== undefined ? this.refCurrency.current.state : this.refCurrency.current.state.value,
				
				avatar: snapshot.val().avatar, 
				timeSystem: snapshot.val().timeSystem, 
				volume: snapshot.val().volume, 
				weight: snapshot.val().weight,
				affix: snapshot.val().affix 
			})
		}
			
		this.forceUpdate()
	}
	
	handleChange(e) {
		e.target.id ? this.setState({ [e.target.id]: e.target.value }) : this.setState({ [e.target.name]: e.target.value }) // for radio selectors
	}

	handleCurrencyChange(e) {
		this.setState({ currency: {label: e.label, value: e.value} })
	}
	handleDateFormatChange(e) {
		this.setState({ dateFormat: {label: e.value, value: e.value} })
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
							avatar: res
						})
					}
				)
			}).catch(err => {
				throw new Error(err)
			})
		}
	}

	handleDataExport() {
		database.ref(`${localStorage.getItem('uID')}/`).on('value', snapshot => {
			firebase.auth().onAuthStateChanged(async (user) => {
				const string = JSON.stringify(snapshot.val())
				const blob = new Blob([string], {type: "application/json"})
				console.log('exporting...', string)

				saveAs(blob, `${user.displayName} export`)
			})
		})
	}

	async populateCurrencyList() {
		let currencies = []
		
		await fetch('https://restcountries.eu/rest/v2/all').then(response => response.json()).then(json => {
			json.filter(el => {
				return (el.currencies[0].code && !!el.currencies[0].code.match(/[A-Z]{3}/))
			}).map(el => { 
				return currencies.push({ label: el.currencies[0].code || el.currencies[0].symbol, value: el.currencies[0].symbol || el.currencies[0].code })
			})
		})

		await this.setState(state => ({
			currencyList: _.uniqBy(currencies, 'label').sort((a, b) => {
				return a.label > b.label ? 1 : a.label < b.label ? -1 : 0
			})
		}))
	}

	saveChanges() {
		database.ref(`${store.getState().uid}/settings/`).set({
			currency: this.state.currency || null, 
			dateFormat: this.state.dateFormat || null, 
			weight: this.state.weight || null, 
			volume: this.state.volume || null, 
			timeSystem: this.state.timeSystem || null,
			avatar: this.state.avatar || null,
			affix: this.state.affix || null
		})
		this.setState({ status: 'settings saved!' })

		// firebase.auth().onAuthStateChanged(async (user) => {
		// 	if (user) {
		// 		if(this.refUsername.current.value) {
		// 			await user.updateProfile({
		// 				displayName: this.refUsername.current.value
		// 			}).then(() => console.log('username updated!'))
		// 		}

		// 		if(this.refEmail.current.value){
		// 			await user.updateEmail(this.refEmail.current.value).then(() => console.log('email updated'))
		// 		}

		// 		if(this.refPassword.current.value){
		// 			await user.updatePassword(this.refPassword.current.value).then(() => console.log('password updated'))
		// 		}

		// 		console.log(user.displayName, user.email)
		// 	}
		// })
	}


	render() {
		return (
			<Modal {...this.props} id='settingsContainer'>
				{/* <h3>change personal informaiton</h3>
					
				<div>username:</div>
				<input ref={this.refUsername} type="text" onChange={this.handleCredentials}/>
				
				<div>email:</div>
				<input ref={this.refEmail} type="text" onChange={this.handleCredentials}/>
				
				<div>password:</div>
				<input ref={this.refPassword} type="password" onChange={this.handleCredentials}/>  */}
				
				<h1>SETTINGS</h1>
				
				<img id='settingsAvatar' src={this.state.avatar} alt='avatar' />
				<input id='settingsUploadAvatar' type='file' onChange={this.handleFiles} />
			
				<div id='settingsCurrency'>
					<h3>currency</h3>
					<div>
						<Select ref={this.refCurrency} options={this.state.currencyList} onChange={this.handleCurrencyChange} />
						<input ref={this.refAffixPre} type="radio" name="affix" value="prefix" onChange={this.handleChange}/>prefix
						<input ref={this.refAffixSuf} type="radio" name="affix" value="suffix" onChange={this.handleChange}/>suffix
					</div>
				</div>

				<div id='settingsDateFormat'>
					<h3>date format</h3>
					<div>
						<Select ref={this.refDateFormat} options={this.state.dateFormatList} onChange={this.handleDateFormatChange} /> 
					</div>
				</div>

				<div id='settingsTimeFormat'>
					<h3>time format</h3>
					<input ref={this.refTimeFormat12} type="radio" name="timeSystem" value="12h" onChange={this.handleChange}/>12h
					<input ref={this.refTimeFormat24} type="radio" name="timeSystem" value="24h" onChange={this.handleChange}/>24h
				</div>

				<div id='settingsWeight'>
					<h3>weight</h3>
					<input ref={this.refWeightKg}  type="radio" name="weight" value="kg" onChange={this.handleChange}/>kg
					<input ref={this.refWeightLbs} type="radio" name="weight" value="lbs" onChange={this.handleChange}/>lbs
				</div>

				<div id='settingsVolume'>
					<h3>volume</h3>
					<input ref={this.refVolumeL} type="radio" name="volume" value="l" onChange={this.handleChange}/>l
					<input ref={this.refVolumeOz}  type="radio" name="volume" value=" fl oz" onChange={this.handleChange}/>fl oz
				</div>
				
				<div id='settingsButtons'>
					<div id='settingsButtonSave'>
						{this.state.status}
						<button className='btn btnBlue' onClick={this.saveChanges}>SAVE</button>
					</div>	
					<div id='settingsButtonClose'>
						<button className='btn btnRed' onClick={this.props.close}>CLOSE</button>
					</div>
					<div id='settingsButtonExportData'>
						<button className='btn btnBlue' onClick={this.handleDataExport}>EXPORT DATA</button>
					</div>	
				</div>

			</Modal>
		)
	}
}

export default Settings