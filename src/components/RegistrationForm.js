import React, {useState} from 'react'
import {useHistory} from "react-router";
import {Row, Col, Form, Input, Button, Divider, Layout, Steps} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {FirstStepRegistration} from "./FirstStepRegistration";
import {SecondStepRegistration} from "./SecondStepRegistration";

const {Content} = Layout;

function RegistrationForm() {
    let history = useHistory();
    const [step, setStep] = useState(0);
    const {Step} = Steps;

    const handleOnFinish = () => {
        setStep(step + 1)
    };

    return <Layout>
        <Content style={{height: '100vh'}} className='content-background'>
            <div className='register'>
                <Row>
                    <Col span={24}>
                        {/*<img src={""} style={{width: '100%'}} alt='conmisi logo'/>*/}
                        {step === 0 && <FirstStepRegistration handleOnFinish={handleOnFinish}/>}
                        {step === 1 && <SecondStepRegistration handleOnFinish={handleOnFinish}/>}
                        <Steps current={step}>
                            <Step title='User info' description="Enter user info"/>
                            <Step title='User info' description="Enter user info"/>
                            <Step title='User info' description="Enter user info"/>
                        </Steps>
                    </Col>
                </Row>
            </div>
        </Content>
    </Layout>
}

export default RegistrationForm;
