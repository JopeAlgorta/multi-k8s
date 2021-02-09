import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import OtherPage from './OtherPage';
import Fib from './Fib';

function App() {
  return (
    <Router>

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <Link to='/'>Go to <code>Home</code></Link>
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React, Docker and Travis
        </a>
          <div>
            <Route exact path='/' component={Fib} />
            <Route exact path='/otherpage' component={OtherPage} />
          </div>
        </header>

      </div>
    </Router>
  );
}

export default App;
