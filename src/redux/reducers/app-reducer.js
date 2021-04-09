const APP_INITIALIZED = 'app/APP_INITIALIZED'

let initialState = {
    initialized: false,
}

export const AppReducer = (state = initialState, action) => {
    switch (action.type) {

        case APP_INITIALIZED: {
            return {...state, initialized:true}
        }

        default :
            return state
    }
}

export const initialize = () => (dispatch) => {
    dispatch({type: APP_INITIALIZED})
}


