import React from 'react'
import { connect } from 'react-redux'
import { startLogIn } from '../../actions/actions'

import '../../components-styles/routes/LogIn.scss'

const LogIn = ({ startLogIn }) => (
  <div id='logInContainer'>
    <button class='btn btnBlue' onClick={startLogIn}>LOG IN</button>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
	startLogIn: () => dispatch(startLogIn())
})

export default connect(undefined, mapDispatchToProps)(LogIn)