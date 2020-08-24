import React from 'react'
//React router
import {useHistory} from "react-router";
//Ant components
import {Menu} from "antd";
//Ant icons
import {LogoutOutlined, SettingOutlined} from "@ant-design/icons";

//Components

function MainMenu(props) {
    const history = useHistory();

    return <Menu>
        <Menu.Item key={1}
                   onClick={() => history.push('settings')}
        >
            <SettingOutlined/>
            <span>
                Podesavanja
            </span>
        </Menu.Item>
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