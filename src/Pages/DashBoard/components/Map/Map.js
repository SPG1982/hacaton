import React, {useEffect, useRef, useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import styles from './styles.module.css'
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
import 'leaflet-geosearch/dist/geosearch.css';
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import {GeoSearchControl, OpenStreetMapProvider} from 'leaflet-geosearch'


const Map = (props) => {

    const [markers, setMarkers] = useState([]);
    const [add, setAdd] = useState(null);
    const [search, setSearch] = useState(null);

    let mapJS

    const mapRef = useRef()

    // -------------------------- Первоначальная установка GPS
    const [crd, setCrd] = useState(false);

    function success(position) {
        setCrd([position.coords.latitude, position.coords.longitude])
        // socket.emit('GPS', {'fio': props.fio, 'x': position.coords.latitude, 'y': position.coords.longitude})
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
        navigator.geolocation.getCurrentPosition(success, error, options);
        navigator.geolocation.watchPosition(success, error, options);
        // setInterval(() => {
        //     socket.emit('GPS', {'fio': props.fio, 'x': 1 ,  'y': 2})
        // }, 5000);
        //props.getQuests(props.activePage)
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
            console.log(e.latlng.lat)
        })
        return null
    }

    let Route = () => {
        let map = useMap();
        if (!search) {
            L.Routing.control({
                waypoints: [
                    L.latLng(51.620972, 39.062980),
                    L.latLng(51.6, 39.06)
                ],
                show: false
            }).addTo(map);

        }
        return null
    }

    let Search = () => {
        let map = useMap();
        if (!search) {
            const provider = new OpenStreetMapProvider();

             provider.search({query: 'Воронеж, Патриотов 53'}).then(function (result) {
                 console.log(result)
             });

            const searchControl = new GeoSearchControl({
                provider: provider,
                style: 'bar'
            });
            map.addControl(searchControl);
            setSearch(1)
        }
        return null
    }

    // mapJS = useMap()
    // L.Routing.control({
    //     waypoints: [
    //         L.latLng(51.620972, 39.062980),
    //         L.latLng(51.6, 39.06)
    //     ]
    // }).addTo(mapJS);


// ----------------------
    return (
        <>
            {console.log('render')}
            <h2 style={{textAlign: 'center'}}>Местоположение нарядов</h2>
            <MapContainer
                id="mapJS"
                // key={JSON.stringify([crd[0], crd[1]])}
                className='mapGps'
                center={crd ? [crd[0], crd[1]] : [51.63171, 39.07685]} zoom={15} zoomControl={true}
                scrollWheelZoom={true}
                // ref={mapRef}
            >
                <ChangeView center={crd ? [crd[0], crd[1]] : [51.63171, 39.07685]}/>
                <Click/>
                <Circle center={crd ? [crd[0], crd[1]] : [51.63171, 39.07685]} pathOptions={{fillColor: 'red'}}
                        radius={200}/>
                <Route/>
                <Search/>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                {/*{markers.map(marker => {*/}
                {/*    return (*/}
                {/*        <Marker key={marker.fio} position={[marker.x, marker.y]}>*/}
                {/*            /!*{console.log('x и y: ', marker.x, marker.y)}*!/*/}
                {/*            <Tooltip permanent direction='top'>*/}
                {/*                /!*{marker.fio}*!/*/}
                {/*            </Tooltip>*/}
                {/*        </Marker>*/}
                {/*    )*/}
                {/*})*/}
                {/*}*/}
                <Marker position={crd ? [crd[0], crd[1]] : [51.63171, 39.07685]}>
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


