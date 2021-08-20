import React, {useState} from "react";
import GaugeChart from "react-gauge-chart";
import {useSpeechRecognition, useSpeechSynthesis} from "react-speech-kit";

const Chart = (props) => {
    const data = props.data;
    const label = data.label;
    //const percent = data.confidence;
    //console.log(data);
    const confidence = parseFloat(data.confidence.toFixed(2));
    const [img, setImg] = useState('No');
    const MODEL_URL = process.env.PUBLIC_URL + '/images/';

    const lang = 'ru-RU'
    const [voiceIndex, setVoiceIndex] = useState(null);
    const [answer, setAnswer] = useState('');

    const {speak, speaking, voices} = useSpeechSynthesis({
        onEnd: () => {
            setImg('No')
            //stop()
            //console.log('On_END Speech')
            //listen({interimResults: true, continuous: true, lang});
            //console.log('Запуск распознавания')
        }
    });

    const voice = voices[voiceIndex] || null;

    const [blocked, setBlocked] = useState(false);

    const onError = (event) => {
        if (event.error === 'not-allowed') {
            setBlocked(true);
        }
    };

    // const {listen, listening, stop} = useSpeechRecognition({
    //     onResult: (result) => {
    //         setAnswer(result)
    //     },
    //     onError,
    // });

    let sayText = (text) => {
        // stop()
        speak({text, voice})
    }

    if (confidence == 1) {
        if (!speaking) {
            setImg(label)
            sayText(label)
        }

    }

    return (
        <>
            <div>
                <h2 style={{textAlign: "center"}}>Предмет классфицирован: {label + ' ' + confidence}</h2>
                <div style={{maxWidth: '300px', textAlign: "center", margin: 'auto'}}>
                    <GaugeChart
                        style={{color: 'black'}}
                        textColor="black"
                        id="gauge-chart3"
                        nrOfLevels={3}
                        colors={["#FF5F6D", "#FFC371", "rgb(26 202 26)"]}
                        arcWidth={0.3}
                        percent={confidence}
                    />
                </div>
            </div>
            <div style={{textAlign: 'center'}}>
                <img width="100px" height="100px" src={MODEL_URL + img + '.jpg'}/>
            </div>

        </>
    );
};
export default Chart;
