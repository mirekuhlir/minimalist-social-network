import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './appState/store';

import './App.scss';

//layout
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import Footer from './components/layout/Footer';

//header
import Logo from './components/layout/Logo';
import Navbar from './components/layout/Navbar';

//pages
import HomePage from './components/layout/HomePage';
import ProfileList from './components/profile/profileList/ProfileList';
import Registration from './components/user/Registration';
import Login from './components/user/Login';
import userAuthorization from './authUtils/userAuthorization';
import PrivateRoute from './components/common/PrivateRoute';
import NotFound from './components/common/NotFound';

import MyProfile from './components/profile/MyProfile';
import EditProfile from './components/profile/editProfile/EditProfile';
import ProfilePage from './components/profile/ProfilePage';

//loading jwt on client side and managing jwt expiration
userAuthorization();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="app">
            <Header>
              <Logo />
              <Navbar />
            </Header>
            <Main>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/profiles" component={ProfileList} />
                <Route exact path="/registration" component={Registration} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/my-profile" component={MyProfile} />
                <PrivateRoute
                  exact
                  path="/profile/:user_id"
                  component={ProfilePage}
                />
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
                <Route exact path="/not-found" component={NotFound} />
                <Route component={NotFound} />
              </Switch>
            </Main>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
