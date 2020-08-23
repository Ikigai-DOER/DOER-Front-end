import React, {useContext} from 'react'

//Ant components
import {Dropdown, Layout, Button, Avatar} from "antd";

//Ant icon
import {DownOutlined, MenuOutlined, UserOutlined} from "@ant-design/icons";

//Logo
import logo from "../logos/doer-white.svg";

//Components
import MainMenu from "./MainMenu";
import UserContext from "../UserContext";

const {Header} = Layout;

function HEADER(props) {
    const { userInfo } = useContext(UserContext);

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
                        {userInfo?.user?.user_profile
                            ? <Avatar style={{ marginRight: '1em' }} src={userInfo.user.profile_pic} alt={userInfo.user.user_profile.username} />
                            : <UserOutlined style={{fontSize: '1.5em', padding: '1em'}}/>
                        }
                        <span style={{ color: 'white', fontWeight: 'bold' }}>
                            {userInfo && userInfo.user.user_profile.username}
                        </span>
                        <Button type='link' style={{ color: 'white' }}>
                            <DownOutlined />
                        </Button>
                    </div>
                </Dropdown>
            </div>
        </div>
    </Header>
}

export default HEADER;