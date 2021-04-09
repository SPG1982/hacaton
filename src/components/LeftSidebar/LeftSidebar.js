import React, {useState} from 'react';
import {Layout, Menu} from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    MenuOutlined,
    UserOutlined,
    WarningOutlined,
    SettingOutlined,
    WechatOutlined,
    FullscreenExitOutlined

} from '@ant-design/icons';
import {Link, withRouter} from "react-router-dom";
import {compose} from "redux";

const {Sider} = Layout;
const {SubMenu} = Menu;

const LeftSidebar = (props) => {

    const [collapsed, setCollapsed] = useState(false);
    let onCollapse = collapsed => {
        setCollapsed(collapsed);
    };


    return (
        <>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                {/*<div className={classes.logo}>Qpuzzle.ru</div>*/}
                <Menu theme="dark" defaultOpenKeys={['']} selectedKeys={[props.history.location.pathname]}
                      defaultSelectedKeys={[props.history.location.pathname]} mode="inline">
                    <Menu.Item key="/" icon={<PieChartOutlined/>}>
                        <Link to="/">Главная</Link>
                    </Menu.Item>
                    <Menu.Item key="/dashboard" icon={<WechatOutlined/>}>
                        <Link to="/dashboard">+ЗАЯВЛЕНИЕ+</Link>
                    </Menu.Item>
                    <Menu.Item key="/about" icon={<DesktopOutlined/>}>
                        <Link to="/about">О проекте</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        </>
    )
}

export default compose(withRouter)(LeftSidebar)