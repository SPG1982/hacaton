import React, {useEffect, useRef, useState} from 'react';
import './css.css'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Tooltip,
    ZoomControl,
    useMapEvents,
    useMap,
    useMapEvent, Circle
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
// import socket from "../../../../components/Socket/Socket";
import 'leaflet-geosearch/dist/geosearch.css';
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import {GeoSearchControl, OpenStreetMapProvider} from 'leaflet-geosearch'
import io from "socket.io-client";
import pps from "../../../../assets/images/pps.png";
import op from "../../../../assets/images/police.png";
import med from "../../../../assets/images/med.png";
import vi from "../../../../assets/images/vi.png";
import gai from "../../../../assets/images/gai.png";
import uaz from "../../../../assets/images/uaz.png";
import igps from "../../../../assets/images/gps.png";

const Map = (props) => {

    const [markers, setMarkers] = useState([]);
    const [add, setAdd] = useState(null);
    const [search, setSearch] = useState(null);
    const [mapUse, setMap] = useState()
    const socket = useRef();

    const mapRef = useRef()

    // -------------------------- Первоначальная установка GPS
    const [crd, setCrd] = useState(false);

    function success(position) {
        setCrd([position.coords.latitude, position.coords.longitude])
        socket.current.emit('GPS', {'user': 'Заявитель', 'x': position.coords.latitude, 'y': position.coords.longitude})
        //console.log('GPS')
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        alert('Местонахождение не определено');
    };

    let options = {
        enableHighAccuracy: true,
        //timeout: 1000,
        //maximumAge: 0
    };

// --------------------------Наблюдение
    let gps = () => {
        socket.current = io.connect("server-hacaton.qpuzzle.ru:9000");
        navigator.geolocation.getCurrentPosition(success, error, options);
        navigator.geolocation.watchPosition(success, error, options);
        // setInterval(() => {
        //     socket.current.emit('GPS', {'user': props.user, 'x': 1 ,  'y': 2})
        // }, 5000);

        socket.current.on('BROADCAST:GPS', (data) => {
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
        props.crime.itogText && socket.current.emit('CRIME', {'text': props.warning})
        //const map = mapRef.current;
        //mapJS = L.map('mapJS').setView([51.620972, 39.062980], 12);
    }, [props.crime.itogText])


    useEffect(()=> {
        // setInterval(()=> {
        //     console.log(mapUse)
        //     setMap(2)
        // }, 1000)
        //console.log(mapUse)
        if (mapUse) {
            console.log('itog')
            L.Routing.control({
                waypoints: [
                    L.latLng(crd[0], crd[1]),
                    L.latLng(51.65422426460938, 39.14499521255494)
                ],
                lineOptions: {
                    styles: [{color: 'blue', opacity: .5, weight: 5}]
                },
                // show: true,
                show: false,
                language: 'ru',
            }).addTo(mapUse);
        }
    }, [props.crime.itogText])

    function ChangeView({center}) {
        let map = useMap();
        map.setView(center);
        return null;
    }

    function Click() {
        const map = useMapEvent('click', (e) => {
            //map.setCenter([50.5, 30.5])
            console.log(e.latlng.lat)
        })
        return null
    }

    // let Route = () => {
    //     let map = useMap();
    //     if (!search) {
    //         L.Routing.control({
    //             waypoints: [
    //                 L.latLng(crd ? [crd[0], crd[1]] : [51.64516089823489, 39.10326004028321]),
    //                 L.latLng(51.65422426460938, 39.14499521255494)
    //             ],
    //             show: true,
    //             language: 'ru',
    //         }).addTo(map);
    //         setSearch(1)
    //     }
    //     return null
    // }

    // let Search = () => {
    //     let map = useMap();
    //     if (!search) {
    //         const provider = new OpenStreetMapProvider();
    //          provider.search({query: 'Воронеж, Патриотов 53'}).then(function (result) {
    //              console.log(result)
    //          });
    //
    //         const searchControl = new GeoSearchControl({
    //             provider: provider,
    //             style: 'button'
    //         });
    //         map.addControl(searchControl);
    //         setSearch(1)
    //     }
    //     return null
    // }

    let iconPps = L.icon({
        iconUrl: pps,
        shadowUrl: null,

        iconSize:     [50, 50], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [25, 0] // point from which the popup should open relative to the iconAnchor
    });

    let iconGps = L.icon({
        iconUrl: igps,
        iconSize:     [50, 50], // size of the icon
        iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
    });


    let iconOp = L.icon({
        iconUrl: op,
        iconSize:     [100, 31], // size of the icon
        iconAnchor:   [50, 15], // point of the icon which will correspond to marker's location
        popupAnchor: [50, 15],
    });


    let iconMed = L.icon({
        iconUrl: med,
        iconSize:     [50, 50], // size of the icon
        iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
    });


    let iconVi = L.icon({
        iconUrl: vi,
        iconSize:     [50, 78], // size of the icon
        iconAnchor:   [25, 39], // point of the icon which will correspond to marker's location
    });


    let iconGai = L.icon({
        iconUrl: gai,
        iconSize:     [50, 76], // size of the icon
        iconAnchor:   [25, 38], // point of the icon which will correspond to marker's location
    });


    let iconUaz = L.icon({
        iconUrl: uaz,
        iconSize:     [50, 38], // size of the icon
        iconAnchor:   [25, 19], // point of the icon which will correspond to marker's location
    });

    let ready = (map) => {

        //console.log(mapUse)
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
        //         L.latLng([51.64516089823489, 39.10326004028321]),
        //         L.latLng(51.65422426460938, 39.14499521255494)
        //     ],
        //     // show: true,
        //     lineOptions: {
        //         styles: [{color: 'blue', opacity: .5, weight: 5}]
        //     },
        //     show: false,
        //     language: 'ru',
        // }).addTo(map);



        L.marker([51.64171, 39.08685], {icon: iconPps}).addTo(map);
        L.marker([51.65422426460938, 39.14499521255494], {icon: iconOp}).addTo(map);
        L.marker([51.644135621894044, 39.13347244262696], {icon: iconMed}).addTo(map);
        L.marker([51.63171, 39.07685], {icon: iconVi}).addTo(map);
        L.marker([51.67006000219596, 39.12797927856446], {icon: iconGai}).addTo(map);
        L.marker([51.5484166846177, 39.08660888671876], {icon: iconUaz}).addTo(map);
        L.marker([51.65067302553889, 39.064464569091804], {icon: iconUaz}).addTo(map);
        L.marker([51.683465639557696, 39.1190528869629], {icon: iconUaz}).addTo(map);


    }


// ----------------------
    return (
        <>
            <h2 style={{textAlign: 'center'}}>Интерактивная карта</h2>
            <MapContainer
                id="mapJS"
                // key={JSON.stringify([crd[0], crd[1]])}
                className='mapGps'
                center={crd ? [crd[0], crd[1]] : [51.64516089823489, 39.10326004028321]} zoom={12} zoomControl={true}
                scrollWheelZoom={true}
                whenCreated={(map)=> {ready(map); setMap(map)}}
                //ref={(map)=>ready(map)}
                //ref={mapRef}
            >
                <ChangeView center={crd ? [crd[0], crd[1]] : [51.64516089823489, 39.10326004028321]}/>
                <Click/>
                <Circle center={crd ? [crd[0], crd[1]] : [51.64516089823489, 39.10326004028321]} pathOptions={{fillColor: 'red'}}
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

                <Marker icon={iconGps} position={crd ? [crd[0], crd[1]] : [51.63171, 39.07685]}>
                    {/*<Popup>*/}
                    {/*    Нажатие*/}
                    {/*</Popup>*/}
                    <Tooltip permanent direction='top'>
                        Вы здесь
                    </Tooltip>
                </Marker>
            </MapContainer>
        </>
    )
}

export default Map


