import React from 'react'

//Ant components
import {Drawer} from "antd";

//Smaller
import SiderMenu from "./SiderMenu";

//Logo
import logo from "../logos/doer2.svg";

function MainDrawer(props) {
    return <Drawer
        visible={props.visible}
        onClose={props.close}
        placement={'left'}
        closable={false}
        bodyStyle={{padding: 0}}
    >
        <img style={{
            width: '100%'
        }}
             src={logo} alt='DOER logo'/>
        <SiderMenu/>
    </Drawer>
}

export default MainDrawer;