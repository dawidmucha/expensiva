import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import { firebase } from './firebase/firebase'
import { login, logout } from './actions/actions'
import AppRouter, { history } from './routers/AppRouter'
import { Provider } from 'react-redux'

const store = configureStore()

store.subscribe(() => {
  console.log('store updated', store.getState())
})

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
)

let isRendered = false
const renderApp = () => {
  if(!isRendered) {
    ReactDOM.render(jsx, document.getElementById('root'))
    isRendered = true
  }
}

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'))

firebase.auth().onAuthStateChanged((user) => {
	if(user) {
    store.dispatch(login(user.uid))
    renderApp()
    if(history.location.pathname === '/') {
      history.push('/dashboard')
    }
	} else {
    store.dispatch(logout())
    renderApp()
		history.push('/')
	}
})

export default store