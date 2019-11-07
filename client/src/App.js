import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import io from 'socket.io-client';
import './App.css';

import Home from './components/Home';
import Chat from './components/Chat';
import Navbar from './layout/Nabvar';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './routing/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Route
              exact
              path='/'
              component={props => <Home {...props} />}></Route>
            <PrivateRoute
              exact
              path='/chat'
              component={props => <Chat {...props} />}></PrivateRoute>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
