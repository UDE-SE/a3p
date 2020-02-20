import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {ConfigProvider} from 'antd'
import deDE from 'antd/es/locale/de_DE'
import moment from 'moment'
import 'moment/locale/de'

import App from './AppRouter'
import {globalStore} from './state/stateProvider'
import * as serviceWorker from './serviceWorker'


ReactDOM.render(
    (<Provider store={globalStore}>
        <ConfigProvider locale={deDE}>
            <App/>
        </ConfigProvider>
    </Provider>),
    document.getElementById('root')
);
moment.local('de');


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
