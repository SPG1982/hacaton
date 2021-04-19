import React, {useEffect, useRef, useState} from 'react';
import dej from "../../../../assets/images/dej.jpg";
import {useSpeechRecognition, useSpeechSynthesis} from "react-speech-kit";
import {ModalDialog} from "../../../../components/Modals/ModalDialog";

const Photo = (props) => {
    // console.log(props)
    const lang = 'ru-RU'
    const SOUNDS_URL = process.env.PUBLIC_URL + '/sounds';

    const audioRef = useRef()
    const [voiceIndex, setVoiceIndex] = useState(null);
    const [questions, setQuestions] = useState({});
    const [question, setQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [lastAnswer, setLastAnswer] = useState('');
    const [answer, setAnswer] = useState('');
    const [blocked, setBlocked] = useState(false);
    const [questionBlock, setQuestionBlock] = useState('база');

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
            if (question === 4 && !answer) {
                props.setModalDialog(true)
            }
            if (answer && (lastAnswer === answer)) {
                console.log(question)
                if (question !== 4) {
                    props.setModalDialog(false)
                    setTimeout(stop, 100)
                    console.log('Остановка распознавания')
                    props.addAnswer(answer)
                    props.audio === 'sound' ? playSound(question + '.mp3') : sayText(questions.база[question].question)
                    setAnswer('')
                } else {
                    if (answer.indexOf('ответ закончен') !== -1 || answer.indexOf('ответ закончил') !== -1 || props.modalDialog == false) {
                        console.log('1111')
                        props.setModalDialog(false)
                        props.addAnswer(answer)
                        props.audio === 'sound' ? playSound(question + '.mp3') : sayText(questions.база[question].question)
                        setAnswer('')
                    }
                }
            } else {
                setLastAnswer(answer)
            }
        }, 1000)
        return () => clearInterval(intervalId);
    }, [answer, lastAnswer, props.modalDialog])


    const {listen, listening, stop} = useSpeechRecognition({
        onResult: (result) => {
            setAnswer(result)
        },
        onError,
    });

    function playSound(url) {
        audioRef.current.src = SOUNDS_URL + '/' + url
        audioRef.current.play()
        props.addQuestion(questions.база[question].question)
        audioRef.current.onended = () => {
            listen({interimResults: true, continuous: true, lang});
            console.log('Запуск распознавания')
        };
        setQuestion(question + 1)
    }

    useEffect(() => {
        setQuestions({
            база: {
                0: {key: 'fio', question: 'Назовите фамилию, имя, отчество'},
                1: {key: 'date', question: 'Укажите дату события'},
                2: {key: 'time', question: 'Уточните время'},
                3: {key: 'text', question: 'Что произошло?'},
            },
            кража: {

            }, грабеж: {

            }, разбой: {

            }, мошенничество: {

            }, вымогательство: {

            },
        });
    }, [])


    let sayText = (text) => {
        stop()
        props.addQuestion(text)
        speak({text, voice})
        setQuestion(question + 1)
    }

    //useEffect(sayText, [answer])


    return (
        <>
            <h2 style={{textAlign: 'center'}}>Видеопоток дежурной части</h2>
            <ModalDialog {...props} lastAnswer={lastAnswer}/>
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

                <div style={{width: "75%", margin: "auto", fontSize: '18px', textAlign: 'center'}}>
                    <button style={{
                        margin: '10px auto',
                        backgroundColor: 'blue',
                        color: 'white',
                        whiteSpace: 'normal',
                        fontSize: '1em'
                    }} type="primary" disabled={blocked}
                            size="large" onClick={() => {
                        (props.audio === 'sound') ? playSound(question + '.mp3') : sayText(questions.база[question].question)
                    }}>
                        {listening ? 'Идет распознавание речи' : 'Обратиться к дежурному'}
                    </button>
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
                        <div style={{backgroundColor: 'red', color: 'white'}}>Вопрос: {questions[questionBlock][question].question}</div>
                        {question !== 4 && <div style={{backgroundColor: 'blue', color: 'white'}}>Ответ: {answer}</div>}
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Photo


