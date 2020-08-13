import React, {useState} from "react";
import {Redirect, Route, Switch, useRouteMatch} from "react-router";
import {Affix, Layout} from "antd";
import HEADER from "./components/Header";
import MainDrawer from "./components/MainDrawer";
import SIDER from "./components/Sider";
import LogoutModal from "./components/LogoutModal";
import JobList from "./pages/JobList";
import Profile from "./pages/Profile";

import './Main.css';
import DoerList from "./pages/DoerList";
import Job from "./pages/Job";

const {Content, Footer} = Layout;

const Main = () => {
    const [mobile, setMobile] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [logOut, setLogOut] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const handleCollapse = () => setCollapsed(!collapsed);

    const handleBreakpoint = value => {
        if (value)
            setMobile(true);
        else
            setMobile(false);
    }

    const handleCancelLogOut = () => {
        setLogOut(false);
    }

    let { path } = useRouteMatch();

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Affix>
                <HEADER mobile={mobile}
                        openDrawer={() => setDrawer(true)}
                        logout={() => setLogOut(true)}
                />
            </Affix>
            <Layout>
                <Affix offsetTop={64}>
                    <SIDER mobile={mobile}
                           collapse={handleCollapse}
                           breakpoint={handleBreakpoint}
                    />
                </Affix>
                <LogoutModal visible={logOut} callBack={handleCancelLogOut}/>

                <MainDrawer visible={drawer}
                            close={() => setDrawer(false)}
                />

                <Content>
                    <Switch>
                        <Route exact path={`${path}/job`} component={JobList}/>
                        <Route exact path={`${path}/job/new`} component={Job}/>
                        <Route exact path={`${path}/job/:jobId`} component={Job}/>
                        <Route exact path={`${path}/doer`} component={DoerList}/>
                        <Route path={`${path}/doer/:id`} component={Profile}/>
                        {/*<Route path={`${path}/all`} component={AllPatients}/>*/}
                        {/*<Route path={`${path}/calendar`} component={() => <Calendar mobile={mobile}/>} />*/}
                        {/*<Route path={`${path}/patient/:folderId`} component={SinglePatient}/>*/}
                        {/*<Route path={`${path}/teeth`} component={PatientTeeth}/>*/}
                        {/*<Route path={`${path}/options`} component={Options}/>*/}

                        <Redirect to='/404'/>
                    </Switch>
                </Content>
            </Layout>
            <Footer className='main-footer'>
                <p>DOER ©2020</p>
            </Footer>
        </Layout>
    );
};

export default Main;