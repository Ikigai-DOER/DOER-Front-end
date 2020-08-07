import React, {useEffect, useState} from "react";
import LoginForm from "../components/LoginForm";
import { Form, Grid, Col, Input, Layout, Button, Space} from "antd";

import "./LandingPage.css";

const { Content} = Layout;
const {useBreakpoint} = Grid;

function LandingPage() {
    const screens = useBreakpoint();
    const isMobile = screens.xs;
    const changeOrder = screens.md;
    const [openRegisterForm, setOpenRegisterForm] = useState(false);

    useEffect(() => {
        if (openRegisterForm)
            alert("ti bi da se registrujes seljak jelj");
    }, [openRegisterForm]);

    return (
        <Layout>
            <Content style={{backgroundColor: "white"}}>
                <LoginForm goToRegister={setOpenRegisterForm} isMobile={isMobile} changeOrder={changeOrder}/>
            </Content>
        </Layout>
    );
}

export default LandingPage;
