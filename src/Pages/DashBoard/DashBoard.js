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
import {
    addAnswer,
    addQuestion,
    setAudio,
    setCrime,
    setModalDialog, setModalInfo, setPredSostav,
    setUser,
    setWarning
} from "../../redux/reducers/app-reducer";
import BrainIframe from "../../components/BrainIframe/BrainIframe";
import {ModalDialog} from "../../components/Modals/ModalDialog";

const DashBoard = (props) => {
    //console.log(props)

    let setAudio = (type) => {
        props.setAudio(type)
    }


    return (
        <div style={{marginTop: '10px'}}>
            <div style={{display: "flex", justifyContent: 'space-around', textAlign: 'center'}}>
                <button onClick={()=> {setAudio('speech')}} style={{backgroundColor: (props.audio === 'speech') ? 'blue' : 'black', color: 'white', fontSize: '18px'}}>Синтезатор голоса</button>
                <button onClick={()=> {setAudio('sound')}} style={{backgroundColor: (props.audio === 'sound') ? 'blue' : 'black', color: 'white', fontSize: '18px'}}>Записанные голоса</button>
            </div>
            <BrainIframe {...props}/>
            <Row>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
                    <Photo {...props}/>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
                    <Webcam {...props}/>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
                    <Map {...props}/>
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
            <Layout style={{minHeight: `calc(100vh - 50px)`}}>
                <LeftSidebar {...props}/>
                <Layout>
                    <Content style={{margin: '10px 10px 10px 10px'}}>
                        {/*<DashBoard {...props}/>*/}
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
        user: state.app.user,
        warning: state.app.warning,
        crime: state.app.crime,
        modalDialog: state.app.modalDialog,
        modalInfo: state.app.modalInfo,
        predSostav: state.app.predSostav

    }
}

let mapDispatchToPropsLite =
    {addAnswer, addQuestion, setAudio, setUser, setWarning, setCrime, setModalDialog, setPredSostav, setModalInfo}

export default compose(
    connect(mapStateToProps, mapDispatchToPropsLite),
    withRouter
)(Container)


