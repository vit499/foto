import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from 'routes'
import 'materialize-css'

function App() {

  return (
    <Router>
      <Routes isAuth={false} />
    </Router>
  );
}

export default App;
