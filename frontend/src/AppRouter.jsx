import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'

import './styles/style.css'

import Login from './components/authentication/Login'
import PageWrapper from './components/layout/PageWrapper'


const LOGIN_ROUTE = '/login';
const APP_ROUTE = '/app';


const mapStateToProps = state => {
    return {logedin: state.user != null};
};


function _AuthenticatedRoute(props) {
    if (props.logedin) {
        let new_props = {...props};
        delete new_props.logedin;
        return <Route {...new_props}/>;
    } else {
        return <Redirect to={LOGIN_ROUTE}/>;
    }
}


function _LogInRoute(props) {
    if (props.logedin) {
        return <Redirect to={APP_ROUTE}/>;
    } else {
        let new_props = {...props};
        delete new_props.logedin;
        return (
            <>
                <Route exact {...new_props}/>
                <Redirect path={props.path} to={props.path}/>
            </>
        );
    }
}


const AuthenticatedRoute = connect(mapStateToProps)(_AuthenticatedRoute);
const LogInRoute = connect(mapStateToProps)(_LogInRoute);


function App() {
    return (
        <Router>
            <Switch>
                <LogInRoute path={LOGIN_ROUTE} component={Login}/>
                <AuthenticatedRoute path={APP_ROUTE} component={PageWrapper}/>
                <Redirect to={APP_ROUTE}/>
            </Switch>
        </Router>
    );
}

export default App;
