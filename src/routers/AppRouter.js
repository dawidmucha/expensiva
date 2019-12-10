import React from 'react';
import LogIn from '../components/routes/LogIn'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Dashboard from '../components/routes/Dashboard'
import Management from '../components/routes/Management'

export const history = createBrowserHistory()

const NotFoundPage = () => (
  <div>
    <p>OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!</p>
  </div>
)

class AppRouter extends React.Component {
  render() {
    return (
			<Router history={history}>
				<div>
					<Switch>
            <PublicRoute path='/' component={LogIn} exact />
						<PrivateRoute path='/dashboard' component={Dashboard} />
						<PrivateRoute path='/categories' component={Management} />
						<Route component={NotFoundPage} />
					</Switch>
				</div>
			</Router>
    )
  }
}

export default AppRouter;