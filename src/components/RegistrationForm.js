import React, {useState} from 'react'
import {useHistory} from "react-router";
import {Col, Layout, Row, Steps} from 'antd';
import {FirstStepRegistration} from "./FirstStepRegistration";
import {SecondStepRegistration} from "./SecondStepRegistration";
import {RegistrationState, Roles} from "../constants";
import {ThirdStepRegistration} from "./ThirdStepRegistration";

const {Content} = Layout;

function RegistrationForm() {
    let history = useHistory();
    const [step, setStep] = useState(RegistrationState.RoleInfo);
    const [profileType, setProfileType] = useState(Roles.DOER);
    const [profile, setProfile] = useState({
            user: {
                username: '',
                firstName: '',
                lastName: '',
                birthDate: {},
                password: '',
            },
            phoneNo: ''
        }
    );

    const {Step} = Steps;

    return <Layout>
        <Content style={{height: '100vh'}} className='content-background'>
            <div className='register'>
                <Row>
                    <Col span={24}>
                        {/*<img src={""} style={{width: '100%'}} alt='conmisi logo'/>*/}
                        {step === RegistrationState.RoleInfo && <FirstStepRegistration setStep={setStep} setProfileType={setProfileType}/>}
                        {step === RegistrationState.UserInfo && <SecondStepRegistration setStep={setStep} profile={profile} setProfile={setProfile}/>}
                        {step === RegistrationState.ProfileInfo && <ThirdStepRegistration setStep={setStep} profile={profile} setProfile={setProfile} profileType={profileType}/>}

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
