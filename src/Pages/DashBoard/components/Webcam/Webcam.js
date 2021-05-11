import React, {useEffect, useRef, useState} from 'react';
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import styles from './styles.module.css'
import * as faceApi from "face-api.js";
import useInterval from "@use-it/interval";
import ml5 from "ml5";

let classifier = 1

const Webcam = (props) => {
    const [Init, setInit] = useState(false);
    const [find, setFind] = useState(false);
    const [faceMatcher, setfaceMatcher] = useState({});
    const [isMounted, setMounted] = useState(true)
    const [start, setStart] = useState(false);
    const [result, setResult] = useState([]);
    const [resultTranslate, setResultTranslate] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const videoRef = useRef()
    const canvasRef = useRef()
    const contRef = useRef()
    // let interval


    const MODEL_URL = process.env.PUBLIC_URL + '/modelstf';

    let widthVideo = 400
    let heightVideo = 300

    useEffect(() => {
        //classifier = ml5.imageClassifier(MODEL_URL + "/model.json", ()=> {setLoaded(true)})
        //classifier = ml5.imageClassifier('MobileNet', ()=> {setLoaded(true)})


        const loadModels = async () => {
            // startVideo()
            const MODEL_URL = process.env.PUBLIC_URL + '/facesApi/models';
            Promise.all([
                faceApi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceApi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceApi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceApi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
                faceApi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
                faceApi.nets.ageGenderNet.loadFromUri(MODEL_URL)
            ]).then(startVideo).then(() => setInit(false));
        }
        loadModels();

        return () => {
            setMounted(false)
            clearInterval(interval)
            console.log('Размонтирование')
        }

        // startVideo()

    }, [])


    useInterval(() => {
        // console.log('Интервал TF')
        // console.log(classifier)
        if (classifier && loaded && start) {
            classifier.classify(videoRef.current, (error, results) => {
                if (error) {
                    console.error(error);
                    return;
                }
                setResult(results);
                setResultTranslate(results[0].label)
                // translate(result[0].label)
                console.log(results)
            });
        }
    }, 1000);

    const startVideo = () => {
        console.log('Старт')
        navigator.mediaDevices.getUserMedia(
            {video: {}},
        ).then(
            (stream) => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                setStart(true);
            }
        )
    }


    const handleVideoOnPlay = async () => {
        const labeledFaceDescriptors = await loadLabeledImages();
        //console.log('Обучение модели прошло')
        const faceMatcher = new faceApi.FaceMatcher(labeledFaceDescriptors, 0.5);
        setfaceMatcher(faceMatcher)
        setInit(true)
        canvasRef.current.innerHTML = faceApi.createCanvasFromMedia(videoRef.current)
        widthVideo = document.querySelector('#containerVideo').offsetWidth
        heightVideo = document.querySelector('#containerVideo').offsetHeight - 6
        faceApi.matchDimensions(canvasRef.current, {width: widthVideo, height: heightVideo});
        interval(faceMatcher)
    }


    useInterval(() => {
         if (Init && isMounted) {
            interval()
        }

    }, 100)


    async function interval() {
        const detections = await faceApi.detectAllFaces(videoRef.current, new faceApi.TinyFaceDetectorOptions()).withFaceLandmarks().withAgeAndGender().withFaceExpressions().withFaceDescriptors();
        const resizedDetections = faceApi.resizeResults(detections, {width: widthVideo, height: heightVideo});

        if (Init && isMounted && canvasRef.current) {
            canvasRef.current.getContext('2d').clearRect(0, 0, widthVideo, heightVideo);
            faceApi.draw.drawDetections(canvasRef.current, resizedDetections);
            faceApi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
            faceApi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
            //faceApi.draw.draw(canvasRef.current, resizedDetections);

            //console.log(faceMatcher)
            const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor));
            results.forEach((result, i) => {
                const box = resizedDetections[i].detection.box;
                const drawBox = new faceApi.draw.DrawBox(box, {label: result.toString()});
                drawBox.draw(canvasRef.current);
                if (word(result.toString()) !== 'unknown') {
                    //console.log(word(result.toString()));
                    //setFind('Смагин Павел')
                    setFind(word(result.toString()))
                }

                function word(str) {
                    let ars = str.replace(/[^a-zA-ZА-Яа-яЁё]/gi, '').replace(/\s+/gi, ', ');
                    //return ars;
                    return str.replace(/[^a-zа-яё_]/gi, '').trim()
                }
            })
        }
    }


    // function translate(text) {
    //     fetch("https://microsoft-translator-text.p.rapidapi.com/translate?to=%3CREQUIRED%3E&api-version=3.0&profanityAction=NoAction&textType=plain", {
    //         "method": "POST",
    //         "headers": {
    //             "content-type": "application/json",
    //             "x-rapidapi-key": "9a92908cebmsh1422a3f512b2141p19bb8bjsnb1518ff51a72",
    //             "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com"
    //         },
    //         "body": [
    //             {
    //                 "Text": text
    //             }
    //         ]
    //     })
    //         .then(response => {
    //             console.log(response);
    //             setResultTranslate(response)
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         });
    // }




function loadLabeledImages() {
    //const labels = ['Smagin', 'Shestakov', 'Pahomova', 'Sarkisov', 'Efimov', 'Popov']
    const labels = ['Smagin', 'Efimov']
    return Promise.all(
        labels.map(async label => {
            let descriptions = [];
            for (let i = 1; i <= 3; i++) {
                const img = await faceApi.fetchImage(process.env.PUBLIC_URL + '/facesApi/labeledImages/' + label + '/' + i + '.jpg');
                //const img = await faceapi.fetchImage(`labeled_images/${label}/${i}.jpg`);
                const detections = await faceApi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
                descriptions.push(detections.descriptor);
                //console.log(descriptions)
            }
            return new faceApi.LabeledFaceDescriptors(label, descriptions);

        })
    )
}

// ----------------------
return (
    <>
        {Init ? <h2 style={{textAlign: 'center'}}>Модуль камеры запущен</h2> :
            <h2 style={{textAlign: 'center'}}>Активация модуля распознавания</h2>}


        <div className={styles.displayFlex + ' ' + styles.justifyCenter}
             style={{textAlign: 'center'}}>
            <div ref={contRef} id="containerVideo" style={{width: '400px', height: '100%', position: 'relative'}}>

                {!find && <div style={{
                    padding: '3px',
                    // marginTop: '5px',
                    position: 'absolute',
                    width: '100%',
                    // borderRadius: '10px',
                    backgroundColor: 'Orange',
                    color: 'black',
                    fontSize: '20px'
                }}>Идентификация...</div>}
                {find && <div style={{
                    padding: '3px',
                    // marginTop: '5px',
                    // borderRadius: '10px',
                    position: 'absolute',
                    width: '100%',
                    backgroundColor: 'greenYellow',
                    color: 'black',
                    fontSize: '18px'
                }}>Личность установлена: {find}</div>}
                {result.length > 0 && <div style={{
                    padding: '3px',
                    // marginTop: '5px',
                    // borderRadius: '10px',
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    backgroundColor: 'greenYellow',
                    color: 'black',
                    fontSize: '18px'
                }}>На видео обнаружено: {resultTranslate}</div>}

                <canvas ref={canvasRef} width="100%" height="100%" className={styles.absolute}/>
                <video ref={videoRef} autoPlay muted width="100%" height="100%"
                       style={{border: '1px solid black', margin: 'auto'}}
                       onPlay={handleVideoOnPlay}
                />

            </div>

        </div>
    </>
)
}

export default Webcam


