import React from 'react'
import { startLogOut } from '../actions/actions'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import database from '../firebase/firebase'
import store from '../index'
import Settings from './modals/Settings'

import '../components-styles/Navbar.scss'

class Navbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      avatar: undefined,
      defAv: `data:image/jpeg;base64,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`,
      isSettingsModalOpen: false
    }

    this.openSettingsModal = this.openSettingsModal.bind(this)
    this.closeSettingsModal = this.closeSettingsModal.bind(this)
  }

  componentDidMount() {
    let avatar

    database.ref(`${store.getState().uid}/settings`).on('value', snapshot => {
      if(snapshot.val()) avatar = snapshot.val().avatar
  
      this.setState(state => ({
        avatar: avatar || state.defAv
      }))
    })
  }

  openSettingsModal() {
		this.setState({ isSettingsModalOpen: true })
	}

	closeSettingsModal() {
		this.setState({ isSettingsModalOpen: false })
	}

  render() {
    const { startLogOut } = this.props
    return (
      <div id='divNavbar'>
        <div id='divNavbarFlexed'>
          <NavLink to='/dashboard' activeClassName='is-active'>Dashboard</NavLink>
          <NavLink to='/categories' activeClassName='is-active'>Categories</NavLink>
          <button onClick={startLogOut}>Logout</button>
        </div>
          <img src={this.state.avatar} onClick={this.openSettingsModal} alt={'avatar - click to open settings'} />

          <Settings isOpen={this.state.isSettingsModalOpen} onRequestClose={this.closeSettingsModal} close={this.closeSettingsModal} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
	startLogOut: () => dispatch(startLogOut())
})

export default connect(undefined, mapDispatchToProps)(Navbar)