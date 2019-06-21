import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from 'components/Home';
import GetEHome from 'components/GetEHome';
import LayoutStoreProvider from "providers/LayoutStoreProvider";
import MaxedyHome from "components/MaxedyHome";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/maxedy" render={(props) => (<LayoutStoreProvider childComponent={<MaxedyHome {...props}/>} {...props}/>)} />
        <Route exact path="/get-e" component={GetEHome} />
        <Route path="*" component={NotFound}/>
      </Switch>
    </Router>
  );
}

// function About() {
//   return <h2>About</h2>;
// }

function NotFound() {
  return <h2>404</h2>;
}

export default App;
