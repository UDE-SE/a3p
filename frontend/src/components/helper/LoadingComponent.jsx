import React from 'react'
import {Spin} from 'antd'

import './LoadingComponent.css'


function LoadingComponent(props) {
    return props.loading ? <div className='loading-component'><Spin/></div> : props.children;
}

export default LoadingComponent;
