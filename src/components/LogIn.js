import React from 'react'
import { connect } from 'react-redux'
import { startLogIn } from '../actions/actions'

const LogIn = ({ startLogIn }) => (
  <div>
    <p>please log in</p>
    <button onClick={startLogIn}>LOG IN</button>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
	startLogIn: () => dispatch(startLogIn())
})

export default connect(undefined, mapDispatchToProps)(LogIn)