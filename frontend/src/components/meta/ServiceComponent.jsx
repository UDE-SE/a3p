import React, {Component} from 'react'
import {Alert} from 'antd'

import './ServiceComponent.css'

import {globalStore} from '../../state/stateProvider'
import {getTask} from '../../state/actions'
import LabeledProgress from '../helper/LabeledProgress';


class ServiceComponent extends Component {
    constructor(props) {
        super(props);
        this.timerID = null;
        this.state = {
            task: null
        };

        this.updateProgress = this.updateProgress.bind(this);
    }

    componentDidMount() {
        if (this.props.taskID != null) {
            this.startTimer();
        }
    }

    componentWillUnmount() {
        this.endTimer();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.taskID !== prevProps.taskID) {
            if (this.props.taskID != null) {
                this.setState({task: {'status': 0, 'response': null, 'description': 'loading'}});
                this.startTimer();
            } else {
                this.endTimer();
            }
        }
    }

    startTimer() {
        if (this.timerID == null) {
            this.timerID = setInterval(this.updateProgress, 250);
        }
    }

    endTimer() {
        if (this.timerID != null) {
            clearInterval(this.timerID);
            this.timerID = null;
        }
    }

    updateProgress() {
        globalStore.dispatch(getTask(this.props.taskID, (response) => {
            this.setState({task: response.data});
            if (response.data['response'] != null) {
                this.endTimer();
                this.props.onFinish();
            }
        }, (error) => {
            console.log(error);
        }));
    }

    renderNoTask() {
        return (
            <div>No Task</div>
        );
    }

    renderStatus() {
        return (
            <LabeledProgress type='circle' percent={this.state.task.status} label={this.state.task.description}/>
        );
    }

    renderResponse() {
        if (this.state.task.description === 'error') {
            return <Alert message={this.state.task.response} type='error'/>;
        }
        return (
            <div>{JSON.stringify(this.state.task.response)}</div>
        )
    }

    render() {
        const task = this.state.task;
        let element = null;

        if (task == null) {
            element = this.renderNoTask();
        } else if (task.response == null) {
            element = this.renderStatus();
        } else {
            element = this.renderResponse();
        }

        return element;
    }

}

export default ServiceComponent;
