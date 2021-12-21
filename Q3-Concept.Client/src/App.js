import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import ComponentPage from './pages/ComponentPage';
import Home from './pages/Home';
import NavBar from './Components/NavBar';
import React from 'react';

function App() {
  return (
    <div className="app">
      <Router>
        <NavBar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/home' exact component={Home} />
          <Route path='/ComponentPage' component={ComponentPage} />
          <Route path='/MaintenancePage' component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
