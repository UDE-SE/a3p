import React from 'react'
import Plot from 'react-plotly.js'

import './ResponsivePlot.css'


function ResponsivePlot(props) {
    const layout = {autosize: true};
    const config = {
        responsive: true,
        displaylogo: false,
        toImageButtonOptions: {
            format: 'svg',
            filename: 'custom_image',
            width: 1600,
            height: 900,
            scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
        },
    };
    return <Plot data={props.data} layout={{...props.layout, ...layout}} config={config} className='resp-plot'/>;
}

export default ResponsivePlot;
