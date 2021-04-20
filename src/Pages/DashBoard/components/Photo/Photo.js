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
    const [question, setQuestion] = useState(1);
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

        let counter = 0;

        for (let key in questions[questionBlock]) {
            counter++;
        }

        const intervalId = setInterval(() => {
            console.log(question)
            if (question === 5 && !answer && questionBlock == 'база') {
                props.setModalDialog(true)
            }
            if (answer && (lastAnswer === answer)) {
                if (question !== 5 && questionBlock == 'база' && counter >= question) {
                    props.setModalDialog(false)
                    setTimeout(stop, 100)
                    console.log('Остановка распознавания')
                    props.addAnswer(answer)
                    props.audio === 'sound' ? playSound(question + '.mp3') : sayText(questions[questionBlock][question + 1].question)
                    setQuestion(question + 1)
                    setAnswer('')
                }
                if ((question == 5 && questionBlock == 'база') && (answer.indexOf('ответ закончен') !== -1 || answer.indexOf('ответ закончил') !== -1 || props.modalDialog == false)) {
                    if (questionBlock == 'база' && props.answers.length <= 4) {
                        console.log('q=5 + база' + props.predSostav)
                        props.addAnswer(answer)
                        props.setModalDialog(false)
                    } else if (props.predSostav !== '') {
                        console.log('q=5 + не база ' + props.predSostav)
                        setAnswer('')
                        setQuestion(1)
                        setQuestionBlock(props.predSostav)
                        console.log(questions[props.predSostav][1].question)
                        props.audio === 'sound' ? playSound((props.predSostav) + '/1.mp3') : sayText(questions[props.predSostav][1].question)
                    }
                }
                if ((questionBlock !== 'база' && counter > question)) {
                    setQuestion(question + 1)
                    props.addAnswer(answer)
                    props.audio === 'sound' ? playSound((questionBlock) + '/' + question + '.mp3') : sayText(questions[questionBlock][question + 1].question)
                    setAnswer('')
                }
                if ((questionBlock !== 'база' && counter == question)) {
                    props.addAnswer(answer)
                    stop()
                    props.setCrime({key: 'itogText', text : true})
                    console.log('КОНЕЦ')
                    setAnswer('')
                }

                props.setCrime({key: questions[questionBlock][question].key, text : answer})

            } else {
                setLastAnswer(answer)
            }
        }, 1000)
        return () => clearInterval(intervalId);
    }, [answer, lastAnswer, props.modalDialog, question, props.predSostav])


    const {listen, listening, stop} = useSpeechRecognition({
        onResult: (result) => {
            setAnswer(result)
        },
        onError,
    });

    function playSound(url) {
        audioRef.current.src = SOUNDS_URL + '/' + url
        audioRef.current.play()
        props.addQuestion(questions[questionBlock][question].question)
        audioRef.current.onended = () => {
            listen({interimResults: true, continuous: true, lang});
            console.log('Запуск распознавания')
        };
    }

    useEffect(() => {
        setQuestions({
            база: {
                1: {key: 'fio', question: 'Назовите фамилию, имя, отчество'},
                2: {key: 'date', question: 'Укажите дату события'},
                3: {key: 'time', question: 'Уточните время'},
                4: {key: 'address', question: 'Укажите адрес, где все случилось'},
                5: {key: 'text', question: 'Что произошло?'},
            },
            отказ: {
                1: {key: 'text', question: 'По вашим показаниям преступления не установлено'},
                2: {key: 'text', question: 'Вы можете обжаловать наши действия...'},
            },
            кража: {
                1: {key: 'sposob', question: 'Откуда было похищено имущество и каким способом'},
                2: {key: 'predmet', question: 'Что именно было похищено'},
                3: {key: 'summ', question: 'Какая сумма причиненного ущерба'},
            }, грабеж: {}, разбой: {}, мошенничество: {}, вымогательство: {},
        });
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
                        (props.audio === 'sound') ? playSound((questionBlock) + '/' + question + '.mp3') : sayText(questions[questionBlock][question].question)
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
                        <div style={{
                            backgroundColor: 'red',
                            color: 'white'
                        }}>Вопрос: {questions[questionBlock][question].question}</div>
                        {(question !== 5 || questionBlock !== 'база') &&
                        <div style={{backgroundColor: 'blue', color: 'white'}}>Ответ: {answer}</div>}
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Photo


