import React from 'react'

import {useHistory} from "react-router";

import {Layout, Result} from 'antd';

import logo from '../logo.svg'

const { Header, Content } = Layout;

function NotFound() {
    let history = useHistory();

    return <Layout style={{minHeight: '100vh'}}>
        <Header style={{backgroundColor: 'white'}}>
            <img
                src={logo} style={{height: '100%', cursor: 'pointer'}}
                alt='conmisi logo'
                onClick={() => history.push('/')}
            />
        </Header>
        <Content>
            <div style={{backgroundColor: 'white', margin: '2em', minHeight: '79vh'}}>
                <Result
                    status='404'
                    title='404'
                    subTitle='Not Found'
                />
            </div>
        </Content>
    </Layout>
}

export default NotFound;