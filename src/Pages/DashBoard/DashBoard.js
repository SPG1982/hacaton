import React, {useEffect} from 'react';
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import Header from "../../components/Header/Header";
import {Col, Layout, Row} from "antd";
import styles from './styles.module.css'
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import dej from "../../assets/images/dej.jpg";
import Map from "./components/Map/Map";
import Photo from "./components/Photo/Photo";
import Webcam from "./components/Webcam/Webcam";
import Dialog from "./components/Dialog/Dialog";
import Form from "./components/Form/Form";
import {addAnswer, addQuestion, setAudio} from "../../redux/reducers/app-reducer";

const DashBoard = (props) => {
    //console.log(props)

    let setAudio = (type) => {
        props.setAudio(type)
    }


    return (
        <div style={{marginTop: '10px'}}>
            <div style={{display: "flex", justifyContent: 'space-around', textAlign: 'center'}}>
                <button onClick={()=> {setAudio('sound')}} style={{backgroundColor: (props.audio === 'sound') ? 'red' : 'blue', color: 'white', fontSize: '20px'}}>Записанные голоса</button>
                <button onClick={()=> {setAudio('speech')}} style={{backgroundColor: (props.audio === 'speech') ? 'red' : 'blue', color: 'white', fontSize: '20px'}}>Синтезатор голоса</button>
            </div>
            <Row>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
                    <Photo {...props}/>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
                    {/*<Webcam/>*/}
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
                    <Map/>
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col xs={24} sm={24} md={16} lg={16}>
                    <Dialog {...props}/>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                    <Form {...props}/>
                </Col>
            </Row>
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
                        <DashBoard {...props}/>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

let mapStateToProps = (state) => {
    return {
        app: state.app,
        answers: state.app.answers,
        questions: state.app.questions,
        audio: state.app.audio,
    }
}

let mapDispatchToPropsLite =
    {addAnswer, addQuestion, setAudio}

export default compose(
    connect(mapStateToProps, mapDispatchToPropsLite),
    withRouter
)(Container)


