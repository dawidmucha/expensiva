import React from 'react'
import { startLogOut } from '../actions/actions'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

const Navbar = ({ startLogOut }) => (
  <div>
    <br />
    <NavLink to='/dashboard' activeClassName='is-active'>Dashboard</NavLink>
    <NavLink to='/categories' activeClassName='is-active'>Categories</NavLink>
    <button onClick={startLogOut}>Logout</button>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
	startLogOut: () => dispatch(startLogOut())
})

export default connect(undefined, mapDispatchToProps)(Navbar)