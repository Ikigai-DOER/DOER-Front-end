import React from 'react'

//Ant components
import {Dropdown, Layout, Button} from "antd";

//Ant icon
import {DownOutlined, MenuOutlined, UserOutlined} from "@ant-design/icons";

//Logo
import logo from "../logos/doer2.svg";

//Components
import MainMenu from "./MainMenu";

const {Header} = Layout;

function HEADER(props) {
    const username = localStorage.username;

    return <Header
        className='main-header'
    >
        {
            props.mobile
                ?
                <div>
                    <MenuOutlined
                        onClick={props.openDrawer}
                        className='mobile-drawer-icon'
                    />

                    <img style={{height: 20}}
                         src={logo} alt='logo'/>
                </div>
                :
                <img style={{
                    height: 54,
                    marginTop: 6,
                    marginLeft: 36,
                    position: 'absolute',
                    left: '0',
                }}
                     src={logo} alt='logo'/>
        }
        <div style={
            {
                position: 'absolute',
                right: '0em',
                top: '0',
                cursor: 'pointer'
            }}>
            <div>
                <Dropdown overlay={<MainMenu Logout={props.logout}/>} trigger={'click'}>
                    <div>
                        <UserOutlined style={{fontSize: '1.5em', padding: '1em'}}/>
                        <span>
                        {username}
                    </span>
                        <Button type='link'>
                            <DownOutlined/>
                        </Button>
                    </div>
                </Dropdown>
            </div>
        </div>
    </Header>
}

export default HEADER;