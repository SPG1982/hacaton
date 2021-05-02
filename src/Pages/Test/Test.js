import React, {useEffect, useRef} from 'react';
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import Header from "../../components/Header/Header";
import {Button, Layout} from "antd";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import styles from "../DashBoard/components/Webcam/styles.module.css";
import * as faceApi from "face-api.js";
import {sendWebCam} from "../../redux/reducers/app-reducer";


const Test = (props) => {

    const videoRef = useRef()
    const canvasRef = useRef()


    const startVideo = () => {
        console.log('Старт')
        navigator.mediaDevices.getUserMedia(
            {video:true, audio: true},
        ).then(
            (stream) => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                //setStart(true);
            }
        )
    }

    const handleVideoOnPlay = async () => {
        // console.log('Камера запущена')
        var context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0);
        // console.log(canvasRef.current.toDataURL('image/jpeg'))
        props.sendWebCam(canvasRef.current.toDataURL('image/jpeg'))
    }

    startVideo()

    return (
        <>
            <canvas ref={canvasRef} width="600px" height="400px" style={{border: '1px solid black'}}/>
            <video ref={videoRef} autoPlay muted width="600px" height="400px"
                   style={{border: '1px solid black', margin: 'auto'}}
                   // onPlay={handleVideoOnPlay}
            />
            <Button onClick={handleVideoOnPlay} >Скриншот</Button>
        </>
    )
}


const MainContainer = (props) => {
    const {Content} = Layout;
    return (
        <>
            <Header/>
            <Layout style={{height: `calc(100vh - 50px)`}}>
                <LeftSidebar {...props}/>
                <Layout>
                    <Content style={{margin: '0 16px'}}>
                        <Test {...props}/>
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
    {sendWebCam}

export default compose(
    connect(mapStateToProps, mapDispatchToPropsLite),
    withRouter
)(MainContainer)


