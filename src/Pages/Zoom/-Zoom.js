import React, {useEffect, useRef, useState} from 'react';
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import Header from "../../components/Header/Header";
import {Layout} from "antd";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import './css.css'
import Peer from 'peerjs'
import socket from "../../components/Socket/Socket";

const Zoom = (props) => {

    const videoRef = useRef()
    const videoRef2 = useRef()
    const gridRef = useRef()
    const peers = {}
    const videoRefs = useRef([]);
    let [videos, setVideos] = useState([1])

    const myPeer = new Peer(undefined, {
        host: 'video.qpuzzle.ru',
        port: '9003',
        path: '/peerjs',
        debug: 2,
    })

    //console.log(videoRef)

    useEffect(() => {

        console.log(videoRefs)
    })

    const startVideo = () => {
        console.log('Старт')
        navigator.mediaDevices.getUserMedia(
            {video: {}},
        ).then(stream => {
            addVideoStream(videoRef, stream)

            myPeer.on('call', call => {
                console.log('++++++++++++++++++ ЗВОНОК')
                call.answer(stream)
                const video = videoRef2
                call.on('stream', userVideoStream => {
                    addVideoStream(video, userVideoStream)
                })
            })

            socket.on('user-connected', userId => {
                console.log('++++++++++++++++++ ПОДКЛЮЧЕНИЕ ДРУГОГО ПОЛЬЗОВАТЕЛЯ')
                setTimeout(()=> {connectToNewUser(userId, stream)}, 100)
            })
        })
    }

    startVideo();

    socket.on('user-disconnected', userId => {
        if (peers[userId]) peers[userId].close()
    })

    myPeer.on('open', id => {
        console.log('++++++++++++++++++ ОТПРАВКА СОКЕТА')
        socket.emit('join-room', '1', id)
    })

    function connectToNewUser(userId, stream) {
        const call = myPeer.call(userId, stream)
        const video = videoRef2
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
        call.on('close', () => {
            //video2.remove()
        })

        peers[userId] = call
    }

    function addVideoStream(video, stream) {
        video.current.srcObject = stream;
        video.current.play();
        // video.addEventListener('loadedmetadata', () => {
        //     video.play()
        // })
        //gridRef.append(video)
    }


    let handleVideoOnPlay = () => {

    }


    function handleChange(i){
        //inputEl.current[i+1].focus();
        console.log(i)
    }

    return (
        <>
            <div>
                <video ref={videoRef}
                       autoPlay muted width="400px" height="300px"
                       style={{border: '1px solid black', margin: '10px auto'}}
                       onPlay={handleVideoOnPlay}
                />

                <video ref={videoRef2}
                       autoPlay muted width="400px" height="300px"
                       style={{border: '1px solid black', margin: '10px auto'}}
                       onPlay={handleVideoOnPlay}
                />

                <div ref={gridRef} id="video-grid"></div>

                <div>
                    {/*{*/}
                    {/*    videos.map((n,i)=>(*/}
                    {/*        <video*/}
                    {/*            key={i}*/}
                    {/*            autoPlay muted width="400px" height="300px"*/}
                    {/*            style={{border: '1px solid black', margin: '10px auto'}}*/}
                    {/*            ref={ref=>videoRefs.current.push(ref)}*/}
                    {/*            onChange={()=>handleChange(i)}*/}
                    {/*        />*/}
                    {/*    ))*/}
                    {/*}*/}
                </div>

            </div>
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
                        <Zoom/>
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
)(MainContainer)


