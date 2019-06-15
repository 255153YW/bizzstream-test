import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from 'components/Home';
import LayoutStoreProvider from "providers/LayoutStoreProvider";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={(props) => (<LayoutStoreProvider childComponent={<Home {...props}/>} {...props}/>)} />
        <Route path="/about" component={About} />
        <Route path="*" component={NotFound}/>
      </Switch>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function NotFound() {
  return <h2>404</h2>;
}

export default App;
