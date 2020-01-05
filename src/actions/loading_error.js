import { SHOW_LOADING, HIDE_LOADING, SET_ERROR_MSG, CLEAR_ERROR_MSG } from '../action_types/loading_error'

export function showLoading(){
    return{
        type: SHOW_LOADING
    }
}

export function hideLoading(){
    return{
        type: HIDE_LOADING
    }
}

export function setErrorMsg(message){
    return{
        type: SET_ERROR_MSG,
        errorMsg: message
    }
}

export function clearErrorMsg(){
    return{
        type: CLEAR_ERROR_MSG
    }
}

