import React, {useEffect, useRef, useState} from 'react';
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import styles from './styles.module.css'
import {Button, Col, Row} from "antd";
import dej from "../../../../assets/images/dej.jpg";
import {useSpeechRecognition, useSpeechSynthesis} from "react-speech-kit";

const Photo = (props) => {
    // console.log(props)
    const lang = 'ru-RU'
    const SOUNDS_URL = process.env.PUBLIC_URL + '/sounds';

    const audioRef = useRef()
    let newAnswer = ''
    const [voiceIndex, setVoiceIndex] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState(1);
    const [answers, setAnswers] = useState([]);
    const [lastAnswer, setLastAnswer] = useState('');
    const [answer, setAnswer] = useState('');
    const [blocked, setBlocked] = useState(false);

    const {speak, speaking, voices} = useSpeechSynthesis({
        onEnd: () => {
            //stop()
            //console.log('On_END Speech')
            listen({interimResults: true, continuous: true, lang});
            console.log('Запуск распознавания')
        }
    });

    const voice = voices[voiceIndex] || null;

    const onError = (event) => {
        if (event.error === 'not-allowed') {
            setBlocked(true);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (answer && (lastAnswer === answer)) {
                setTimeout(stop, 100)
                console.log('Остановка распознавания')
                props.addAnswer(answer)
                props.audio === 'sound' ? playSound('2.mp3') : sayText(questions[2])
                setAnswer('')
            } else {
                //console.log('Ответ ' + answer, 'Старый ответ: ' + lastAnswer)
                setLastAnswer(answer)
            }
        }, 1000)
        return () => clearInterval(intervalId);
    }, [answer, lastAnswer])


    const {listen, listening, stop} = useSpeechRecognition({
        onResult: (result) => {
            setAnswer(result)
        },
        onError,
    });

    function playSound(url) {
        audioRef.current.src = SOUNDS_URL + '/' + url
        audioRef.current.play()
        props.addQuestion('Вопрос')
        audioRef.current.onended = () => {
            listen({interimResults: true, continuous: true, lang});
            console.log('Запуск распознавания')
        };
    }


    let dialog = new Map([])

    let words = new Map([
        ['Назовите фамилию, имя, отчество', 'распознавание речи работает'],
        ['фамилия', 'Щербакова'],
    ])

    useEffect(() => {
        setQuestions(['Назовите фамилию, имя, отчество',
            'Что произошло?',
            'Когда это произошло?'
        ])
    }, [])

    let sayText = (text) => {
        stop()
        props.addQuestion(text)
        speak({text, voice})
    }

    //useEffect(sayText, [answer])


    return (
        <>
            <h2 style={{textAlign: 'center'}}>Видеопоток дежурной части</h2>
            <div
                style={{
                    margin: 'auto',
                    backgroundImage: `url(${dej})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: '300px',
                    width: '100%',
                    // width: '500px'
                }}
            >
                <audio id='sound' ref={audioRef}></audio>

                <div style={{width: "75%", margin: "auto", fontSize: '20px', textAlign: 'center'}}>
                    <Button style={{margin: '10px auto', fontSize: '20px'}} type="primary" disabled={blocked}
                            size="large" onClick={() => {
                        (props.audio === 'sound') ? playSound('1.mp3') : sayText(questions[1])
                    }}>
                        {listening ? <div>Идет распознавание речи</div> : <div>Обратиться к дежурному</div>}
                    </Button>
                    {/*{listening && <div>*/}
                    {/*    <div style={{backgroundColor: "white", marginTop: '150px'}}>...</div>*/}
                    {/*    <br></br></div>*/}
                    {/*}*/}
                    {!listening & !speaking
                        ? <div style={{
                            backgroundColor: "white",
                            textAlign: 'center',
                            padding: '5px',
                            marginTop: '100px'
                        }}>Дежурная часть
                        </div>
                        : null
                    }
                    {listening && <div style={{marginTop: '120px'}}>
                        <div style={{backgroundColor: 'red', color: 'white'}}>Вопрос: {questions[1]}</div>
                        <div style={{backgroundColor: 'blue', color: 'white'}}>Ответ: {answer}</div>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Photo


