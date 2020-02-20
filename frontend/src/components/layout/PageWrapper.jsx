import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

import AppLayout from './AppLayout'
import MainPage from '../dashboard/MainPage';
import SecondPage from '../example/SecondPage';
import TemperaturePage from '../example/TemperaturePage'


function PageWrapper(props) {
    /* Add your main routes here */
    const routes = [
        {label: 'Main', path: '/app/main', component: MainPage},
        {label: 'Second', path: '/app/second', component: SecondPage}, // example implementation, remove if not needed
        {label: 'Temperature', path: '/app/temperature', component: TemperaturePage} // example implementation, remove if not needed
    ];

    const routeComponents = routes.map(route => <Route exact path={route.path} component={route.component}/>);

    return (
        <AppLayout location={props.location} routes={routes}>
            <Switch>
                {routeComponents}
                <Redirect to='/app/main'/>
            </Switch>
        </AppLayout>
    );
}

export default PageWrapper;
