import React, {useEffect, useState} from "react";
import {Grid, Layout} from "antd";

import "./LandingPage.css";
import "../components/LoginForm.css";
import "../components/RegistrationForm.css";
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";
import {useHistory} from "react-router";


const {Content} = Layout;
const {useBreakpoint} = Grid;

function LandingPage(props) {
    const history = useHistory();

    if (localStorage.accessToken) {
        history.push('/site/job');
    }

    const screens = useBreakpoint();
    const isMobile = screens.xs;
    const changeOrder = screens.md;
    const [openRegisterForm, setOpenRegisterForm] = useState(false);

    return (
        <Layout>
            <Content style={{backgroundColor: "white"}}>
                {openRegisterForm ?
                    <RegistrationForm goToRegister={setOpenRegisterForm} isMobile={isMobile} changeOrder={changeOrder}/>
                    :
                    <LoginForm goToRegister={setOpenRegisterForm} isMobile={isMobile} changeOrder={changeOrder}/>
                }
            </Content>
        </Layout>
    );
}

export default LandingPage;
