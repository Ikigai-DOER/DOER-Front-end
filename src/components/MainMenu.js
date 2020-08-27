import React, {useContext} from 'react'
//React router
import {useHistory} from "react-router";
//Ant components
import {Menu} from "antd";
//Ant icons
import {LogoutOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import UserContext from "../UserContext";

//Components

function MainMenu(props) {
    const history = useHistory();
    const { userInfo } = useContext(UserContext);

    return <Menu>
        <Menu.Item key={1}
                   onClick={() => {
                       if (userInfo) {
                           const type = userInfo.doer ? 'doer' : 'employer';
                           history.push(`/site/${type}/${userInfo.user.id}`);
                       }
                   }}
        >
            <UserOutlined/>
            <span>
                Moj profil
            </span>
        </Menu.Item>
        <Menu.Item key={2}
                   onClick={() => history.push('/site/settings')}
        >
            <SettingOutlined/>
            <span>
                Podesavanja
            </span>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Divider/>
        <Menu.Item key={3}
                   onClick={props.Logout}>
            <LogoutOutlined/>
            <span>
                Logout
            </span>
        </Menu.Item>
    </Menu>
}

export default MainMenu;