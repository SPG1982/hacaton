const APP_INITIALIZED = 'app/APP_INITIALIZED'
const QUESTIONS = 'app/QUESTIONS'
const ANSWERS = 'app/ANSWERS'
const AUDIO = 'app/AUDIO'
const USER = 'app/USER'
const MODALINFO = 'app/MODALINFO'
const MODALCALL = 'app/MODALCALL'
const WARNING = 'app/WARNING'
const CRIME = 'app/CRIME'


let initialState = {
    initialized: false,
    audio: 'speech',
    questions: [],
    answers: [],
    user: 'Наряд №' + Math.round(Math.random()*100),
    modalInfo: false,
    modalCall: true,
    warning: '',
    crime: {
        fio: '',
        date: '',
        time: '',
        sposob: '',
        predmet: '',
        life: '',
        summ: '',
        sostav: '',
        text: '',

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

        case APP_INITIALIZED: {
            return {...state, initialized: true}
        }

        case QUESTIONS: {
            return {
                ...state, ...state.questions.push(action.question)
            }
        }

        case ANSWERS: {
            return {
                ...state, ...state.answers.push(action.answer)
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

        case WARNING: {
            return {
                ...state, warning: action.text
            }
        }

        case CRIME: {
            return {
                ...state, crime: action.text
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

export const setWarning = (text) => {
    return {type: WARNING, text}
}

export const setCrime = (data) => {
    return {type: CRIME, data}
}


