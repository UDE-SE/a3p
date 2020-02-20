import React, {Component} from 'react'
import {Button, Progress, Tabs, Typography} from 'antd'

import ServiceComponent from '../meta/ServiceComponent'

import {globalStore} from '../../state/stateProvider'
import {adminMessage, getErrorMessage, getLongMessage} from '../../state/actions'
import RoleRestricted from '../helper/RoleRestricted';


/**
 * example implementation
 *
 * delete file and folder if not needed
 */


class SecondPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorTaskID: null,
            longTaskID: null,
            ownMessage: null,
            percent: 0,
        };
        this.timerID = null;
        this.fetchMessage = this.fetchMessage.bind(this);
        this.progress = this.progress.bind(this);
    }

    fetchMessage() {
        globalStore.dispatch(adminMessage((res) => {
            this.setState({'ownMessage': res.data})
        }, (err) => {
            console.log(err);
        }));
    }

    fetchTaskID(type) {
        const apiCalls = {
            error: getErrorMessage,
            long: getLongMessage,
        }

        const action = function() {
            globalStore.dispatch(apiCalls[type]((new_taskID) => {
                this.setState({[type + 'TaskID']: new_taskID});
            }, (error) => {
                console.log(error);
            }));
        }
        return action.bind(this);
    }

    progress() {
        const that = this;

        function increment() {
            that.setState(state => ({percent: state.percent + 1}))
            if (that.state.percent >= 100) {
                clearInterval(that.timerID);
                that.timerID = null;
            }
        }

        that.setState({percent: 0})
        if (this.timerID != null) {
            clearInterval(this.timerID);
            this.timerID = null;
        }
        this.timerID = setInterval(increment, 100);
    }

    render() {
        const {TabPane} = Tabs;
        const {Title} = Typography;

        return (
            <>
                <Title>Some examples</Title>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Role Restrictions and API call" key="1">
                        <RoleRestricted role='user'>
                            <p>
                                If you are an admin you will see a button below. No button will show if you are only a user.
                            </p>
                        </RoleRestricted>
                        <RoleRestricted role='admin'>
                            <p>
                                <Button onClick={this.fetchMessage} color='primary'>Fetch Message</Button>
                            </p>
                        </RoleRestricted>
                        <p>{this.state.ownMessage}</p>
                    </TabPane>
                    <TabPane tab="API call and tasks" key="2">
                        <p>First component with a message returned after 5 seconds.</p>
                        <div>
                            <ServiceComponent taskID={this.state.longTaskID} onFinish={() => {}}/>
                        </div>
                        <p>
                            <Button onClick={this.fetchTaskID('long')} color='primary'>Fetch long message</Button>
                        </p>
                    </TabPane>
                    <TabPane tab="API call and task with error" key="3">
                        <p>Second component with an error returned after 2.5 seconds.</p>
                        <div>
                            <ServiceComponent taskID={this.state.errorTaskID} onFinish={() => {}}/>
                        </div>
                        <p>
                            <Button onClick={this.fetchTaskID('error')} color='primary'>Fetch error message</Button>
                        </p>
                    </TabPane>
                    <TabPane tab="Progress bar" key="4">
                        <div>
                            <Progress percent={this.state.percent} status={this.state.percent < 100 ? 'active' : null}/>
                        </div>
                        <p>
                            <Button onClick={this.progress}>Progress!</Button>
                        </p>
                    </TabPane>
                </Tabs>
            </>
        );
    }
}


export default SecondPage;

/**
 * example implementation
 */
