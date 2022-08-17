import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Navbar from "./components/layout/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import User from "./components/users/User";
import Books from "./components/pages/Books";
import AddBook from "./components/books/AddBook";
import EditBook from "./components/books/EditBook";
import Book from "./components/books/Book";
import Amplify from 'aws-amplify';
import aws_config from './aws-exports';
import {  withAuthenticator} from '@aws-amplify/ui-react';

Amplify.configure(aws_config)
function App(props) {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/users/add" component={AddUser} />
          <Route exact path="/users/edit/:id" component={EditUser} />
          <Route exact path="/users/:id" component={User} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/books/add/:id" component={AddBook} />
          <Route exact path="/books/edit/:id" component={EditBook} />
          <Route exact path="/books/:id" component={Book} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default withAuthenticator(App);
