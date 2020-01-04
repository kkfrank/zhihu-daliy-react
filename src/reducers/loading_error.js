import { SHOW_LOADING, HIDE_LOADING, SET_ERROR_MSG, CLEAR_ERROR_MSG} from "../action_types/loading_error";

const DEFAULT_STATE = {
    loading: false,
    errorMsg: ''
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type){
        case SHOW_LOADING:
            return {
                ...state,
                loading: true,
                errorMsg: ''
            }
        case HIDE_LOADING:
            return {
                ...state,
                loading: false
            }
        case SET_ERROR_MSG:
            return {
                ...state,
                loading: false,
                errorMsg: action.errorMsg
            }
        case CLEAR_ERROR_MSG:
            return {
                ...state,
                errorMsg: ''
            }
        default:
            return state
    }
}