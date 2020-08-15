import React, {useState, useEffect} from 'react'

//Router
import {useHistory, useLocation} from "react-router";

//Ant components
import {Menu} from "antd";

//Ant icons
import {UnorderedListOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";

function SiderMenu() {
    let history = useHistory();

    let location = useLocation();

    let defaultKeys;

    const [selectedKey, setSelectedKey] = useState(0);

    if (location.pathname.includes('doer')) {
        defaultKeys = 1;
    } else if (location.pathname.includes('personal')) {
        defaultKeys = 2;
    } else {
        defaultKeys = 0;
    }

    useEffect(() => {
        if (location.pathname.includes('doer')) {
            setSelectedKey(1);
        } else if (location.pathname.includes('personal')) {
            setSelectedKey(2);
        } else {
            setSelectedKey(0);
        }
    }, [location])

    const goToTop = () => {
        window.scrollTo(0, 0);
    }

    return <Menu defaultSelectedKeys={[defaultKeys].toString()}
                 selectedKeys={[selectedKey].toString()}
                 mode="inline"
                 className='main-menu'
    >
        <Menu.Item key="0"
                   style={{marginBottom: '1em'}}
                   onClick={() => {
                       history.push('/site/job');
                       goToTop()
                   }}
        >
            <SearchOutlined/>
            <span>Poslovi</span>
        </Menu.Item>
        <Menu.Item key="1"
                   style={{marginBottom: '1em'}}
                   onClick={() => {
                       history.push('/site/doer')
                       goToTop();
                   }}
        >
            <UserOutlined/>
            <span>DOER-i</span>
        </Menu.Item>
        <Menu.Item key="2"
                   style={{marginBottom: '1em'}}
                   onClick={() => {
                       history.push('/site/personal')
                       goToTop();
                   }}
        >
            <UnorderedListOutlined />
            <span>Moji poslovi</span>
        </Menu.Item>
    </Menu>
}

export default SiderMenu;