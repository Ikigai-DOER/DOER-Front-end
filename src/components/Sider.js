import React from 'react'

//Ant components
import {Affix, Layout } from "antd";

//Smaller
import SiderMenu from "./SiderMenu";

const { Sider } = Layout;

function SIDER(props) {
    return <Sider
        className='main-sider'
        style={props.mobile ? {display: 'none'} : {display: 'block'}}
        theme='light'
        collapsible
        onCollapse={props.collapse}
        onBreakpoint={props.breakpoint}
        breakpoint='lg'
        width={260}
    >
        <Affix>
            <SiderMenu/>
        </Affix>
    </Sider>
}

export default SIDER;