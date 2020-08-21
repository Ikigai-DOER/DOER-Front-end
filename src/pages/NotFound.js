import React from 'react'

import {useHistory} from "react-router";

import {Layout, Result} from 'antd';

import logo from '../logos/doer-white.svg'

const { Header, Content } = Layout;

function NotFound() {
    let history = useHistory();

    return <Layout style={{minHeight: '100vh'}}>
        <Header style={{backgroundColor: '#007afc', paddingBottom:'2px'}}>
            <img
                src={logo} style={{height: '100%', cursor: 'pointer'}}
                alt='doer logo'
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