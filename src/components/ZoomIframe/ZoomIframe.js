import React, {useEffect, useState, useRef} from 'react';
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import {Button, Row, Col, Layout} from "antd";
import {ModalCall} from "../Modals/ModalCall";

const Container = styled.div`
  //height: 100vh;
  //width: 100%;
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

// const Row = styled.div`
//   display: flex;
//   width: 100%;
// `;

const Video = styled.video`
  border: 1px solid blue;
  width: 100%;
  max-width: 300px;
  //height: 30%;
  margin: 5px;
`;

function ZoomIframe(props) {
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

        // socket.current.on("yourID", (id) => {
        //     setYourID(id);
        // })

        socket.current.on("yourID", (id, cb) => {
            setYourID(id);
            cb(props.user)
        })

        // socket.current.on("connect", () => {
        //     socket.current.emit("id", {id: props.user})
        // });


        socket.current.on("allUsers", (users) => {
            console.log(users)
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
            <div style={{margin: 'auto', textAlign: 'center'}}>
                <h1 style={{backgroundColor: 'yellow', textAlign: 'center', padding: '3px'}}>Входящий
                    звонок: {users[caller]} </h1>
                <Button onClick={acceptCall} size="large" style={{margin: 'auto', textAlign: 'center'}}
                        type="primary">Принять</Button>
            </div>
        )
    }
    return (
        <Container>
            {/*<h3 style={{textAlign: 'center'}}>{props.user}</h3>*/}
            {/*{if (1 === 1) ? null : null}*/}
            {(incomingCall && !callAccepted) && <ModalCall {...props} acceptCall={acceptCall} text={`Входящий звонок: ${users[caller]}`} />}
            <Row>
                {UserVideo}
                {PartnerVideo}
            </Row>
            <Row>
                {Object.entries(users).map((user, i) => {
                    // console.log(user)
                    if (user[0] === yourID) {
                        return null;
                    }
                    return (
                        <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={4} key={i}>
                            <button style={{margin: '5px', backgroundColor: 'red', color: 'white'}} type="primary"
                                    onClick={() => callPeer(user[0])}>Позвонить {user[1]}</button>
                        </Col>
                    );
                })}
            </Row>
            <Row>
                {/*{!callAccepted && incomingCall}*/}
            </Row>

        </Container>
    );
}

export default ZoomIframe