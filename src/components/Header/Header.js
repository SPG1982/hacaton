import React, {useState} from 'react';
import {NavLink, withRouter} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import {Menu, Button, Row, Col} from "antd";
import styles from "./styles.module.css";
import '../antd.css';

const HeaderSite = React.memo(props => {

    return (
        <>
            <Row>
                <Col span={12}>
                    <Menu style={{height: '50px'}} selectedKeys={[]} mode="horizontal" theme="dark">
                        <Menu.Item key="logo-menu">
                            <NavLink className={styles.navLink} to={"/"}><span
                                style={{fontSize: '20px', color: 'yellow'}}>Служба 02</span></NavLink>
                        </Menu.Item>
                        <Menu.Item key="new-quest-menu">
                            <Button className={styles.button} onClick={()=>{}} type="info">Прием заявления о преступлении</Button>
                        </Menu.Item>
                    </Menu>

                </Col>
                <Col span={12}>
                    <Menu selectedKeys={[]} className="align-items-center" mode="horizontal" theme="dark"
                          style={{textAlign: 'right', height: '50px'}}>
                        <Menu.Item style={{verticalAlign: 'middle'}} className="menu-right-login" key="login-menu">
                                    <Button className={styles.button} onClick={() => {}}
                                            type="primary">Страница 1</Button>
                                    <Button className={styles.button} onClick={() =>{}}
                                            type="danger">Страница 2</Button>
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </>
    );
})


let mapStateToProps = (state) => {
    return {
        app: state.app,
    }
}

let mapDispatchToPropsLite = {

}

export default compose(
    connect(mapStateToProps, mapDispatchToPropsLite),
    withRouter
)(HeaderSite)


