import React, {useEffect, useRef, useState} from 'react';
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import Header from "../../components/Header/Header";
import {Col, Layout, Row} from "antd";
import './css.css'
import 'leaflet/dist/leaflet.css'
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import {Circle, MapContainer, Marker, TileLayer, Tooltip, useMap, useMapEvent} from "react-leaflet";
import L from 'leaflet'
import 'leaflet-geosearch/dist/geosearch.css';
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import {GeoSearchControl, OpenStreetMapProvider} from 'leaflet-geosearch'
import {
    addAnswer,
    addQuestion,
    setAudio,
    setModalCall,
    setModalInfo,
    setUser,
    setWarning
} from "../../redux/reducers/app-reducer";
// import socket from "../../components/Socket/Socket";
import {ModalInfo} from "../../components/Modals/ModalInfo";
import io from "socket.io-client";
import ZoomIframe from "../../components/ZoomIframe/ZoomIframe";
import {ModalCall} from "../../components/Modals/ModalCall";
import pps from '../../assets/images/pps.png'
import op from '../../assets/images/police.png'
import med from '../../assets/images/med.png'
import vi from '../../assets/images/vi.png'
import gai from '../../assets/images/gai.png'
import uaz from '../../assets/images/uaz.png'


const Police = (props) => {
    //console.log(pps)
    const [markers, setMarkers] = useState([]);
    const [add, setAdd] = useState(null);
    const [search, setSearch] = useState(null);
    const [modal, setModal] = useState(false);
    const socket = useRef();
    const [crd, setCrd] = useState(false);
    const [mapUse, setMap] = useState(null)

    let mapRef = useRef()

    // -------------------------- Первоначальная установка GPS

    function success(position) {
        setCrd([position.coords.latitude, position.coords.longitude])
        socket.current.emit('GPS', {'user': props.user, 'x': position.coords.latitude, 'y': position.coords.longitude})
        //console.log('GPS')
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        //alert('Местонахождение не определено');
    };

    let options = {
        enableHighAccuracy: true,
        //timeout: 1000,
        //maximumAge: 10000
    };

    let setUser = (e) => {
        console.log(e.target.value)
        props.setUser(e.target.value)
    }

// --------------------------Наблюдение
    let gps = () => {
        socket.current = io.connect("server-hacaton.qpuzzle.ru:9000");
        navigator.geolocation.getCurrentPosition(success, error, options);
        navigator.geolocation.watchPosition(success, error, options);
        // setInterval(() => {
        //
        // }, 1000);

        socket.current.on('BROADCAST:CRIME', (data) => {
            console.log('Сообщение Сокета о warning: ' + data.text)
            if (!props.warning) {
                props.setWarning(data.text)
                props.setModalInfo(true)
            }
        })


        socket.current.on('BROADCAST:GPS', (data) => {
            //console.log('Сообщение Сокета: ' + data.user)

            function isUser(string) {
                if (string['user'] == data.user) {
                    return true;
                }
            }

            if (!markers.some(isUser)) {
                //console.log('В массив добавлен: ' + data.user)
                markers.push({user: data.user, x: data.x, y: data.y});
                //console.log(markers);
            } else {
                let markers_new = markers.map(m => {
                    if (m['user'] === data.user) {
                        return {...m, x: data.x, y: data.y}
                    } else return m
                })
                setMarkers(markers_new)
                //console.log('Изменение положения', markers);
            }
        })

    }

    useEffect(gps, [])

    L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.7.1/dist/images/"

    useEffect(() => {
        //const map = mapRef.current;
        //mapJS = L.map('mapJS').setView([51.620972, 39.062980], 12);
    })

    function ChangeView({center}) {
        let map = useMap();
        map.setView(center);
        return null;
    }

    function Click() {
        const map = useMapEvent('click', (e) => {
            //map.setCenter([50.5, 30.5])
            console.log('Lat ' + e.latlng.lat)
            console.log('Lng ' + e.latlng.lng)
        })
        return null
    }

    let Route = () => {
        let map = useMap();
        if (!search) {
            // L.Routing.control({
            //     waypoints: [
            //         L.latLng(51.620972, 39.062980),
            //         L.latLng(51.6, 39.06)
            //     ],
            //     show: true,
            //     language: 'ru',
            // }).addTo(map);
            setSearch(1)
        }
        return null
    }

    let Search = () => {
        let map = useMap();
        console.log(map)
        if (!search) {
            // const provider = new OpenStreetMapProvider();
            // provider.search({query: 'Воронеж, Патриотов 53'}).then(function (result) {
            //     console.log(result)
            // });
            //
            // const searchControl = new GeoSearchControl({
            //     provider: provider,
            //     // style: 'bar',
            //     style: 'button',
            //     searchLabel: 'Введите адрес',
            //     notFoundMessage: 'Не найдено',
            //     // position: 'topcenter',
            //     showMarker: true,
            //     selected: 0,
            // });
            // map.addControl(searchControl);
            setSearch(1)
        }
        return null
    }

    let ready = (map) => {
        setMap(map)
        console.log(mapUse)
        const provider = new OpenStreetMapProvider();
        provider.search({query: 'Воронеж, Патриотов 53'}).then(function (result) {
            // console.log(result)
        });

        const searchControl = new GeoSearchControl({
            provider: provider,
            // style: 'bar',
            style: 'button',
            searchLabel: 'Введите адрес',
            notFoundMessage: 'Не найдено',
            // position: 'topcenter',
            showMarker: true,
            selected: 0,
        });
        map.addControl(searchControl);

        // L.Routing.control({
        //     waypoints: [
        //         L.latLng(51.620972, 39.062980),
        //         L.latLng(51.6, 39.06)
        //     ],
        //     show: true,
        //     language: 'ru',
        // }).addTo(map);

        let iconPps = L.icon({
            iconUrl: pps,
            shadowUrl: null,

            iconSize:     [50, 50], // size of the icon
            shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [25, 0] // point from which the popup should open relative to the iconAnchor
        });
        L.marker([51.64171, 39.08685], {icon: iconPps}).addTo(map);

        let iconOp = L.icon({
            iconUrl: op,
            iconSize:     [100, 31], // size of the icon
            iconAnchor:   [50, 15], // point of the icon which will correspond to marker's location
        });
        L.marker([51.65422426460938, 39.14499521255494], {icon: iconOp}).addTo(map);

        let iconMed = L.icon({
            iconUrl: med,
            iconSize:     [50, 50], // size of the icon
            iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
        });
        L.marker([51.644135621894044, 39.13347244262696], {icon: iconMed}).addTo(map);

        let iconVi = L.icon({
            iconUrl: vi,
            iconSize:     [50, 78], // size of the icon
            iconAnchor:   [25, 39], // point of the icon which will correspond to marker's location
        });
        L.marker([51.63171, 39.07685], {icon: iconVi}).addTo(map);

        let iconGai = L.icon({
            iconUrl: gai,
            iconSize:     [50, 76], // size of the icon
            iconAnchor:   [25, 38], // point of the icon which will correspond to marker's location
        });
        L.marker([51.67006000219596, 39.12797927856446], {icon: iconGai}).addTo(map);

        let iconUaz = L.icon({
            iconUrl: uaz,
            iconSize:     [50, 38], // size of the icon
            iconAnchor:   [25, 19], // point of the icon which will correspond to marker's location
        });
        L.marker([51.5484166846177, 39.08660888671876], {icon: iconUaz}).addTo(map);
        L.marker([51.65067302553889, 39.064464569091804], {icon: iconUaz}).addTo(map);
        L.marker([51.683465639557696, 39.1190528869629], {icon: iconUaz}).addTo(map);


    }

// ----------------------
    return (
        <>
            <Row style={{margin: '5px'}}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
                    <h2 style={{textAlign: 'center'}}>НАРЯДЫ</h2>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8} style={{margin: 'auto', textAlign: 'center'}}>
                    <input style={{textAlign: 'center', width: '60%', margin: 'auto', fontSize: '18px'}}
                           onChange={(e) => {
                               setUser(e)
                           }} value={props.user}/>
                </Col>
            </Row>
            <ModalInfo {...props } warningText={props.warning} />

            <MapContainer
                id="mapJS"
                className='mapGpsPolice'
                center={crd ? [crd[0], crd[1]] : [51.64516089823489, 39.10326004028321]} zoom={12} zoomControl={true}
                scrollWheelZoom={true}
                // whenReady={(map)=> {ready(map)}}
                whenCreated={(map)=> {ready(map)}}
            >
                <ChangeView center={crd ? [crd[0], crd[1]] : [51.64516089823489, 39.10326004028321]}/>
                <Click/>
                <Circle center={crd ? [crd[0], crd[1]] : [51.64516089823489, 39.10326004028321]} pathOptions={{fillColor: 'blue'}}
                        radius={200}/>
                {/*<Route/>*/}
                {/*<Search/>*/}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                {markers.map(marker => {
                    return (
                        <Marker key={marker.user} position={[marker.x, marker.y]}>
                            {/*{console.log('x и y: ', marker.x, marker.y)}*/}
                            <Tooltip permanent direction='top'>
                                {marker.user}
                            </Tooltip>
                        </Marker>
                    )
                })
                }

                <Marker position={crd ? [crd[0], crd[1]] : [51.63171, 39.07685]}>
                    {/*<Popup>*/}
                    {/*    Нажатие*/}
                    {/*</Popup>*/}
                    <Tooltip permanent direction='top'>
                        {props.user}
                    </Tooltip>
                </Marker>
                {/*{false && <ModalInfo  />}*/}
            </MapContainer>
        </>
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
                    <Content style={{margin: '0 16px'}}>
                        <Police {...props}/>
                        <ZoomIframe {...props}/>
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
        modalInfo: state.app.modalInfo,
        modalCall: state.app.modalCall,
        warning: state.app.warning
    }
}

let mapDispatchToPropsLite =
    {addAnswer, addQuestion, setAudio, setUser, setModalInfo, setModalCall, setWarning}


export default compose(
    connect(mapStateToProps, mapDispatchToPropsLite),
    withRouter
)(Container)
