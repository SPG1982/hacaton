import React, {useEffect, useState, useRef} from 'react';
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import {Button, Layout} from "antd";
import Header from "../../components/Header/Header";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const Container = styled.div`
  //height: 100vh;
  //width: 100%;
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
  margin: 5px;
`;

function Zoom(props) {
    const [yourID, setYourID] = useState("");
    const [users, setUsers] = useState({});
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);

    const userVideo = useRef();
    const partnerVideo = useRef();
    const socket = useRef();

    useEffect(() => {
        socket.current = io.connect("server-hacaton.qpuzzle.ru:9000");
        navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(stream => {
            setStream(stream);
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        })

        socket.current.on("yourID", (id, cb) => {
            setYourID(id);
            cb(props.user)
        })

        // socket.current.on("connect", () => {
        //     socket.current.emit("id", {id: props.user})
        // });


        socket.current.on("allUsers", (users) => {
            //console.log('allUsers' + users)
            setUsers(users);
        })

        socket.current.on("hey", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
        })

    }, []);

    function callPeer(id) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            config: {
                iceServers: [
                    {
                        urls: "stun:numb.viagenie.ca",
                        username: "1@gmail.com",
                        credential: "1"
                    },
                    {
                        urls: "turn:numb.viagenie.ca",
                        username: "1@gmail.com",
                        credential: "1"
                    }
                ]
            },
            stream: stream,
        });

        peer.on("signal", data => {
            socket.current.emit("callUser", {userToCall: id, signalData: data, from: yourID})
        })

        peer.on("stream", stream => {
            if (partnerVideo.current) {
                partnerVideo.current.srcObject = stream;
            }
        });

        socket.current.on("callAccepted", signal => {
            setCallAccepted(true);
            peer.signal(signal);
        })

    }

    function acceptCall() {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });
        peer.on("signal", data => {
            socket.current.emit("acceptCall", {signal: data, to: caller})
        })

        peer.on("stream", stream => {
            partnerVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
    }

    let UserVideo;
    if (stream) {
        UserVideo = (
            <Video playsInline muted ref={userVideo} autoPlay/>
        );
    }

    let PartnerVideo;
    if (callAccepted) {
        PartnerVideo = (
            <Video playsInline ref={partnerVideo} autoPlay/>
        );
    }

    let incomingCall;
    if (receivingCall) {
        incomingCall = (
            <div>
                <h1>Входящий звонок: {caller} </h1>
                <Button onClick={acceptCall} type="primary">Принять</Button>
            </div>
        )
    }
    return (
        <Container>
            <h3 style={{textAlign: 'center'}}>{props.user}</h3>
            <Row>
                {UserVideo}
                {PartnerVideo}
            </Row>
            <Row>
                {Object.entries(users).map((user, i) => {
                    console.log(user)
                    if (user[0] === yourID) {
                        return null;
                    }
                    return (
                        <Button style={{margin: '5px'}} key={i} type="primary"
                                onClick={() => callPeer(user[0])}>Позвонить {user[1]}</Button>
                    );
                })}
            </Row>
            <Row>
                {incomingCall}
            </Row>
        </Container>
    );
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
                        <Zoom {...props}/>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

let mapStateToProps = (state) => {
    return {
        app: state.app,
        user: state.app.user,
    }
}

let mapDispatchToPropsLite =
    {}

export default compose(
    connect(mapStateToProps, mapDispatchToPropsLite),
    withRouter
)(MainContainer)