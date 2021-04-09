import React, {useEffect} from 'react';
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import Header from "../../components/Header/Header";
import {Layout} from "antd";
import styles from './styles.module.css'
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";


const DashBoard = (props) => {
    return (
        <div className={styles.gridContainer} style={{marginTop: '10px'}}>
            <div className={styles.block}>
                111
            </div>
            <div className={styles.block}>
                222
            </div>
            <div className={styles.block}>
                333
            </div>
            <div className={styles.block}>
                444
            </div>
            <div className={styles.block}>
                555
            </div>
            <div className={styles.block}>
                666
            </div>


        </div>
    )
}


const Container = (props) => {
    const {Content} = Layout;
    return (
        <>
            <Header/>
            <Layout style={{height: `calc(100vh - 50px)`}}>
                <LeftSidebar {...props}/>
                <Layout>
                    <Content style={{margin: '0 16px'}}>
                        <DashBoard/>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

let mapStateToProps = (state) => {
    return {
        app: state.app,
    }
}

let mapDispatchToPropsLite =
    {}

export default compose(
    connect(mapStateToProps, mapDispatchToPropsLite),
    withRouter
)(Container)


