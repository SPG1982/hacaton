const APP_INITIALIZED = 'app/APP_INITIALIZED'
const QUESTIONS = 'app/QUESTIONS'
const ANSWERS = 'app/ANSWERS'
const AUDIO = 'app/AUDIO'
const USER = 'app/USER'
const MODAL = 'app/MODAL'


let initialState = {
    initialized: false,
    audio: 'speech',
    questions: [],
    answers: [],
    user: 'Наряд №' + Math.round(Math.random()*100),
    modal: false
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

        case MODAL: {
            return {
                ...state, modal: action.view
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

export const setModal = (view) => {
    return {type: MODAL, view}
}


