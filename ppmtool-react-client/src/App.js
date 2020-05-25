import React, { Component } from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddProject from './components/Project/AddProject';
import { Provider } from 'react-redux';
import store from './store';
import UpdateProject from './components/Project/UpdateProject';
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import AddProjectTask from './components/ProjectBoard/ProjectTasks/AddProjectTask';
import UpdateProjectTask from './components/ProjectBoard/ProjectTasks/UpdateProjectTask';
import LandingPage from './components/Layout/LandingPage';
import Register from './components/UserManagement/Register';
import Login from './components/UserManagement/Login';
import jwt_decode from 'jwt-decode';
import setJWTHeaders from './SecurityUtils/setJWTHeaders';
import { SET_CURRENT_USER } from './actions/types';
import { logout } from './actions//SecurityActions';
import SecuredRoute from './SecurityUtils/SecureRoute';

//The below code will help us to  setour token back to the state even if we refressh our  page

const JWTToken = localStorage.JWTToken;

if (JWTToken) {
  setJWTHeaders(JWTToken);
  const decoded = jwt_decode(JWTToken);

  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  });

  const currentTokenTime = Date.now() / 1000;

  if (decoded.exp < currentTokenTime) {
    store.dispatch(logout());
    window.location.href = "/";

  }
}

class App extends Component {
  render() {

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />

            {
              //Public Route
            }
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            {
              //Private Route
            }
            <Switch>
              <SecuredRoute exact path="/dashboard" component={Dashboard} />
              <SecuredRoute exact path="/addProject" component={AddProject} />
              <SecuredRoute exact path="/updateProject/:id" component={UpdateProject} />
              <SecuredRoute exact path="/projectBoard/:id" component={ProjectBoard} />
              <SecuredRoute exact path="/addProjectTask/:id" component={AddProjectTask} />
              <SecuredRoute exact path="/updateProjectTask/:projectIdentifier/:projectSequence" component={UpdateProjectTask} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }

}
export default App;
