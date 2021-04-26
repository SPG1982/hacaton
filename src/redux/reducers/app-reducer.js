import React from "react";

const APP_INITIALIZED = 'app/APP_INITIALIZED'
const QUESTIONS = 'app/QUESTIONS'
const ANSWERS = 'app/ANSWERS'
const AUDIO = 'app/AUDIO'
const USER = 'app/USER'
const MODALINFO = 'app/MODALINFO'
const MODALCALL = 'app/MODALCALL'
const MODALDIALOG = 'app/MODALDIALOG'
const WARNING = 'app/WARNING'
const CRIME = 'app/CRIME'
const PREDSOSTAV = 'app/PREDSOSTAV'


let initialState = {
    initialized: false,
    audio: 'speech',
    questions: [],
    answers: [],
    user: 'Наряд №' + Math.round(Math.random() * 100),
    modalInfo: false,
    modalCall: true,
    modalDialog: false,
    // warning: '',
    warning: 'Анализ оперативной обстановки: рекомендуется отправить на происшествие наряд №5 (73%) или наряд №(27%)',
    //warning: 'В отдел полиции обратился(лась) гр. Попов Даниил Денисович с заявлением о том, что 24.07.2021 года примерно в 10:00 часов неизвестное лицо совершило угон принадлежащей ему автомашины Шкода р/з Х 291 ХУ с придомовой территории по адресу: Воронеж, Кольцовская 12. Стоимость автомашины 550 000рублей',
    predSostav: '',
    predSostavAnalyze: false,
    crime: {
        fio: '',
        date: '',
        time: '',
        address: '',
        sposobText: '',
        sposob: '',
        predmet: '',
        life: '',
        summ: '',
        sostav: '',
        text: '',
        itogText: ''
    }
}

export const AppReducer = (state = initialState, action) => {
    switch (action.type) {

        case APP_INITIALIZED: {
            return {...state, initialized: true}
        }

        case USER: {
            return {...state, user: action.user}
        }

        case AUDIO: {
            return {...state, audio: action.typeAudio}
        }

        case QUESTIONS: {
            return {
                ...state, questions: [...state.questions, action.question]
            }
        }

        case ANSWERS: {
            return {
                ...state, answers: [...state.answers, action.answer]
                // ...state, ...state.answers.push(action.answer)
            }
        }

        case MODALINFO: {
            return {
                ...state, modalInfo: action.view
            }
        }

        case MODALCALL: {
            return {
                ...state, modalCall: action.view
            }
        }

        case MODALDIALOG: {
            return {
                ...state, modalDialog: action.view
            }
        }

        case WARNING: {
            return {
                ...state, warning: action.text
            }
        }

        case CRIME: {
            return {
                ...state, crime: {...state.crime, [action.data.key]: action.data.text}
            }
        }

        case PREDSOSTAV: {
            return {
                ...state, predSostav: action.text
            }
        }

        default :
            return state
    }
}

export const initialize = () => (dispatch) => {
    dispatch({type: APP_INITIALIZED})
}

export const addAnswer = (answer) => {
    return {type: ANSWERS, answer}
}

export const setUser = (user) => {
    return {type: USER, user}
}

export const addQuestion = (question) => {
    return {type: QUESTIONS, question}
}

export const setAudio = (typeAudio) => {
    return {type: AUDIO, typeAudio}
}

export const setModalInfo = (view) => {
    return {type: MODALINFO, view}
}

export const setModalCall = (view) => {
    return {type: MODALCALL, view}
}

export const setModalDialog = (view) => {
    return {type: MODALDIALOG, view}
}

export const setWarning = (text) => {
    return {type: WARNING, text}
}

export const setCrime = (data) => {
    return {type: CRIME, data}
}

export const setPredSostav = (text) => {
    return {type: PREDSOSTAV, text}
}


