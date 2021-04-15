import React, {useEffect} from 'react';
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import Header from "../../components/Header/Header";
import {Layout} from "antd";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import './css.css'
// import
import socket from "../../components/Socket/Socket";

const Zoom = (props) => {
    return (
        <>
            <div>















            </div>
        </>
    )
}


const MainContainer = (props) => {
    const {Content} = Layout;
    return (
        <>
            <Header />
            <Layout style={{height: `calc(100vh - 50px)`}}>
                <LeftSidebar {...props}/>
                <Layout>
                    <Content style={{margin: '0 16px'}}>
                            <Zoom />
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
    {

    }

export default compose(
    connect(mapStateToProps, mapDispatchToPropsLite),
    withRouter
)(MainContainer)


