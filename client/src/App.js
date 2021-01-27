import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './components/Nav';
import Header from './components/Header';
import Saved from './pages/Saved';
import Books from './pages/Books'
import NoMatch from './pages/NoMatch'




function App() {

  return (
    <Router>
      <Header />
      <Nav />
      <Switch>
        <Route exact path='/' component={Books} />
        <Route exact path='/search' component={Books} />
        <Route exact path='/saved' component={Saved} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default App;
