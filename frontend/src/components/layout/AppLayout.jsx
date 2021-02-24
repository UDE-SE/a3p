import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Avatar, Dropdown, Layout, Menu, message} from 'antd'
import {LogoutOutlined} from '@ant-design/icons'

import {globalStore} from '../../state/stateProvider'
import {logoutSession} from '../../state/actions'

import * as logoSE from '../../static/se-logo.png'
import './AppLayout.css'


const mapStateToProps = state => ({user: state.user});

class _AppLayout extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        message.destroy();
        message.success('Goodbye!');
        globalStore.dispatch(logoutSession());
    }

    render() {
        const {Header, Content} = Layout;

        const initials = (this.props.user.firstname[0] + this.props.user.lastname[0]).toUpperCase();
        const dropdownMenu = (
            <Menu>
                <Menu.Item onClick={this.logout}><LogoutOutlined />Logout</Menu.Item>
            </Menu>
        );
        const menuItems = this.props.routes.map(route => {
            return <Menu.Item key={route.path}><Link to={route.path}>{route.label}</Link></Menu.Item>
        });

        return (
            <Layout className='layout'>
                <Header className='header'>
                    <div className='header-container'>
                        <Link to='/app'><img src={logoSE} alt='SE Logo' className='header-logo'/></Link>
                        <Menu mode='horizontal' theme='light' className='navbar'
                              selectedKeys={[this.props.location.pathname]} children={menuItems}/>
                        <Dropdown overlay={dropdownMenu} trigger={['click']} placement={'bottomRight'}>
                            <Avatar size={40} className='align-right cursor-pointer'>{initials}</Avatar>
                        </Dropdown>
                    </div>
                </Header>
                <Layout>
                    <Content className='content-container'>
                        <div>{this.props.children}</div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

const AppLayout = connect(mapStateToProps)(_AppLayout);

export default AppLayout;
