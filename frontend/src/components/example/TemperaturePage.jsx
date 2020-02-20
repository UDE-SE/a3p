import React, {Component} from 'react'
import {Button, DatePicker, Typography} from 'antd'
import moment from 'moment'

import ResponsivePlot from '../helper/ResponsivePlot'
import {globalStore} from '../../state/stateProvider'
import {getTemperatureData} from '../../state/actions'


/**
 * example implementation
 *
 * delete file and folder if not needed
 */


class TemperaturePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {temperature: null},
            start: new Date('2010-01-01T00:00:00').getTime() * 1000000,
            end: new Date('2020-01-01T00:00:00').getTime() * 1000000,
            loading: false,
        }
        this.fetchData = this.fetchData.bind(this);
        this.handleRangePickerChange = this.handleRangePickerChange.bind(this);
    }

    handleRangePickerChange(date) {
        const start = date[0].unix() * 1000000000;
        const end = date[1].unix() * 1000000000;
        this.setState({start: start, end: end});
    }

    fetchData() {
        const start = this.state.start;
        const end = this.state.end;
        this.setState({loading: true});
        globalStore.dispatch(getTemperatureData(start, end, (res) => {
            this.setState({data: res.data});
            this.setState({loading: false});
        }, (err) => {
            console.log(err);
            this.setState({loading: false});
        }));
    }

    render() {
        const {Title} = Typography;
        const {RangePicker} = DatePicker;

        let temp_object = this.state.data.temperature;
        for (let ts in temp_object) {
            if (temp_object[ts] === -999) {
                delete temp_object[ts];
            }
        }

        const time = temp_object == null ? null : Object.keys(temp_object).map(ts => new Date(parseInt(ts)));
        const temps = temp_object == null ? null : Object.values(temp_object);

        const data = [{
            x: time,
            y: temps,
            type: 'scatter'
        }];
        const layout = {
            title: 'Temperatur in Essen'
        };

        const defaultRange = [
            moment('2010-01-01', 'YYYY-MM-DD'),
            moment('2020-01-01', 'YYYY-MM-DD')
        ]

        return (
            <>
                <Title>Temperatures</Title>
                <p>
                    <RangePicker defaultValue={defaultRange} onChange={this.handleRangePickerChange}/>
                </p>
                <p>
                    <Button onClick={this.fetchData} color='primary' loading={this.state.loading}>
                        {this.state.loading ? null : 'Fetch Data'}
                    </Button>
                </p>
                <ResponsivePlot data={data} layout={layout}/>
            </>
        );
    }
}

export default TemperaturePage;

/**
 * example implementation
 */
