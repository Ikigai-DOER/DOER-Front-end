import React, {useState} from 'react'
import {useHistory} from "react-router";
import {Col, Layout, Row, Steps} from 'antd';
import {FirstStepRegistration} from "./FirstStepRegistration";
import {SecondStepRegistration} from "./SecondStepRegistration";
import {RegistrationState, Roles} from "../constants";
import {ThirdStepRegistration} from "./ThirdStepRegistration";

const {Content} = Layout;

function RegistrationForm(props) {
    let history = useHistory();
    const [step, setStep] = useState(RegistrationState.RoleInfo);
    const [role, setRole] = useState(Roles.DOER);
    const [profile, setProfile] = useState({
            userProfile: {
                username: '',
                first_name: '',
                last_name: '',
                email: '',
                password1: '',
                password2: '',
            },
            birth_date: '',
            phone_no: ''
        }
    );

    const {Step} = Steps;

    return <Layout>
        <Content style={{height: '100vh'}} className='content-background'>
            <div className='register'>
                <Row>
                    <Col span={24}>
                        {/*<img src={""} style={{width: '100%'}} alt='conmisi logo'/>*/}
                        {step === RegistrationState.RoleInfo &&
                        <FirstStepRegistration setStep={setStep} setRole={setRole} role={role}
                                               goToRegister={props.goToRegister}/>}
                        {step === RegistrationState.UserInfo &&
                        <SecondStepRegistration setStep={setStep} profile={profile} setProfile={setProfile}
                                                goToRegister={props.goToRegister}/>}
                        {step === RegistrationState.ProfileInfo &&
                        <ThirdStepRegistration setStep={setStep} profile={profile} setProfile={setProfile}
                                               role={role} goToRegister={props.goToRegister}/>}

                        <Steps current={step}>
                            <Step title='Role' description="My role"/>
                            <Step title='About me' description="My basic info"/>
                            <Step title='Make my account' description="Enter account info"/>
                        </Steps>
                    </Col>
                </Row>
            </div>
        </Content>
    </Layout>
}

export default RegistrationForm;
