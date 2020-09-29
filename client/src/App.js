import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from '../src/pages/Home';
import Profile from './pages/Profile';
import NoMatch from "../src/pages/NoMatch";
import login from "./components/login"
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import Profilepage from "./pages/Profilepage"
// import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="wrapper">
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/profile/:username" render={(props) => <Profile {...props} />}/> */}
          <Route path="/profile/:username" render={(props) => <Profilepage {...props} />}/>
          <Route path="/login" component={login} />          
          <Route component={NoMatch} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;