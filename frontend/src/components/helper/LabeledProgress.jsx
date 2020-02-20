import React from 'react'
import {Progress} from 'antd'

import './LabeledProgress.css'


function LabeledProgress(props) {
    const width = props.width != null ? props.width : 60;
    return (
        <div className='labeled-progress'>
            <Progress percent={props.percent} type={props.type} width={width}/>
            <div>{props.label}</div>
        </div>
    );
}

export default LabeledProgress;